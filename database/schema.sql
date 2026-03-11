-- Strong Tower Mock JAMB CBT Database Schema

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ExamSessions Table
-- Statuses: 'ongoing', 'completed', 'expired'
CREATE TABLE exam_sessions (
    exam_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    subjects JSONB NOT NULL, -- list of 4 subjects (including English)
    start_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_duration_minutes INTEGER DEFAULT 120, -- 2 hours
    status VARCHAR(20) DEFAULT 'ongoing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions Table (Generated per exam session or pulled from a pool)
-- This table stores questions uniquely for each exam session to allow for session-specific randomization.
CREATE TABLE session_questions (
    question_id SERIAL PRIMARY KEY,
    exam_id INTEGER REFERENCES exam_sessions(exam_id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer CHAR(1) NOT NULL, -- 'A', 'B', 'C', or 'D'
    question_number INTEGER NOT NULL, -- 1 to 180 total
    UNIQUE (exam_id, question_number)
);

-- User Answers Table
CREATE TABLE answers (
    answer_id SERIAL PRIMARY KEY,
    exam_id INTEGER REFERENCES exam_sessions(exam_id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES session_questions(question_id) ON DELETE CASCADE,
    selected_option CHAR(1), -- 'A', 'B', 'C', or 'D'
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (exam_id, question_id)
);

-- Results Table
CREATE TABLE results (
    result_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    exam_id INTEGER REFERENCES exam_sessions(exam_id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    score INTEGER NOT NULL,
    total_possible INTEGER NOT NULL,
    percentage_score DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_exam_user ON exam_sessions(user_id);
CREATE INDEX idx_questions_exam ON session_questions(exam_id);
CREATE INDEX idx_answers_exam ON answers(exam_id);
CREATE INDEX idx_results_user ON results(user_id);
