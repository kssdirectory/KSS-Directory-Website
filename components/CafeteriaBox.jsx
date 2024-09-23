import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import caf from "../styles/cafeteria-box.module.css"

const webServerURL = process.env.NEXT_PUBLIC_BACKEND_URL;

function CafeteriaMenu() {

    const loading = (
        <>
        </>
    )

    const { isPending, isError, data } = useQuery({
        queryKey: ['cafMenu'],
        queryFn: async () => {
            const res = await fetch(webServerURL + '/cafeteria_menu')
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await res.json();

            if (data.toString() == "none") {
                throw new Error('No cafeteria data!')
            }
            
            return data;
        },
        refetchOnWindowFocus: false,
    })

    if (isPending) {
        return loading;
    };

    if (isError) {
        return loading;
    };

    let menuData = data;
    let weeklyCafMenu = [];

    let menuDataSorted = [];

    for (const entry of menuData){
        switch(entry.Day) {
            case "Monday":
                menuDataSorted[0] = entry;
                break;
            case "Tuesday":
                menuDataSorted[1] = entry;
                break;
            case "Wednesday":
                menuDataSorted[2] = entry;
                break;
            case "Thursday":
                menuDataSorted[3] = entry;
                break;
            case "Friday":
                menuDataSorted[4] = entry;
                break;
        };
    };

    console.log(menuDataSorted);

    for (const entry of menuDataSorted) {
        let foodItems = [];

        for (const item of entry.Items) {
          foodItems.push(
            <p>{"$" + item.Price.replace("$", "") + " | " + item.Item}</p>
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

 export default CafeteriaMenu;