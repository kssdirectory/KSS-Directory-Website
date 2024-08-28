// pages/index.js
import NavBar from '@/components/NavBar';
import MapPage from '/styles/map-page/map-page.module.css';
import Head from 'next/head';
import dynamic from 'next/dynamic'
const MapView = dynamic(() => import('../components/map-page/MapView'), {ssr:false});

export default function Home() {
  return (
    <>
      <Head>
        <title>KSS Map</title>
        <link rel="icon" sizes="76x76" href="/static/compassLogo.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover user-scalable=no"/>
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