import React from "react";
const Error = ({ fullHeight }) => {
  return (
    <div
      className={`section section-center text-center ${
        fullHeight ? "full-page" : ""
      }`}
    >
      <h2>there was an error...</h2>
    </div>
  );
};

export default Error;
