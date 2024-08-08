import React, { useState } from "react";
import Star from "./Star";
import { createArray } from "./lib";

function handleStarSelect (index, setSelectedStars) {
  return setSelectedStars(index + 1);
}

export default function StarRating({ totalStars = 5}) {
  const [selectedStars, setSelectedStars] = useState(0);

  return (
    <>
      {createArray(totalStars).map((n, i)=>(
        <Star
          key = {i}
          selected = {selectedStars > i}  
          // selectedStars:선택값 [1], 2, 3, 4, 5  i=> 0, 1, 2, 3, 4 
          // onSelect = {() => handleStarSelect(i, setSelectedStars)}
          onSelect = {() => setSelectedStars(i + 1)}
          />
      )) }
      <p>
        {selectedStars} of {totalStars}
      </p>
    </>
  );
}