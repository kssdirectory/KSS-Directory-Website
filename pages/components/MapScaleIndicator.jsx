import styles from "@/styles/map-page/map-scale-indicator.module.css"

const MapScaleIndicator = ({pixelWidth, sizeMeters}) => {
    return (
        <div className={styles.indicatorContainer} style={{width:pixelWidth}}>
            <div className={styles.visualContainer}>
                <div className={styles.distanceTickContainer}>
                    <div className={styles.leftTickLine}></div>
                    <div className={styles.centerTickLine}></div>
                    <div className={styles.rightTickLine}></div>
                </div>
                <div className={styles.bottomLine}></div>
            </div>
            <h3 className={styles.scaleText}>{sizeMeters}m</h3>
        </div>
    );
}

export default MapScaleIndicator;