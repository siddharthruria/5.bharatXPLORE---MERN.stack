import React, { useContext, useState } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import markerCoordinates from "../assets/markerCoordinates.js";
import stateData from "../assets/stateData.js";
import customIcons from "../assets/customIcons.js";
import { UserContext } from "../context/UserContext.js";

const IndiaMap = ({ setSelectedState, setSelectedStateId }) => {
  const { getCookie } = useContext(UserContext);
  const [scale, setScale] = useState(5);

  return (
    <div
      className="map-container"
      style={{
        justifyContent: "start",
      }}
    >
      <MapInteractionCSS
        showControls
        defaultValue={{
          scale: 1,
          translation: { x: 0, y: 0 },
        }}
        minScale={0.07}
        maxScale={3.69}
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
          {stateData.map((state) => (
            <path
              key={state.name}
              id={state.name}
              d={state.d}
              fill={state.fill}
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              cursor={getCookie("token") ? "pointer" : "default"}
            />
          ))}

          {getCookie("token") &&
            Object.keys(markerCoordinates).map((state) => {
              const { x, y, name } = markerCoordinates[state];
              return (
                <image
                  key={state}
                  href={customIcons[state]}
                  x={x}
                  y={y}
                  width="24"
                  height="26"
                  cursor="pointer"
                  onClick={() => {
                    setSelectedState(name);
                    setSelectedStateId(state);
                  }}
                />
              );
            })}
        </svg>
      </MapInteractionCSS>
    </div>
  );
};

export default IndiaMap;
