import React from "react";
const getCurrentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`;
};
const availableTimes = ["18:30 PM", "19:00 PM", "19:30 PM"];

const TicketSelection = ({ selectedTime, handleTimeSelection }) => (
  <div>
    <p className="font-bold text-left">Datum/Tijd: </p>
    <p className="font-bold text-left">{getCurrentDate()}</p>
    <div>
      <div className="flex space-x-4">
        {availableTimes.map((time) => (
          <label key={time} className="flex items-center">
            <input
              type="radio"
              value={time}
              checked={selectedTime === time}
              onChange={() => handleTimeSelection(time)}
              className="mr-2"
            />
            {time}
          </label>
        ))}
      </div>
    </div>
  </div>
);

export default TicketSelection;
