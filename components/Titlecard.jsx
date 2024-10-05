import main from '../styles/about-page/main.module.css'
import Image from "next/image";

function titlecard() {
    return(
        <div className = {main.titleHeader}>
            <Image
                src = {"/static/sunset.png"}
                width = {1280}
                height = {720}
                alt = {"header"}
            />
            <h2 className = {main.titleText}>Hi</h2>
        </div>
    )
}

export default titlecard