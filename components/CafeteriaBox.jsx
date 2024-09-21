import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import caf from "../styles/cafeteria-box.module.css"

const webServerURL = process.env.NEXT_PUBLIC_BACKEND_URL;

function cafeteriaBoxElement() {
    const { isPending, error, data } = useQuery({
        queryKey: ['cafMenu'],
        queryFn: () =>
          fetch(webServerURL + '/testing').then((res) =>
            res.json(),
          ),
      })

    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message   

    let weeklyCafMenu = [];

    for (const entry of data) {
        let foodItems = [];

        for (const item of entry.Items) {
          foodItems.push(
            <p>{item.Price + " | " + item.Item}</p>
          )
        }

        weeklyCafMenu.push(
            <div className = {caf.cafDayContainer}>
                <rect className = {caf.cafTextLine}></rect>
                <div className = {caf.cafDayInformation}>
                <h2>{entry.Day}</h2>
                {foodItems}
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