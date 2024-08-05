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
          <h1 className="text-3xl mt-5 font-bold mb-5">{movie.title}</h1>
          <p>{movie.overview}</p>
          
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
