import main from '@/styles/about-page/main.module.css';
// import TITLE from '@/components/about/Titlecard'
import TextBox from '@/components/about/InfoBox';
import Image from "next/image";
import Header from '@/components/about/BigTextBox';

function verticalOutlines(props) {
    
    var boxes = [];
    var aboveTitle = [];

    var buttonColor = "#072136"
    var heightList = props.heightList;
    var vertOffset = props.vertOffset;
    var textLine1 = props.line1;
    var textLine2 = props.line2;
    var names = props.nameList;
    var infoToggle = props.infoToggle;

    for (const height of heightList) {
        boxes.push(
            <rect className = {main.outlinedBox} style = {{height: height.toString() + "vh"}}/>
        )
    };

    return (
        <div className = {main.verticalDiv} style = {{marginTop: vertOffset.toString() + "vh"}}>
            {aboveTitle}
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
                <h2 className = {main.titleText}> {textLine1} <br/>{textLine2}</h2>
            </div>
            <TextBox
                nameList = {names}
            />
            <Header/>
            {boxes}
        </div>
    )
}

export default verticalOutlines;