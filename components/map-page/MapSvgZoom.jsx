import React, { useCallback, useEffect, useRef, useState } from "react";
import QuickPinchZoom, { make3dTransformValue, make2dTransformValue, hasTranslate3DSupport } from "react-quick-pinch-zoom";
import { ReactSVG } from "react-svg";
import styles from "@/styles/map-page/map-page.module.css"
import { useIsomorphicLayoutEffect } from "@react-spring/web";

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
    //console.log("scale is " + scale);

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

  const [isTouch, setIsTouch] = useState(!matchMedia('(pointer:fine)').matches);
  let [keyValue, setKeyValue] = useState(0);

  function handleClick({pointerType}) {
      if (pointerType === "mouse") {
        //console.log("mouse clicked, touch state: " + isTouch);
        if(isTouch) {
          setIsTouch(false);

          // Reason for this atrocity is because this poorly written library only checks the isTouch prop in it's constructor
          // which react helpfully only runs once at the beginning when the page loads
          // lovely
          // here's why I'm changing the key
          // https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
          setKeyValue(keyValue + 1);

          //console.log("mouse");
        }
      }
      
      else if (pointerType === "touch") {
        //console.log("touched, touch state " + isTouch);
        if(!isTouch) {
          setIsTouch(true);
          setKeyValue(keyValue + 1);
          //console.log("touch");
        }
      }
  }

 

  useIsomorphicLayoutEffect( () => {
    document.addEventListener("pointerup", handleClick);

    return () => {
      document.removeEventListener("pointerup", handleClick);
    }
  }, [keyValue, isTouch]);

  function getTouch() {
    // console.log(!matchMedia('(pointer:fine)').matches);
    // return !matchMedia('(pointer:fine)').matches;
    //console.log("Rerunning constructor. I hate this library. Touch value is now " + isTouch);
    return isTouch;
  }

  
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
      isTouch={getTouch}

      key={keyValue}

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
