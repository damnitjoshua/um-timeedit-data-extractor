async function fetchLecturerInfo(lecturerId) {
  const baseUrl = "https://cloud.timeedit.net/my_um/web/students/";
  const url = `${baseUrl}objects/${lecturerId}/o.json?fr=t&types=15&sid=5&l=en_US`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status} for lecturer ID ${lecturerId}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error for lecturer ID ${lecturerId}:`, error);
    return null;
  }
}

async function processLecturerBatch(batchIds) {
  const lecturerPromises = batchIds.map(async lecturerId => {
    const lecturerData = await fetchLecturerInfo(lecturerId);
    if (lecturerData && lecturerData.hasOwnProperty("Job Category")) {
      // console.log(`  Lecturer data found for ID: ${lecturerId} (with Job Category)`);
      return { id: lecturerId, details: lecturerData };
    } else {
      console.log(`  No lecturer data or missing Job Category for ID: ${lecturerId}`);
      return null;
    }
  });

  return Promise.all(lecturerPromises).then(results => results.filter(result => result !== null));
}


async function processLecturersConcurrently() {
  const startLecturerId = 8600;
  const endLecturerId = 13700;
  const batchSize = 20;
  let allLecturerData = [];
  let allBatches = [];

  console.log(`Fetching lecturer data for IDs ${startLecturerId} to ${endLecturerId} in batches...`);

  for (let i = startLecturerId; i <= endLecturerId; i += batchSize) {
    const batchIds = [];
    for (let j = 0; j < batchSize && (i + j) <= endLecturerId; j++) {
      batchIds.push(i + j);
    }
    allBatches.push(batchIds);
  }

  let batchResults = [];
  for (const batchIds of allBatches) {
    console.log(`Processing batch: ${batchIds[0]} - ${batchIds[batchIds.length - 1]}`);
    const results = await processLecturerBatch(batchIds);
    batchResults = batchResults.concat(results);
    await new Promise(resolve => setTimeout(resolve, 100));
  }


  allLecturerData = batchResults;


  console.log("Fetching complete.");
  console.log("Total lecturers fetched (with Job Category):", allLecturerData.length);

  if (allLecturerData.length > 0) {
    const jsonString = JSON.stringify(allLecturerData, null, 2);
    // console.log("Lecturer data JSON:\n", jsonString);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lecturer_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log("JSON file 'lecturer_data.json' downloaded.");
  } else {
    console.log("No lecturer data fetched to save (or no lecturers with 'Job Category').");
  }
}

processLecturersConcurrently();