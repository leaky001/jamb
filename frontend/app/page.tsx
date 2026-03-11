'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  LogIn, 
  UserPlus, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  BarChart3, 
  Layers, 
  Sparkles,
  BookOpen,
  Award,
  Users,
  Compass,
  CheckCircle,
  PlayCircle,
  Monitor,
  Layout
} from 'lucide-react';
import styles from '../styles/Auth.module.css';
import Logo from '../components/Logo';

// --- Sophisticated Infinite Motion Graphics Component ---
const SophisticatedHeroGraphics = () => {
  return (
    <div className={styles.sophisticatedGraphics}>
      <div className={styles.graphicsOrbit}>
        {/* Tiered Knowledge Pillar - The 'Strong Tower' symbol */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={styles.centralTower}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div 
              key={i}
              animate={{ 
                y: [0, -10, 0], 
                rotateY: [0, 360],
                opacity: [0.6, 1, 0.6] 
              }}
              transition={{ 
                y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 20 + i * 2, repeat: Infinity, ease: "linear" },
                opacity: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                width: `${140 - i * 30}px`,
                height: `${20 + i * 5}px`,
                bottom: `${i * 35}px`,
                backgroundColor: i % 2 === 0 ? '#1F3A8A' : '#10B981',
                borderRadius: '8px',
                position: 'absolute'
              }}
            />
          ))}
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
            className={styles.towerPeak}
          />
        </motion.div>

        {/* Orbiting Knowledge Nodes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute'
            }}
          >
            <motion.div 
              animate={{ rotate: [-0, -360] }}
              transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
              className={styles.nodeItem}
              style={{
                transform: `translateX(${180 + i * 15}px)`,
                backgroundColor: i % 2 === 0 ? '#1F3A8A' : '#10B981'
              }}
            >
              <Sparkles size={12} color="white" />
            </motion.div>
          </motion.div>
        ))}

        <div className={styles.perspectiveGrid}>
           {Array.from({ length: 12 }).map((_, i) => (
             <motion.div 
               key={i}
               className={styles.gridLine}
               animate={{ x: [-100, 100], opacity: [0, 0.3, 0] }}
               transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
               style={{ top: `${i * 10}%` }}
             />
           ))}
        </div>
      </div>
    </div>
  );
};

// --- Standard but Uncommon Animated Feature Card ---
const SophisticatedFeatureCard = ({ icon: Icon, title, description, delay }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        y: -15, 
        scale: 1.05,
      }}
      className={`${styles.sophisticatedCard} glass`}
    >
      <div className={styles.cardHeaderArea}>
        <div className={styles.cardIconBox}>
          <Icon size={28} />
        </div>
        <div className={styles.cardDecorativeLine}></div>
      </div>
      <div className={styles.cardContentArea}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

// --- Animated Scroll Section Component ---
const AnimatedScrollSection = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default function LandingPage() {
  // Advanced Scroll Parallax
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className={styles.pageWrapper}>
      <motion.div style={{ scaleX }} className={styles.progressBar} />
      
      <div className={styles.worldBackground}>
        <div className={styles.movingNebula1}></div>
        <div className={styles.movingNebula2}></div>
        <div className={styles.deepSpaceGrid}></div>
      </div>

      <nav className={`${styles.nav} glass-dark`}>
        <div className={styles.navContainer}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.logoGroup}
          >
            <Logo size={36} color="white" animated={true} />
            <div className={styles.logoTexts}>
               <span className={styles.logoPrimary}>Strong Tower</span>
               <span className={styles.logoSecondary}>Mock JAMB CBT</span>
            </div>
          </motion.div>
          
          <div className={styles.navActionArea}>
            <div className={styles.navLinksPills}>
               <a href="#features">Excellence</a>
               <a href="#analytics">Insights</a>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = '/dashboard'}
            >
              Start Practice <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <section className={styles.sophisticatedHero}>
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className={styles.heroContent}
          >
            <div className={styles.heroTextContent}>
              <div className={styles.heroFlag}>
                <div className={styles.flagIcon}><Award size={16} /></div>
                <span>Frictionless Mock Simulation</span>
              </div>
              
              <h1>Pioneer Your <span className={styles.uniqueGradient}>Academic Success</span> with Precision</h1>
              
              <p className={styles.heroSubtext}>
                The world's most sophisticated JAMB CBT mock platform. 
                No registration required. Just pick your subjects and begin your journey 
                to mastery in seconds.
              </p>
              
              <div className={styles.heroCTA}>
                <button className={styles.heroMainBtn} onClick={() => window.location.href = '/dashboard'}>
                  <span className={styles.btnInner}>
                    Get Started Now <PlayCircle size={24} />
                  </span>
                </button>
                <button className={styles.heroSecondaryBtn} onClick={() => {
                  const el = document.getElementById('features');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}>
                   Explore Features <Monitor size={20} />
                </button>
              </div>

              <div className={styles.trustFooter}>
                <p>Designed for Speed and Efficiency</p>
                <div className={styles.trustBadges}>
                   <div className={styles.tBadge}>No Account Needed</div>
                   <div className={styles.tBadge}>Instant Generation</div>
                </div>
              </div>
            </div>

            <SophisticatedHeroGraphics />
          </motion.div>
        </section>

        <AnimatedScrollSection id="features" className={styles.sophisticatedFeatures}>
          <div className={styles.centralHeader}>
             <div className={styles.preHeade}>Excellence Defined</div>
             <h2>Engineered for Mastery</h2>
             <p>Our platform is built upon three pillars of elite performance: Accuracy, Integrity, and Analytics.</p>
          </div>
          
          <div className={styles.sophisticatedGrid}>
            <SophisticatedFeatureCard 
              icon={Zap}
              title="Neural Question Synthesis"
              description="Our AI generator creates infinite, non-repeating questions that strictly follow the official JAMB guidelines."
              delay={0.1}
            />
            <SophisticatedFeatureCard 
              icon={ShieldCheck}
              title="Immutable Integrity"
              description="Hardware-agnostic session locking and server-synchronized timers prevent any form of malpractice."
              delay={0.2}
            />
            <SophisticatedFeatureCard 
              icon={BarChart3}
              title="Cognitive Performance"
              description="Receive 360-degree performance insights that pinpoint cognitive strengths and knowledge gaps."
              delay={0.3}
            />
            <SophisticatedFeatureCard 
              icon={Compass}
              title="Syllabus Navigation"
              description="A unique map-based interface to navigate subjects, ensuring you cover every topic."
              delay={0.4}
            />
          </div>
        </AnimatedScrollSection>

        <AnimatedScrollSection className={styles.worldClassCTA}>
           <div className={`${styles.ctaContainer} glass`}>
              <div className={styles.ctaVisual}>
                 <motion.div 
                   animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className={styles.glowingOrb}
                 />
                 <Award size={100} className={styles.ctaIconLarge} />
              </div>
              <div className={styles.ctaTextContainer}>
                 <h2>The Standard has been set. <br/> <span className={styles.uniqueGradient}>Will you meet it?</span></h2>
                 <p>Don't just practice. Train with the best-in-class simulator designed by global education specialists.</p>
                 <button className="btn btn-primary btn-lg" onClick={() => window.location.href = '/dashboard'}>
                   Experience the Simulation <CheckCircle size={20} />
                 </button>
              </div>
           </div>
        </AnimatedScrollSection>
      </main>

      <footer className={styles.eliteFooter}>
        <div className={styles.footerWrap}>
           <div className={styles.fBrand}>
              <div className={styles.fLogo}><Logo size={32} color="white" animated={false} /> <span>Strong Tower</span></div>
              <p>Defining the technological frontier for computer-based testing in Africa.</p>
           </div>
           <div className={styles.fLinksGrid}>
              <div className={styles.fLinkCol}>
                 <h4>Platform</h4>
                 <a href="#">Simulations</a>
                 <a href="#">AI Analysis</a>
                 <a href="#">Novel Guide</a>
              </div>
              <div className={styles.fLinkCol}>
                 <h4>Governance</h4>
                 <a href="#">Privacy</a>
                 <a href="#">Integrity</a>
                 <a href="#">Terms</a>
              </div>
           </div>
        </div>
        <div className={styles.fCopyright}>
           © 2026 Strong Tower Educational Corporation. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
