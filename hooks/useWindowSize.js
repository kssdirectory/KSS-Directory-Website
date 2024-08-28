import { useIsomorphicLayoutEffect } from "@react-spring/web";
import isClientSide from "./isClientSide";

const { useState } = require("react");

function useWindowSize(affectsHydration = false){
    const [windowSize, setWindowSize] = useState(getDefaultValue());

    function getDefaultValue() {
        if (affectsHydration){
            return {width:undefined, height:undefined};
        }

        return isClientSide() ? {width:window.innerWidth, height:window.innerHeight} : {width:undefined, height:undefined}
    }

    function handleChange() {
        setWindowSize({width:window.innerWidth, height:window.innerHeight});
    }

    useIsomorphicLayoutEffect(() => {
        function handleResize() {
            handleChange();
        }
        
        if (affectsHydration) {
            // Triggered at the first client-side load
            handleChange();
        }
        //console.log("Rerunning!")

        window.addEventListener('resize', handleResize);
        
        return function cleanup(){
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return windowSize;
}

export default useWindowSize;