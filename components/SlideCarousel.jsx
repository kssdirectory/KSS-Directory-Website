import useWindowSize from "@/hooks/useWindowSize";
import { clamp } from "@/util/util";
import { useEffect, useRef, useState } from "react";
import styles from "styles/club_directory/landing_page/slide-carousel.module.css"

function SlideCarousel({children}) {
    const [slidePosition, setSlidePosition] = useState(0);
    const windowSize = useWindowSize();

    const slideElementRef = useRef(null);
    const slideViewportRef = useRef(null);

    const maxSlideIndex = children.length - 1;

    function jumpToSlide(index) {
        console.log("AA: " + index)
        setSlidePosition(index);
    }

    const positionIndicators = children.map((slide, index) => {
        return (
            <button onClick={() => { jumpToSlide(index); }} className={styles.position_indicator_bubble} key={"Slide " + index}>
                <div className={styles.position_indicator_inner_bubble} style={slidePosition == index ? {width: "17px", height: "17px"} : {}} />
            </button>
        );
    });

    function calculateOffset() {
        var slideOffset = slideViewportRef.current.offsetWidth * slidePosition;
        slideElementRef.current.style.right = slideOffset.toString() + "px";
    }

    useEffect(() => {
        calculateOffset();
    }, [windowSize, slidePosition])

    function rightButton() {
        setSlidePosition(clamp(0, maxSlideIndex, slidePosition + 1));
    }

    function leftButton() {
        setSlidePosition(clamp(0, maxSlideIndex, slidePosition - 1));
    }

    return (
        <>
            <div className={styles.slide_viewport} ref={slideViewportRef}>
                <div className={styles.slide_container} ref={slideElementRef}>
                    {children}
                </div>
            </div>  
            <div className={styles.navigation_control_div}>
                <div className={styles.arrow_button_div}>
                    <button onClick={leftButton} className={styles.nav_button}>
                        <img className={styles.chevronLeft}/>
                    </button>
                    <button onClick={rightButton} className={styles.nav_button}>
                        <img className={styles.chevronRight}/>
                    </button>
                </div>

                <div className={styles.position_indicator_div}>
                    {positionIndicators}
                </div>
            </div>
        </>
    );
}

export default SlideCarousel;