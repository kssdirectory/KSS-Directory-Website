import Link from 'next/link'
import Head from 'next/head';
import styles from '../../styles/club_directory/landing_page/main.module.css';
import NavBar from "../../components/NavBar";
import BackArrowButton from '@/components/BackArrowButton';
import ClubRepoButton from '@/components/ClubRepoButton';
import ClubRepoButtonList from '@/components/ClubRepoButtonList';
import ClubRepoCategoryButton from '@/components/ClubRepoCategoryButton';
import HorizontalScrollElement from '@/components/HorizontalScrollElement';
import SlideCarousel from '@/components/SlideCarousel';
import Image from 'next/image';
import SlideCarouselPage from '@/components/SlideCarouselPage';

const webServerURL = process.env.NEXT_PUBLIC_BACKEND_URL;


// export const getServerSideProps = async () => {
//     const res = await fetch(webServerURL + "/club_repo_list")
//     const data = await res.json();
//     return {
//         props: { all_club_pages: data }
//     }
// }

export const getStaticProps = async (context) => {
    const res = await fetch(webServerURL + "/club_repo_list")
    const data = await res.json();
    return {
        props: { all_club_pages: data },
        revalidate: 60
    }
}


export default function clubsPage({ all_club_pages }) {
    // let listed_pages = []
    // for (const i of all_club_pages) {
    //     if (i.Content.Metadata.Listed === "Yes") {
    //         listed_pages.push(i)
    //     }
    // }

    //console.log(all_club_pages);
    let mobileCategoryButtons = [];

    const clubCategories = all_club_pages.map((clubCategoryData) => {
        const categoryColor = clubCategoryData.Metadata.Color;
        const clubCategoryName = clubCategoryData["Category Name"];
        
        mobileCategoryButtons.push(
            <ClubRepoCategoryButton 
                cateogry_name = {clubCategoryName}
                categoryColor={categoryColor}
                categoryImage = {webServerURL + "/static_image/repo_category_images/" + clubCategoryName.replace(" ", "_").toLowerCase() + ".svg"}
                href = {"../clubs/" + clubCategoryName.toLowerCase().replace(" ", "-")}
            />
        );

        return (
            <div key={clubCategoryName} > 
                <h2 className={styles.club_category_name}>{clubCategoryName}</h2>
                <div className={styles.club_category_carousel}> 
                    <HorizontalScrollElement category_color = {categoryColor}>       
                        <ClubRepoButtonList categoryClubData = {clubCategoryData.Content} categoryColor={categoryColor}/>
                    </HorizontalScrollElement>
                </div>
            </div>
    )});
 

    

    return (
        <>
            <Head>
                <title>KSS Club Repository</title>

                {/* Setting the favicon of the site to the KSS Directory logo */}
                {/* Not the individual logo of each club because that'd be a PITA, especially if they didn't use a perfectly square logo...*/}
                <link rel="icon" sizes="76x76" href="../static/compassLogo.ico" />
            </Head>
            <main id={styles.bg_mainpage}>
                <NavBar
                    extra_additions={(
                        <>                        
                            <div id={styles.header_path_div}>
                                <p id={styles.header_path_link} href="/clubs">CLUB REPOSITORY</p>
                            </div>
                            <BackArrowButton href = "../" className={styles.mobileEnabled}/>
                        </>
                    )}
                    center_on_mobile={true}
                />


                <div id={styles.pageContent}>
                    <div id={styles.top_section}>
                        <div id={styles.club_repo_title_section}>
                            <div id={styles.title_section_kss_dir_logo_mask}>
                                <img src="/svg_assets/compass_logo_vector.svg" id={styles.title_section_kss_dir_logo}></img>
                            </div>
                            <div id={styles.title_section_text}>
                                <h1>Club<br/>Repository <sup>Beta</sup></h1>
                                <p>A treasure trove of up-to-date information on KSS clubs & teams, compiled by their respective executives. </p>
                            </div>
                        </div>
                        <div id={styles.club_repo_carousel}>
                            <SlideCarousel autoScroll = {true} autoscrollTimeSeconds={5}> 
                                <SlideCarouselPage name="ClubExecPromptPage" >
                                    {/* <Image src="/static/sunset.png" alt="" fill={true} onLoad={(e) => e.target.style.opacity = "1"} className={[main.beta_slide_image, "easeImageload"].join(" ")} /> */}
                                    <div className={styles.carousel_gradient}/>
                                    <div className={[styles.beta_slide_div, styles.generic_slide].join(" ")}>
                                        <h2>Attention Club Executives!</h2>
                                        <p>Host all your club information and links in one convenient place! Contact a KSS Directory Maintainer at kssdirectory@gmail.com to claim or create your club page.</p>
                                    </div>
                                </SlideCarouselPage>
                                <SlideCarouselPage name="TestPage1" >
                                    <Image src="/static/sunset.png" alt="" fill={true} onLoad={(e) => e.target.style.opacity = "1"} className={[styles.beta_slide_image, "easeImageload"].join(" ")} />
                                    <div className={styles.carousel_gradient}/>
                                    <div className={[styles.beta_slide_div, styles.generic_slide].join(" ")}>
                                        <h2>I'm a slideshow!</h2>
                                        <p>Check back soon for upcoming club events!</p>
                                    </div>
                                </SlideCarouselPage>
                                <SlideCarouselPage name="TestPage2" >
                                    {/* <Image src="/static/sunset.png" alt="" fill={true} onLoad={(e) => e.target.style.opacity = "1"} className={[main.beta_slide_image, "easeImageload"].join(" ")} /> */}
                                    <div className={styles.carousel_gradient}/>
                                    <div className={[styles.beta_slide_div, styles.generic_slide].join(" ")}>
                                        <h2>Spread the word!</h2>
                                        <p>KSS Directory's Club Repository is open for business!</p>
                                    </div>
                                </SlideCarouselPage>
                            </SlideCarousel>
                        </div>
                    </div>
                    <div id={styles.content_section_div}>
                        <div className={styles.mobileDisabled}>
                            {clubCategories}
                            <div className={styles.spacer_div}/>
                        </div>
                        <div className={styles.mobileEnabled}>
                            <div id = {styles.mobile_button_container}>
                                <div className = {styles.mobile_button_container_horizontal}>
                                    {mobileCategoryButtons[0]}
                                    {mobileCategoryButtons[1]}
                                </div>
                                {mobileCategoryButtons[2]}
                                <div className = {styles.mobile_button_container_horizontal}>
                                    {mobileCategoryButtons[3]}
                                    {mobileCategoryButtons[4]}
                                </div>
                            </div>
                            <div className={styles.spacer_div}/>
                        </div>
                    </div>
                    {/* {listed_pages.map(listed_page => (
                        <Link href={'/clubs/' + listed_page.Content.Metadata.URL} key={listed_page.Content.Metadata.URL}>
                            <div>
                                <h3 style={{color:"gray"}}>{listed_page.Content.Metadata.Club_Name}</h3>
                            </div>
                        </Link>
                    ))} */}
                </div>
            </main>
            
        </>
        
    )
}