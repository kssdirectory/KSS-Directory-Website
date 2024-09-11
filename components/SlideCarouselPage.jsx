import styles from "styles/club_directory/landing_page/slide-carousel.module.css"

function SlideCarouselPage({children, name}) {
    return (
        <div className={styles.slide} key={name} >
            {children}
        </div>
    );
}

export default SlideCarouselPage;