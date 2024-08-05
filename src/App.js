import React, { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
            },
          }
        );

        const data = await response.json();
        setMovies(data.results);
        console.log("data", data.results);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <main className="p-12">
      {/* Header */}
      <div>
        <h1>NontonFilms</h1>
      </div>
      {/* Input section */}
      <section>
          <input
            class="w-full m-auto border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#ffe7c2] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
            placeholder="you@example.com"
          />
      </section>
    </main>
  );
}

export default App;
