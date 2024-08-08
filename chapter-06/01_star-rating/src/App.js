import React from "react";
import StarRating from "./StarRating";

function App() {
  return (
    <StarRating 
      style={ {backgroundColor: "lightblue"} } 
      onDoubleClick={e => alert("double click")}/>
  );
}

export default App;
