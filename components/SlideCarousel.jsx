import useWindowSize from "@/hooks/useWindowSize";
import { clamp } from "@/util/util";
import { useEffect, useRef, useState } from "react";
import styles from "styles/club_directory/landing_page/slide-carousel.module.css"

function SlideCarousel({children, autoScroll, autoscrollTimeSeconds = 6}) {
    const [slidePosition, setSlidePosition] = useState(0);
    const windowSize = useWindowSize();

    const slideElementRef = useRef(null);
    const slideViewportRef = useRef(null);
    const leftButtonRef = useRef(null);
    const rightButtonRef = useRef(null);

    const maxSlideIndex = children.length - 1;

    const autoScrollTimerMs = autoscrollTimeSeconds * 1000; // ms between each autoscroll event
    const autoScrollEnabled = useRef(autoScroll);

    // timeout object for canceling if need be
    let autoScrollObject = undefined;

    const positionIndicators = children.map((slide, index) => {
        return (
            <button onClick={() => { setSlidePosition(index); autoScrollEnabled.current = false; }} className={styles.position_indicator_bubble} key={"Slide " + index}>
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
        //updateButtonStates();
    }, [windowSize, slidePosition]);

    useEffect(() => {
        if (autoScrollEnabled.current) {
            autoScrollObject = setTimeout(() => {
                let nextSlide = slidePosition + 1;
                if (nextSlide > maxSlideIndex) {
                    nextSlide = 0;
                }
                //console.log(slidePosition + " " + nextSlide)

                setSlidePosition(nextSlide);
            }, autoScrollTimerMs);
        }
        // runs on unmount
        return () => clearTimeout(autoScrollObject);
    }, [slidePosition]);

    function rightButton() {
        setSlidePosition(clamp(0, maxSlideIndex, slidePosition + 1));

        // disable autoscroll when button clicked
        autoScrollEnabled.current = false;
    }

    function leftButton() {
        setSlidePosition(clamp(0, maxSlideIndex, slidePosition - 1));

        // disable autoscroll when button clicked
        autoScrollEnabled.current = false;
    }

    return (
        <>
            <div className={styles.slide_viewport} ref={slideViewportRef}>
                <div className={styles.slide_container} ref={slideElementRef}>
                    {children}
                </div>
            </div>  
            <div className={styles.navigation_control_div}>
                <button onClick={leftButton} disabled={slidePosition <= 0 ? true : false} className={styles.nav_button}>
                    <img src="/svg_assets/chevron_right_big.svg" ref={leftButtonRef} className={styles.chevronLeft}/>
                </button>

                <div className={styles.position_indicator_div}>
                    {positionIndicators}
                </div>

                <button onClick={rightButton} disabled={slidePosition >= maxSlideIndex ? true : false} className={styles.nav_button}>
                    <img src="/svg_assets/chevron_right_big.svg" ref={rightButtonRef} className={styles.chevronRight}/>
                </button>
            </div>
        </>
    );
}

export default SlideCarousel;