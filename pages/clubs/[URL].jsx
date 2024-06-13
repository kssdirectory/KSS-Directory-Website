import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import main from '../../styles/club_directory/club_pages/main.module.css'


const webServerURL = "https://a23b-35-227-86-218.ngrok-free.app"

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

    // idk why i gotta do listed_pages twice
    // so i just created a new var for my own sanity
    let listed_page = listed_pages.listed_pages
    
    if ("Metadata" in listed_page.Metadata) {
        console.log("yep")
    }

    const club_logo = []
    
    if ("Images" in listed_page && "logo" in listed_page.Images) {
        // if there is a logo
        const logo_BG = (
            <div id={main.logo_BG}></div>
        )
        const logo_cutout_main = (
            <div id={main.logo_cutout_main}></div>
        )
        club_logo.push([logo_cutout_main, logo_BG])
    }


    let tiles = []

    // stuff that goes in the <Head> tag
    console.log(listed_page.Images)
    if ("Images" in listed_page && "banner" in listed_page.Images) {
        // if there is a logo available, use it as favicon for this webpage.
        // const img = fetch(webServerURL + "/club_images/" + listed_page.Metadata.URL + "/logo")
        const banner = (
            <Image src={webServerURL + "/club_images/" + listed_page.Metadata.URL + "/banner"}
            className={main.masked_banner}
            alt="picture of the author"
            objectFit="cover"
            layout="fill"
            />
        )
        
        tiles.push(
            <div className={main.tiles_flex}>
                <div id={main.banner_div}>
                    {banner}
                </div>
                <div id={main.secondary_tiles_div}>
                    
                </div>
            </div>
            
        )
    }


    // create the tiles
    if ("Images" in listed_page && "banner" in listed_page.Images) {
        // if there is a banner available, set it as the 
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
                <header id={main.header}>
                    <div id={main.header_logo_button}>
                        <Link href="/" style={{width: "200px", margin:0}}>
                            <div id={main.header_logo_div}>
                                <div id={main.kssdir_logo_BG}>
                                    <img src = "../svg_assets/compass_logo_vector.svg" id={main.kssdir_logo}/>
                                </div>
                                <p id={main.kssdir_logo_text}>KSS DIRECTORY</p>                        
                            </div>
                        </Link>
                    </div>
                    
                    
                    <div id={main.header_path_div}>
                        <a id={main.header_path_link} href="/clubs">CLUB REPOSITORY</a>
                        <span id={main.header_path_text}> / {listed_page.Metadata.Category.toUpperCase()} / {listed_page.Metadata.Club_Name.toUpperCase()}</span>
                    </div>
                </header>
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