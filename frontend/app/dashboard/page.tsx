'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  CheckCircle, 
  Settings, 
  LogOut, 
  Award,
  Clock,
  LayoutDashboard,
  History,
  TrendingUp,
  User,
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

const SidebarItem = ({ icon: Icon, label, active = false, onClick, isYellow }: any) => (
  <motion.button 
    whileHover={{ x: 5 }}
    onClick={onClick}
    className={`${styles.sidebarItem} ${active ? (isYellow ? styles.activeSidebarItemYellow : styles.activeSidebarItem) : ''}`}
  >
    <Icon size={20} style={{ color: active && isYellow ? 'white' : undefined }} />
    <span style={{ color: active && isYellow ? 'white' : undefined }}>{label}</span>
    {active && <motion.div layoutId="activePill" className={`${styles.activePill} ${isYellow ? styles.activePillYellow : ''}`} />}
  </motion.button>
);

export default function Dashboard() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'history' | 'performance'>('dashboard');
  const [examHistory, setExamHistory] = useState<any[]>([]);
  const [isYellowTheme, setIsYellowTheme] = useState(false);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('isYellowTheme');
    if (savedTheme === 'true') setIsYellowTheme(true);
  }, []);

  const toggleTheme = () => {
    const newVal = !isYellowTheme;
    setIsYellowTheme(newVal);
    localStorage.setItem('isYellowTheme', newVal.toString());
  };

  React.useEffect(() => {
    // Load history from localStorage
    const history = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('exam_results_')) {
        const rawData = localStorage.getItem(key);
        if (!rawData) continue;
        
        try {
          const parsed = JSON.parse(rawData);
          const results = Array.isArray(parsed) ? parsed : (parsed.results || []);
          
          let dateStr = "";
          if (Array.isArray(parsed)) {
            dateStr = new Date().toLocaleDateString();
          } else if (parsed.date) {
            const d = new Date(parsed.date);
            dateStr = isNaN(d.getTime()) ? new Date().toLocaleDateString() : d.toLocaleDateString();
          } else {
            dateStr = new Date().toLocaleDateString();
          }

          const time = (Array.isArray(parsed) || !parsed.date) ? '' : new Date(parsed.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          const totalScore = results.reduce((acc: number, curr: any) => acc + (curr.score || 0), 0);
          const totalPossible = results.reduce((acc: number, curr: any) => acc + (curr.total || 0), 0);
          
          history.push({
            id: key.replace('exam_results_', ''),
            date: `${dateStr} ${time}`.trim(),
            score: totalScore,
            total: totalPossible,
            subjects: results.map((r: any) => r.subject).filter(Boolean),
            rawResults: results
          });
        } catch (e) {
          console.error("Error parsing exam result:", e);
        }
      }
    }
    // Sort history by ID/Date (newest first)
    history.sort((a, b) => b.id.localeCompare(a.id));
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
    <div className={`${styles.dashboardLayout} ${isYellowTheme ? styles.lightModeYellow : ''}`}>
      <aside className={`${styles.sidebar} ${isYellowTheme ? styles.sidebarLight : 'glass-dark'}`}>
        <div className={styles.sidebarBrand} onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
          <Logo size={32} color={isYellowTheme ? "#111" : "white"} animated={false} />
          <span>Strong Tower</span>
        </div>

        <nav className={styles.sidebarNav}>
          <div className={styles.navGroup}>
            <p className={styles.navGroupLabel}>Menu</p>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} isYellow={isYellowTheme} />
            <SidebarItem icon={History} label="Exam History" active={currentView === 'history'} onClick={() => setCurrentView('history')} isYellow={isYellowTheme} />
            <SidebarItem icon={TrendingUp} label="Performance" active={currentView === 'performance'} onClick={() => setCurrentView('performance')} isYellow={isYellowTheme} />
          </div>

          <div className={styles.navGroup}>
            <p className={styles.navGroupLabel}>Settings</p>
            <SidebarItem icon={User} label="Profile" isYellow={isYellowTheme} />
            <SidebarItem icon={Settings} label="Preferences" isYellow={isYellowTheme} />
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.themeToggleArea}>
             <span>Yellow & White</span>
             <div 
               className={`${styles.toggleSwitch} ${isYellowTheme ? styles.toggleActive : ''}`}
               onClick={toggleTheme}
             >
                <motion.div 
                  animate={{ x: isYellowTheme ? 22 : 0 }}
                  className={styles.toggleKnob}
                />
             </div>
          </div>
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
                      <div className={styles.analyticValue}>
                         {(() => {
                            const total = examHistory.reduce((a,b)=>a+(b.total||0),0);
                            const score = examHistory.reduce((a,b)=>a+(b.score||0),0);
                            return total > 0 ? Math.round((score / total) * 100) : 0;
                         })()}%
                       </div>
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
                     <div className={styles.subjectStatsList}>
                        {(() => {
                          const stats: Record<string, {score: number, total: number}> = {};
                          examHistory.forEach(session => {
                            if (!session.rawResults) return;
                            session.rawResults.forEach((r: any) => {
                              if (!r.subject) return;
                              if (!stats[r.subject]) stats[r.subject] = {score: 0, total: 0};
                              stats[r.subject].score += (r.score || 0);
                              stats[r.subject].total += (r.total || 0);
                            });
                          });

                          return Object.entries(stats).map(([subj, data]) => {
                            const percent = data.total > 0 ? Math.round((data.score / data.total) * 100) : 0;
                            return (
                              <div key={subj} className={styles.subjectStatRow}>
                                <div className={styles.subjName}>{subj}</div>
                                <div className={styles.subjBarTrack}>
                                  <motion.div 
                                    className={styles.subjBarFill} 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    style={{ background: subj === 'English Language' ? '#1F3A8A' : subj === 'Mathematics' ? '#10B981' : subj === 'Physics' ? '#F97316' : '#8B5CF6' }}
                                  />
                                </div>
                                <div className={styles.subjPercent}>{percent}%</div>
                              </div>
                            );
                          });
                        })()}
                        {examHistory.length === 0 && <p>No data available yet. Complete an exam to see your subject breakdown.</p>}
                     </div>
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
