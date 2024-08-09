import React, { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue, make2dTransformValue, hasTranslate3DSupport } from "react-quick-pinch-zoom";
import { ReactSVG } from "react-svg";
import styles from "@/styles/map-page/map-page.module.css"

const MapSvgZoom = ({windowSize, setZoomFunc, floor1, floor1_roof, floor2, floor2_roof, floor3, floorState}) => {
  const isSafari = typeof window !== 'undefined' ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false;
  const isMobileLayout = windowSize.width < 625;

  const use3DTransform = hasTranslate3DSupport() && !isSafari;

  const makeTransformValue = use3DTransform
  ? make3dTransformValue
  : make2dTransformValue;

  const containerRef = useRef();

  var horizontalPadding = windowSize.width / 4;
  if (isMobileLayout){
    horizontalPadding = 0;
  }

  //console.log("Preparing map page:\nPadding calculated: " + horizontalPadding + " Is safari: " + isSafari);

  const shouldInterceptWheel = event => false;
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: container } = containerRef;
    setZoomFunc(scale);
    console.log("scale is " + scale);

    if (container) {
      const value = makeTransformValue({ x, y, scale });
      // var val = "translate3d(" + x + "px, " + y +"px, 0px) scale(" + scale_2 +", " + scale_2 + ")";
      container.style.setProperty("transform", value);
      //container.style.setProperty("-webkit-transform", "translate3d(0,0,0)");
      container.style.setProperty("transform-origin", "0, 0");
    }
  }, []);

  const toggleWillChange = () => {
    const { current: container } = containerRef;
    
    if (container) {
      requestAnimationFrame(() => {
        container.style.setProperty("will-change", "transform");
        //console.log("Changing to");

        requestAnimationFrame(() => {
          container.style.setProperty("will-change", "auto");
          //console.log("Changing back");
        });
      });
    }
  };
  
  return (
    <div style={{height:"100%", width:"100%", position:"relative"}}>
    <QuickPinchZoom
      onUpdate={onUpdate}
      inertia={true}
      enforceBoundsDuringZoom={true}
      doubleTapZoomOutOnMaxScale={true}
      wheelScaleFactor={300}
      draggableUnZoomed={true}
      doubleTapToggleZoom={true}
      shouldCancelHandledTouchEndEvents={true}
      maxZoom={5}
      minZoom={0.8}
      horizontalPadding={horizontalPadding}
      verticalPadding={windowSize.height / 6} // arbitrary, but seems to work well on most screen sizes
      tapZoomFactor={5}
      zoomOutFactor={0}
      //onDragEnd={toggleWillChange}
      //onZoomEnd={toggleWillChange}
      onZoomUpdate={toggleWillChange}
      shouldInterceptWheel={shouldInterceptWheel}

      style={{height:"100%"}}
    >

      <div
        ref={containerRef}
        style={{
          width: "100dvw",
          height: "100dvh",
          transformOrigin: "0 0",
          position: "relative",
          willChange:"auto",
        }}
      >
        <div id={styles.map_content_container} >
          <img src={floor1} className={[styles.mapSVG, floorState <= 1 ? styles.floorVisible : ""].join(" ")} />
          <img src={floor2} className={[styles.mapSVG, floorState >= 1 ? styles.floorVisible : ""].join(" ")} />
          <img src={floor3} className={[styles.mapSVG, floorState == 2 ? styles.floorVisible : ""].join(" ")} />
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
