import React from "react";

const MovieDetails = ({ movie }) => (
  <div>
    <img
      src={movie.poster}
      className="w-full h-20 object-cover"
      alt="Movie Thumbnail"
    />
    <p className="font-extrabold text-3xl text-left">{movie.title}</p>
    <p className="text-justify">Description: {movie.description}</p>
    <p className="text-left font-bold">Genre(s): </p>
    <p className="text-left">{movie.genre}</p>
    <p className="font-bold text-left">Cast: </p>
    <p className="text-left">{movie.cast}</p>
  </div>
);

export default MovieDetails;
