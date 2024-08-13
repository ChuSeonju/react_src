import React, { useState } from "react";
import Timer from "./components/Timer";

function CleanUp() {
  const [showTimer, setShowTimer] = useState(false);
  return (
    <div>
      {showTimer && <Timer />} {/*showTimer 가 false면 Timer가 안보임*/}
      <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
    </div>
  );
}

export default CleanUp;
