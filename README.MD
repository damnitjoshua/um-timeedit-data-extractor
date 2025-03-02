# Universiti Malaya Timetable Software Development Kit

This SDK provides a foundation for students and developers to build innovative timetable applications for Universiti Malaya (UM). By leveraging data from the UM TimeEdit system, this tool aims to democratize access to timetable information and foster the creation of user-friendly and customized scheduling solutions.

## Building Blocks for Timetable Applications

This toolkit interacts with the TimeEdit API to provide essential data for timetable software development. It offers the following key functionalities:

1.  **Comprehensive Module Catalog Retrieval:**  Fetches an exhaustive list of all modules available within the UM TimeEdit system. This includes courses, events and other relevant entities, providing a complete inventory for application development.
2.  **Detailed Module Information Acquisition:**  Retrieves in-depth specifications for each module. This encompasses crucial details like module codes, descriptions, and any other pertinent metadata necessary for enriching timetable applications.
3.  **Event Data Extraction:**  Gathers all scheduled events (reservations) linked to each module. This core functionality provides the raw timetable data, including timings, dates, locations, and event types (e.g., Lecture, Tutorial), essential for building scheduling features.
4.  **Raw Data Export (JSON):**  Facilitates the download of all extracted data into a single `course_events_with_details.json` file directly within the browser environment. This raw JSON output serves as the initial dataset for further processing and application integration.
5.  **Structured Data Refinement (Node.js):** Includes a `cleaner.js` script (Node.js) to transform the raw JSON data into a more organized and application-ready `timetable_data.json` file. This process restructures the data for efficient programmatic access and simplifies the development of timetable functionalities.

## Getting Started

This toolkit is designed to be used in two distinct phases: data acquisition using `main.js` within a web browser, followed by data structuring using `cleaner.js` with Node.js. This separation allows for efficient data extraction and preparation for application development.

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

6.  **Enable Turbo Mode (Optional):**

  To significantly accelerate the data extraction process, you can enable "turbo mode." This mode bypasses certain checks and optimizations, potentially leading to faster data retrieval. However, it may also increase the risk of encountering API rate limits or data inconsistencies. Use with caution.

  To enable turbo mode, locate the following line within the pasted code:

  ```javascript
  const turboMode = false;
  ```

  Change `false` to `true` to activate turbo mode:

  ```javascript
  const turboMode = true;
  ```

  **Warning:** Enabling turbo mode is recommended for advanced users who understand the potential risks. If you encounter issues, disable turbo mode and try again.

7.  **Download Raw JSON Data:** Upon successful script completion, the browser will automatically download a file named `course_events_with_details.json` to your browser's default download directory. This file contains the raw, extracted data in JSON format, ready for the next phase.

### Note on Turbo Mode

1.  When `turboMode` is disabled (`false`), concurrency is applied only between batches. Therefore, modules within each batch are not sorted.
2.  When `turboMode` is enabled (`true`), full concurrency is applied, and the extracted modules are not sorted.


### Phase 2: Data Structuring with `cleaner.js` (Node.js Environment)

To facilitate efficient application development, the raw data from Phase 1 requires structuring. The `cleaner.js` script, executed using Node.js, transforms `course_events_with_details.json` into a more developer-friendly `timetable_data.json` file.

**`timetable_data.json` Structure for Application Development:**

`timetable_data.json` is designed to be **module-centric**, grouping events by module code. This structure simplifies data access and manipulation within your timetable applications.  Within each module, activities are further categorized by type (e.g., "Lecture," "Tutorial"). Each activity type then contains an array of scheduled events, including time, day, and room details. This hierarchical structure is optimized for building features such as module-based timetable views, conflict detection, and personalized scheduling tools.

**Execution Instructions for `cleaner.js`:**

1.  **Node.js Requirement:** Ensure you have Node.js installed on your system.
2.  **Run `cleaner.js` in Terminal:** Open your terminal or command prompt, navigate to the directory containing `cleaner.js` and `course_events_with_details.json`, and execute the following command:

    ```bash
    node cleaner.js course_events_with_details.json
    ```

    This command will process the raw data and generate `timetable_data.json` in the same directory, providing you with the structured data ready for integration into your UM timetable application.
    
     Example of json data:
    
  
    ```json
    {
      "moduleName": "INTRODUCTION TO DATA SCIENCE",
      "moduleCode": "WIE2003",
      "credit": 3,
      "yearPeriod": "2024/S2",
      "overallTargetStudent": 100,
      "level": "BACHELOR",
      "faculty": "FACULTY OF COMPUTER SCIENCE AND INFORMATION TECHNOLOGY",
      "continuousAssessmentWeightage": "60~40",
      "examDuration": 7200,
      "levelCode": 3,
      "activities": {
        "LEC": [
          {
            "dayOfWeek": "Tuesday",
            "startTime": "10:00",
            "endTime": "12:00",
            "room": "DK1",
            "occurrences": [
              "1",
              "2"
            ]
          }
        ],
        "EXAM": [
          {
            "dayOfWeek": "Thursday",
            "startTime": "08:30",
            "endTime": "10:30",
            "room": "EXAM_HOLD_G",
            "startDate": "10/07/2025",
            "endDate": "10/07/2025",
            "activityTypeExam": "Physical",
            "occurrences": [
              "1",
              "2"
            ]
          }
        ],
        "TUT": [
          {
            "dayOfWeek": "Thursday",
            "startTime": "13:00",
            "endTime": "14:00",
            "room": "BK",
            "occurrences": [
              "1"
            ]
          },
          {
            "dayOfWeek": "Thursday",
            "startTime": "14:00",
            "endTime": "15:00",
            "room": "BK",
            "occurrences": [
              "2"
            ]
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