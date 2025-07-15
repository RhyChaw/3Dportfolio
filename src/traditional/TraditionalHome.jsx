import React, { useState } from 'react';
import Navbar from './TradNav';
import Links from './TradLinks';
import Resume from './TradResume';
import Certifications from './TradCert';
import Projects from './TradProj';
import Contact from './TradContact';
import Experience from './TradExp';

import styles from './TraditionalHome.module.css';
import chibiNaruto from './chibi.jpg';  // make sure path is correct!

const TraditionalHome = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1>Welcome to My Traditional Portfolio</h1>
        <p>This is a simple, traditional portfolio page.</p>
        <Experience />
        <Resume />
        <Projects />
        <Certifications />
        <Links />
        <Contact />
      </div>

      {/* Floating Chibi Naruto */}
      <a href="/naruto" className={styles.chibiWrapper}>
        <img src={chibiNaruto} alt="Chibi Naruto" className={styles.chibiNaruto} />
        <div className={styles.tooltip}>
          Click me to enter the 3D Ninja Experience!  
          <br /> Learn everything the cool way, dattebayo!
        </div>
      </a>
    </div>
  );
};

export default TraditionalHome;
