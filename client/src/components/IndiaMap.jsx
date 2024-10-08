import React from "react";

const IndiaMap = () => {
  return (
    <div className="map-container">
      <img
        src={`${process.env.PUBLIC_URL}/indiaMap.svg`}
        alt="Map of India"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default IndiaMap;
