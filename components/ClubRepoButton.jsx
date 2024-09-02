import { hexToRgba } from "@/util/util";
import styles from "../styles/club_directory/landing_page/club-repo-button.module.css"
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

function ClubRepoButton({club_name, href = "../", categoryColor, banner_image = "../static/sunset.png"}) {
    const color_rgba = hexToRgba(categoryColor);
    const faded_color = "rgba("+[color_rgba.r, color_rgba.g, color_rgba.b].join(",")+", 0)";


    if (banner_image == "") {
        banner_image = "../static/sunset.png";
    }

    return (
    <div className={styles.button_div}>
        <Image 
            src = {banner_image} 
            onLoad={(e) => e.target.style.opacity = "1"}
            width = {1280}
            height = {720}
            className={[styles.button_image, "easeImageload"].join(" ")}
            alt = {club_name}
            minimumCacheTTL = {30}
        />
        <div className={styles.button_image_gradient}/>
        <div className={styles.category_color_mask_gradient} style = {{background: "linear-gradient(90deg, " + faded_color + " 49%, " + categoryColor + " 100%)"}}/>
        <h2 className={styles.button_title}>{club_name}</h2>
        <div className={styles.button_icon_holder_div}>
            <img src = "/svg_assets/arrow_icon_white.svg" className={styles.button_corner_icon_image}/>
        </div>
        <Link className={styles.link} href = {href} ></Link>
    </div>
    );
}

export default ClubRepoButton;