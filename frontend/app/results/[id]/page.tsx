'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  ArrowLeft, 
  RotateCcw, 
  BarChart3, 
  Target, 
  Zap, 
  TrendingUp,
  Award,
  ChevronRight,
  Share2
} from 'lucide-react';
import styles from '../../../styles/Results.module.css';
import Logo from '../../../components/Logo';

const StatCard = ({ icon: Icon, label, value, color, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
    className={`${styles.statCard} glass`}
  >
    <div className={styles.statIcon} style={{ color }}>
      <Icon size={24} />
    </div>
    <div className={styles.statInfo}>
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  </motion.div>
);

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [results, setResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [isYellowTheme, setIsYellowTheme] = React.useState(false);

  React.useEffect(() => {
    const savedData = localStorage.getItem(`exam_results_${params.id}`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setResults(Array.isArray(parsed) ? parsed : parsed.results);
    } else {
      setResults([
        { subject: 'English Language', score: 0, total: 60, color: '#1F3A8A' },
        { subject: 'Mathematics', score: 0, total: 40, color: '#10B981' },
        { subject: 'Physics', score: 0, total: 40, color: '#F97316' },
        { subject: 'Chemistry', score: 0, total: 40, color: '#8B5CF6' },
      ]);
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('isYellowTheme');
    if (savedTheme === 'true') setIsYellowTheme(true);

    setLoading(false);
  }, [params.id]);

  const [showReview, setShowReview] = React.useState(false);
  
  const mockReviewData = [
    { 
      subject: "English Language",
      question: "Choose the option that is nearest in meaning to the underlined word: The professor's lecture was rather URBANE.", 
      userAnswer: "B", 
      correctAnswer: "A", 
      explanation: "Urbane means 'polished' or 'sophisticated'. Option B (Rude) is the opposite." 
    },
    { 
      subject: "Mathematics",
      question: "Find the value of x if 2x + 5 = 15.", 
      userAnswer: "5", 
      correctAnswer: "5", 
      explanation: "Subtract 5 from both sides: 2x = 10. Divide by 2: x = 5. Your answer is correct." 
    },
    { 
      subject: "Physics",
      question: "What is the SI unit of Force?", 
      userAnswer: "Newton", 
      correctAnswer: "Newton", 
      explanation: "The Newton (N) is the derived SI unit of force. You got it right!" 
    }
  ];

  const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);

  const totalPossible = results.reduce((acc, curr) => acc + curr.total, 0);
  const overallPercentage = totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0;

  if (loading) return <div className={styles.resultsWrapper} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Loading results...</div>;

  return (
    <div className={`${styles.resultsWrapper} ${isYellowTheme ? styles.lightModeYellow : ''}`}>
      {/* Background Decor */}
      <div className={styles.resultsBg}>
         <div className={styles.blobMain}></div>
         <div className={styles.blobSecondary}></div>
      </div>

      <main className={styles.resultsMain}>
        {/* Profile / Header Area */}
        <header className={styles.header}>
           <motion.div 
             initial={{ x: -20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className={styles.headerTitle}
           >
              <div className={styles.backBtn} onClick={() => window.location.href = '/dashboard'}>
                 <ArrowLeft size={20} />
              </div>
              <div 
                onClick={() => window.location.href = '/'} 
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <Logo size={40} color="white" animated={true} />
              </div>
              <div className={styles.titleText}>
                 <h1>Performance Insight</h1>
                 <p>Mock Exam ID: #{params.id || '240311-88'}</p>
              </div>
           </motion.div>
           <motion.div 
             initial={{ x: 20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className={styles.headerActions}
           >
              <button className={`${styles.shareBtn} glass`}><Share2 size={18} /> Share Results</button>
           </motion.div>
        </header>

        {/* Hero Score Visualization */}
        <section className={styles.scoreHero}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.scoreDisplay}
          >
             <div className={styles.scoreCircle}>
                <svg className={styles.circleSvg} viewBox="0 0 100 100">
                  <circle className={styles.circleBg} cx="50" cy="50" r="45" />
                  <motion.circle 
                    className={styles.circlePath} 
                    cx="50" cy="50" r="45"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: overallPercentage / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className={styles.scoreText}>
                   <span className={styles.scoreVal}>{totalScore}</span>
                   <span className={styles.scoreMax}>/ {totalPossible}</span>
                </div>
             </div>
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className={styles.scoreFeedback}
             >
                <div className={styles.feedbackBadge} style={{ background: overallPercentage >= 50 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: overallPercentage >= 50 ? 'var(--color-secondary)' : 'var(--color-danger)' }}>
                   <Trophy size={16} /> {overallPercentage >= 75 ? 'Distinction' : overallPercentage >= 50 ? 'Good Standing' : 'Keep Practicing'}
                </div>
                <h2>{overallPercentage >= 75 ? 'Excellent Performance!' : overallPercentage >= 50 ? 'Great Effort!' : 'Room for Growth'}</h2>
                <p>
                  {overallPercentage >= 75 
                    ? 'You are in the top 2% of mock participants this week. Keep maintaining this consistency.' 
                    : overallPercentage >= 50 
                    ? 'You have a solid grasp of the core concepts. A little more practice will push you to the top.' 
                    : 'Don\'t be discouraged. Review your corrections below and focus on your weaker areas.'}
                </p>
             </motion.div>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className={styles.statsGrid}>
             <StatCard icon={Target} label="Accuracy" value={`${overallPercentage.toFixed(1)}%`} color="#10B981" delay={0.2} />
             <StatCard icon={Zap} label="Efficiency" value="1.2m/q" color="#F97316" delay={0.3} />
             <StatCard icon={TrendingUp} label="Improvement" value="+5.4pts" color="#1F3A8A" delay={0.4} />
          </div>
        </section>

        {/* Detailed Breakdown */}
        <section className={styles.breakdownSection}>
          <div className={styles.sectionHeader}>
             <h2>Detailed Subject Analysis</h2>
             <p>A granular look at your performance per subject.</p>
          </div>

          <div className={styles.subjectList}>
            {results.map((res, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className={`${styles.subjectItem} glass`}
              >
                <div className={styles.itemSubject}>
                   <Award size={24} style={{ color: res.color }} />
                   <div className={styles.subjectMeta}>
                      <h3>{res.subject}</h3>
                      <span>{res.total} Questions</span>
                   </div>
                </div>

                <div className={styles.itemProgress}>
                   <div className={styles.progressLabel}>
                      <span>{Math.round((res.score / res.total) * 100)}%</span>
                      <strong>{res.score} / {res.total}</strong>
                   </div>
                   <div className={styles.track}>
                      <motion.div 
                        className={styles.fill} 
                        style={{ background: res.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(res.score / res.total) * 100}%` }}
                        transition={{ duration: 1, delay: 0.8 + idx * 0.1 }}
                      />
                   </div>
                </div>

                <button className={styles.reviewBtn} onClick={() => setShowReview(true)}>
                   Review Answers <ChevronRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {showReview && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.reviewModal}
          >
            <div className={styles.modalHeader}>
              <h2>Correction Detail</h2>
              <button onClick={() => setShowReview(false)} className={styles.closeBtn}>Close</button>
            </div>
            <div className={styles.reviewList}>
              {mockReviewData.map((item, i) => (
                <div key={i} className={styles.reviewItem}>
                  <p className={styles.reviewQ}><strong>Q{i+1}:</strong> {item.question}</p>
                  <div className={styles.reviewStatus}>
                    <p className={item.userAnswer === item.correctAnswer ? styles.correct : styles.wrong}>
                      Your Answer: {item.userAnswer}
                    </p>
                    {item.userAnswer !== item.correctAnswer && (
                      <p className={styles.correctVal}>Correct Answer: {item.correctAnswer}</p>
                    )}
                  </div>
                  <p className={styles.explanation}><em>Explanation:</em> {item.explanation}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}


        <footer className={styles.footerPanel}>
           <button className="btn btn-secondary" onClick={() => window.location.href = '/dashboard'}>
              <RotateCcw size={20} /> Retake Simulation
           </button>
           <button className="btn btn-primary" onClick={() => window.location.href = '/dashboard'}>
              Return to Dashboard <ChevronRight size={20} />
           </button>
        </footer>
      </main>
    </div>
  );
}
