import styles from "styles/club_directory/landing_page/slide-carousel.module.css"

function SlideCarousel({slides}) {
    const positionIndicators = [];
    
    return (
        <>
            <div id={styles.slide_container}>
                {slides}
            </div>
            
            <div id={styles.navigation_control_div}>
                <div id={styles.arrow_button_div}>
                    <div className={styles.nav_button}>
                        <img className={styles.chevronLeft}/>
                    </div>
                    <div className={styles.nav_button}>
                        <img className={styles.chevronRight}/>
                    </div>
                </div>

                <div id={styles.position_indicator_div}>
                    {positionIndicators}
                </div>
            </div>
        </>
    );
}

export default SlideCarousel;