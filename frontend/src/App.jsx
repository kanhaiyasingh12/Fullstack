import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import api from './api/axios' // Import your axios instance
import Profile from './components/Profile' // Import your Profile component
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState("Checking Connection...")

  // Backend Connection Check
  useEffect(() => {
    api.get('/test')
      .then(() => setConnectionStatus("✅ Backend Connected"))
      .catch(() => setConnectionStatus("❌ Backend Offline"));
  }, []);

  return (
    <>
      {/* Dynamic Status Bar at the top */}
      <div style={{
        padding: '10px',
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: connectionStatus.includes('✅') ? '#d4edda' : '#f8d7da',
        color: connectionStatus.includes('✅') ? '#155724' : '#721c24'
      }}>
        {connectionStatus}
      </div>

      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Fullstack Ready</h1>
          <p>
            Connected to Node.js at: <code>{import.meta.env.VITE_API_BASE_URL}</code>
          </p>
        </div>
        
        {/* Counter Button */}
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>

        {/* Display Profile Component here */}
        <div style={{ marginTop: '40px' }}>
          <Profile />
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        
        {/* Social Links Section remain unchanged */}
        <div id="social">
          {/* ... existing social code ... */}
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App