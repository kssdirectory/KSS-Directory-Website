import main from '@/styles/about-page/main.module.css'

function infobox(props) {

    var bgColour = "#113451";
    var names = [];
    
    var nameList = props.nameList;

    for (const name of nameList) {
            names.push(
                <div className = {main.textDiv}>
                <h2>{name[0]}</h2>
                <p>{name[1]}</p>
            </div>
            )
        };

    return (
        <div className = {main.infoContainer} style = {{backgroundColor: bgColour}}> 
            <div className = {main.textDiv}>
                {names}
            </div>
        </div>
    )
};

export default infobox