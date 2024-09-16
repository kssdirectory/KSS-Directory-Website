import Head from 'next/head';
import Image from 'next/image';
import main from '../../styles/club_directory/club_pages/main.module.css';
import NavBar from "@/components/NavBar";
import { useRouter } from 'next/router'
import Link from 'next/link';
import { hexToHSL, hslToHex } from '@/util/util';
import BackArrowButton from '@/components/BackArrowButton';

const webServerURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// -------------------- Routing & Setup -------------------- //

export const getStaticPaths = async () => {
    const res = await fetch(webServerURL + "/club_repo_main");
    const data = await res.json();

    const paths = data.map(listed_pages => {
        return {
            params: { URL: listed_pages.Content.Metadata.URL.toString() }
        }
    })

    return {
        paths,
        fallback: true // If page hasn't been generated before, display a fallback while it loads for the first time 
    }
}

export const getStaticProps = async (context) => {
    const URL = context.params.URL;
    const res = await fetch(webServerURL + "/specific_club_repo/" + URL);
    const data = await res.json();
    
    // Backend can't find club
    if (data.toString() == "none") {
        return {
            notFound: true,
            revalidate: 30
        }
    }

    return {
        props: { listed_page:data},
        revalidate: 30 // re-generate the page if it's been more than thirty seconds since the last request, while regenerating, will still show old page, but next visitor will see new page.
    }
}

// -------------------- Page Code -------------------- //

function convert_iso_time(raw_time) {
    // converts a time in iso 8601 format (e.g. 13:35 or 02:16) to standard American time (e.g. 1:35 PM or 2:16 AM)
    let converted_time = ""
    if (raw_time[0] === "0") {
        if (raw_time[1] !== "0"){
            converted_time += raw_time.slice(1) + " AM"
        } else {
            converted_time += 12 + raw_time(2) + " AM"
        }
    } else if (raw_time[0] === "1" && Number(raw_time[1]) < 3) {
        converted_time += raw_time + " AM"
    } else if (raw_time[0] !== "0" && 12 < Number(raw_time.slice(0,3)) < 25) {
        converted_time += (Number(raw_time.slice(0,2)) - 12).toString() + raw_time.slice(2) + " PM"
    } else {
        return "{invalid time}"
    }
    return converted_time
}

function getClubLogoElement(listed_page, club_accent_color){
    const club_logo = [];
    var club_logo_img;


    if ("Images" in listed_page && "logo" in listed_page?.Images) {
        // if there is a logo
        club_logo_img = (
            <Image src={webServerURL + "/specific_club_images/" + listed_page.Metadata.URL + "/logo?hash=" + listed_page["Images"]["logo"]["Hash"]}
            width="256"
            height="256"
            //TODO: make this support non-square logos
            id={main.club_logo}
            alt={"Club logo"}
            className={"easeImageload"}
            onLoad={(e) => e.target.style.opacity = "1"}
            />
        )
    } else {
        // provide default logo in case webserver is unavailable
        club_logo_img = (
            <Image src={"/static/defaultClubLogo.png"}
            width="90"
            height="90"
            //TODO: make this support non-square logos
            id={main.club_logo} 
            alt={"Club logo"}
            className={"easeImageload"}
            onLoad={(e) => e.target.style.opacity = "1"}
            />
        )
    }

    let club_accent_hsl = hexToHSL(club_accent_color);
    // console.log("HSL: " + club_accent_hsl)

    // Create club icon
    const logo_BG = (
        <div id={main.logo_BG} style={{backgroundColor:hslToHex(club_accent_hsl.h, 60, 65)}} >
            {club_logo_img}
        </div>
    )
    const logo_cutout_main = (
        <div id={main.logo_cutout_main}></div>
    )
    const logo_cutout_rounded_1 = (
        // Note: this is disgusting, but idk how else to achieve the inverted rounded effect
        <img src={"../../svg_assets/club_pages/inverse_rounded_corner.svg"} id={main.logo_cutout_rounded_1}></img>
    )
    const logo_cutout_rounded_2 = (
        // same as above....
        <img src={"../../svg_assets/club_pages/inverse_rounded_corner.svg"} id={main.logo_cutout_rounded_2}></img>
    )
    
    club_logo.push([logo_cutout_main, logo_cutout_rounded_1, logo_cutout_rounded_2, logo_BG])


    return (
        <div className={main.club_logo_holder}>
            {club_logo}
        </div>
    );
}

