import main from '@/styles/about-page/main.module.css'

function infobox(bgColour) {

    var bgColour = "#113451"

    return (
        <div className = {main.infoContainer} style = {{backgroundColor: bgColour}}> 
            <div className = {main.textDiv}>
                <h2>Matthew Kong</h2>
                <p>2023-2024</p>
                <h2>Matthew Kabin</h2>
                <p>2024-2025</p>
            </div>
        </div>
    )
};

export default infobox