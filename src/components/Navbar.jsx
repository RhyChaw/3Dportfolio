import React from 'react';
import styles from '../styles/Navbar.module.css';

const zones = {
  Projects: { x: -6.06, y: 0.4, z: 1.64 },
  Certifications: { x: 10.67, y: 0.4, z: 3.39 },
  Links: { x: 10.25, y: 0.4, z: -5.63 }, // assuming 'Links' == 'Computer'
  Resume: { x: -0.03, y: 0.4, z: -9.67 },
  Contact: { x: -2.54, y: 0.4, z: 9.51 }
};

const Navbar = ({ onNavigate }) => {
  const handleClick = (label) => {
    const pos = zones[label];
    if (pos && onNavigate) onNavigate(pos);
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        {Object.keys(zones).map((label) => (
          <li key={label} onClick={() => handleClick(label)}>
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
