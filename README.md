# GitHub Pull Request Viewer

## Overview
This project is a **React TypeScript** application that fetches and displays pull requests from a GitHub repository. Users can filter pull requests using a **multi-select dropdown** based on labels, improving searchability and usability.

## Features
- Fetch and display pull requests from GitHub.
- **Multi-select dropdown** for filtering PRs by labels.
- Displays PR details including **ID, Title, Labels, Date Opened, and Link**.
- Uses **Material-UI** for improved UI components.
- Utilizes **React Hooks** (`useState`, `useEffect`) for state management.
- Fully tested with **Jest and React Testing Library**.

## How We Built It
1. **Fetching Data:**
   - Implemented an API call in `githubService.ts` to fetch pull requests.
   - The response data is processed and stored in `useState`.
2. **Multi-Select Filtering:**
   - Replaced the text input with a **Material-UI Select dropdown**.
   - Extracts all unique labels dynamically from fetched PRs.
   - Filters PRs to include those with **at least one selected label**.
3. **Table Display:**
   - Uses **MUI's DataGrid** to display PRs.
   - Columns include PR ID, Title, Labels, Date Opened, and a clickable **GitHub Link**.
   - Labels column uses `renderCell` to display label names.
4. **Styling & Layout:**
   - Applied basic CSS for layout and styling.
   - Used **Material-UI's Chip** component for selected filters.
5. **Testing:**
   - `PullRequestList.test.tsx` verifies UI rendering and filtering.
   - `githubService.test.ts` ensures API calls work correctly.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd GithubPullRequest
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the application:
   ```sh
   npm start
   ```
   This starts the React development server at `http://localhost:3000/`.

4. Run tests:
   ```sh
   npm test
   ```

## Dependencies
- **React** (TypeScript-based)
- **Material-UI** (`@mui/material`, `@mui/x-data-grid`)
- **Jest & React Testing Library**
- **Axios** (if used in `githubService.ts`)

## Future Enhancements
- Add **pagination and sorting** for better data handling.
- Implement **real-time updates** using GitHub webhooks.
- Improve **error handling and loading indicators**.