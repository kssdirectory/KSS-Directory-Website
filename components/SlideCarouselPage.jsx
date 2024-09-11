import useWindowSize from "@/hooks/useWindowSize";
import { useIsomorphicLayoutEffect } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import styles from "styles/club_directory/landing_page/slide-carousel.module.css"

function SlideCarouselPage({children, name}) {
    const windowSize = useWindowSize();
    const pageRef = useRef(null);

    const [width, setWidth] = useState("100%");
    
    useIsomorphicLayoutEffect(() => {
        setWidth(pageRef.current.parentNode.offsetWidth + "px");
        //console.log("width " + width)
    }, [windowSize])


    return (
        <div className={styles.slide} ref={pageRef} style={{width: width}} key={name} >
            {children}
        </div>
    );
}

export default SlideCarouselPage;