import React from 'react'

function Contact() {
  return (
    <div style={{
    position: 'absolute',
    top: '25%',
    left: '35%',
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: '20px',
    borderRadius: '12px',
    color: 'white',
    zIndex: 1000,
    fontFamily: 'sans-serif',
    backdropFilter: 'blur(6px)',
    border: '2px solid #00BFFF'
  }}>
    <h2>📬 Contact Us</h2>
    <p>We’d love to hear from you!</p>
    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
      <li>Email: <a href="mailto:r3chawla@uwaterloo.ca" style={{ color: '#0ff' }}>r3chawla@uwaterloo.ca</a></li>
      <li>LinkedIn: <a href="https://www.linkedin.com/in/rhythm-chawla-18723a231/" target="_blank" rel="noreferrer" style={{ color: '#0ff' }}>rhythm-chawla</a></li>
    </ul>
    <button
      onClick={() => setContactVisible(false)}
      style={{
        marginTop: '10px',
        padding: '8px 12px',
        background: '#FF4500',
        border: 'none',
        borderRadius: '6px',
        color: 'white',
        cursor: 'pointer'
      }}
    >
      Close
    </button>
  </div>
  )
}

export default Contact