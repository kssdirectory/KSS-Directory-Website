import caf from "../styles/cafeteria-box.module.css"

export const getMenu = async () => {
    const res = await fetch("/public/ExampleMenu.json");
    const data = await res.json();

    const menu = data;

    return {
        menu
    }
}

function cafeteriaBoxElement() {
    let weeklyCafMenu = [];
    let weeksMenu = getMenu();

    console.log("week's menu is: " + Object.entries(weeksMenu));

    for ( const[key, value] of Object.entries(weeksMenu)) {

        let foodItems = [];

        for ( const[key, value] of Object.entries(weeksMenu.Items)) {
            foodItems.push(
                <p className = {caf.infoBodyText} key = {Item}></p>
            )
        }

        weeklyCafMenu.push(
        <div className = {caf.cafDayContainer}>
            <rect className = {caf.cafTextLine}></rect>
            <div className = {caf.cafDayInformation}>
            <h2>[Day of Week]</h2>
            {daysFood}
            </div>
        </div>
        );
    }   
    
    return (
        <div className = {caf.cafMenuBox}>
            <div className = {caf.cafTitleCard}>
                <div className = {caf.infoHeaderText}>Cafeteria Menu</div>
                <div className = {caf.infoBodyText}>Take a look ahead at this week's lunchtime cafeteria menu!</div>
            </div>
            <div className = {caf.cafMenuContainer}>
                {weeklyCafMenu}
            </div>
        </div>
    )
 };

 export default cafeteriaBoxElement;