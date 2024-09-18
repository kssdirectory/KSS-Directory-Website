import styles from "../styles/club_directory/landing_page/club-repo-button-list.module.css"
import ClubRepoButton from "./ClubRepoButton";

const webServerURL = process.env.NEXT_PUBLIC_BACKEND_URL;

function ClubRepoButtonList({categoryClubData, categoryColor = "#6485D8"}) {

    function bannerGetRequest(URL, image_hash) {
        return webServerURL + "/specific_club_images/" + URL + "/banner?hash=" + image_hash;
    }

    let activeClubs = [];
    let inactiveClubs = [];
    for (const i in categoryClubData) {
        if (categoryClubData[i].Listed === "Yes") {
            if (categoryClubData[i].Activity == "Yes") {
                activeClubs.push(categoryClubData[i]);
            } else {
                inactiveClubs.push(categoryClubData[i]);
            }
        }
    }

    let clubs = [];
    clubs.push(...activeClubs);
    clubs.push(...inactiveClubs);

    //console.log("Clubs " + JSON.stringify(clubs, null, 4));

    const clubButtons = clubs.map(club => {
        const bannerURL = "banner" in club["Images"] ?  bannerGetRequest(club["URL"], club["Images"]["banner"]["Hash"]) : "";

        return (
            <ClubRepoButton 
                club_name = {club["Club_Name"]}  
                href = {"../club-pages/" + club["URL"]} 
                banner_image={bannerURL} 
                categoryColor={categoryColor} 
                key={club["Club_Name"]}
            />
        )
    }
    )


    return (
        <div className={styles.carousel_container}>
            {clubButtons}
        </div>
    );
}

export default ClubRepoButtonList;