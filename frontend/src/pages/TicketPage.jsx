import { useState, useEffect } from "react";

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [movies, setMovies] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:3000/movie-tickets/");
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        const moviesArray = Array.isArray(data) ? data : data.movies || [];

        const moviesMap = moviesArray.reduce((map, movie) => {
          map[movie.id] = movie;
          return map;
        }, {});

        setMovies(moviesMap);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchTickets();
    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Your Tickets</h1>
      {tickets.length === 0 ? (
        <p className="text-gray-600">No tickets available</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
            >
              <p className="text-gray-600 mb-2">
                Client Email: {ticket.clientEmail}
              </p>
              <p className="text-gray-600">Ticket Time: {ticket.ticketTime}</p>
              {movies[ticket.filmId] && (
                <div className="mt-4">
                  <p className="text-lg font-semibold">
                    Movie Title: {movies[ticket.filmId].title}
                  </p>
                  <img
                    src={movies[ticket.filmId].poster}
                    alt="Movie Poster"
                    className="mt-2 h-24 w-full object-cover"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketPage;
