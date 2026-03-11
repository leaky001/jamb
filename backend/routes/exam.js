const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Start new mock exam
router.post('/start', examController.startExam);

// Auto-save individual answer
router.post('/submit-answer', examController.submitAnswer);

// Final exam submission
router.post('/submit-exam', examController.submitExam);

module.exports = router;
