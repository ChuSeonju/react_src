import React from "react";

export default function Ingredient({ amount, measurement, name }) {
  return (
    <li>
      <span className="amount">{amount}</span>
      <span className="measurement">{measurement}</span>
      <span className="name">{name}</span>
    </li>
  );
}

Ingredient.displayName = "Ingredient";
// export default Ingredient;


