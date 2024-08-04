import useWindowSize from "@/hooks/useWindowSize";
import styles from "@/styles/map-page/map-scale-indicator.module.css"

const MapScaleIndicator = ({calculateSizeFunc, mapScale}) => {
    const windowSize = useWindowSize();
    const mobileLayout = windowSize.width < 625;

    const sizeData = calculateSizeFunc(mapScale);
    const pixelSize = sizeData.pixelSize;
    const sizeMeters = sizeData.sizeMeters;

    return (
        <div className={styles.indicatorContainer}>
            <div className={styles.visualContainer} style={{width:mobileLayout? "auto" : pixelSize, height:mobileLayout? pixelSize : "auto"}}>
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