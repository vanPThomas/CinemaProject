import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Movies = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from the server when the component mounts
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/movies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      // Check if the response is an array or if movies are nested inside an object
      const moviesArray = Array.isArray(data) ? data : data.movies || [];

      setMovies(moviesArray);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const mainDivStyle =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center";

  const filteredMovies = movies.filter((movie) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return (
      movie.title.toLowerCase().includes(lowercasedSearchTerm) ||
      movie.genre
        .split(", ")
        .some((genre) => genre.toLowerCase().includes(lowercasedSearchTerm))
    );
  });

  return (
    <>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by title or genre"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={`${mainDivStyle} text-black py-10`}>
        {filteredMovies.map((el, idx) => {
          return (
            <div
              onClick={() => {
                navigate(`/movies/${el.title}`);
              }}
              key={idx}
              className="rounded-lg shadow-2xl w-full flex flex-col overflow-clip hover:scale-125 transition-all hover:bg-amber-300x  bg-slate-400"
            >
              <img
                src={el.poster}
                className="w-full h-full object-cover"
                alt={el.title}
              ></img>
              <div className="flex flex-wrap mb-2">
                {el.genre.split(", ").map((genre, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-300 rounded-md px-2 py-1 text-sm font-semibold mr-2 mb-2"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="font-semibold text-center mt-2">{el.title}</p>
              <p className="h-20">{el.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Movies;
