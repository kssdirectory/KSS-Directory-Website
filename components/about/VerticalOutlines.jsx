import main from '@/styles/about-page/main.module.css'
import TITLE from '@/components/about/Titlecard'
import TextBox from '@/components/about/InfoBox'

function verticalOutlines(props) {
    var boxes = [];
    var aboveTitle = [];
    var heightList = props.heightList;
    var vertOffset = props.vertOffset;
    var textLine1 = props.line1;
    var textLine2 = props.line2;

    for (const height of heightList) {
        boxes.push(
            <rect className = {main.outlinedBox} style = {{height: height.toString() + "vh"}}/>
        )
    };

    return (
        <div className = {main.verticalDiv} style = {{marginTop: vertOffset.toString() + "vh"}}>
            {aboveTitle}
            <TITLE
                line1 = {textLine1}
                line2 = {textLine2}
            />
            <TextBox/>
            {boxes}
        </div>
    )
}

export default verticalOutlines;