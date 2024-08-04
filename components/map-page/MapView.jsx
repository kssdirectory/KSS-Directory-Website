import SimpleButtonGroup from "@/components/SimpleButtonGroup";
import { useState } from "react";
import Button from '@/components/Button';
import MapPage from '/styles/map-page/map-page.module.css';
import MapScaleIndicator from "./MapScaleIndicator";
import dynamic from 'next/dynamic'
import useWindowSize from "@/hooks/useWindowSize";
import MapSvgZoom from "./MapSvgZoom";

//const MapSvgZoom = dynamic(() => import("./MapSvgZoom"), {ssr:false});

function MapView(){
    const [mapFloorState, setMapFloorState] = useState(0);
    const [mapZoomValue, setMapZoomValue] = useState(1);
    const desktopReferenceIndicatorSize = 250;
    const mobileReferenceIndicatorSize = 180-30; // height of buttongroup - height of text in indicator

    const windowSize = useWindowSize();
    const mobileLayout = windowSize.width < 625;

    // This function decides what values should be shown in the size indicator
    function calculateScaleIndicatorValues(mapScale){
      console.log("Recalculating indicator size");
      
      var pixelSize = mobileLayout ? mobileReferenceIndicatorSize : desktopReferenceIndicatorSize;
      var sizeMeters = 15;
      
      return {pixelSize:pixelSize + "px", sizeMeters:sizeMeters}
    }

    return (
        <>
            <MapSvgZoom
              floor1={mapFloorState <= 1 ? "/svg_assets/map_page/Floor 1.svg" : ""}
              floor2={mapFloorState >= 1 ? "/svg_assets/map_page/Floor 2.svg" : ""}
              floor3={mapFloorState == 2 ? "/svg_assets/map_page/Floor 3.svg" : ""}
              windowSize={windowSize}
              setZoomFunc={setMapZoomValue}
            />

            <div id={MapPage.scale_indicator_div}>
              <MapScaleIndicator mapScale={mapZoomValue} calculateSizeFunc={calculateScaleIndicatorValues} />
            </div>

            <div id={MapPage.floor_navigation_button_div}>
              <SimpleButtonGroup 
                buttonData={[
                  {text:"First Floor", stateID: 0},
                  {text:"Second Floor", stateID: 1},
                  {text:"Third Floor", stateID: 2},
                ]}
                renderButtonFunc={(buttonData) => 
                  <Button 
                    text = {buttonData.text}
                    selected = {mapFloorState === buttonData.stateID}
                    stateID = {buttonData.stateID}
                    onClick = {setMapFloorState}
                    key={buttonData.stateID} // This line avoids a warning from react
                  />
                }
              />
            </div>
        </>
    );
}

export default MapView;