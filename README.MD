# TimeEdit API Fetcher

This is a JavaScript tool designed to fetch course events and related details from the TimeEdit API. It's optimized for speed by fetching reservation details in parallel and outputs the data as a JSON file.

## Features

This script interacts with the TimeEdit API to:

1.  **Fetch a list of all objects** (e.g., courses, rooms, lecturers).
2.  **Retrieve detailed information** for each object.
3.  **Get course events** (reservations) associated with each object.
4.  **Download the data as a `course_events_with_details.json` file** in your browser.

## Getting Started
This script is designed to be run directly in your web browser's JavaScript console after you have logged into the TimeEdit web interface. You must be logged into the TimeEdit web interface in your browser (`https://cloud.timeedit.net/my_um/web/students/`) before running the script.

1.  **Copy the `main.js` code:**
    *   Clone the repository and get the `main.js` file.
    *   Open the `main.js` file in a text editor and copy the entire JavaScript code.

2.  **Open the TimeEdit website in your browser and Log In:**
    *   Navigate to your TimeEdit login page (e.g., `https://cloud.timeedit.net/my_um/web/students/`) and log in with your credentials. **You must be logged in before proceeding.**

3.  **Open the Browser's Developer Console:**
    *   In your browser (Chrome, Firefox, Safari, Edge), open the Developer Tools / Inspector. You can usually do this by:
        *   **Right-clicking** on the webpage and selecting "Inspect" or "Inspect Element".
        *   Using keyboard shortcuts:
            *   **Chrome/Firefox/Edge (Windows/Linux):** `Ctrl + Shift + J` or `F12`
            *   **Chrome/Firefox/Edge (Mac):** `Cmd + Option + J`
            *   **Safari (Mac):** `Cmd + Option + C` (Make sure "Show Develop menu in menu bar" is enabled in Safari Preferences -> Advanced)
    *   Go to the "Console" tab in the Developer Tools panel.

4.  **Paste and Run the JavaScript Code:**
    *   In the Console tab, **paste** the entire JavaScript code that you copied from `main.js`.
    *   Press **Enter** to execute the code.

5.  **Modify `maxItemsToFetch` in the Console (Optional):**

    Before pressing Enter, you can modify the `maxItemsToFetch` variable in the code if you want to change the maximum number of objects to fetch.  Look for this line in the code you pasted:

    ```javascript
    const maxItemsToFetch = 29000;
    ```

    Change `29000` to your desired number and then press Enter. Be mindful of API rate limits if you increase this number significantly.

6.  **Download JSON File:** After the script completes execution in the console, a file named `course_events_with_details.json` will be automatically downloaded to your browser's default download location. This file contains the fetched data in JSON format.

## Contributing
If you encounter any issues or have suggestions for improvement, please report them in the issues tab. Your support is appreciated!

## License
This project is licensed under the MIT License.

## Acknowledgments
Thanks to the Next.js, Serwist and TailwindCSS communities for their awesome tools and documentation.

## Author

* Joshua Chew Jay Han