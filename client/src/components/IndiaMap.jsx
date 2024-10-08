import React, { useState } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import stateCoordinates from "../stateCoordinates.js";

const IndiaMap = () => {
  const [scale, setScale] = useState(5);

  return (
    <div className="map-container">
      <MapInteractionCSS
        showControls
        defaultValue={{
          scale: 0.69,
          translation: { x: 400, y: 0 },
        }}
        minScale={0.07}
        maxScale={3}
        onScaleChange={(newScale) => setScale(newScale)}
        translationBounds={{
          xMin: -500 * scale,
          xMax: 200 * scale,
          yMin: -500 * scale,
          yMax: 100 * scale,
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/indiaMap.svg`}
          alt="Map of India"
          id="svg-map"
        />
        {Object.keys(stateCoordinates).map((state) => {
          const { x, y } = stateCoordinates[state];
          return (
            <img
              key={state}
              src={`${process.env.PUBLIC_URL}/marker.jpeg`}
              alt={state}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                width: "21px",
                height: "23px",
              }}
            />
          );
        })}
      </MapInteractionCSS>
    </div>
  );
};

export default IndiaMap;
