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
    <main className="bg-white">
      {/* Header */}
      <div className="mb-10 flex flex-wrap justify-between bg-blue-800 p-10">
        <h1 className="font-bold text-3xl text-white">AboutFilm</h1>
        <section className="w-96">
        <input
          class="w-full mt-10 md:mt-0 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]  active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
          placeholder="Search Movie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      </div>
      {/* Main Section */}
      <section className="p-10">
     
      {/* Popular Movies */}
      <h1 className="mt-10 mb-10 text-3xl font-bold">Popular Movies</h1>
      <section className=" md:flex  md:p-5 scrollbar-bar hide-scrollbar md:overflow-x-scroll gap-10"> 
        {filteredMovies.slice(0, 10).map((movie) => (
          <Link to={`/movie/${movie.id}`}>
          <div class="w-full md:w-52 h-full mb-5 border-black border-2 rounded-md hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white">
            <a href="" class="block cursor-pointer">
              <article class="w-full h-full">
                <figure class="w-full h-1/2 border-black border-b-2">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    class="w-full h-52 object-cover"
                  />
                </figure>
                <div class="px-6 py-5 text-left h-full">
                  <p class="text-base mb-4 bg-blue-400 p-3 rounded-md w-fit">{movie.release_date}</p>
                  <h1 class="text-xl font-bold">{movie.title}</h1>
                  
                </div>
              </article>
            </a>
          </div>
          </Link>
        ))}
      </section>
      </section>
    </main>
  );
}

export default App;
