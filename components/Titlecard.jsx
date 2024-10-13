import main from '../styles/about-page/main.module.css'
import Image from "next/image";

function titlecard() {

    var buttonColor = "#072136"

    return(
        <div className = {main.titleHeader}>
            <Image
                src = {"/static/sunset.png"}
                width = {1280}
                height = {720}
                className = {main.titleImage}
                alt = {"header"}
            />
            <div className = {main.imageGradient}/>
            <div className={main.maskGradient} style = {{background: "linear-gradient(180deg, " + buttonColor + " 49%, " + buttonColor + " 100%)"}}/>
            <h2 className = {main.titleText}>Web & Bot Development</h2>
        </div>
    )
}

export default titlecard