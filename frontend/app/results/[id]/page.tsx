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
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
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
  const results = [
    { subject: 'English Language', score: 52, total: 60, color: '#1F3A8A' },
    { subject: 'Mathematics', score: 32, total: 40, color: '#10B981' },
    { subject: 'Physics', score: 28, total: 40, color: '#F97316' },
    { subject: 'Chemistry', score: 31, total: 40, color: '#8B5CF6' },
  ];

  const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);
  const totalPossible = results.reduce((acc, curr) => acc + curr.total, 0);
  const overallPercentage = (totalScore / totalPossible) * 100;

  return (
    <div className={styles.resultsWrapper}>
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
              <Logo size={40} color="white" animated={true} />
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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
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
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </svg>
                <div className={styles.scoreText}>
                   <span className={styles.scoreVal}>{totalScore}</span>
                   <span className={styles.scoreMax}>/ {totalPossible}</span>
                </div>
             </div>
             <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 1 }}
               className={styles.scoreFeedback}
             >
                <div className={styles.feedbackBadge}>
                   <Trophy size={16} /> Ready for Success
                </div>
                <h2>Excellent Performance!</h2>
                <p>You are in the top 2% of mock participants this week. Keep maintaining this consistency.</p>
             </motion.div>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className={styles.statsGrid}>
             <StatCard icon={Target} label="Accuracy" value="88.2%" color="#10B981" delay={1.2} />
             <StatCard icon={Zap} label="Efficiency" value="1.2m/q" color="#F97316" delay={1.3} />
             <StatCard icon={TrendingUp} label="Improvement" value="+5.4pts" color="#1F3A8A" delay={1.4} />
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + idx * 0.1 }}
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
                        transition={{ duration: 1.5, delay: 2 + idx * 0.1 }}
                      />
                   </div>
                </div>

                <button className={styles.reviewBtn}>
                   Review Answers <ChevronRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

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
