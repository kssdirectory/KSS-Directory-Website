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
    // Measured horizontally across a defined part of the svg
    const referenceIndicatorSize = 0.1; // what fraction of the image is covered by measure
    const referenceIndicatorMeasure = 15; // measure in meters
    const referenceStartingMeasureMultiplier = 2; 

    // at what fraction of the screen size does the indicator wrap to the next measure available 
    const wrappingValue = 1/5; 
    // 180-30; // height of buttongroup - height of text in indicator

    const windowSize = useWindowSize();
    const mobileLayout = windowSize.width < 625;

    // This function decides what values should be shown in the size indicator
    function calculateScaleIndicatorValues(mapScale){
      var pxPerMeter = (referenceIndicatorSize / referenceIndicatorMeasure) * mapScale * 
                        (windowSize.width / (mobileLayout ? 1 : 2)); // account for map being half window width on desktop

      var i = 0;
      var chosenMeasure = referenceIndicatorMeasure * referenceStartingMeasureMultiplier;
      while (chosenMeasure * pxPerMeter > (mobileLayout ? windowSize.height : windowSize.width) * wrappingValue){
        if (i > referenceIndicatorMeasure) { chosenMeasure = 1; console.error("Error choosing indicator size"); break}; // Something went wrong
        
        chosenMeasure-=3; // step down by three meters at a time
        i++;
      }

      var pixelSize = chosenMeasure * pxPerMeter;
      var sizeMeters = chosenMeasure;
      
      
      return {pixelSize:pixelSize + "px", sizeMeters:sizeMeters}
    }

    return (
        <>
            <MapSvgZoom
              floor1={"/svg_assets/map_page/Floor 1.svg"}
              floor2={"/svg_assets/map_page/Floor 2.svg"}
              floor3={"/svg_assets/map_page/Floor 3.svg"}
              floorState={mapFloorState}
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