
import { useState } from 'react'
import './App.css'

import ResearchRoom from './pages/ResearchRoom'
import NotesRoom from './pages/NotesRoom'
import BioScanRoom from './pages/BioScanRoom'
import QuizRoom from './pages/QuizRoom'
import ThreeDLab from './pages/ThreeDLab'
import ProfileRoom from './pages/ProfileRoom'

const rooms = [
  { icon: '🔬', number: '01', name: 'Research Room', description: 'Discover scientific articles, journals, and research resources.', tag: 'EXPLORE', component: ResearchRoom },
  { icon: '📓', number: '02', name: 'Notes Room', description: 'Create notes, organize ideas, and save your research.', tag: 'ORGANIZE', component: NotesRoom },
  { icon: '🌿', number: '03', name: 'BioScan Room', description: 'Identify plants, animals, and other fascinating organisms.', tag: 'IDENTIFY', component: BioScanRoom },
  { icon: '🧠', number: '04', name: 'Quiz Room', description: 'Test your Biology knowledge and track your progress.', tag: 'CHALLENGE', component: QuizRoom },
  { icon: '🧬', number: '05', name: '3D Lab', description: 'Explore cells, anatomy, and biological structures in 3D.', tag: 'DISCOVER', component: ThreeDLab },
  { icon: '👩‍🔬', number: '06', name: 'Profile Room', description: 'Track your achievements and learning journey.', tag: 'YOUR SPACE', component: ProfileRoom }
]

function App() {
  const [activeRoom, setActiveRoom] = useState(null)

  if (activeRoom) {
    const RoomComponent = activeRoom.component

    return (
      <main className="app">
        <header className="navbar">
          <a className="brand" href="#home" onClick={(event) => {
            event.preventDefault()
            setActiveRoom(null)
          }}>
            <span className="brand-icon">✳</span>
            <span>LifeLab<span className="brand-dot">.</span></span>
          </a>

          <button className="profile-button" onClick={() => setActiveRoom(null)}>
            ← Back to Home
          </button>
        </header>

        <RoomComponent />
      </main>
    )
  }

  return (
    <main className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">✳</span>
          <span>LifeLab<span className="brand-dot">.</span></span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#rooms">Learning Rooms</a>
          <a href="#about">About</a>
        </nav>

        <a className="profile-button" href="#rooms">
          Explore LifeLab ↗
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-text">
          <span className="eyebrow">YOUR PERSONAL BIOLOGY LEARNING SPACE</span>
          <h1>Where curiosity<br />comes <em>alive.</em></h1>
          <p>
            Explore the wonders of life, discover new knowledge,
            and turn your curiosity into understanding.
          </p>
          <a href="#rooms" className="explore-button">
            Explore Learning Rooms <span>→</span>
          </a>
          <div className="tagline">EXPLORE. UNDERSTAND. DISCOVER.</div>
        </div>

        <div className="hero-art">
          <div className="art-circle">✳</div>
          <div className="art-leaf">🌿</div>
          <div className="art-label">THE SCIENCE OF LIFE</div>
        </div>
      </section>

      <section className="rooms-section" id="rooms">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A WORLD OF DISCOVERY</span>
            <h2>Explore your learning rooms.</h2>
          </div>
          <p>Six spaces. Endless discoveries.</p>
        </div>

        <div className="rooms-grid">
          {rooms.map((room) => (
            <button
              className="room-card"
              key={room.number}
              onClick={() => setActiveRoom(room)}
              type="button"
            >
              <div className="room-card-top">
                <span className="room-icon">{room.icon}</span>
                <span className="room-number">{room.number}</span>
              </div>
              <span className="room-tag">{room.tag}</span>
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <span className="room-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <span className="eyebrow">ABOUT LIFELAB</span>
        <h2>Learning Biology, beyond the classroom.</h2>
        <p>
          A digital learning space created for curious minds,
          future scientists, and everyone who wants to understand life.
        </p>
      </section>

      <footer>
        <span>✳ LifeLab.</span>
        <span>Explore. Understand. Discover.</span>
        <span>Made for curious minds.</span>
      </footer>
    </main>
  )
}

export default App
