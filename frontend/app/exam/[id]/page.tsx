'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Clock, 
  Layers, 
  CheckCircle2, 
  BookOpen,
  Monitor
} from 'lucide-react';
import styles from '../../../styles/ExamInterface.module.css';
import Logo from '../../../components/Logo';

// Mock generator for 45 questions per subject
const generateMockQuestions = (subject: string, startId: number) => {
  return Array.from({ length: 45 }).map((_, i) => ({
    id: startId + i,
    question_number: i + 1,
    subject: subject,
    topic: 'General Assessment',
    question_text: `This is a sample question ${i + 1} for ${subject}. Solve for X or choose the most appropriate answer based on the JAMB syllabus.`,
    options: { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' },
    correct_answer: 'A'
  }));
};

export default function ExamInterface({ params }: { params: { id: string } }) {
    const subjects = ['English Language', 'Mathematics', 'Physics', 'Chemistry'];
    const [activeSubjectIdx, setActiveSubjectIdx] = useState(0);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0); // Index within the subject
    
    // Store questions organized by subject
    const [questionsMap] = useState<Record<string, any[]>>({
        'English Language': generateMockQuestions('English Language', 1),
        'Mathematics': generateMockQuestions('Mathematics', 46),
        'Physics': generateMockQuestions('Physics', 91),
        'Chemistry': generateMockQuestions('Chemistry', 136),
    });

    const [answers, setAnswers] = useState<Record<string, string>>({}); // Key: Subject-QNum
    const [timeLeft, setTimeLeft] = useState(120 * 60);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPalette, setShowPalette] = useState(true);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setTimeout(() => {
            window.location.href = `/results/${params.id}`;
        }, 2000);
    };

    const handleAnswerSelect = (option: string) => {
        const currentSub = subjects[activeSubjectIdx];
        const qNum = questionsMap[currentSub][currentQuestionIdx].question_number;
        setAnswers(prev => ({
            ...prev,
            [`${currentSub}-${qNum}`]: option
        }));
    };

    const currentQuestions = questionsMap[subjects[activeSubjectIdx]];
    const currentQ = currentQuestions[currentQuestionIdx];

    return (
        <div className={styles.examWrapper}>
            {/* Premium Exam Header */}
            <header className={`${styles.examHeader} glass-dark`}>
                <div className={styles.headerLeft}>
                    <div className={styles.jambLogo}>
                       <Logo size={28} color="white" animated={false} />
                       <span>STRONG TOWER CBT</span>
                    </div>
                </div>

                <div className={styles.headerCenter}>
                    <div className={`${styles.timerDisplay} ${timeLeft < 300 ? styles.timerUrgent : ''}`}>
                       <Clock size={20} />
                       <span>{formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className={styles.headerRight}>
                    <button 
                       className="btn btn-primary" 
                       onClick={handleSubmit} 
                       disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : <><Send size={18} /> Finish Exam</>}
                    </button>
                </div>
            </header>

            {/* Subject Tabs Navigation */}
            <div className={styles.subjectNavBar}>
                {subjects.map((sub, idx) => (
                    <button 
                        key={sub}
                        onClick={() => {
                            setActiveSubjectIdx(idx);
                            setCurrentQuestionIdx(0);
                        }}
                        className={`${styles.subjectTab} ${activeSubjectIdx === idx ? styles.activeTab : ''}`}
                    >
                        {sub}
                        {activeSubjectIdx === idx && <motion.div layoutId="tabUnderline" className={styles.tabUnderline} />}
                    </button>
                ))}
            </div>

            <div className={styles.examLayout}>
                {/* Main Content Area */}
                <main className={styles.questionMain}>
                    <div className={styles.questionContainer}>
                        <motion.div 
                          key={`${activeSubjectIdx}-${currentQuestionIdx}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={styles.questionCard}
                        >
                            <div className={styles.questionMetadata}>
                                <span className={styles.qSub}>{subjects[activeSubjectIdx]}</span>
                                <span className={styles.qNum}>Question {currentQ.question_number} of 45</span>
                            </div>

                            <p className={styles.questionText}>
                                {currentQ.question_text}
                            </p>

                            <div className={styles.optionsGrid}>
                                {Object.entries(currentQ.options).map(([key, value]: [string, string]) => (
                                    <motion.button
                                        key={key}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => handleAnswerSelect(key)}
                                        className={`${styles.optionBtn} ${answers[`${subjects[activeSubjectIdx]}-${currentQ.question_number}`] === key ? styles.optionSelected : ''} glass`}
                                    >
                                        <div className={styles.optionKey}>{key}</div>
                                        <div className={styles.optionValue}>{value}</div>
                                        {answers[`${subjects[activeSubjectIdx]}-${currentQ.question_number}`] === key && (
                                            <CheckCircle2 className={styles.checkIcon} size={20} />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <footer className={styles.examFooter}>
                        <div className={styles.navButtons}>
                            <button 
                               className={styles.pillsBtn}
                               onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                               disabled={currentQuestionIdx === 0}
                            >
                                <ChevronLeft size={20} /> Previous
                            </button>
                            
                            <div className={styles.examProgress}>
                               <div className={styles.progressLabel}>
                                   {subjects[activeSubjectIdx]} Progress: {currentQuestionIdx + 1} / 45
                               </div>
                               <div className={styles.miniProgressBar}>
                                  <motion.div 
                                    className={styles.miniProgressFill}
                                    style={{ width: `${((currentQuestionIdx + 1) / 45) * 100}%` }}
                                  />
                               </div>
                            </div>

                            <button 
                               className={styles.pillsBtn}
                               onClick={() => setCurrentQuestionIdx(prev => Math.min(currentQuestions.length - 1, prev + 1))}
                               disabled={currentQuestionIdx === currentQuestions.length - 1}
                            >
                                Next <ChevronRight size={20} />
                            </button>
                        </div>
                    </footer>
                </main>

                {/* Right Question Palette */}
                <AnimatePresence>
                    {showPalette && (
                        <motion.aside 
                           initial={{ x: 300 }}
                           animate={{ x: 0 }}
                           exit={{ x: 300 }}
                           className={`${styles.questionPalette} glass-dark`}
                        >
                            <div className={styles.paletteHeader}>
                                <h3>{subjects[activeSubjectIdx]} Palette</h3>
                                <button onClick={() => setShowPalette(false)} className={styles.toggleBtn}>
                                   <Layers size={18} />
                                </button>
                            </div>

                            <div className={styles.paletteGrid}>
                                {currentQuestions.map((q, i) => {
                                    const isAnswered = answers[`${subjects[activeSubjectIdx]}-${q.question_number}`];
                                    const isCurrent = currentQuestionIdx === i;
                                    
                                    return (
                                        <button 
                                            key={q.id}
                                            onClick={() => setCurrentQuestionIdx(i)}
                                            className={`${styles.paletteBtn} ${isAnswered ? styles.qAnswered : ''} ${isCurrent ? styles.qCurrent : ''}`}
                                        >
                                            {q.question_number}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className={styles.paletteLegend}>
                               <div className={styles.legendItem}><div className={`${styles.dot} ${styles.dotCurrent}`}></div> Current</div>
                               <div className={styles.legendItem}><div className={`${styles.dot} ${styles.dotAnswered}`}></div> Answered</div>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
