//@flow

import React from "react";
import ReactDOM from "react-dom/client";

type Props = {
  item: String,
};

function App(props: Props) {
  return (
    <div>
      <h1>{props.item}</h1>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App item="jacket" />);
