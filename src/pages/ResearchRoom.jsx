
import { useState } from 'react'

const categories = [
  'All Biology',
  'Anatomy',
  'Comparative Biology',
  'Microbiology',
  'Genetics',
  'Botany',
  'Zoology',
  'Ecology',
  'Parasitology',
  'Evolutionary Biology',
  'Biochemistry'
]

function ResearchRoom() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Biology')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  async function searchResearch(event) {
    event.preventDefault()

    if (!search.trim() && category === 'All Biology') {
      setError('Enter a research topic or choose a Biology category.')
      return
    }

    setLoading(true)
    setError('')
    setSearched(true)

    try {
      const query = [search.trim(), category === 'All Biology' ? 'biology' : category]
        .filter(Boolean)
        .join(' ')

      const url = `https://api.crossref.org/works?query=${encodeURIComponent(query)}&filter=type:journal-article&rows=15&select=title,author,published,container-title,DOI,URL`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Unable to retrieve research articles.')
      }

      const data = await response.json()
      setArticles(data.message.items || [])
    } catch (err) {
      setError('Something went wrong. Please check your internet connection and try again.')
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '40px 7%', maxWidth: '1200px', margin: 'auto' }}>
      <span style={{ color: '#9a824b', letterSpacing: '2px', fontSize: '11px' }}>
        LIFELAB DISCOVERY LIBRARY
      </span>

      <h1 style={{ color: '#294333', fontFamily: 'Georgia, serif' }}>
        🔬 Research Room
      </h1>

      <p style={{ color: '#718071' }}>
        Discover scholarly publications and scientific studies related to Biology.
      </p>

      <form onSubmit={searchResearch} style={{ marginTop: '30px' }}>
        <label htmlFor="research-search">Search research topics</label>

        <input
          id="research-search"
          type="search"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="e.g. mangrove sediment bacteria, DNA barcoding..."
          style={{
            display: 'block',
            width: '100%',
            padding: '14px',
            marginTop: '10px',
            marginBottom: '18px',
            border: '1px solid #cbd3c5',
            borderRadius: '6px'
          }}
        />

        <label htmlFor="research-category">Biology category</label>

        <select
          id="research-category"
          value={category}
          onChange={event => setCategory(event.target.value)}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '400px',
            padding: '12px',
            marginTop: '10px',
            marginBottom: '20px',
            border: '1px solid #cbd3c5',
            borderRadius: '6px'
          }}
        >
          {categories.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Research →'}
        </button>
      </form>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {loading && <p>Searching scholarly publications...</p>}

      {searched && !loading && (
        <section style={{ marginTop: '35px' }}>
          <h2>Research Results</h2>

          {articles.length === 0 && !error ? (
            <p>No publications found. Try another keyword or category.</p>
          ) : (
            articles.map((article, index) => {
              const title = article.title?.[0] || 'Untitled publication'
              const authors = article.author?.map(author =>
                [author.given, author.family].filter(Boolean).join(' ')
              ).filter(Boolean).join(', ') || 'Author information unavailable'

              const year = article.published?.['date-parts']?.[0]?.[0] || 'Year unavailable'
              const journal = article['container-title']?.[0] || 'Journal unavailable'
              const link = article.DOI
                ? `https://doi.org/${article.DOI}`
                : article.URL

              return (
                <article
                  key={article.DOI || index}
                  style={{
                    padding: '20px',
                    marginTop: '15px',
                    background: '#fffefa',
                    border: '1px solid #e5e8df',
                    borderRadius: '8px'
                  }}
                >
                  <h3 style={{ color: '#31513b' }}>{title}</h3>
                  <p><strong>Authors:</strong> {authors}</p>
                  <p><strong>Journal:</strong> {journal}</p>
                  <p><strong>Year:</strong> {year}</p>

                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#9a824b', fontWeight: 'bold' }}
                    >
                      View Publication ↗
                    </a>
                  )}
                </article>
              )
            })
          )}
        </section>
      )}

      <p style={{ marginTop: '35px', color: '#879083', fontSize: '12px' }}>
        Publication metadata provided through Crossref. Availability of full-text articles
        depends on the publisher or repository.
      </p>
    </main>
  )
}

export default ResearchRoom
