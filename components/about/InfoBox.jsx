import main from '@/styles/about-page/main.module.css'

function infobox(bgColour) {

    var bgColour = "#113451"
    var names = [];

    var nameList = [["Matthew Kong", "2024-2025"], ["Matthew Kabin","2024-2026"], ["Ethan Tian", "2024-2026"]]

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