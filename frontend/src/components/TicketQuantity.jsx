import React from "react";

const TicketQuantity = ({ numberOfTickets }) => (
  <div>
    <p className="font-bold text-left">Aantal tickets: </p>
    <p className="text-left">{numberOfTickets}</p>
  </div>
);

export default TicketQuantity;
