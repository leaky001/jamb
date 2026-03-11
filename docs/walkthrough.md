# Strong Tower Mock JAMB CBT Platform Walkthrough

Welcome to the Strong Tower Mock JAMB CBT Platform. This walkthrough covers the end-to-end implementation of the automated exam system, designed to simulate the real JAMB experience through AI-driven question generation and a professional CBT environment.

## 1. System Architecture
The platform is built using a modern **Next.js (Frontend)** and **Node.js/Express (Backend)** stack with a **PostgreSQL** database. 

- **Frontend**: A custom React-based exam interface using Vanilla CSS for high flexibility and premium styling.
- **Backend**: AI-powered services for question generation and a robust scoring engine.
- **Security**: JWT-based authentication and server-side timer controls to prevent cheating.

## 2. Premium UI Design
We prioritized "Clarity, Speed, and Trust" in our design philosophy. Below is a mockup of the professional exam interface:

![JAMB CBT UI Mockup](file:///C:/Users/User/.gemini/antigravity/brain/f2ba41f8-b056-4b4a-85e4-89da9bca16ac/jamb_cbt_ui_mockup_1773198781705.png)

## 3. Core Modules

### 🔐 Authentication System
Located in `backend/controllers/authController.js`, this system handles:
- **Registration**: Securely hashes passwords using Bcrypt.
- **Login**: Issues JWT tokens for session persistence across the frontend.

### 🧪 AI Question Generation Module
Unlike traditional systems that require manual question uploads, Strong Tower uses a dynamic generator.
- **English Compulsory**: Includes grammar, vocabulary, comprehension, and novel-specific questions (e.g., *The Life Changer*).
- **Subject Diversity**: Automatically generates 40 questions per elective subject.
- **Unique Sessions**: Questions are randomized and never repeat within the same exam session.

[aiGenerator.js](file:///c:/Users/User/jamb/backend/services/aiGenerator.js)

### ⏱️ Exam Timer & Anti-Cheating
The timer is managed synchronously between the client and server.
- **Server Validation**: On every answer save, the server checks the elapsed time against the start timestamp.
- **Auto-Submission**: If the 120-minute window expires, the server automatically flags the exam as submitted and triggers final scoring.

### 📊 Scoring & Instant Results
Scores are calculated per subject and total out of 180.
- **Subject-Specific Weighting**: English (60 questions) + 3 subjects (40 each).
- **History Tracking**: Students can view their previous scores and performance analytics in the [results interface](file:///c:/Users/User/jamb/frontend/app/results/%5Bid%5D/page.tsx).

## 4. Database Schema
The relational schema ensures data integrity across sessions, questions, and user performance.

[schema.sql](file:///c:/Users/User/jamb/database/schema.sql)

## 5. Development Steps Followed
1.  **Architecture Design**: Established the 3-tier structure.
2.  **Database Initialisation**: Created tables for users, sessions, questions, and results.
3.  **Backend API Setup**: Implemented routes for auth, exam lifecycle, and scoring.
4.  **AI Engine Implementation**: Built the logic for dynamic question population.
5.  **Frontend Layout**: Designed a high-fidelity exam interface with a question palette.
6.  **Timer & Scoring Integration**: Linked client-side UI with server-side validation.
7.  **Authentication UI**: Built premium login and sign-up flows.
8.  **Results Implementation**: Created the instant performance analytics page.

---
**Strong Tower Mock JAMB CBT** — *Simulating success, one mock at a time.*
