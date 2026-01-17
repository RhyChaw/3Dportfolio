import React from 'react';
import Navbar from './TradNav';
import Links from './TradLinks';
import Resume from './TradResume';
import Certifications from './TradCert';
import Projects from './TradProj';
import Experience from './TradExp';
import FloatingIcons from '../components/FloatingIcons';
import styles from './TraditionalHome.module.css';
import chibiNaruto from './ChibiB.jpg';
import rhythmPhoto from '../assets/rhythm-photo.jpg';
import LogosBelt from './LogosBelt';

const TraditionalHome = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                <span className={styles.titleLine}>Presenting</span>
                <span className={styles.titleLine + ' ' + styles.highlight}>RHYTHM CHAWLA</span>
              </h1>
              <p className={styles.heroDescription}>
                I'm a passionate Full Stack Developer and serial entrepreneur with an insatiable drive to build innovative solutions that solve real-world problems. My journey in tech began with a simple curiosity about how things work, but it quickly evolved into a deep fascination with the intersection of technology and business.
              </p>
              <p className={styles.heroDescription}>
                What truly excites me is entrepreneurship – the thrill of identifying market gaps, building products from scratch, and watching them grow into something meaningful. From co-founding G12Uni, a global platform connecting 1,500+ students across 10+ countries, to developing AI-powered solutions that accelerate enterprise workflows by 98%, I live for the challenge of turning bold ideas into reality.
              </p>
              <p className={styles.heroDescription}>
                My approach combines technical excellence with business acumen, always asking "How can this technology create value?" Whether it's building scalable ML microservices, crafting intuitive user experiences, or optimizing conversation workflows for enterprise customers, I'm driven by the belief that great technology should empower people and drive meaningful change.
              </p>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.imagePlaceholder}>
                <img 
                  src={rhythmPhoto} 
                  alt="Rhythm Chawla" 
                  className={styles.profileImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <section id="experience">
          <Experience />
        </section>
        
        {/* Logos belt (no title) */}
        <section>
          <LogosBelt />
        </section>

        <section id="projects">
          <Projects />
        </section>
        
        <section id="certifications">
          <Certifications />
        </section>
        
        <section id="resume">
          <Resume />
        </section>
        
        {/* Contact section removed as requested */}
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 Rhythm Chawla. All rights reserved.</p>
      </footer>

      {/* Floating Chibi Naruto */}
      <a href="/naruto" className={styles.chibiWrapper}>
        <img src={chibiNaruto} alt="Chibi Naruto" className={styles.chibiNaruto} />
        <div className={styles.tooltip}>
          <span>Click to enter 3D World!</span>
        </div>
      </a>

      {/* Floating Social Icons */}
      <FloatingIcons />
    </div>
  );
};

export default TraditionalHome;