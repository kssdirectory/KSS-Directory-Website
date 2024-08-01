import SimpleButtonGroup from "@/components/SimpleButtonGroup";
import { useState } from "react";
import MapSvgZoom from "./MapZoom";
import Button from '@/components/Button';
import MapPage from '/styles/map-page/map-page.module.css';

function MapView(){
    const [mapFloorState, setMapFloorState] = useState(0)

    return (
        <>
            <MapSvgZoom
              floor1={mapFloorState <= 1 ? "/svg_assets/map_page/Floor 1.svg" : ""}
              floor2={mapFloorState >= 1 ? "/svg_assets/map_page/Floor 2.svg" : ""}
              floor3={mapFloorState == 2 ? "/svg_assets/map_page/Floor 3.svg" : ""}
            />

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
                  />
                }
              />
            </div>
        </>
    );
}

export default MapView;