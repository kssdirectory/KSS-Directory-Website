import React, { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { ReactSVG } from "react-svg";
import styles from "@/styles/map-page/map-page.module.css"
import useWindowSize from "@/hooks/useWindowSize";

const MapSvgZoom = ({ floor1, floor1_roof, floor2, floor2_roof, floor3 }) => {
  const containerRef = useRef();
  const windowSize = useWindowSize();
  var horizontalPadding = windowSize.width / 4;
  if (windowSize.width < 625){
    horizontalPadding = 0;
  }

  console.log("Padding calculated: " + horizontalPadding);

  const shouldInterceptWheel = event => false;
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: container } = containerRef;
    //console.log("scale is " + scale);
    if (container) {
      const value = make3dTransformValue({ x, y, scale });
      container.style.setProperty("transform", value);
      //container.style.setProperty("-webkit-transform", "translate3d(0,0,0)");
      container.style.setProperty("transform-origin", "0, 0");
    }
  }, []);

  return (
    <div style={{height:"100%", width:"100%", position:"relative"}}>
    <QuickPinchZoom
      onUpdate={onUpdate}
      inertia={true}
      enforceBoundsDuringZoom={true}
      wheelScaleFactor={500}
      draggableUnZoomed={true}
      doubleTapToggleZoom={true}
      maxZoom={5}
      horizontalPadding={horizontalPadding}
      verticalPadding={windowSize.height / 6} // arbitrary, but seems to work well on most screen sizes
      tapZoomFactor={5}
      zoomOutFactor={0}
      shouldInterceptWheel={shouldInterceptWheel}
      style={{height:"100%"}}
    >

      <div
        ref={containerRef}
        style={{
          width: "100dvw",
          height: "100dvh",
          transformOrigin: "0 0",
          position: "relative"
        }}
      >
        <div style={{position:'relative', width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
          <ReactSVG src={floor1} id={styles.mapSVG} />
          <ReactSVG src={floor2} id={styles.mapSVG} />
          <ReactSVG src={floor3} id={styles.mapSVG} />
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
