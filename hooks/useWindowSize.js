const { useState, useEffect } = require("react");

function useWindowSize(){
    const [windowSize, setWindowSize] = useState({width:0, height:0});

    useEffect(() => {
        function handleResize() {
            setWindowSize({width:window.innerWidth, height:window.innerHeight})
        }
        
        handleResize();
        window.addEventListener('resize', handleResize);
        
        return function cleanup(){
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return windowSize;
}

export default useWindowSize;