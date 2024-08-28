import { useEffect, useState } from "react";
import isClientSide from "./isClientSide";

function useIsClientSide(){
    const [isClient, setIsClient] = useState(false);

    if (isClientSide()){
        useEffect(() => {
            setIsClient(true);
        }, [])
    }
    return isClient;
}

export default useIsClientSide;