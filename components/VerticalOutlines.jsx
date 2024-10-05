import main from '../styles/about-page/main.module.css'
import TITLE from '@/components/Titlecard'


function verticalOutlines(heightList) {
    var boxes = [];
    heightList = [20, 10, 50, 40, 30];

    for (const height of heightList) {
        boxes.push(
            <rect className = {main.outlinedBox} style = {{height: height.toString() + "vh"}}/>
        )
    };

    return (
        <div className = {main.verticalDiv}>
            {boxes}
        </div>
    )
}

export default verticalOutlines;