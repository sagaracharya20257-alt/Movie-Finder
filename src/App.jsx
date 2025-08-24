import { useState, useEffect } from "react";
import MovieSearch from "./components/MovieSearch";

export default function App() {
  const [showSearch, setShowSearch] = useState(true);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Movie Search App</h1>
      <button onClick={() => setShowSearch(!showSearch)}>
        {showSearch ? "Hide Search" : "Show Search"}
      </button>
      {showSearch && <MovieSearch />}
    </div>
  );
}

// export default function App() {
//   const [showSearch, setShowSearch] = useState(true);

//   return (
//     <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
//       <h1>Book Search App</h1>
//       <button onClick={(e) => setShowSearch(!showSearch)}>
//         {showSearch ? "Hide Search" : "Show Search"}
//       </button>
//       {showSearch && <BookSearch />}
//     </div>
//   );
// }
