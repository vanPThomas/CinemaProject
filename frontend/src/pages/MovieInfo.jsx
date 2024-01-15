// MovieInfo.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";
import TicketSelection from "../components/TicketSelection";
import TicketQuantity from "../components/TicketQuantity";
import SeatSelection from "../components/SeatSelection";
import BuyButton from "../components/BuyButton";
import { useAuth } from "../hooks/useAuthProvider";

const MovieInfo = () => {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [gridData, setGridData] = useState(Array(60).fill(true));
  const [numberOfTickets, setClickCount] = useState(0);
  const { isLoggedIn, email } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:3000/movies/${title}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [title]);

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleSquareClick = (index) => {
    const updatedGrid = gridData.map((col, i) => (i === index ? !col : col));
    setGridData(updatedGrid);

    setClickCount((prevCount) =>
      updatedGrid[index] ? prevCount - 1 : prevCount + 1
    );
  };

  const handleBuyClick = async () => {
    if (isLoggedIn) {
      if (!selectedTime) {
        console.error("Please select a ticket time.");
        return;
      }

      const selectedDateTime = new Date();
      selectedDateTime.setHours(parseInt(selectedTime.split(":")[0], 10));
      selectedDateTime.setMinutes(parseInt(selectedTime.split(":")[1], 10));

      const formattedDateTime = selectedDateTime
        .toISOString()
        .replace(/\.\d{3}Z$/, "Z");

      try {
        for (let i = 0; i < numberOfTickets; i++) {
          const response = await fetch("http://localhost:3000/movie-tickets/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filmId: movie.id,
              clientEmail: email,
              ticketTime: formattedDateTime,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create ticket");
          }
        }
        console.log("Ticket created successfully!");
        navigate("/ticketPage");
      } catch (error) {
        console.error("Error creating ticket:", error);
      }
    } else {
      navigate("/login");
    }
  };

  if (!movie) {
    return (
      <div>
        <h1>Movie Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      <MovieDetails movie={movie} />
      <TicketSelection
        selectedTime={selectedTime}
        handleTimeSelection={handleTimeSelection}
      />
      <TicketQuantity numberOfTickets={numberOfTickets} />
      <SeatSelection
        gridData={gridData}
        handleSquareClick={handleSquareClick}
      />
      <BuyButton handleBuyClick={handleBuyClick} />
    </div>
  );
};

export default MovieInfo;
