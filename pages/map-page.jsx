// pages/index.js
import NavBar from '@/components/navBar';
import MapPage from '/styles/map-page/map-page.module.css';
import '@/styles/globals.css'
import Head from 'next/head';
import ButtonGroup from "@/components/ButtonGroup";

import MapView from './components/MapView';

export default function Home() {
  return (
    <>
      <Head>
        <title>KSS Map</title>
        <link rel="icon" sizes="76x76" href="/static/compassLogo.ico" />
      </Head>
      
      
      <div style={{background:"var(--b0BG)"}}>
        <div style={{flexDirection:"column", display:"flex", height:"100dvh"}} class="flex-container">
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
            <MapView/>
          </div>
        </div>
      </div>
    </>
  );
}