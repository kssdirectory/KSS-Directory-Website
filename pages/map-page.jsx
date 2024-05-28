// pages/index.js
import MapSvgZoom from './components/MapZoom';

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapSvgZoom src="/svg_assets/map_page/floor_1.svg" />
    </div>
  );
}