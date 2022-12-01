import React from "react";

const Loading = ({ fullHeight }) => {
  return (
    <div className={`section section-center ${fullHeight ? "full-page" : ""}`}>
      <div className="loading loading-center"></div>
    </div>
  );
};

export default Loading;
