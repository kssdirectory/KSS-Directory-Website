import { hexToRgba } from "@/util/util";
import styles from "../styles/club_directory/landing_page/club-repo-button.module.css"

function ClubRepoButton({club_name, categoryColor, banner_image}) {

    const color_rgba = hexToRgba(categoryColor);
    const faded_color = "rgba("+[color_rgba.r, color_rgba.g, color_rgba.b].join(",")+", 0)"

    return (
    <div className={styles.button_div}>
        <img src = {banner_image} className={styles.button_image}/>
        <div className={styles.button_image_gradient}/>
        <div className={styles.category_color_mask_gradient} style = {{background: "linear-gradient(90deg, " + faded_color + " 49%, " + categoryColor + " 100%)"}}/>
        <h2 className={styles.button_title}>{club_name}</h2>
        <div className={styles.button_icon_holder_div}>
            <img src = "../svg_assets/arrow_icon_white.svg" className={styles.button_corner_icon_image}/>
        </div>
    </div>
    );
}

export default ClubRepoButton;