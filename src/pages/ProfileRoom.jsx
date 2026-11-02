import { useState } from 'react'

function ProfileRoom() {
  const [nickname, setNickname] = useState(
    () => localStorage.getItem('lifelab-nickname') || ''
  )
  const [savedName, setSavedName] = useState(nickname)

  function saveProfile() {
    localStorage.setItem('lifelab-nickname', nickname.trim())
    setSavedName(nickname.trim())
  }

  return (
    <main style={{ padding: '40px', maxWidth: '850px', margin: 'auto' }}>
      <h1>👩‍🔬 Profile Room</h1>
      <p>Your personal LifeLab learning space.</p>

      <section style={{ padding: '25px', marginTop: '25px', border: '1px solid #ddd', borderRadius: '12px' }}>
        <div style={{ fontSize: '55px' }}>👩‍🔬</div>

        <h2>{savedName || 'Curious Biologist'}</h2>

        <label>
          Your nickname
          <input
            value={nickname}
            onChange={event => setNickname(event.target.value)}
            placeholder="Enter your nickname"
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '350px',
              padding: '12px',
              marginTop: '10px'
            }}
          />
        </label>

        <button onClick={saveProfile} style={{ marginTop: '15px' }}>
          Save Profile
        </button>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2>My Learning Journey</h2>
        <p>🌱 Points: 0</p>
        <p>🔥 Daily streak: 0 days</p>
        <p>🏆 Achievements: Coming soon</p>
      </section>
    </main>
  )
}

export default ProfileRoom