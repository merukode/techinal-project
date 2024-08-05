import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

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
        console.log("Bearer Token:", process.env);

        const data = await response.json();
        setMovie(data);
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
      className=" relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    >
      <div className="absolute md:flex gap-5 p-10 inset-0 bg-black/70">
        <img
          className="border-black border-2 rounded-md"
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
    <section>

    </section>
    </>
  );
};

export default MovieDetails;
