import main from '@/styles/about-page/main.module.css';
import Hero from '@/components/about/AboutHero';
import Header from '@/components/about/BigTextBox';

function centralColumn(props) {
    
    
    var columns = [];

    for (const column of columnList) {
        
        var oneColumn = [];

        for (const boxes of column) {
            
            if (typeof boxes == "number"){
                oneColumn.push(
                    <rect className = {main.outlinedBox} style = {{height: height.toString() + "vh"}}/>
                )
            } else {
                oneColumn.push(
                    boxes
                )
            };
        };
        
        columns.push(
            <div className = {main.verticalDiv}>
                {oneColumn}
            </div>
        );
    };
    

    return (
        <div className = {main.centralDiv}>
            <Hero/>
            <div className = {main.centralBoxes}>
                {columns}
            </div> 
        </div>
    )
};

export default centralColumn