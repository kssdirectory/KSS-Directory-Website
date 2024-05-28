import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const MapSvg = () => {
  const svgRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startDragOffset, setStartDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartDragOffset({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - startDragOffset.x,
      y: e.clientY - startDragOffset.y,
    });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const scaleAmount = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prevZoom) => Math.min(Math.max(prevZoom * scaleAmount, 0.5), 3));
  };

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      svgElement.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (svgElement) {
        svgElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100vw"
      height="100vh"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: 'hidden',
      }}
    >
      <g
        transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
      >
        {/* Replace with your actual SVG content */}
        <svg x="10" y="10" src="../svg_assets/map_page/floor_1.svg"/>
        <div>
          <Image x="10" y="10" src="/svg_assets/map_page/kassy_art_comm.png" width="300" height="500"/>
        </div>
        <rect x="10" y="10" width="100" height="100" fill="blue" />
        <circle cx="200" cy="200" r="50" fill="red" />
        
        {/* Example SVG content ends */}
      </g>
    </svg>
  );
};

export default MapSvg;
