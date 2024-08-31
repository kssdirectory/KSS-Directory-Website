import Link from "next/link";
import styles from "../styles/back-arrow-button.module.css"

const BackArrowButton = ({href, className}) => {
    return (
        <div id={styles.mobile_back_button_div}>
            <div className = {className}>
                <Link href = {href} style={{all:"unset"}}>
                    <img src = "/svg_assets/back_arrow.svg" className={styles.arrowIcon}/>
                </Link>
            </div>
        </div>
    );
}

export default BackArrowButton;