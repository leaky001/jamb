Product Requirements Document (PRD)
Strong Tower Mock JAMB CBT Platform
1. Product Overview

Product Name: Strong Tower Mock JAMB CBT
Product Type: Educational Technology Platform (CBT Exam Simulator)
Primary Users: Secondary school students preparing for JAMB examinations
Platform: Web Application (initial release) with future support for mobile apps

The Strong Tower Mock JAMB CBT platform will simulate the exam environment used by the Joint Admissions and Matriculation Board. The system will allow students to practise mock examinations under realistic conditions, including timed exams, subject selection, automatic scoring, and performance analytics.

The platform will generate questions automatically using an AI question generation engine based on the official JAMB syllabus, eliminating the need for manual question entry or administrative control.

2. Product Vision

To build the most reliable AI-powered mock examination platform that accurately simulates the JAMB CBT experience and helps students practise effectively before the real examination.

3. Product Objectives

Provide realistic CBT exam simulations for JAMB candidates.

Generate unlimited practice questions automatically.

Deliver instant performance analytics to students.

Remove manual administrative processes by automating question generation.

Create a scalable system capable of supporting thousands of concurrent exam sessions.

4. Target Users
Primary Users

Students preparing for JAMB examinations.

Secondary Users

Tutorial centres that want to provide practice exams for their students.

5. Core Features
5.1 User Account System
Registration

Students must be able to create an account using:

Name

Email address

Password

Optional:

School name

Exam year

Login

Students must be able to log in securely using:

Email

Password

Authentication must use secure token-based authentication (JWT).

6. Subject Selection

The system must follow the structure used by JAMB.

Rules

English Language must always be compulsory.

Students must choose three additional subjects.

Example Subjects

Mathematics

Physics

Chemistry

Biology

Economics

Government

Literature in English

Geography

Commerce

7. Exam Simulation System

The platform must simulate the CBT exam environment.

Exam Structure
Section	Number of Questions
English Language	60
Other Subjects	40 each

Total questions: 180

Exam Duration

Total time allowed: 2 hours (120 minutes)

Exam Behaviour

When the student starts the exam:

The system generates the full exam.

The timer starts immediately.

Students answer questions sequentially.

The exam automatically submits when time expires.

8. Exam Interface Requirements

The exam interface must resemble professional CBT exam centres.

UI Components

Question display area

Multiple choice options (A–D)

Navigation buttons (Next / Previous)

Question number panel

Exam progress indicator

Visible countdown timer

9. AI Question Generation Engine

The platform will use an AI-based system to generate exam questions dynamically.

Questions must be generated based on the JAMB syllabus and must include:

Grammar questions

Vocabulary questions

Comprehension passages

Mathematics problems

Science questions

Social science questions

Each question must contain:

Question text
Option A
Option B
Option C
Option D
Correct answer

Questions must not repeat during the same exam session.

10. Literature and Novel Question System

The platform must also generate questions related to novels used in JAMB English and Literature examinations.

Question types:

Character identification

Story events

Themes

Moral lessons

Vocabulary

Literary analysis

11. Exam Workflow

Step 1
User logs into the system.

Step 2
User selects three additional subjects.

Step 3
The system generates the full exam automatically.

Step 4
The exam timer starts.

Step 5
Student answers questions.

Step 6
Exam automatically submits when time expires.

Step 7
Results are calculated.

12. Results and Performance Analytics

After submission, the system must display:

Score per subject

Total score

Percentage score

Example:

Subject	Score
English	52/60
Mathematics	30/40
Physics	28/40
Chemistry	31/40

Total Score: 141/180

13. Exam History

Students must be able to view previous exam attempts including:

Date taken

Subjects chosen

Scores

Total marks

14. Anti-Cheating Mechanisms

The system must implement the following safeguards:

Server-controlled exam timer
Automatic exam submission if timer expires
Randomised question order
Session locking to prevent multiple simultaneous exams

15. System Architecture

The system will follow a modern web application architecture.

Frontend

Built using:

React or

Next.js

Responsibilities:

user interface

exam interface

navigation

timer display

Backend

Built using:

Node.js

Express.js

Responsibilities:

authentication

exam session management

AI question generation

scoring engine

Database

Use:

PostgreSQL

16. Database Schema
Users Table

user_id
name
email
password
created_at

ExamSessions Table

exam_id
user_id
start_time
end_time

Answers Table

answer_id
exam_id
question_number
selected_option

Results Table

result_id
exam_id
subject
score

17. AI Question Generator Module

This module generates exam questions automatically.

Inputs:

subject

topic

difficulty level

Outputs:

question

four options

correct answer

18. API Design
Authentication

POST /register
POST /login

Exam System

POST /start-exam
GET /exam-questions
POST /submit-answer
POST /submit-exam

Results

GET /exam-results
GET /exam-history

19. Performance Requirements

The system must support:

10,000 concurrent users

real-time exam timers

fast response times under heavy load

20. Security Requirements

Passwords must be hashed using bcrypt.

JWT authentication must secure all endpoints.

Input validation must prevent malicious data submission.

21. Scalability Strategy

Future scaling will involve:

load balancing

microservices architecture

caching using Redis

distributed database replication

22. Deployment Infrastructure

Recommended cloud providers:

Amazon Web Services

Google Cloud

Microsoft Azure

23. Development Milestones
Phase 1 — System Design

Architecture
Database design
API planning

Phase 2 — Backend Development

Authentication system
Exam engine
AI question generator

Phase 3 — Frontend Development

User dashboard
Exam interface
Results page

Phase 4 — Testing

Functional testing
Load testing
Security testing

Phase 5 — Deployment

Production environment setup
Monitoring
Maintenance

24. Future Enhancements

Mobile app version
Offline practice mode
AI study recommendations
Student leaderboards
Tutor dashboards