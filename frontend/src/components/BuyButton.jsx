import React from "react";

const BuyButton = ({ handleBuyClick }) => (
  <button
    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    onClick={handleBuyClick}
  >
    Buy
  </button>
);

export default BuyButton;
