import main from '../styles/about-page/main.module.css'
import Column from '@/components/VerticalOutlines';


function aboutTest() {

    var vertOffsets = [0, 0, 500, 550, 0, 0];
    var heights = [50, 100, 40, 20, 30];
    var vertColumns = [];

    for (const offset of vertOffsets) {
        vertColumns.push(
            <Column
                vertOffset = {offset}
                heightList = {heights}
            />
        )
    };

    return (
        <div className = {main.body}>
            <div className = {main.columnsDiv}>
                {vertColumns}
            </div>
        </div>
    );
}

export default aboutTest;