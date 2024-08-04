const { useState, useEffect } = require("react");

function useWindowSize(){
    const [windowSize, setWindowSize] = useState(typeof window !== 'undefined' ? {width:window.innerWidth, height:window.innerHeight} : {width:undefined, height:undefined});

    useEffect(() => {
        function handleResize() {
            setWindowSize({width:window.innerWidth, height:window.innerHeight})
        }
        
        window.addEventListener('resize', handleResize);
        
        return function cleanup(){
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return windowSize;
}

export default useWindowSize;