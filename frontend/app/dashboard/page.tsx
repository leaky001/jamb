'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  CheckCircle, 
  Play, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Sparkles,
  Award,
  Clock,
  LayoutDashboard,
  History,
  TrendingUp,
  User,
  RotateCcw,
  Calculator,
  Atom,
  FlaskConical as Beaker,
  Dna,
  Flag,
  Globe,
  Briefcase,
  BookOpen,
  Target,
  Zap
} from 'lucide-react';
import styles from '../../styles/Dashboard.module.css';
import Logo from '../../components/Logo';

const AVAILABLE_SUBJECTS = [
  { id: 'math', name: 'Mathematics', desc: 'Algebra, Geometry, Calculus', students: '45k+', icon: Calculator },
  { id: 'phys', name: 'Physics', desc: 'Mechanics, Optics, Electricity', students: '32k+', icon: Atom },
  { id: 'chem', name: 'Chemistry', desc: 'Organic, Inorganic, Physical', students: '28k+', icon: Beaker },
  { id: 'bio', name: 'Biology', desc: 'Genetics, Ecology, Physiology', students: '51k+', icon: Dna },
  { id: 'econ', name: 'Economics', desc: 'Micro, Macro, Applied', students: '18k+', icon: TrendingUp },
  { id: 'govt', name: 'Government', desc: 'Political Systems, Constitution', students: '12k+', icon: Flag },
  { id: 'lit', name: 'Literature in English', desc: 'Drama, Prose, Poetry', students: '15k+', icon: BookOpen },
  { id: 'geo', name: 'Geography', desc: 'Physical, Human, Regional', students: '9k+', icon: Globe },
  { id: 'comm', name: 'Commerce', desc: 'Trade, Finance, Marketing', students: '7k+', icon: Briefcase }
];

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: any) => (
  <motion.button 
    whileHover={{ x: 5 }}
    onClick={onClick}
    className={`${styles.sidebarItem} ${active ? styles.activeSidebarItem : ''}`}
  >
    <Icon size={20} />
    <span>{label}</span>
    {active && <motion.div layoutId="activePill" className={styles.activePill} />}
  </motion.button>
);

