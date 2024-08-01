import React, { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { ReactSVG } from "react-svg";

const MapSvgZoom = ({ floor1, floor1_roof, floor2, floor2_roof, floor3 }) => {
  const containerRef = useRef();

  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: container } = containerRef;
    //console.log("wuh");
    if (container) {
      const value = make3dTransformValue({ x, y, scale });
      container.style.setProperty("transform", value);
      container.style.setProperty("transform-origin", "0 0");
    }
  }, []);

  return (
    <div style={{height:"100%", width:"100%", position:"relative"}}>
    <QuickPinchZoom
      onUpdate={onUpdate}
      inertia={true}
      enforceBoundsDuringZoom={false}
      wheelScaleFactor={500}
      draggableUnZoomed={true}
      verticalPadding={750}
      horizontalPadding={150}
      doubleTapToggleZoom={true}
      maxZoom={15000}
      tapZoomFactor={5}
    >

      <div
        ref={containerRef}
        style={{
          width: "100vw",
          height: "100vh",
          transformOrigin: "0 0",
          position: "relative"
        }}
      >
        <div style={{position:'relative', width:"100vw", height: "100%"}}>
          <ReactSVG src={floor1} style={{ position:"absolute", width: "100%", height: "100%" }} />
          <ReactSVG src={floor2} style={{ position:"absolute", width: "100%", height: "100%" }} />
          <ReactSVG src={floor3} style={{ position:"absolute", width: "100%", height: "100%" }} />
        </div>
        {/* <div style={{position:'absolute', top:'0', left:'0', width:"100vw", height:"100vh"}}>
          <ReactSVG src={floor2} style={{ width: "100%", height: "100%" }} />
        </div> */}
      </div>

    </QuickPinchZoom>
    </div>
  );
};

export default MapSvgZoom;
