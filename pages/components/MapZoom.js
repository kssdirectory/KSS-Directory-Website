import React, { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { ReactSVG } from "react-svg";

const MapSvgZoom = ({ src }) => {
  const containerRef = useRef();

  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: container } = containerRef;

    if (container) {
      const value = make3dTransformValue({ x, y, scale });
      container.style.setProperty("transform", value);
      container.style.setProperty("transform-origin", "0 0");
    }
  }, []);

  return (
    <QuickPinchZoom
      onUpdate={onUpdate}
      inertia={true}
      enforceBoundsDuringZoom={false}
      wheelScaleFactor={1000}
      draggableUnZoomed={false}
      verticalPadding={15}
      horizontalPadding={15}
      doubleTapToggleZoom={true}
    >
      <div
        style={{
          width: "100vw",
          height: "100vh",

        }}
      >
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: "100%",
            transformOrigin: "0 0",
          }}
        >
          <ReactSVG src={src} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    </QuickPinchZoom>
  );
};

export default MapSvgZoom;
