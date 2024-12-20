import main from '@/styles/about-page/main.module.css'
import TITLE from '@/components/about/Titlecard'
import TextBox from '@/components/about/InfoBox'

function verticalOutlines(props) {
    var boxes = [];
    var heightList = props.heightList;
    var vertOffset = props.vertOffset;

    for (const height of heightList) {
        boxes.push(
            <rect className = {main.outlinedBox} style = {{height: height.toString() + "vh"}}/>
        )
    };

    return (
        <div className = {main.verticalDiv} style = {{marginTop: vertOffset.toString() + "vh"}}>
            <TITLE/>
            <TextBox/>
            {boxes}
        </div>
    )
}

export default verticalOutlines;