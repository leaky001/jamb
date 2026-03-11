const pool = require('../db'); // Assume pg pool is exported from db.js
const { generateFullExam } = require('../services/aiGenerator');

/**
 * Start a new exam session
 */
exports.startExam = async (req, res) => {
    const { userId, selectedSubjects } = req.body;

    try {
        // 1. Create session in DB
        const sessionResult = await pool.query(
            'INSERT INTO exam_sessions (user_id, subjects, start_time, status) VALUES ($1, $2, CURRENT_TIMESTAMP, $3) RETURNING *',
            [userId, JSON.stringify(selectedSubjects), 'ongoing']
        );
        const session = sessionResult.rows[0];

        // 2. Generate AI Questions - Step 4
        const questions = await generateFullExam(selectedSubjects);

        // 3. Save questions to session_questions table
        const insertPromises = questions.map(q => {
            return pool.query(
                `INSERT INTO session_questions 
                (exam_id, subject, question_text, option_a, option_b, option_c, option_d, correct_answer, question_number) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [session.exam_id, q.subject, q.question_text, q.options.A, q.options.B, q.options.C, q.options.D, q.correct_answer, q.question_number]
            );
        });
        await Promise.all(insertPromises);

        res.status(201).json({ 
            message: 'Exam started successfully', 
            examId: session.exam_id,
            durationMinutes: session.total_duration_minutes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to start exam session' });
    }
};

/**
 * Handle individual answer submission (Auto-save)
 */
exports.submitAnswer = async (req, res) => {
    const { examId, questionId, selectedOption } = req.body;

    try {
        // Check timer - Step 7
        const sessionResult = await pool.query('SELECT start_time, total_duration_minutes FROM exam_sessions WHERE exam_id = $1', [examId]);
        const session = sessionResult.rows[0];
        const elapsedMinutes = (new Date() - new Date(session.start_time)) / 1000 / 60;

        if (elapsedMinutes > session.total_duration_minutes) {
            return res.status(403).json({ error: 'Exam time has expired', autoSubmit: true });
        }

        await pool.query(
            'INSERT INTO answers (exam_id, question_id, selected_option) VALUES ($1, $2, $3) ON CONFLICT (exam_id, question_id) DO UPDATE SET selected_option = $3, updated_at = CURRENT_TIMESTAMP',
            [examId, questionId, selectedOption]
        );

        res.status(200).json({ status: 'saved' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save answer' });
    }
};

/**
 * Final Exam Submission and Scoring - Step 8
 */
exports.submitExam = async (req, res) => {
    const { examId } = req.body;

    try {
        // 1. Fetch all questions and user answers for this session
        const data = await pool.query(`
            SELECT 
                sq.subject, 
                sq.correct_answer, 
                a.selected_option
            FROM session_questions sq
            LEFT JOIN answers a ON sq.question_id = a.question_id
            WHERE sq.exam_id = $1
        `, [examId]);

        const rows = data.rows;
        
        // 2. Calculate scores per subject
        const scores = {};
        const subjectTotals = { 'English': 60 }; // English is default 60
        // ... (Logic to determine totals for other subjects)

        rows.forEach(row => {
            if (!scores[row.subject]) {
                scores[row.subject] = 0;
                if (row.subject !== 'English') subjectTotals[row.subject] = 40;
            }
            if (row.selected_option === row.correct_answer) {
                scores[row.subject]++;
            }
        });

        // 3. Save Results to DB
        const resultPromises = Object.keys(scores).map(subject => {
            const score = scores[subject];
            const total = subjectTotals[subject];
            const percentage = (score / total) * 100;

            return pool.query(
                'INSERT INTO results (exam_id, subject, score, total_possible, percentage_score) VALUES ($1, $2, $3, $4, $5)',
                [examId, subject, score, total, percentage]
            );
        });
        await Promise.all(resultPromises);

        // 4. Update session status
        await pool.query('UPDATE exam_sessions SET status = $1 WHERE exam_id = $2', ['completed', examId]);

        res.status(200).json({ message: 'Exam submitted and scored', scores });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process exam results' });
    }
};
