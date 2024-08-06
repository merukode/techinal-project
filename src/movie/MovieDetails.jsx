import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reccomendation, setReccomendation] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setMovie(data);

        // Reccomendation

        const recMovie = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
            },
          }
        );
        const recData = await recMovie.json();
        setReccomendation(recData.results);
        console.log("reccomendation", recData.results);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <section
      className=" relative md:w-full h-[80em] md:h-[70em] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    >
      
      <div className="absolute lg:flex gap-5 p-5 inset-0 bg-black/70">
        <Link to="/">
        <img className="w-10 bg-white rounded-full mb-5" src="/back-arrow.svg" alt="back arrow" />  
        </Link>
        <img
          className="border-black md:w-[500px] md:h-[700px] bg-cover bg-center border-2 rounded-md" 
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="md:flex text-white md:flex-col">
          <p className="font-bold mt-3 text-gray-400">{movie.release_date}</p>
          <h1 className="md:text-5xl mt-5 font-bold mb-5">{movie.title}</h1>
          <p className="md:text-2xl md:w-[25em]">{movie.overview}</p>
          <span className="flex gap-5 mt-5">
            {movie.genres.slice(0, 3).map((genre) => (
              <p className="p-2 border-2 border-white rounded-lg hover:bg-white hover:text-black">{genre.name}</p>
            ))}
          </span>
        </div>
      </div>
    </section>
    <section className="bg-black p-10">
      <h1 className="text-white mb-10 text-2xl font-bold">Another Movie Recommendation</h1>
      <div className="md:flex overflow-scroll hide-scrollbar gap-14 p-8">
        {reccomendation.slice(0, 7).map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <div className="w-full md:w-52 h-full mb-5 border-2 border-white text-white rounded-md hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <a href="" class="block cursor-pointer">
              <article class="w-full h-full">
                <figure class="w-full h-1/2 border-black border-b-2">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-52 object-cover" 
                  />
                </figure>
                <div className="px-6 py-5 text-left h-full">
                  <p className="text-base mb-4 bg-blue-400 p-3 rounded-md w-fit">{movie.release_date}</p>
                  <h1 className="text-xl font-bold">{movie.title}</h1>
                  
                </div>
              </article>
            </a>
          </div>
          </Link>
        ))}
      </div>
    </section>
    </>
  );
};

export default MovieDetails;