export default function Dashboard() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'history' | 'performance'>('dashboard');
  const [examHistory, setExamHistory] = useState<any[]>([]);

  React.useEffect(() => {
    // Load history from localStorage
    const history = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('exam_results_')) {
        const results = JSON.parse(localStorage.getItem(key) || '[]');
        const totalScore = results.reduce((acc: number, curr: any) => acc + curr.score, 0);
        const totalPossible = results.reduce((acc: number, curr: any) => acc + curr.total, 0);
        history.push({
          id: key.replace('exam_results_', ''),
          date: new Date().toLocaleDateString(), // Mock date for now
          score: totalScore,
          total: totalPossible,
          subjects: results.map((r: any) => r.subject)
        });
      }
    }
    setExamHistory(history);
  }, []);

  const toggleSubject = (subjectName: string) => {
    if (selectedSubjects.includes(subjectName)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subjectName));
    } else {
      if (selectedSubjects.length < 3) {
        setSelectedSubjects([...selectedSubjects, subjectName]);
      }
    }
  };

  const handleStartExam = () => {
    if (selectedSubjects.length !== 3) return;
    setIsStarting(true);
    setTimeout(() => {
      window.location.href = '/exam/1'; 
    }, 1500);
  };

  return (
    <div className={styles.dashboardLayout}>
      <aside className={`${styles.sidebar} glass-dark`}>
        <div className={styles.sidebarBrand}>
          <Logo size={32} color="white" animated={false} />
          <span>Strong Tower</span>
        </div>

        <nav className={styles.sidebarNav}>
          <div className={styles.navGroup}>
            <p className={styles.navGroupLabel}>Menu</p>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
            <SidebarItem icon={History} label="Exam History" active={currentView === 'history'} onClick={() => setCurrentView('history')} />
            <SidebarItem icon={TrendingUp} label="Performance" active={currentView === 'performance'} onClick={() => setCurrentView('performance')} />
          </div>

          <div className={styles.navGroup}>
            <p className={styles.navGroupLabel}>Settings</p>
            <SidebarItem icon={User} label="Profile" />
            <SidebarItem icon={Settings} label="Preferences" />
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn}>
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className={styles.mainContainer}>
        <header className={styles.header}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.headerTitle}
          >
            <h1>{currentView === 'dashboard' ? 'Mock Exam Portal' : currentView === 'history' ? 'Exam Registry' : 'Analytics Center'}</h1>
            <p>{currentView === 'dashboard' ? 'Select your subjects and begin your practice session.' : currentView === 'history' ? 'A complete log of your previous mock simulations.' : 'In-depth breakdown of your academic progress.'}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.headerActions}
          >
             <div className={styles.currentExamBadge}>
                <Clock size={16} />
                <span>Next Window: 24h</span>
             </div>
             <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>OA</div>
             </div>
          </motion.div>
        </header>

        <section className={styles.contentGrid}>
           <AnimatePresence mode="wait">
             {currentView === 'dashboard' && (
               <motion.div 
                 key="dashboard"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
               >
                 <div className={`${styles.welcomeHero} glass`}>
                   <div className={styles.heroText}>
                     <Award className={styles.heroIcon} size={48} />
                     <h2>Ready for your Mock?</h2>
                     <p>Simulate the actual JAMB environment. English + 3 electives.</p>
                   </div>
                   <div className={styles.heroStats}>
                     <div className={styles.miniStat}>
                        <span className={styles.statVal}>{examHistory.length > 0 ? Math.round(examHistory.reduce((a,b)=>a+b.score,0)/examHistory.reduce((a,b)=>a+b.total,0)*100) : 0}%</span>
                        <span className={styles.statLabel}>Avg Score</span>
                     </div>
                   </div>
                 </div>

                 <div className={styles.selectionSection}>
                   <div className={styles.sectionHeader}>
                     <div className={styles.headerLeft}>
                       <h2>Subject Selection</h2>
                       <p>Choose 3 subjects to proceed</p>
                     </div>
                     <div className={styles.selectionProgress}>
                       <span className={styles.count}>{selectedSubjects.length} / 3</span>
                       <div className={styles.progressTrack}>
                          <motion.div 
                            className={styles.progressFill}
                            animate={{ width: `${(selectedSubjects.length / 3) * 100}%` }}
                          />
                       </div>
                     </div>
                   </div>

                   <div className={styles.subjectGrid}>
                     <div className={`${styles.subjectCard} ${styles.compulsoryCard} glass`}>
                        <div className={styles.subjectIconWrapper}>
                           <Book size={24} />
                        </div>
                        <div className={styles.subjectInfo}>
                           <span className={styles.subjectStatus}>Required</span>
                           <h3>English Language</h3>
                           <p>60 Questions • Standard</p>
                        </div>
                        <CheckCircle className={styles.checkActive} size={24} />
                     </div>

                     {AVAILABLE_SUBJECTS.map((sub, i) => (
                       <motion.div 
                         key={sub.id}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: i * 0.05 }}
                         whileHover={{ y: -5 }}
                         onClick={() => toggleSubject(sub.name)}
                         className={`${styles.subjectCard} ${selectedSubjects.includes(sub.name) ? styles.selectedCard : ''} glass`}
                       >
                         <div className={styles.subjectIconWrapper}>
                           <sub.icon size={24} />
                         </div>
                         <div className={styles.subjectInfo}>
                           <span className={styles.studentsCount}>{sub.students} Enrolled</span>
                           <h3>{sub.name}</h3>
                           <p>{sub.desc}</p>
                         </div>
                         <AnimatePresence>
                           {selectedSubjects.includes(sub.name) && (
                             <motion.div 
                               initial={{ scale: 0 }}
                               animate={{ scale: 1 }}
                               exit={{ scale: 0 }}
                               className={styles.activeCheck}
                             >
                               <CheckCircle size={24} />
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </motion.div>
                     ))}
                   </div>
                 </div>
               </motion.div>
             )}

             {currentView === 'history' && (
               <motion.div 
                 key="history"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className={styles.historyContainer}
               >
                 {examHistory.length === 0 ? (
                   <div className={styles.emptyState}>
                     <History size={60} />
                     <h3>No Exam History Yet</h3>
                     <p>All your mock exam results will appear here once you complete them.</p>
                     <button className="btn btn-primary" onClick={() => setCurrentView('dashboard')}>Take Your First Mock</button>
                   </div>
                 ) : (
                   <div className={styles.historyList}>
                     {examHistory.map((item, idx) => (
                       <div key={idx} className={`${styles.historyCard} glass`}>
                         <div className={styles.historyMain}>
                           <div className={styles.historyInfo}>
                             <h4>Mock Session #{item.id}</h4>
                             <p>{item.subjects.join(' • ')}</p>
                           </div>
                           <div className={styles.historyScore}>
                             <span className={styles.scoreVal}>{item.score}/{item.total}</span>
                             <span className={styles.percentage}>{Math.round((item.score/item.total)*100)}%</span>
                           </div>
                         </div>
                         <button className={styles.viewResultBtn} onClick={() => window.location.href = `/results/${item.id}`}>View In-depth Result</button>
                       </div>
                     ))}
                   </div>
                 )}
               </motion.div>
             )}

             {currentView === 'performance' && (
               <motion.div 
                 key="performance"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className={styles.performanceContainer}
               >
                 <div className={styles.analyticsGrid}>
                   <div className={`${styles.analyticCard} glass`}>
                      <Target size={32} />
                      <h3>Core Accuracy</h3>
                      <div className={styles.analyticValue}>{examHistory.length > 0 ? Math.round(examHistory.reduce((a,b)=>a+b.score,0)/examHistory.reduce((a,b)=>a+b.total,0)*100) : 0}%</div>
                      <p>Global ranking: Top 15%</p>
                   </div>
                   <div className={`${styles.analyticCard} glass`}>
                      <Zap size={32} />
                      <h3>Consistency</h3>
                      <div className={styles.analyticValue}>{examHistory.length} Sessions</div>
                      <p>3 weeks active streak</p>
                   </div>
                 </div>
                 
                 <div className={`${styles.subjectPerformance} glass`}>
                    <h3>Performance by Subject</h3>
                    <p>Coming soon: Detailed topic-wise breakdown based on your AI-generated questions.</p>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </section>


        <AnimatePresence>
          {selectedSubjects.length === 3 && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className={`${styles.floatingAction} glass-dark`}
            >
              <div className={styles.actionInfo}>
                <p>Ready to start? Total questions: <strong>180</strong></p>
                <span>English Language + {selectedSubjects.join(', ')}</span>
              </div>
              <button 
                className="btn btn-primary"
                onClick={handleStartExam}
                disabled={isStarting}
              >
                {isStarting ? "Generating..." : "Begin Simulation"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
