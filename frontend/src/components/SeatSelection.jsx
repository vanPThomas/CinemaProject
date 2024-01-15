// SeatSelection.jsx
import React from "react";

const SeatSelection = ({ gridData, handleSquareClick }) => (
  <div>
    <p className="font-bold text-left">Kies Plaats(en): </p>
    <div>
      <div className="grid grid-cols-10 gap-2">
        {gridData.map((value, index) => (
          <span
            key={index}
            className={`${
              value ? "bg-green-300" : "bg-gray-300"
            } rounded-md px-2 py-1 text-sm font-semibold mr-2 mb-2 cursor-pointer`}
            onClick={() => handleSquareClick(index)}
          >
            x
          </span>
        ))}
      </div>
      <br />
      <br />
    </div>
  </div>
);

export default SeatSelection;
