import React from "react";
import PropTypes from "prop-types";

App.propTypes = {
  // name: PropTypes.string
  // name: PropTypes.string.isRequired,
  // name: PropTypes.any.isRequired

  name: PropTypes.oneOf(["React", "JS"]),

  // PropTypes.array,
  //          .object,
  //      .bool, .func, .number, .string, .symbol
};

function App({ name }) {
  return (
    <div>
      <h1>We're {name === "JS" ? "JavaScript" : "React"}</h1>
    </div>
  );
}

export default App;
