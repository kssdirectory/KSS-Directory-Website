import styles from "../styles/club_directory/landing_page/club-repo-button-list.module.css"
import ClubRepoButton from "./ClubRepoButton";

const webServerURL = process.env.NEXT_PUBLIC_BACKEND_URL;

function ClubRepoButtonList({categoryClubData, categoryColor = "#6485D8"}) {

    function bannerGetRequest(URL) {
        return webServerURL + "/specific_club_images/" + URL + "/banner";
    }

    let clubs = [];
    for (const i in categoryClubData) {
        clubs.push(categoryClubData[i]);
    }

    const clubButtons = clubs.map(club => 
        <ClubRepoButton 
            club_name = {club["Club_Name"]}  
            href = {"../clubs/club-page/" + club["URL"]} 
            banner_image={"banner" in club["Images"] ?  bannerGetRequest(club["URL"]) : ""} 
            categoryColor={categoryColor} 
            key={club["Club_Name"]}
        />
    )


    return (
        <div className={styles.carousel_container}>
            {clubButtons}
        </div>
    );
}

export default ClubRepoButtonList;