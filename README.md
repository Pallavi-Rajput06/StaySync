# StayNest: Student City Relocation & Hostel Discovery Platform

StayNest is a production-ready, full-stack web application built on the MERN stack. It serves as a centralized marketplace designed specifically to help outstation students discover verified hostels/PGs, browse city relocation guides (safety tips, cost of living, student areas), and write resident reviews.

---

##  Key Features

*  Public Discovery & Search: Guests can search properties, apply advanced filters (price range, gender preference, facilities), and read city relocation guides without forced signups.
*  Redirect-Back Auth Interception: Guest actions (saving favorites or writing reviews) are intercepted and redirected to the login flow, returning the user back to their original route upon successful login.
*  Student Review System: Allows students to star-rate and review accommodations, utilizing database indexes to prevent duplicate reviews.
*  Administrative Panels: Features stats cards, user role toggles, listings verification flags, and review moderation controls.
*  City Relocation Guide & Seeder: Renders transit guides, safety checklists, and neighborhood summaries. Seeds Indore, Bhopal, Delhi, and Pune data on startup.

---

##  Technology Stack

*   **Frontend**: React.js (Vite), Redux Toolkit, Tailwind CSS, Axios, Lucide React
*   **Backend**: Node.js, Express.js, Passport.js (Google OAuth 2.0), JSON Web Tokens (JWT), Nodemailer
*   **Database**: MongoDB Atlas
