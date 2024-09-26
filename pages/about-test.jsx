import main from '../styles/about-page/main.module.css'
import EmptyColumn from '@/components/VerticalOutlines';


function aboutTest() {
    return (
        <div className = {main.body}>
            <div className = {main.columnsDiv}>
                <EmptyColumn/>
                <EmptyColumn/>
                <EmptyColumn/>
                <EmptyColumn/>
                <EmptyColumn/>
                <EmptyColumn/>
            </div>
        </div>
    )
}

export default aboutTest;