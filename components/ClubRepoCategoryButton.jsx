import { hexToRgba } from "@/util/util";
import styles from "../styles/club_directory/landing_page/club-repo-category-button.module.css"
import Link from "next/link";

function ClubRepoCategoryButton({cateogry_name, href = "../", categoryColor = "#6485D8", banner_image = "../static/sunset.png"}) {

    const color_rgba = hexToRgba(categoryColor);
    const faded_color = "rgba("+[color_rgba.r, color_rgba.g, color_rgba.b].join(",")+", 0)";


    if (banner_image == "") {
        banner_image = "../static/sunset.png";
    }

    return (
    <div className={styles.button_div}>
        {/* <img src = {banner_image} className={styles.button_image}/> */}
        <div className={styles.button_image_gradient}/>
        <h2 className={styles.button_title}>{cateogry_name}</h2>
        <div className={styles.button_icon_holder_div}>
            <img src = "/svg_assets/arrow_icon_white.svg" className={styles.button_corner_icon_image}/>
        </div>
        <Link className={styles.link} href = {href} ></Link>
    </div>
    );
}

export default ClubRepoCategoryButton;