import React from 'react'

function Projects() {
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
          border: '2px solid #32CD32'
        }}>
          <h2>📁 Projects</h2>
          <p>Explore some of my favorite builds:</p>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><a href="http://watiszine.com/" target="_blank" rel="noreferrer" style={{ color: '#0ff' }}>WATisZine?</a></li>
            <li><a href="http://thehestia.com/" target="_blank" rel="noreferrer" style={{ color: '#0ff' }}>HESTIA</a></li>
            <li><a href="http://vboman.com/" target="_blank" rel="noreferrer" style={{ color: '#0ff' }}>VBOman</a></li>
            <li><a href="http://www.g12uni.com/about-1" target="_blank" rel="noreferrer" style={{ color: '#0ff' }}>G12 Platform</a></li>
          </ul>
          <button
            onClick={() => setProjectsVisible(false)}
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

export default Projects