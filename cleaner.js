const fs = require('fs');

function cleanTimetableData(jsonData, lecturerData, activitiesToInclude) {
  const cleanedModules = {};
  const lecturerMap = new Map();

  lecturerData.forEach(lecturer => {
    if (lecturer.details && lecturer.details.Code) {
      lecturerMap.set(lecturer.details.Code, lecturer.details);
    }
  });

  jsonData.forEach(module => {
    if (module.events && Array.isArray(module.events)) {
      const moduleCode = module.details["Module Code"] ?? module.idOnly ?? "UNKNOWN_MODULE_CODE";
      if (!cleanedModules[moduleCode]) {
        cleanedModules[moduleCode] = {
          moduleName: module.details["English Description"] ?? null,
          moduleCode: moduleCode,
          credit: parseNumber(module.details["Credit"]),
          yearPeriod: module.details["Year + Period"] ?? null,
          overallTargetStudent: parseNumber(module.details["Overall Target Student"]),
          level: module.details["Level Description"] ?? null,
          faculty: module.details["Faculty Description"] ?? null,
          continuousAssessmentWeightage: module.details["Weightage(%)-Continuous Assess"] ?? null,
          examDuration: parseNumber(module.details["Exam Duration (Length)"]),
          levelCode: parseNumber(module.details["Level (LEV) Code"]),
          activities: {}
        };
        activitiesToInclude.forEach(activityType => {
          cleanedModules[moduleCode].activities[activityType] = new Set();
        });
      }

      module.events.forEach(event => {
        if (event.html_details && event.columns && Array.isArray(event.columns)) {
          const startDate = event.startdate ?? null;
          const endDate = event.enddate ?? null;
          const dayOfWeek = startDate ? getDayOfWeek(startDate) : null;
          const startTime = event.starttime ?? null;
          const endTime = event.endtime ?? null;
          let activityType = event.html_details.Activity;
          if (event.html_details["Activity Type (exam)"] !== undefined && event.html_details["Exam Time Slot"] !== undefined) {
            activityType = "EXAM";
          }

          let room = event.html_details.Room ?? null;
          const occurrences = [];
          let lecturerId = event.html_details.Lecturer ?? null;
          let lecturerDetails = null;

          if (lecturerId) {
            lecturerDetails = lecturerMap.get(lecturerId);
          }

          if (room && room[0] == module.details["Faculty"]) {
            room = room.substring(1);
          }

          const columnsData = event.columns.join(',').split(',').map(col => col.trim());
          const moduleOfferingPrefix = `${moduleCode}/`;

          for (const col of columnsData) {
            if (col.startsWith(moduleOfferingPrefix)) {
              const parts = col.split('/');
              const possibleOccurrence = parts[parts.length - 1];
              if (possibleOccurrence) {
                occurrences.push(possibleOccurrence);
              }
            }
          }

          if (occurrences.length > 0) {
            occurrences.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
          }


          if (activitiesToInclude.includes(activityType) && dayOfWeek && startTime && endTime && room) {
            const eventDetails = { dayOfWeek, startTime, endTime, room };
            if (activityType === "EXAM") {
              eventDetails.startDate = startDate;
              eventDetails.endDate = endDate;
              let activityTypeExamValue = event.html_details["Activity Type (exam)"] || null;
              if (activityTypeExamValue === "Fizikal") {
                activityTypeExamValue = "Physical";
              } else if (activityTypeExamValue === "Atas Talian") {
                activityTypeExamValue = "Online";
              }
              eventDetails["activityTypeExam"] = activityTypeExamValue;
            }
            if (occurrences.length > 0) {
              eventDetails.occurrences = occurrences;
            }
            if (lecturerDetails) {
              eventDetails.lecturer = {
                lecturerId: lecturerId,
                fullName: lecturerDetails["Full Name"] ?? null,
                title: lecturerDetails.Title ?? null,
                email: lecturerDetails["E-mail"] ?? null,
                jobTitle: lecturerDetails["Job Title"] ?? null,
                jobCategory: lecturerDetails["Job Category"] ?? null,
                facultyCode: lecturerDetails.Faculty ?? null,
                departmentCode: lecturerDetails.Department ?? null
              };
            }
            cleanedModules[moduleCode].activities[activityType].add(JSON.stringify(eventDetails));
          }
        }
      });

      activitiesToInclude.forEach(activityType => {
        cleanedModules[moduleCode].activities[activityType] = Array.from(cleanedModules[moduleCode].activities[activityType]).map(JSON.parse);
        cleanedModules[moduleCode].activities[activityType].sort((eventA, eventB) => {
          const occA = eventA.occurrences && eventA.occurrences.length > 0 ? parseInt(eventA.occurrences[0], 10) : Infinity;
          const occB = eventB.occurrences && eventB.occurrences.length > 0 ? parseInt(eventB.occurrences[0], 10) : Infinity;
          return occA - occB;
        });
      });
    }
  });

  let moduleArray = Object.values(cleanedModules);

  const filteredModules = moduleArray.filter(module => {
    return activitiesToInclude.some(activityType => module.activities[activityType] && module.activities[activityType].length > 0);
  });

  return filteredModules;
}

