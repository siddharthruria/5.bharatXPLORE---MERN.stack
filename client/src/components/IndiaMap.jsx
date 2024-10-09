import React, { useState } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import markerCoordinates from "../markerCoordinates.js";
import stateData from "../stateData.js";

const IndiaMap = () => {
  const [scale, setScale] = useState(5);

  return (
    <div className="map-container">
      <MapInteractionCSS
        showControls
        defaultValue={{
          scale: 1,
          translation: { x: 0, y: 0 },
        }}
        minScale={0.07}
        maxScale={3}
        style={{ cursor: "default" }}
        onScaleChange={(newScale) => setScale(newScale)}
        translationBounds={{
          xMin: -500 * scale,
          xMax: 200 * scale,
          yMin: -500 * scale,
          yMax: 100 * scale,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1100 1100"
          id="interactive-map"
          style={{
            width: "100vw",
            height: "100vh",
            filter: "drop-shadow(4px 4px 1px #000000)",
          }}
        >
          {Object.keys(stateData).map((state) => (
            <path
              key={stateData[state].name}
              id={stateData[state].name}
              d={stateData[state].d}
              fill={stateData[state].fill}
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              cursor="pointer"
            />
          ))}

          {Object.keys(markerCoordinates).map((state) => {
            const { x, y } = markerCoordinates[state];
            return (
              <image
                key={state}
                href={`${process.env.PUBLIC_URL}/marker.jpeg`}
                x={x}
                y={y}
                width="21"
                height="23"
                cursor="pointer"
              />
            );
          })}
        </svg>
      </MapInteractionCSS>
    </div>
  );
};

export default IndiaMap;
