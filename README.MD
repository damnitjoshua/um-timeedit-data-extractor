# Universiti Malaya Timetable Software Development Kit

This SDK provides a foundation for students and developers to build innovative timetable applications for Universiti Malaya (UM). By leveraging data from the UM TimeEdit system, this tool aims to democratize access to timetable information and foster the creation of user-friendly and customized scheduling solutions.

## Building Blocks for Timetable Applications

This toolkit interacts with the TimeEdit API to provide essential data for timetable software development. It offers the following key functionalities:

1.  **Lecturer Data Retrieval:** Fetches information about lecturers within the UM TimeEdit system, including their names, titles, departments, and contact details. This data enriches timetable information by associating events with lecturer profiles.
2.  **Comprehensive Module Catalog Retrieval:**  Fetches an exhaustive list of all modules available within the UM TimeEdit system. This includes courses, events and other relevant entities, providing a complete inventory for application development.
3.  **Detailed Module Information Acquisition:**  Retrieves in-depth specifications for each module. This encompasses crucial details like module codes, descriptions, and any other pertinent metadata necessary for enriching timetable applications.
4.  **Event Data Extraction:**  Gathers all scheduled events (reservations) linked to each module. This core functionality provides the raw timetable data, including timings, dates, locations, and event types (e.g., Lecture, Tutorial), essential for building scheduling features.
5.  **Raw Data Export (JSON):**  Facilitates the download of extracted data into JSON files directly within the browser environment. `lecturer_data.json` contains lecturer information, while `course_events_with_details.json` holds module and event details. These raw JSON outputs serve as the initial datasets for further processing and application integration.
6.  **Structured Data Refinement (Node.js):** Includes a `cleaner.js` script (Node.js) to transform the raw JSON data into a more organized and application-ready `timetable_data.json` file. This process restructures and combines module and lecturer data for efficient programmatic access and simplifies the development of timetable functionalities.

## Getting Started

This toolkit is designed to be used in three distinct phases: lecturer data acquisition using `lecturer.js`, course/event data acquisition using `main.js`, both within a web browser, followed by data structuring and merging using `cleaner.js` with Node.js. This separation allows for efficient data extraction and comprehensive data preparation for application development.

### Phase 0: Lecturer Data Acquisition with `lecturer.js` (Browser Environment)

**Prerequisites:** You must be logged into the Universiti Malaya TimeEdit web interface (`https://cloud.timeedit.net/my_um/web/students/`) in your browser before executing `lecturer.js`.

1.  **Obtain `lecturer.js`:**
    *   Clone the repository to access the `lecturer.js` file.

2.  **Access the UM TimeEdit Website and Authenticate:**
    *   Navigate to the UM TimeEdit login page (e.g., `https://cloud.timeedit.net/my_um/web/students/`) and log in with your valid UM credentials. **Login is mandatory for script execution.**

3.  **Open Browser Developer Console:**
    *   Access your browser's Developer Tools / Inspector panel while still on the TimeEdit website. Common methods include:
        *   **Right-click** on the webpage and select "Inspect" or "Inspect Element."
        *   Keyboard Shortcuts: (See Phase 1 instructions for details)
    *   Navigate to the "Console" tab within the Developer Tools.

4.  **Execute `lecturer.js` Code:**
    *   In the Console, **paste** the entire JavaScript code copied from `lecturer.js`.
    *   Press **Enter** to initiate script execution.

5.  **Download Raw Lecturer JSON Data:** Upon successful script completion, the browser will automatically download a file named `lecturer_data.json` to your browser's default download directory. This file contains the raw lecturer data in JSON format.

    **Example `lecturer_data.json` data format:**

    ```json
      {
        "id": 12555,
        "details": {
          "Full Name": "BRYAN RAJ A/L PETER JABARAJ",
          "E-mail": "BRYANRAJ15@UM.EDU.MY",
          "Primary field": "00015585",
          "Code": "00015585",
          "In Use? (Y/N)": "Y",
          "Title": "DR.",
          "Gender": "MALE",
          "Location": "UMKL",
          "Faculty": "W",
          "Department": "W-R",
          "Job Title": "FELLOW SLAI",
          "Job Category": "A"
        }
      }
    ```

