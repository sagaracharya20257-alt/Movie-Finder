import { useEffect, useState } from "react";

export default function BookSearch() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!query) {
    setResults([]);
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => {
    fetchBooks(controller.signal);
  }, 500);

  return () => {
    clearTimeout(timer);
    controller.abort();
  };
}, [query]);

async function fetchBooks(signal) {
  setLoading(true);
  setError("");
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`, { signal });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    setResults(data.items || []);
  } catch (err) {
    if (err.name !== "AbortError") {
      setError("Failed to fetch books. Please try again.");
    }
  } finally {
    setLoading(false);
  }
}

  return(
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h2>Book Search</h2>
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {results.map((book) => (
          <li key={book.id}>
            {book.volumeInfo.title} by {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
          </li>
        ))}
      </ul>
    </div>
  )
}