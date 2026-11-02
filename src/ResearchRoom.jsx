import { useState } from "react";
import "./ResearchRoom.css";

const subjects = [
  "Microbiology",
  "Genetics",
  "Botany",
  "Zoology",
  "Ecology",
  "Anatomy",
  "Parasitology",
  "Evolutionary Biology",
  "Biochemistry",
];

export default function ResearchRoom({ onBack }) {
  const [search, setSearch] = useState("");
  const [activeSubject, setActiveSubject] = useState("All Subjects");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function searchResearch(term = search) {
    const query = term.trim();

    if (!query) {
      setError("Please enter a research topic or keyword.");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const url =
        "https://api.crossref.org/works?query=" +
        encodeURIComponent(query) +
        "&rows=12&select=title,author,published,container-title,DOI,type,abstract";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to retrieve research articles.");
      }

      const data = await response.json();
      setArticles(data.message.items || []);
    } catch (err) {
      setError(
        "We couldn't load research articles. Please check your internet connection and try again."
      );
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }

  function chooseSubject(subject) {
    setActiveSubject(subject);
    setSearch(subject);
    searchResearch(subject);
  }

  function getAuthors(authors) {
    if (!authors || authors.length === 0) {
      return "Author not listed";
    }

    return authors
      .slice(0, 3)
      .map((author) =>
        [author.given, author.family].filter(Boolean).join(" ")
      )
      .join(", ");
  }

  function getYear(item) {
    return (
      item.published?.["date-parts"]?.[0]?.[0] ||
      "Year unavailable"
    );
  }

  return (
    <main className="research-page">
      <section className="research-heading">
        <button className="back-button" onClick={onBack}>
          ← Back to LifeLab
        </button>

        <p className="eyebrow">LIFELAB • LEARNING ROOM 01</p>
        <h1>Research Room</h1>
        <p>
          Discover scientific discoveries, explore scholarly
          publications, and find inspiration for your next research.
        </p>
      </section>

      <section className="research-search">
        <span className="search-label">
          EXPLORE SCIENTIFIC KNOWLEDGE
        </span>

        <form
          className="search-form"
          onSubmit={(event) => {
            event.preventDefault();
            searchResearch();
          }}
        >
          <input
            type="search"
            placeholder="Search biology topics, titles, or keywords..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>

      <section className="subject-section">
        <h2>Browse by subject</h2>

        <div className="subject-list">
          <button
            className={
              activeSubject === "All Subjects" ? "active" : ""
            }
            onClick={() => {
              setActiveSubject("All Subjects");
              setSearch("");
              setArticles([]);
              setHasSearched(false);
              setError("");
            }}
          >
            All Subjects
          </button>

          {subjects.map((subject) => (
            <button
              key={subject}
              className={
                activeSubject === subject ? "active" : ""
              }
              onClick={() => chooseSubject(subject)}
            >
              {subject}
            </button>
          ))}
        </div>
      </section>

      <section className="article-section">
        <div className="article-section-heading">
          <div>
            <span className="eyebrow">
              YOUR KNOWLEDGE LIBRARY
            </span>
            <h2>
              {hasSearched ? "Search Results" : "Start Exploring"}
            </h2>
          </div>

          <span className="article-count">
            {articles.length} articles
          </span>
        </div>

        {loading && (
          <p className="research-message">
            Finding scientific publications...
          </p>
        )}

        {error && (
          <p className="research-error">{error}</p>
        )}

        {!loading && !error && !hasSearched && (
          <div className="research-empty">
            <span>✳</span>
            <h3>Your next discovery starts here.</h3>
            <p>
              Search a topic or select a biology subject to
              explore scholarly publications.
            </p>
          </div>
        )}

        {!loading && !error && hasSearched && articles.length === 0 && (
          <div className="research-empty">
            <h3>No publications found.</h3>
            <p>Try another keyword or biology subject.</p>
          </div>
        )}

        <div className="article-grid">
          {articles.map((article, index) => {
            const title =
              article.title?.[0] || "Untitled publication";

            const doi = article.DOI;

            return (
              <article
                className="article-card"
                key={doi || index}
              >
                <span className="article-type">
                  {article.type || "Research publication"}
                </span>

                <h3>{title}</h3>

                <p className="article-authors">
                  {getAuthors(article.author)}
                </p>

                <p className="article-journal">
                  {article["container-title"]?.[0] ||
                    "Journal not listed"}{" "}
                  • {getYear(article)}
                </p>

                {article.abstract && (
                  <p className="article-abstract">
                    {article.abstract
                      .replace(/<[^>]*>/g, "")
                      .trim()}
                  </p>
                )}

                {doi ? (
                  <a
                    href={`https://doi.org/${doi}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View publication ↗
                  </a>
                ) : (
                  <span className="no-link">
                    DOI not available
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <footer className="research-footer">
        Research information is retrieved from Crossref.
        Always check the original publication for full details.
      </footer>
    </main>
  );
}