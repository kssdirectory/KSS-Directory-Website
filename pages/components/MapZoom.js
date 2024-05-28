import React, { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

const MapSvgZoom = ( {src} ) => {
  const imgRef = useRef();
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;

    if (img) {
      let scaleMod = scale * 5;
      const value = make3dTransformValue({ x, y, scale});

      img.style.setProperty("transform", value);
    }
  }, []);

  return (
    <QuickPinchZoom onUpdate={onUpdate}>
      <img ref={imgRef} src={src} />
    </QuickPinchZoom>
  );
};
export default MapSvgZoom;
