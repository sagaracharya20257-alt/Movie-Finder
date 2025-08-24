import { useEffect, useState } from "react";

export default function MovieSearch() {
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
      fetchMovies(controller.signal);
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  async function fetchMovies(signal) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=b217e137`,
        { signal }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.Response === "False") {
        setResults([]);
        setError(data.Error || "No movies found.");
        return;
      }
      setResults(data.Search || []);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Failed to fetch movies. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h2>Movie Search</h2>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {results.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}
              alt={movie.Title}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <div style={{ padding: "10px", textAlign: "center" }}>
              <h3 style={{ fontSize: "16px", margin: "5px 0" }}>{movie.Title}</h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                {movie.Year} • {movie.Type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
