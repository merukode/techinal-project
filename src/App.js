import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );
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
          placeholder="Cari Film"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      {/* Popular Movies */}
      <section className="mt-10 md:flex md:flex-wrap gap-10">
        {filteredMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
          <div class="w-80 h-full mb-5 border-black border-2 rounded-md hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white">
            <a href="" class="block cursor-pointer">
              <article class="w-full h-full">
                <figure class="w-full h-1/2 border-black border-b-2">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    class="w-full h-full object-cover"
                  />
                </figure>
                <div class="px-6 py-5 text-left h-full">
                  <p class="text-base mb-4">{movie.release_date}</p>
                  <h1 class="text-[32px] mb-4">{movie.title}</h1>
                </div>
              </article>
            </a>
          </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default App;
