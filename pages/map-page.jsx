// pages/index.js
import MapSvgZoom from './components/MapZoom';
import NavBar from '@/components/navBar';
import mapPage from '/styles/map-page/map-page.module.css';
import '@/styles/globals.css'
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>KSS Map</title>
        <link rel="icon" sizes="76x76" href="/static/compassLogo.ico" />
      </Head>
      

      <div style={{background:"var(--b0BG)"}}>
        <div style={{flexDirection:"column", display:"flex", height:"100vh"}} class="flex-container">
          <div style={{flexShrink:"0"}}>
            <NavBar
              extra_additions={(
                <div id={mapPage.header_path_div}>
                    <p id={mapPage.header_path_text}>INTERACTIVE MAP</p>
                </div>
              )}
              text_color = "#ffffff"
            >  
            </NavBar>
          </div>
          
          <div style={{ flexGrow: "1", width: "100vw", borderRadius:"25px 25px 0px 0px", overflow:"hidden", backgroundColor:"#ffffff" }}>
            <MapSvgZoom style={{ width: "100vw", height: "100%"}}
            floor1="/svg_assets/map_page/floor_1_and_ground.svg"
            floor1_roof=""
            floor2="/svg_assets/map_page/floor_2.svg"
            floor2_roof=""
            floor3=""
            />
          </div>
        </div>
      </div>
    </>
  );
}