### Phase 1: Data Acquisition with `main.js` (Browser Environment)

**Prerequisites:** You must be logged into the Universiti Malaya TimeEdit web interface (`https://cloud.timeedit.net/my_um/web/students/`) in your browser before executing `main.js`.

1.  **Obtain `main.js`:**
    *   Clone the repository to access the `main.js` file.

2.  **Access the UM TimeEdit Website and Authenticate:**
    *   Navigate to the UM TimeEdit login page (e.g., `https://cloud.timeedit.net/my_um/web/students/`) and log in with your valid UM credentials. **Login is mandatory for script execution.**

3.  **Open Browser Developer Console:**
    *   Access your browser's Developer Tools / Inspector panel while still on the TimeEdit website. Common methods include:
        *   **Right-click** on the webpage and select "Inspect" or "Inspect Element."
        *   Keyboard Shortcuts:
            *   **Chrome/Firefox/Edge (Windows/Linux):** `Ctrl + Shift + J` or `F12`
            *   **Chrome/Firefox/Edge (Mac):** `Cmd + Option + J`
            *   **Safari (Mac):** `Cmd + Option + C` (Ensure "Show Develop menu in menu bar" is enabled in Safari Preferences -> Advanced)
    *   Navigate to the "Console" tab within the Developer Tools.

4.  **Execute `main.js` Code:**
    *   In the Console, **paste** the entire JavaScript code copied from `main.js`.
    *   Press **Enter** to initiate script execution.

5.  **Adjust Fetch Limit (Optional):**

    Prior to pressing Enter, you can optionally modify the `maxItemsToFetch` variable within the pasted code to control the maximum number of items retrieved. Locate the following line:

    ```javascript
    const maxItemsToFetch = 29000;
    ```

    Modify `29000` to your desired limit and then press Enter. Exercise caution when increasing this value significantly to avoid potential API rate limiting.

6.  **Download Raw JSON Data:** Upon successful script completion, the browser will automatically download a file named `course_events_with_details.json` to your browser's default download directory. This file contains the raw, extracted module and event data in JSON format, ready for the next phase.

### Phase 2: Data Structuring with `cleaner.js` (Node.js Environment)

To facilitate efficient application development, the raw data from Phases 0 and 1 requires structuring and merging. The `cleaner.js` script, executed using Node.js, transforms `course_events_with_details.json` and `lecturer_data.json` into a more developer-friendly `timetable_data.json` file.

**`timetable_data.json` Structure for Application Development:**

`timetable_data.json` is designed to be **module-centric**, grouping events by module code. This structure simplifies data access and manipulation within your timetable applications.  Within each module, activities are further categorized by type (e.g., "Lecture," "Tutorial"). Each activity type then contains an array of scheduled events, including time, day, room details, and now, enriched with lecturer information. This hierarchical structure is optimized for building features such as module-based timetable views, conflict detection, and personalized scheduling tools, now enhanced with lecturer profiles.

**Execution Instructions for `cleaner.js`:**

