import React, { useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

const MapSvgZoom = ({ src }) => {
  const svgRef = useRef();
  const [{ x, y, scale }, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }));

  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        console.log(`Dragging to x: ${x}, y: ${y}`);
        api.start({ x, y })
      },
      onPinch: ({ offset: [scale] }) => {
        console.log(`Pinching with scale: ${scale}`);
        api.start({ scale: 1 + scale / 100 })
      }
    },
    {
      drag: { from: () => [x.get(), y.get()] },
      pinch: { scaleBounds: { min: 0.5, max: 4 }, from: () => [scale.get() - 1] },
    }
  );

  return (
    <div
      {...bind()}
      style={{ touchAction: 'none', overflow: 'hidden', width: '100%', height: '100%' }}
    >
      <animated.svg
        ref={svgRef}
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: 'center center',
          transform: scale.to(s => `scale(${s})`) + x.to((x) => `translate(${x}px)`) + y.to((y) => `translate(${y}px)`),
        }}
      >
        <image href={src} x="400" y="0" width="800" height="600" />
      </animated.svg>
    </div>
  );
};
export default MapSvgZoom;
