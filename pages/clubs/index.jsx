import Link from 'next/link'
import Head from 'next/head';
import main from '../../styles/club_directory/landing_page/main.module.css';
import NavBar from "../../components/navBar";




const webServerURL = "https://a23b-35-227-86-218.ngrok-free.app"


export const getServerSideProps = async () => {
    const res = await fetch(webServerURL + "/club_repo_main")
    const data = await res.json();
    return {
        props: { all_club_pages: data }
    }
}

export default function clubsPage({ all_club_pages }) {
    let listed_pages = []
    for (const i of all_club_pages) {
        if (i.Content.Metadata.Listed === "Yes") {
            listed_pages.push(i)
        }
    }
    return (
        <>
            <Head>
                <title>KSS Directory Club Repository</title>

                {/* Setting the favicon of the site to the KSS Directory logo */}
                {/* Not the individual logo of each club because that'd be a PITA, especially if they didn't use a perfectly square logo...*/}
                <link rel="icon" sizes="76x76" href="../static/compassLogo.ico" />
            </Head>
            <main id={main.bg}>
                <NavBar
                    extra_additions={(
                        <div id={main.header_path_div}>
                            <p id={main.header_path_link} href="/clubs">CLUB REPOSITORY</p>
                        </div>
                    )}
                />

                <div style={{marginLeft:"25px", marginRight:"25px"}}>
                    {/* <div id={main.top_section}>
                        <div id={main.club_repo_title_section}>
                            <mask id={main.title_section_kss_dir_logo_mask}>
                                <rect style={{width: "100%", height: "100%"}}></rect>
                            </mask>
                            <img src="../../svg_assets/compass_logo_vector.svg" id={main.title_section_kss_dir_logo}></img>
                        </div>
                        <div id={main.club_repo_carousel}>
                        </div>
                    </div> */}
                    <h1>Club Pages (highly unfinished)</h1>
                    {listed_pages.map(listed_pages => (
                        <Link href={'/clubs/' + listed_pages.Content.Metadata.URL} key={listed_pages.Content.Metadata.URL}>
                            <div>
                                <h3 style={{color:"gray"}}>{listed_pages.Content.Metadata.Club_Name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            
        </>
        
    )
}