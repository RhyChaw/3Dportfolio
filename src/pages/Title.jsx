import React from 'react'

function Title() {
  return (
    <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 9999,
        color: 'white',
        textAlign: 'left',
        fontSize: '14px',
        fontFamily: 'sans-serif',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '10px'
      }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>Rhythm's Ninja Way</h1>
        <p style={{ margin: 0 }}>Explore the room and talk to Naruto!</p>
      </div>
  )
}

export default Title