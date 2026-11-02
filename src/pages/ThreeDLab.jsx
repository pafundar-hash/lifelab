function ThreeDLab() {
  const models = [
    {
      icon: '🧫',
      name: 'Animal Cell',
      description: 'Explore the structures and organelles of an animal cell.'
    },
    {
      icon: '🌱',
      name: 'Plant Cell',
      description: 'Discover chloroplasts, cell walls, and other plant cell structures.'
    },
    {
      icon: '🧬',
      name: 'DNA Structure',
      description: 'Learn about the double helix and its components.'
    },
    {
      icon: '🫀',
      name: 'Human Anatomy',
      description: 'Study the organs and systems of the human body.'
    },
    {
      icon: '🦠',
      name: 'Bacterial Cell',
      description: 'Examine the structures of a prokaryotic cell.'
    },
    {
      icon: '🌼',
      name: 'Flower Anatomy',
      description: 'Explore the reproductive and structural parts of a flower.'
    }
  ]

  return (
    <main style={{ padding: '40px', maxWidth: '1000px', margin: 'auto' }}>
      <h1>🧬 3D Lab</h1>
      <p>
        Explore biological structures and discover how living
        organisms are organized.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '18px',
          marginTop: '30px'
        }}
      >
        {models.map(model => (
          <article
            key={model.name}
            style={{
              padding: '22px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              background: '#fffefa'
            }}
          >
            <div style={{ fontSize: '40px' }}>{model.icon}</div>
            <h2>{model.name}</h2>
            <p>{model.description}</p>
            <span style={{ color: '#9a824b', fontSize: '12px' }}>
              3D MODEL — COMING SOON
            </span>
          </article>
        ))}
      </div>
    </main>
  )
}

export default ThreeDLab