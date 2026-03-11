/**
 * AI Question Generation System
 * For Strong Tower Mock JAMB CBT Platform
 */

const SYLLABUS_METADATA = {
    english: {
        topics: ['grammar', 'vocabulary', 'comprehension', 'sentence correction', 'synonyms', 'antonyms', 'novel'],
        totalRequired: 60
    },
    general_subjects: {
        totalRequired: 40
    }
};

/**
 * MOCK Questions Repository for Demonstration
 * In a production system, this module would call an LLM (like Google Gemini API) 
 * with the subject and syllabus topic to generate unique questions.
 */
const MOCK_QUESTION_BANK = {
    english: [
        {
            question_text: "Choose the option that is most nearly opposite in meaning to the underlined word: The professor's lecture was so *verbose* that many students fell asleep.",
            options: {
                A: "Concise",
                B: "Lengthy",
                C: "Explanatory",
                D: "Interesting"
            },
            correct_answer: "A",
            topic: "antonyms"
        },
        // ... imagine hundreds of these or a call to an LLM
    ],
    mathematics: [
        {
            question_text: "Simplify: (x^2 - 4) / (x - 2)",
            options: {
                A: "x + 4",
                B: "x - 2",
                C: "x + 2",
                D: "x^2 + 2"
            },
            correct_answer: "C",
            topic: "algebra"
        }
    ]
};

/**
 * In a real scenario, this would be an async call to an LLM. 
 * For this implementation, we will generate structural questions 
 * based on provided patterns or pull from the bank.
 */
const generateQuestionsForSubject = async (subject, count) => {
    // This is where the AI logic lives.
    // For demonstration, we will return some hardcoded questions 
    // and randomly generate placeholders if the bank is empty.
    
    let subjectQuestions = [];
    const baseBank = MOCK_QUESTION_BANK[subject.toLowerCase()] || [];
    
    for (let i = 1; i <= count; i++) {
        const template = baseBank[i % baseBank.length] || {
            question_text: `Demo Question for ${subject} - Topic X, Part ${i}. Which of these is correct?`,
            options: {
                A: `Option A for ${subject} Q${i}`,
                B: `Option B for ${subject} Q${i}`,
                C: `Option C for ${subject} Q${i}`,
                D: `Option D for ${subject} Q${i}`
            },
            correct_answer: "A"
        };

        subjectQuestions.push({
            subject,
            ...template
        });
    }

    return subjectQuestions;
};

/**
 * Generates a full exam session questions (180 total)
 */
const generateFullExam = async (selectedSubjects) => {
    // Logic: English (60) + 3 subjects (40 each) = 180 total
    const subjects = ['English', ...selectedSubjects];
    let allQuestions = [];
    let currentQuestionNumber = 1;

    for (const subject of subjects) {
        const count = subject === 'English' ? 60 : 40;
        const subjectQuestions = await generateQuestionsForSubject(subject, count);
        
        // Assign question numbers
        const questionsWithNumbers = subjectQuestions.map(q => ({
            ...q,
            question_number: currentQuestionNumber++
        }));

        allQuestions = [...allQuestions, ...questionsWithNumbers];
    }

    return allQuestions;
};

module.exports = {
    generateFullExam
};
