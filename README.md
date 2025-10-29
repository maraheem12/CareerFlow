# CareerFlow — Frontend

This folder contains the frontend of CareerFlow — a web application that helps students discover jobs, apply to positions, and helps recruiters post and manage job listings. The frontend is built with modern web tooling and a component-based architecture to keep the UI fast, accessible, and easy to extend.

## What this project is

- A responsive single-page application that lists jobs, shows job details, supports applications, and provides dashboard pages for recruiters and applicants.
- Built using a component-driven approach (see `src/components`) and a central app context (`src/context/AppContext.jsx`).

## Quick features

- Job listing and search
- Recruiter job posting and management
- Application submission and viewing
- Simple authentication flows wired to the backend

## Tech stack (frontend)

- React + Vite
- Plain CSS and component-based styling
- Lightweight state/context via `AppContext`

## Want to run the frontend locally

1. Install dependencies:

   npm install

2. Start the dev server:

   npm run dev

3. Open the app in your browser (Vite will show the local URL, usually http://localhost:5173).


## Want to run the frontend locally

1. Install dependencies:  
   ```bash
   npm install
Start the dev server:

bash
Copy code
npm run dev
Open the app in your browser (Vite will show the local URL, usually http://localhost:5173).

Note: The frontend expects the backend API to be available in ../backend or configured via environment variables.

Want to run the backend locally
Navigate to the backend folder:

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root of the backend directory and include the following variable names (without values):

env
Copy code
MONGO_DB_URI=
PORT=
CLERK_WEB_HOOK=

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=

JWT_SECRET=

CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
Start the backend server:

bash
Copy code
npm run server
The backend will typically run on http://localhost:5000 (or the port you define in .env).


## Contributing — we'd love your help!

Contributions are very welcome. If you'd like to help, please:

1. Fork the repository and create a feature branch.
2. Open a clear pull request describing what you changed and why.
3. Keep changes focused and include small, testable commits.

Whether it's fixing a bug, improving UI/UX, adding tests, or writing documentation — feel free to jump in. No contribution is too small. Be respectful, follow existing code style, and if you're uncertain about a change, open an issue or ask for feedback on your PR.

## Code of conduct

Please be respectful and constructive. Behave as you would in a professional open-source community.

## License

This project is open source — include a license at the repo root if not already present (for example, MIT).

Thanks for checking out CareerFlow — we look forward to your contributions!