function createClubPageContent(listed_page) {
    var banner;
    var info_tiles = [];
    var title_tile_data;
    var club_accent_color = "#d8aa64";

    var month = "";

    for (const [key, value] of Object.entries({
        // iterates through each month to check if the month in Last_modified is the same.
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    })) {
        if (listed_page.Metadata.Last_modified.slice(5,7) === key) {
            // if the month is equal to the key, i.e. the program has found the correct month
            month = value
        }
    }

    let pageClaim;

    if ("Claimed" in listed_page.Metadata) {
        if (listed_page.Metadata.Claimed !== "Yes") {
            pageClaim = (
                <div className={main.tile_div} key={"Important!"} style = {{backgroundColor: "var(--b1BG)"}}>
                    <h1 className={main.club_name} style = {{color: "#ffffff"}}>Page Claim</h1>
                    <p className={main.generic_body_text} style = {{color: "#ffffff"}}>If you are a member of this club’s executive team/supervisor, please contact a KSS Directory Maintainer at kssdirectory@gmail.com to claim and edit this page.</p>
                </div>
            )
        }
    }

    let description = []
    let activity = []

    if ("Category_Metadata" in listed_page) {
        club_accent_color = listed_page.Category_Metadata.Color;
    }

    if ("Description" in listed_page.Basic_Info) {
        description.push(<p className={main.title_body_text} key={"Title Tile Description"}>{listed_page.Basic_Info.Description.trim()}</p>)
    }

    if (listed_page.Basic_Info.Activity === "Yes") {
        // if the club is set to be currently "active"
        activity.push(
            <div id={main.activity_div} key={"Activity Div"}>
                <p style={{color:"#2BB673"}}>Active</p>
                <img src="/svg_assets/club_pages/checkmark.svg"></img>
            </div>
        )
    } else {
        // if the club is set to be currently "inactive"
        activity.push(
            <div id={main.activity_div} key={"Activity Div"}>
                <p style={{color:"#8E1111"}}>Inactive</p>
                <img src="/svg_assets/club_pages/cross.svg"></img>
            </div>
        )
    }
    
    // Tile 1: Title
    title_tile_data = (
        <div>
            <h1 className={main.club_name}>{listed_page.Metadata.Club_Name}</h1>
            <div id={main.update_date_activity_container}>
                {activity}
                <p id={main.last_modified}>Last updated: {month} {listed_page.Metadata.Last_modified.slice(8,10)}, {listed_page.Metadata.Last_modified.slice(0,4)}</p>
            </div>
            {description}
        </div>
    );

    if (listed_page.Meeting_Times) {
        if (Object.keys(listed_page.Meeting_Times).length > 0) {
            let tile2_meeting_times = []

            for (const [key, value] of Object.entries(listed_page.Meeting_Times)) {
                // iterate through each meeting time and push it as a <div> to tile2_meeting_times
                let meeting_title = []
                if ("Meeting_Title" in value) {
                    meeting_title.push(value.Meeting_Title)
                } else {
                    meeting_title.push("Meeting " + key)
                }
                let meeting_end_time = []
                if ("Meeting_End_Time" in value) {
                    meeting_end_time.push(" to " + convert_iso_time(value.Meeting_End_Time))
                }
                tile2_meeting_times.push(
                    <div className={main.meeting_times_container} key={key}>
                        <rect className={main.text_side_line} style={{backgroundColor:club_accent_color}}/>
                        <div className={main.meeting_times_div}>
                            <h2>{meeting_title}</h2>
                            <p>
                                {value.Meeting_Day[0].toUpperCase() + value.Meeting_Day.slice(1)}s at {convert_iso_time(value.Meeting_Start_Time)} {meeting_end_time} in {value.Meeting_Location}
                            </p>
                        </div>
                    </div>
                )

            }
            info_tiles.push(
                <div className={main.tile_div} key={"Meeting Times"}>
                    <h1 className={main.tile_div_subtitle}>Meeting Times</h1>
                    {tile2_meeting_times}
                </div>
            )
        }
    }

    if (listed_page.Links) {
        if (Object.keys(listed_page.Links).length > 0) {
            let links = []
            for (const [key, value] of Object.entries(listed_page.Links)) {
                let link_name = []
                if (value[0] !== "none") {
                    link_name.push(value[0])
                } else {
                    link_name.push(value[1])
                }
                links.push(
                    <a href={value[1]} className={main.link} key={key}>
                        <div style={{display: "flex", alignItems: "center", flexGrow: "0", maxWidth: "calc(100% - 88px)"}}>
                            <img src={"http://www.google.com/s2/favicons?sz=32&domain=" + value[1]}/>
                            <p>{link_name}</p>
                        </div>
                        <img src = "/svg_assets/arrow_icon.svg" className={main.linkArrowIcon}/>
                    </a>
                )
            }
            info_tiles.push(
                <div className={main.tile_div} key={"Links"}>
                    <h1 className={main.tile_div_subtitle}>Links</h1>
                    <div id={main.links_container}>
                        {links}
                    </div>
                </div>
            )
        }
    }
    
    if ("Supervisors" in listed_page.Basic_Info) {
        if (listed_page.Basic_Info.Supervisors != "Unspecified") {
            let supervisor_list = []
            for (const [key, value] of Object.entries(listed_page.Basic_Info.Supervisors)) {
                supervisor_list.push(
                    <p className={main.supervisor_list} key={key}>{value}</p>
                )
            }
            info_tiles.push(
                <div className={main.tile_div} key={"Supervisors"}>
                    <h1 className={main.tile_div_subtitle}>Supervisor(s)</h1>
                    {supervisor_list}
                </div>
            )
        }
    }

    if ("Execs" in listed_page) {
        if (Object.keys(listed_page.Execs).length > 0) {
            let exec_list_unformatted = {}
            for (const [key, value] of Object.entries(listed_page.Execs)) {
                if (value !== "none") {
                    // if there is an assigned position title
                    if (value in exec_list_unformatted) {
                        exec_list_unformatted[value].push(key)
                    } else {
                        exec_list_unformatted[value] = [key]
                    }
                } else {
                    // if the exec is not assigned a position title
                    if ("Unspecified role" in exec_list_unformatted) {
                        exec_list_unformatted["Unspecified role"].push(key)
                    } else {
                        exec_list_unformatted["Unspecified role"] = [key]
                    }
                }
                
            }
            let exec_list_formatted = [];
            for (const [position, names] of Object.entries(exec_list_unformatted)) {
                let exec_position_list = []
                for (const individual_exec of names) {
                    exec_position_list.push(
                        <p className={main.generic_body_text} key={individual_exec}>{individual_exec}</p>
                    )
                }
                exec_list_formatted.push(
                    <div key={position}>
                        <h2 className={main.exec_position_title}>{position}</h2>
                        <div className={main.exec_position_container}>
                            <rect className={main.text_side_line} style={{backgroundColor:club_accent_color}}/>
                            <div>
                                {exec_position_list}
                            </div>
                        </div>
                    </div>
                )
                //console.log(exec_list_formatted)
            }
            info_tiles.push(
                <div className={main.tile_div} key={"Execs"}>
                    <h1 className={main.tile_div_subtitle}>Executive Team</h1>
                    {exec_list_formatted}
                </div>
            );
        }
    }
    info_tiles.push(<div className={main.tile_list_spacer} key={"Spacer"}/>);

    if ("Images" in listed_page && "banner" in listed_page.Images ) {
        // if there is a logo available, use it as favicon for this webpage.
        // const img = fetch(webServerURL + "/club_images/" + listed_page.Metadata.URL + "/logo")
        banner = (
            <Image src={webServerURL + "/specific_club_images/" + listed_page.Metadata.URL + "/banner?hash=" + listed_page["Images"]["banner"]["Hash"]}
            className={[main.banner_image, "easeImageload"].join(" ")}
            onLoad={(e) => e.target.style.opacity = "1"}
            alt={"Banner of " + listed_page.Metadata.Club_Name}
            layout="fill"
            />
        )
    }

    let return_tiles = [];
    let club_logo_element = getClubLogoElement(listed_page, club_accent_color);

    // Desktop site
    return_tiles.push(
        <div className = {main.mobileDisabled} key={"Desktop Tiles"}>
            <div className={main.tiles_flex}>
                <div className={main.banner_div}>
                    <div className={main.banner_content_container}>
                        {banner}
                    </div>
                </div>
                <div className={main.info_tiles_div}>
                    <div className={main.tile_div}>
                        {title_tile_data}
                    </div>
                    {pageClaim}
                    {info_tiles}
                </div>
                {club_logo_element}
            </div>
        </div>
    );

    // Mobile site
    return_tiles.push (
        <div className = {main.mobileEnabled} key={"Mobile Tiles"}>
            <div className={main.tiles_flex}>
                <div className={main.banner_div}>
                    <div className={main.banner_content_container}>
                        {banner}
                        <div className={main.banner_gradient}></div>
                        <div className={main.title_tile_mobile}>
                            {title_tile_data}
                        </div>
                    </div>
                    {club_logo_element}
                </div>
                {pageClaim}
                {info_tiles}
            </div>
        </div>
    );
    

    return return_tiles;
}

