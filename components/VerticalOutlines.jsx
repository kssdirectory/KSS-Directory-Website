import main from '../styles/about-page/main.module.css'

function verticalOutlines(heightList) {
    var boxes = [];
    heightList = [200, 100, 900, 400, 300];

    for (const height in heightList) {
        boxes.push(
            <rect className = {main.outlinedBox} style = {{height: height.toString() + "px"}}/>
        )
    };

    return (
        <div className = {main.verticalDiv}>
            {boxes}
        </div>
    )
}

export default verticalOutlines;