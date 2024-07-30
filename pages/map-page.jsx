// pages/index.js
import MapSvgZoom from './components/MapZoom';
import NavBar from '@/components/navBar';
import MapPage from '/styles/map-page/map-page.module.css';
import '@/styles/globals.css'
import Head from 'next/head';
import ButtonGroup from "@/components/ButtonGroup";
import Button from '@/components/Button';

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
                <div id={MapPage.header_path_div}>
                    <p id={MapPage.header_path_text}>INTERACTIVE MAP</p>
                </div>
              )}
              text_color = "#ffffff"
            >  
            </NavBar>
          </div>
          
          <div style={{ flexGrow: "1", width: "100vw", borderRadius:"25px 25px 0px 0px", overflow:"hidden", backgroundColor:"#ffffff", position:"relative"}}>
            <MapSvgZoom
              floor1="/svg_assets/map_page/floor_1_and_ground.svg"
              floor2="/svg_assets/map_page/floor_1.svg"
              floor3=""
            />

            <div id={MapPage.floor_navigation_button_div}>
              <ButtonGroup buttons={[
                  <Button text="First Floor"/>,
                  <Button text="Second Floor"/>,
                  <Button text="Third Floor"/>
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}