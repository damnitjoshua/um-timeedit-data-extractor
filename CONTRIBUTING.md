# Contributing to the UM TimeEdit Timetable Toolkit

We warmly welcome contributions to the UM TimeEdit Timetable Toolkit!  This project is built by the community, for the community, and your help in making it better is highly appreciated.

Whether you're a student, developer, or simply someone who wants to improve timetable access at Universiti Malaya, there are many ways you can contribute:

## Ways to Contribute

*   **Reporting Bugs:** If you encounter any issues while using the toolkit, please let us know!  Detailed bug reports help us quickly identify and fix problems.  See "Reporting Issues" below for how to submit a bug report.
*   **Suggesting Enhancements (Feature Requests):** Have an idea for a new feature or improvement?  We'd love to hear it!  Submit a feature request outlining your suggestion and why you think it would be valuable.
*   **Code Contributions:**  Want to get your hands dirty with code?  We welcome contributions to both `main.js` (browser script) and `cleaner.js` (Node.js script), as well as documentation and tests. This could include:
    *   Bug fixes
    *   Performance improvements
    *   New features (e.g., more data fields, different output formats)
    *   Improving the data cleaning and structuring logic in `cleaner.js`
    *   Adding unit tests
*   **Improving Documentation:**  Clear and helpful documentation is crucial.  If you find areas where the documentation can be improved (e.g., clarity, completeness, examples), please contribute!
*   **Spreading the Word:**  Help us reach more students and developers at UM by sharing this toolkit with your network!

## Code of Conduct

We expect contributors to be respectful and considerate of others. Please adhere to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).

## Getting Started

1.  **Fork the repository:** Click the "Fork" button at the top right of this repository's page on GitHub. This will create a copy of the repository in your own GitHub account.
2.  **Clone your fork:** Clone the repository to your local machine using `git clone https://github.com/YOUR_USERNAME/um-timeedit-timetable-toolkit.git` (replace `YOUR_USERNAME` with your GitHub username).
3.  **Set up your development environment:**
    *   **Node.js:** Ensure you have Node.js installed as `cleaner.js` is a Node.js script. You can download it from [https://nodejs.org/](https://nodejs.org/).
    *   **Text Editor/IDE:** Choose your preferred text editor or Integrated Development Environment (IDE) for JavaScript development (e.g., VS Code, Sublime Text, Atom).
4.  **Install dependencies (if any are added in the future):**  If the project introduces any Node.js dependencies (e.g., for testing), you will need to run `npm install` or `yarn install` in the project directory.  *(Currently, there are no dependencies beyond Node.js itself for `cleaner.js`)*.

## Contribution Workflow

1.  **Create a branch:** Before making changes, create a new branch for your contribution.  Use a descriptive branch name, e.g., `fix-bug-in-main-js`, `add-feature-room-data`, `docs-improve-getting-started`.
    ```bash
    git checkout -b your-branch-name
    ```
2.  **Make your changes:**  Implement your bug fix, feature, or documentation improvement.
3.  **Test your changes:**  If you are contributing code, please ensure your changes are tested.  Consider adding unit tests if you are adding new functionality. For `main.js`, manually test in the browser console against TimeEdit. For `cleaner.js`, test by running it with sample `course_events_with_details.json` data.
4.  **Commit your changes:**  Commit your changes with clear and concise commit messages. Follow conventional commit message format if possible (e.g., `fix: correct typo in documentation`, `feat: add support for filtering by lecturer in cleaner.js`).
    ```bash
    git add .
    git commit -m "Your descriptive commit message"
    ```
5.  **Push to your fork:** Push your branch to your forked repository on GitHub.
    ```bash
    git push origin your-branch-name
    ```
6.  **Create a Pull Request (PR):** Go to the original repository on GitHub ( `damnitjoshua/um-timeedit-timetable-toolkit`) and you should see a prompt to create a pull request for your branch. Click "Compare & pull request".
7.  **Describe your PR:**  Provide a clear and detailed description of your changes in the pull request. Explain what problem you are solving, what feature you are adding, or what improvements you have made.
8.  **Review and Discussion:**  Your pull request will be reviewed by project maintainers and potentially other contributors. Be prepared to discuss your changes and make adjustments if requested.
9.  **Merge:** Once your pull request is approved and any necessary changes are made, it will be merged into the main branch of the repository. Congratulations, you've contributed to the UM TimeEdit Timetable Toolkit!

## Style Guides

*   **JavaScript:**  Follow generally accepted JavaScript best practices and coding conventions.  Consistency with the existing codebase is appreciated. Consider using a linter (like ESLint) to help maintain code quality.
*   **Commit Messages:**  Aim for clear, concise, and descriptive commit messages.

## Reporting Issues

If you find a bug or have a feature request, please create a new issue on the GitHub repository:

1.  Go to the "Issues" tab in this repository.
2.  Click "New issue".
3.  Choose the appropriate issue template (Bug report or Feature request) or "Open a blank issue" if none fits.
4.  Fill in the issue template with as much detail as possible. For bug reports, include steps to reproduce the bug, your browser and Node.js versions (if relevant), and any error messages. For feature requests, clearly describe the feature and its benefits.

## License

By contributing to the UM TimeEdit Timetable Toolkit, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## Questions?

If you have any questions about contributing, feel free to open an issue or reach out to the project maintainers directly (if contact information is provided in the README or repository).

Thank you for your contributions! We look forward to collaborating with you to make this toolkit even better.
