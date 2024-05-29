// pages/index.js
import MapSvgZoom from './components/MapZoom';

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor:"var(--b0BG)"}}>
      <MapSvgZoom src="/svg_assets/map_page/floor_1_and_ground.svg" style={{ width: '100vw', height: '100vh'}}/>
    </div>
  );
}