import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import main from '../../styles/club_directory/club_pages/main.module.css';
import NavBar from "../../components/navBar";


const webServerURL = "https://musical-blindly-cheetah.ngrok-free.app"

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
        fallback: false 
    }
}

export const getStaticProps = async (context) => {
    const URL = context.params.URL;
    const res = await fetch(webServerURL + "/specific_club_repo/" + URL);
    const data = await res.json();

    return {
        props: { listed_pages: data },
        revalidate: 10 // re-generate the page when a new request comes in?
    }
}



const individualClubPage = ( listed_pages ) => {
    
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

    // idk why i gotta do listed_pages twice
    // so i just created a new var for my own sanity
    let listed_page = listed_pages.listed_pages

    const club_logo = []
    
    if ("Images" in listed_page && "logo" in listed_page.Images) {
        // if there is a logo

        const club_logo_img = (
            <Image src={webServerURL + "/specific_club_images/" + listed_page.Metadata.URL + "/logo"}
            width="90"
            height="90"
            //TODO: make this support non-square logos
            id={main.club_logo}
            />
        )

        const logo_BG = (
            <div id={main.logo_BG}></div>
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
        
        club_logo.push([logo_cutout_main, logo_cutout_rounded_1, logo_cutout_rounded_2, logo_BG, club_logo_img])
    }


    // Tiles section

    let tiles = []
    const month = ""

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
            const month = value
            let description = []
            let activity = []
            
            if ("Description" in listed_page.Basic_Info) {
                description.push(<p className={main.body_text}>{listed_page.Basic_Info.Description}</p>)
            }

            if (listed_page.Basic_Info.Activity === "Yes") {
                // if the club is set to be currently "active"
                activity.push(
                    <div id={main.activity_div}>
                        <p style={{color:"#2BB673"}}>Active</p>
                        <img src="../../svg_assets/club_pages/checkmark.svg"></img>
                    </div>
                )
            } else {
                // if the club is set to be currently "inactive"
                activity.push(
                    <div id={main.activity_div}>
                        <p style={{color:"#8E1111"}}>Inactive</p>
                        <img src="../../svg_assets/club_pages/cross.svg"></img>
                    </div>
                )
            }
            
            // Tile 1: Title
            const tile1 = (
                <div className={main.tile_div}>
                    <div id={main.club_name_activity_container}>
                        <h1 id={main.club_name}>{listed_page.Metadata.Club_Name}</h1>
                        {activity}
                    </div>
                    <p id={main.last_modified}>Last modified: {month} {listed_page.Metadata.Last_modified.slice(8,10)}, {listed_page.Metadata.Last_modified.slice(0,4)}</p>
                    {description}
                    
                </div>
            )

            let tile2 = []

            let tile2_meeting_times = []

            if (1 in listed_page.Meeting_Times) {
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
                        <div className={main.meeting_times_container}>
                            <rect className={main.text_side_line}/>
                            <div className={main.meeting_times_div}>
                                <h2>{meeting_title}</h2>
                                <p>
                                    {value.Meeting_Day[0].toUpperCase() + value.Meeting_Day.slice(1)}s at {convert_iso_time(value.Meeting_Start_Time)} {meeting_end_time} in {value.Meeting_Location}
                                </p>
                            </div>
                            
                        </div>
                    )

                }
                tile2.push(
                    <div className={main.tile_div}>
                        <h1 className={main.tile_div_subtitle}>Weekly Meeting Times</h1>
                        {tile2_meeting_times}
                    </div>
                )
            }

            let tile3 = []
            if (1 in listed_page.Links) {
                let links = []
                for (const [key, value] of Object.entries(listed_page.Links)) {
                    let link_name = []
                    if (value[0] !== "none") {
                        link_name.push(value[0])
                    } else {
                        link_name.push(value[1])
                    }
                    links.push(
                        <a href={value[1]} className={main.link}>
                            <img src={"https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" + value[1] + "&size=32"}/>
                            <p>{link_name}</p>
                        </a>
                    )
                }
                tile3.push(
                    <div className={main.tile_div}>
                        <h1 className={main.tile_div_subtitle}>Links</h1>
                        <div id={main.links_container}>
                            {links}
                        </div>
                        
                    </div>
                )
            }
            
            let tile4 = []
            if ("Supervisors" in listed_page.Basic_Info) {
                if (1 in listed_page.Basic_Info.Supervisors) {
                    let supervisor_list = []
                    for (const [key, value] of Object.entries(listed_page.Basic_Info.Supervisors)) {
                        supervisor_list.push(
                            <p className={main.supervisor_list}>{value}</p>
                        )
                    }
                    tile4.push(
                        <div className={main.tile_div}>
                            <h1 className={main.tile_div_subtitle}>Supervisors</h1>
                            {supervisor_list}
                        </div>
                    )
                }
            }

            let tile5 = []
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
                    let exec_list_formatted = []
                    for (const [position, names] of Object.entries(exec_list_unformatted)) {
                        let exec_position_list = []
                        for (const individual_exec of names) {
                            exec_position_list.push(
                                <p className={main.generic_body_text}>{individual_exec}</p>
                            )
                        }
                        exec_list_formatted.push(
                            <div>
                                <h2 className={main.exec_position_title}>{position}</h2>
                                <div className={main.exec_position_container}>
                                    <rect className={main.text_side_line}/>
                                    <div>
                                        {exec_position_list}
                                    </div>
                                </div>
                            </div>
                        )
                        console.log(exec_list_formatted)
                    }
                    tile5.push(
                        <div className={main.tile_div}>
                            <h1 className={main.tile_div_subtitle}>Current Execs</h1>
                            {exec_list_formatted}
                        </div>
                    )
                }
            }
            if ("Images" in listed_page && "banner" in listed_page.Images) {
                // if there is a logo available, use it as favicon for this webpage.
                // const img = fetch(webServerURL + "/club_images/" + listed_page.Metadata.URL + "/logo")
                const banner = (
                    <Image src={webServerURL + "/specific_club_images/" + listed_page.Metadata.URL + "/banner"}
                    className={main.masked_banner}
                    alt={"Banner of " + listed_page.Metadata.Club_Name}
                    objectFit="cover"
                    layout="fill"
                    />
                )
                
                tiles.push(
                    <div style={{position: "relative"}}>
                        <div className={main.tiles_flex} style={{zIndex:0}}>
                            <div className={main.banner_div}>
                                {banner}
                            </div>
                            <div className={main.secondary_tiles_div}>
                            </div>
                        </div>
                        <div className={main.tiles_flex} style={{marginTop: "calc(-100vh + 25px + 64px)", zIndex:1}}>
                            <div className={main.banner_div}>
                            </div>
                            <div className={main.secondary_tiles_div}>
                                {tile1}
                                {tile2}
                                {tile3}
                                {tile4}
                                {tile5}
                            </div>
                        </div>
                        
                    </div>
                    
                )
            }
        }
    }
   

    return (
        <>
            <Head>
                <title>{listed_pages.listed_pages.Metadata.Club_Name} - KSS Directory Club Repository</title>

                {/* Setting the favicon of the site to the KSS Directory logo */}
                {/* Not the individual logo of each club because that'd be a PITA, especially if they didn't use a perfectly square logo...*/}
                <link rel="icon" sizes="76x76" href="../static/compassLogo.ico" />
            </Head>

            <main id={main.bg}>
                <NavBar
                    extra_additions={(
                        <div id={main.header_path_div}>
                            <a id={main.header_path_link} href="/clubs">CLUB REPOSITORY</a>
                            <span id={main.header_path_text}> / {listed_page.Metadata.Category.toUpperCase()} / {listed_page.Metadata.Club_Name.toUpperCase()}</span>
                        </div>
                    )}
                />
                    
                <div>
                    {/* <h1>{listed_page.Metadata.Club_Name}</h1>
                    <p>{listed_page.Basic_Info.Description}</p> */}
                    {tiles}
                    {club_logo}
                </div>
            </main>
        </>
        
        
    )
}

export default individualClubPage