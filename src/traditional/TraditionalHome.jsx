import React from 'react';
import Navbar from './TradNav';
import Links from './TradLinks';
import Resume from './TradResume';
import Certifications from './TradCert';
import Projects from './TradProj';
import Contact from './TradContact';
import Experience from './TradExp';
import styles from './TraditionalHome.module.css';
import chibiNaruto from './ChibiB.jpg';

const TraditionalHome = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      
      <div className={styles.hero}>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Presentating</span>
            <span className={styles.titleLine + ' ' + styles.highlight}>RHYTHM CHAWLA</span>
          </h1>
          <p className={styles.heroDescription}>
            Full Stack Developer crafting immersive digital experiences with cutting-edge technologies
          </p>
          
          <div className={styles.navLinks}>
            <a href="#experience" className={styles.navButton}>
              <span>Experience</span>
            </a>
            <a href="#projects" className={styles.navButton}>
              <span>Projects</span>
            </a>
            <a href="#certifications" className={styles.navButton}>
              <span>Certifications</span>
            </a>
            <a href="#resume" className={styles.navButton}>
              <span>Resume</span>
            </a>
            <a href="#contact" className={styles.navButton}>
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <section id="experience">
          <Experience />
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
        
        <section id="contact">
          <Contact />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Rhythm Chawla. All rights reserved.</p>
        <p>Built with React & ❤️</p>
      </footer>

      {/* Floating Chibi Naruto */}
      <a href="/naruto" className={styles.chibiWrapper}>
        <img src={chibiNaruto} alt="Chibi Naruto" className={styles.chibiNaruto} />
        <div className={styles.tooltip}>
          <span>Click to enter 3D World!</span>
        </div>
      </a>
    </div>
  );
};

export default TraditionalHome;