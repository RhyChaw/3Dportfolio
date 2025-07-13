import React from 'react'

function Links() {
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
          border: '2px solid #fff'
        }}>
          <h2>💻 Access Computer</h2>
          <p>Choose a link below:</p>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><a href="https://example.com" target="_blank" rel="noreferrer" style={{ color: '#0ff' }}>Link 1</a></li>
            <li><a href="https://example.com" target="_blank" rel="noreferrer" style={{ color: '#0ff' }}>Link 2</a></li>
          </ul>
          <button
            onClick={() => setPopupVisible(false)}
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

export default Links