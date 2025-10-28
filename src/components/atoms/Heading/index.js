import React from "react";

const Heading = ({ text, className = "" }) => (
  <h2
    className={`font-integral text-black text-3xl md:text-4xl font-bold ${className}`}
  >
    {text}
  </h2>
);

export default Heading;