// Equivalent to const individualClubPage = ( {listed_page} = props)
// since we just need to destructure from whatever argument is passed to the func.
// Damn that's weird. Javascript is weird.
const individualClubPage = ( {listed_page} ) => {
    const router = useRouter();
    
    var pageTitle;
    var club_navbar_path;
    var back_url = "";


    // Create club tiles section
    let tiles = [];
    
    // if our data is defined in the first place, setup values
    if (listed_page && !router.isFallback) {
        tiles = createClubPageContent(listed_page);
        
        back_url = listed_page.Metadata.Category.toLowerCase().replace(" ", "-");

        // don't do this inline to avoid a weird warning I don't understand
        // https://github.com/vercel/next.js/discussions/38256
        pageTitle = listed_page.Metadata.Club_Name + "- KSS Directory Club Repository";

        club_navbar_path = listed_page.Metadata.Category.toUpperCase() + " / " + listed_page.Metadata.Club_Name.toUpperCase();
    }    
    else { // provide suitable fallback values 
        pageTitle = "Loading... - KSS Directory Club Repository";
        club_navbar_path = "Loading.../Loading..."
    }

    return (
        <>
            <Head>
                <title>{pageTitle}</title>

                {/* Setting the favicon of the site to the KSS Directory logo */}
                {/* Not the individual logo of each club because that'd be a PITA, especially if they didn't use a perfectly square logo...*/}
                <link rel="icon" sizes="76x76" href="../static/compassLogo.ico" />
            </Head>

            <main id={main.bg}>
                <NavBar
                    extra_additions={(
                        <>
                            <div id={main.header_path_div}>
                                <a id={main.header_path_link} href={"../../clubs"}>CLUB REPOSITORY</a>
                                <span id={main.header_path_text}> / {club_navbar_path}</span>
                            </div>
                            <BackArrowButton href = {"../../clubs/" + back_url} className={main.mobileEnabled}/>
                        </>
                    )}
                    center_on_mobile={true}
                />
                    
                <div id={main.pageContent}>
                    {/* <h1>{listed_page.Metadata.Club_Name}</h1>
                    <p>{listed_page.Basic_Info.Description}</p> */}
                    <div>
                        {tiles}
                    </div>
                </div>
            </main>
        </>
    )
}

export default individualClubPage;