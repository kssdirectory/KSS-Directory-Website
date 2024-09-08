import Image from "next/image";
import styles from "../styles/club_directory/landing_page/horizontal-scroll-element.module.css"; 
import { useRef, useState } from "react";
import { clamp, lerp } from "@/util/util";
import useAnimationFrame from "@/hooks/useAnimationFrame";
import isClientSide from "@/util/isClientSide";
import useIsClientSide from "@/hooks/useIsClientSide";


function HorizontalScrollElement({children, category_color}) {
    const scrollElementRef = useRef(null);
    const scrollTarget = useRef(0);

    const [arrowRightEnabled, setArrowRightEnabled] = useState(false);
    const [arrowLeftEnabled, setArrowLeftEnabled] = useState(false);

    const [firstLoad, setfirstLoad] = useState(true);
    const scrollAmount = 512;

    function handleButtonEnabledStates(currentScrollValue) {
        var maxScrollLeft = scrollElementRef.current.scrollWidth - scrollElementRef.current.clientWidth;
        if (arrowRightEnabled) {
            if (currentScrollValue >= maxScrollLeft) {
                setArrowRightEnabled(false);
            }
        } else {
            if (currentScrollValue < maxScrollLeft) {
                setArrowRightEnabled(true);
            }
        }


        if (arrowLeftEnabled) {
            if (currentScrollValue <= 0) {
                setArrowLeftEnabled(false);
            }
        } else {
            if (currentScrollValue > 0) {
                setArrowLeftEnabled(true);
            }
        }

        //console.log("New: " + currentScrollValue + " MaxScrollLeft: " + maxScrollLeft);
    }

    function rightButton() {
        //console.log("scrolling right");

        var newValue = scrollElementRef.current.scrollLeft + scrollAmount;
        scrollElementRef.current.scrollLeft = newValue;
        handleButtonEnabledStates(newValue);
        // scrollTarget.current += 500;


        // scrollTarget.current = clamp(0, maxScrollLeft, scrollTarget.current);
    }

    function leftButton() {
        //console.log("scrolling left");

        var newValue = scrollElementRef.current.scrollLeft - scrollAmount;
        scrollElementRef.current.scrollLeft = newValue;
        handleButtonEnabledStates(newValue);
        // scrollTarget.current -= 500;

        // var maxScrollLeft = scrollElementRef.current.scrollWidth - scrollElementRef.current.clientWidth + 10;
        // scrollTarget.current = clamp(0, maxScrollLeft, scrollTarget.current);
    }

    // function animate(deltaTime) {
    //     scrollElementRef.current.scrollLeft = lerp(scrollElementRef.current.scrollLeft, scrollTarget.current, 1 - Math.exp(-(1/50)*deltaTime));
    //     console.log("Target: " + scrollTarget.current + " Position: " + scrollElementRef.current.scrollLeft);
    // }
    var clientSide = useIsClientSide();

    // useAnimationFrame(animate);
    if (clientSide && firstLoad){
        handleButtonEnabledStates(scrollElementRef.current.scrollLeft);
        setfirstLoad(false);
    }

    return (
        <>
            <div className={styles.scrollElementHolder} ref={scrollElementRef}>
                <div className={styles.scrollButtonHolder}>
                    <button type="button" onClick={leftButton} className={styles.scrollButton} style={arrowLeftEnabled ? {opacity:"1"} : {}}>
                        <Image alt={"Horizontal Scroll Left"} src="/svg_assets/arrow_right.svg" width={20} height={20} className={styles.arrow_image_left}></Image>    
                    </button>  
                    <button type="button" onClick={rightButton} className={styles.scrollButton} style={arrowRightEnabled ? {opacity:"1"} : {}}>
                        <Image alt={"Horizontal Scroll Left"} src="/svg_assets/arrow_right.svg" width={20} height={20}></Image>    
                    </button>   
                </div>
                {children}
            </div>
        </>
    )
}

export default HorizontalScrollElement;