import SimpleButtonGroup from "@/components/SimpleButtonGroup";
import { useState } from "react";
import MapSvgZoom from "./MapSvgZoom";
import Button from '@/components/Button';
import MapPage from '/styles/map-page/map-page.module.css';
import MapScaleIndicator from "./MapScaleIndicator";
import useWindowSize from "@/hooks/useWindowSize";

function MapView(){
    const [mapFloorState, setMapFloorState] = useState(0)
    const desktopReferenceIndicatorSize = 250;
    const mobileReferenceIndicatorSize = 180-30; // height of buttongroup - height of text in indicator

    const windowSize = useWindowSize();
    const mobileLayout = windowSize.width < 625;

    return (
        <>
            <MapSvgZoom
              floor1={mapFloorState <= 1 ? "/svg_assets/map_page/Floor 1.svg" : ""}
              floor2={mapFloorState >= 1 ? "/svg_assets/map_page/Floor 2.svg" : ""}
              floor3={mapFloorState == 2 ? "/svg_assets/map_page/Floor 3.svg" : ""}
              windowSize={windowSize}
            />

            <div id={MapPage.scale_indicator_div}>
              <MapScaleIndicator pixelWidth={mobileLayout ? mobileReferenceIndicatorSize : desktopReferenceIndicatorSize + "px"} sizeMeters={15} />
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