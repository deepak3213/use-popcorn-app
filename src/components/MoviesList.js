import React from "react";

const MoviesList = ({ movies, handleSelect }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} handleSelect={handleSelect} />
      ))}
    </ul>
  );
};

export default MoviesList;

function Movie({ movie, handleSelect }) {
  return (
    <li onClick={() => handleSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
