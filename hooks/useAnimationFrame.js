import { useEffect, useRef } from "react";

function useAnimationFrame(animationFrameHandler) {
    const animationFrame = useRef(0);
    const previousTime = useRef(0);

    function animate(time) {
        animationFrameHandler(time - previousTime.current);

        animationFrame.current = requestAnimationFrame(animate);
        previousTime.current = time;
    }

    useEffect(() => {
        animationFrame.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame.current);
    }, [])
}

export default useAnimationFrame;