function getDayOfWeek(dateString) {
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);
  const dayIndex = date.getDay();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[dayIndex];
}

function parseNumber(value) {
  const parsed = parseInt(value);
  return isNaN(parsed) ? null : parsed;
}

const outputFilePath = 'timetable_data.json';
const moduleDataFilePath = process.argv[2]; // Path to module data JSON
const lecturerDataFilePath = process.argv[3]; // Path to lecturer data JSON

if (!moduleDataFilePath || !lecturerDataFilePath) {
  console.error("Please provide both module data and lecturer data JSON file paths as command line arguments.");
  console.error("Usage: node cleaner.js <module_data_file_path> <lecturer_data_file_path>");
  process.exit(1);
}

// Read module data
fs.readFile(moduleDataFilePath, 'utf8', (moduleErr, moduleData) => {
  if (moduleErr) {
    console.error("Error reading module data file:", moduleErr);
    return;
  }

  // Read lecturer data
  fs.readFile(lecturerDataFilePath, 'utf8', (lecturerErr, lecturerRawData) => {
    if (lecturerErr) {
      console.error("Error reading lecturer data file:", lecturerErr);
      return;
    }

    try {
      const moduleJsonData = JSON.parse(moduleData);
      const lecturerJsonData = JSON.parse(lecturerRawData);

      const uniqueActivitiesSet = new Set();
      const uniqueExamActivityTypes = new Set();

      moduleJsonData.forEach(module => {
        if (module.events && Array.isArray(module.events)) {
          module.events.forEach(event => {
            if (event.html_details && event.html_details.Activity) {
              uniqueActivitiesSet.add(event.html_details.Activity);
            }

            if (event.html_details["Activity Type (exam)"] && event.html_details["Exam Time Slot"]) {
              uniqueActivitiesSet.add("EXAM");
              uniqueExamActivityTypes.add(event.html_details["Activity Type (exam)"]);
            }
          });
        }
      });
      const activitiesToProcess = Array.from(uniqueActivitiesSet);
      console.log("Dynamically detected activities:", activitiesToProcess);
      console.log("Unique Exam types (before rename):", Array.from(uniqueExamActivityTypes));

      const cleanedData = cleanTimetableData(moduleJsonData, lecturerJsonData, activitiesToProcess);

      const cleanedDataJSON = JSON.stringify(cleanedData, null, 2);

      fs.writeFile(outputFilePath, cleanedDataJSON, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error("Error writing to the output file:", writeErr);
        } else {
          console.log(`Successfully cleaned and saved module-structured data with lecturer info to ${outputFilePath}`);
        }
      });

    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
    }
  });
});