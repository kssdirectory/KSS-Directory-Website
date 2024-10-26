import { hexToRgba } from "@/util/util";
import styles from "@/styles/club_directory/landing_page/club-repo-category-button.module.css"
import Link from "next/link";
import Image from "next/image";

function ClubRepoCategoryButton({cateogry_name, href = "../", categoryColor = "#6485D8", categoryImage = "../svg_assets/compass_logo_vector.svg"}) {

    const color_rgba = hexToRgba(categoryColor);
    const faded_color = "rgba("+[color_rgba.r, color_rgba.g, color_rgba.b].join(",")+", 0)";


    if (categoryImage == "") {
        categoryImage = "../svg_assets/compass_logo_vector.svg";
    }

    return (
    <div className={styles.button_div}>
        {/* <img src = {banner_image} className={styles.button_image}/> */}
        <div className = {styles.category_pattern_holder_div}>
            <img src = {categoryImage} className={styles.pattern_image} />
            <div className = {styles.category_pattern_gradient} />
        </div>
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