1.  **Node.js Requirement:** Ensure you have Node.js installed on your system.
2.  **Run `cleaner.js` in Terminal:** Open your terminal or command prompt, navigate to the directory containing `cleaner.js`, `course_events_with_details.json`, and `lecturer_data.json`, and execute the following command:

    ```bash
    node cleaner.js course_events_with_details.json lecturer_data.json
    ```

    **Important:** Ensure you provide the file paths in the correct order: first the `course_events_with_details.json` file, and then the `lecturer_data.json` file.

    This command will process the raw module and lecturer data, merge them, and generate `timetable_data.json` in the same directory, providing you with the structured and enriched data ready for integration into your UM timetable application.

    Example of `timetable_data.json` data (showing lecturer integration):

    ```json
    {
        "moduleName": "INTERNET OF THINGS",
        "moduleCode": "WIC2008",
        "credit": 3,
        "yearPeriod": "2024/S2",
        "overallTargetStudent": 150,
        "level": "BACHELOR",
        "faculty": "FACULTY OF COMPUTER SCIENCE AND INFORMATION TECHNOLOGY",
        "continuousAssessmentWeightage": "50~50",
        "examDuration": 7200,
        "levelCode": 3,
        "activities": {
          "LEC": [
            {
              "dayOfWeek": "Wednesday",
              "startTime": "08:00",
              "endTime": "10:00",
              "room": "DK2",
              "occurrences": [
                "1",
                "2",
                "3"
              ],
              "lecturer": {
                "lecturerId": "00015585",
                "fullName": "BRYAN RAJ A/L PETER JABARAJ",
                "title": "DR.",
                "email": "BRYANRAJ15@UM.EDU.MY",
                "jobTitle": "FELLOW SLAI",
                "jobCategory": "A",
                "facultyCode": "W",
                "departmentCode": "W-R"
              }
            }
          ],
          "EXAM": [
            {
              "dayOfWeek": "Monday",
              "startTime": "08:30",
              "endTime": "10:30",
              "room": "EXAM_HOLD_G",
              "startDate": "07/07/2025",
              "endDate": "07/07/2025",
              "activityTypeExam": "Physical",
              "occurrences": [
                "1",
                "2",
                "3"
              ],
              "lecturer": {
                "lecturerId": "00015585",
                "fullName": "BRYAN RAJ A/L PETER JABARAJ",
                "title": "DR.",
                "email": "BRYANRAJ15@UM.EDU.MY",
                "jobTitle": "FELLOW SLAI",
                "jobCategory": "A",
                "facultyCode": "W",
                "departmentCode": "W-R"
              }
            }
          ],
          "TUT": [
            {
              "dayOfWeek": "Thursday",
              "startTime": "13:00",
              "endTime": "14:00",
              "room": "MM3",
              "occurrences": [
                "1"
              ],
              "lecturer": {
                "lecturerId": "00015585",
                "fullName": "BRYAN RAJ A/L PETER JABARAJ",
                "title": "DR.",
                "email": "BRYANRAJ15@UM.EDU.MY",
                "jobTitle": "FELLOW SLAI",
                "jobCategory": "A",
                "facultyCode": "W",
                "departmentCode": "W-R"
              }
            },
            {
              "dayOfWeek": "Tuesday",
              "startTime": "11:00",
              "endTime": "12:00",
              "room": "MM6",
              "occurrences": [
                "2"
              ],
              "lecturer": {
                "lecturerId": "00005915",
                "fullName": "MOHD YAMANI IDNA BIN IDRIS",
                "title": "PROF. DR.",
                "email": "YAMANI@UM.EDU.MY",
                "jobTitle": "PROFESOR MADYA",
                "jobCategory": "A",
                "facultyCode": "W",
                "departmentCode": "W-R"
              }
            },
            {
              "dayOfWeek": "Wednesday",
              "startTime": "11:00",
              "endTime": "12:00",
              "room": "MM1",
              "occurrences": [
                "3"
              ],
              "lecturer": {
                "lecturerId": "00005915",
                "fullName": "MOHD YAMANI IDNA BIN IDRIS",
                "title": "PROF. DR.",
                "email": "YAMANI@UM.EDU.MY",
                "jobTitle": "PROFESOR MADYA",
                "jobCategory": "A",
                "facultyCode": "W",
                "departmentCode": "W-R"
              }
            }
          ],
          "LAB": [],
          "ONL": [],
          "REPROJECT": [],
          "SEM": [],
          "PRA": []
        }
     }
    ```


## Contributing to the UM Timetable Ecosystem

We encourage contributions to enhance this toolkit and expand the possibilities for UM timetable software development. If you encounter issues, have feature suggestions, or wish to contribute code improvements, please utilize the issue reporting and pull request functionalities within this repository. Your contributions are vital to building a thriving ecosystem of UM timetable applications.

## License

This project is open-source and licensed under the MIT License.

## Acknowledgements

*   [https://github.com/juhosa/time-edit-api](https://github.com/juhosa/time-edit-api) - Providing insights into TimeEdit API interactions.

## Author

*   Joshua Chew Jay Han
*   Gemini 2.0 Flash Thinking Experimental 01-21