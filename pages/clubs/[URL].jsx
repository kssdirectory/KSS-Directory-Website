import Head from 'next/head';


// It's cursed and I just don't care
// Yes it uses the same css module as the main club page. They're almost the same anyways
import main from '../../styles/club_directory/landing_page/main.module.css';
import NavBar from '@/components/NavBar';
import BackArrowButton from '@/components/BackArrowButton';
import ClubRepoButtonList from '@/components/club-repo/ClubRepoButtonList';
import { useRouter } from 'next/router';

const webServerURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// -------------------- Routing & Setup -------------------- //

export const getStaticPaths = async () => {
    const res = await fetch(webServerURL + "/club_repo_list")
    const data = await res.json();

    const paths = data.map((clubCategory) => {
        // console.log("AAA: " + clubCategoryName)
        return {
            params: { URL: clubCategory["Category Name"].toLowerCase().replace(" ", "-") }
        }
    })

    return {
        paths,
        fallback: true // If page hasn't been generated before, display a fallback while it loads for the first time 
    }
}

export const getStaticProps = async (context) => {
    const URL = context.params.URL;
    const res = await fetch(webServerURL + "/club_repo_list")
    const data = await res.json();
   

    for (var clubCategoryData of data) {
        const clubCategoryName = clubCategoryData["Category Name"]
        // console.log("WHYY " + clubCategoryName + " URL " + URL)
        if (URL.toLowerCase() === clubCategoryName.toLowerCase().replace(" ", "-")) {
            return {
                props: { category_name:clubCategoryName, category_metadata:clubCategoryData.Metadata, category_content:clubCategoryData.Content},
                revalidate: 30 // re-generate the page if it's been more than thirty seconds since the last request, while regenerating, will still show old page, but next visitor will see new page.
            }
        }
    }

    return {
        notFound: true,
        revalidate: 30 // re-generate the page if it's been more than thirty seconds since the last request, while regenerating, will still show old page, but next visitor will see new page.
    }
}

export default function MobileClubCategoryPage({ category_name, category_metadata, category_content }) {
    const router = useRouter();


    var categoryList;
    var categoryDescription = "";
    if (!router.isFallback){
        categoryList = <ClubRepoButtonList categoryClubData = {category_content} categoryColor={category_metadata.Color}/>
        categoryDescription = "Description" in category_metadata ? category_metadata.Description : "";
    }

    return (
        <>
            <Head>
                <title>KSS Club Repository</title>

                {/* Setting the favicon of the site to the KSS Directory logo */}
                {/* Not the individual logo of each club because that'd be a PITA, especially if they didn't use a perfectly square logo...*/}
                <link rel="icon" sizes="76x76" href="../static/compassLogo.ico" />
            </Head>
            <main id={main.bg}>
                <NavBar
                    extra_additions={(
                        <>                        
                            <BackArrowButton href = "../clubs" className={main.showArrowAlways}/>
                        </>
                    )}
                    center_on_mobile={true}
                />

                <div id={main.page_content_background}>
                    <div id={main.pageContent}>
                        <div id={main.top_section}>
                            <div id={main.club_repo_title_section}>
                                <div id={main.title_section_kss_dir_logo_mask}>
                                    <img src="/svg_assets/compass_logo_vector.svg" id={main.title_section_kss_dir_logo}></img>
                                </div>
                                <div id={main.title_section_text}>
                                    <h1>{category_name}</h1>
                                    <p>{categoryDescription}</p>
                                </div>
                            </div>
                        </div>
                        <div id={main.content_section_div}>
                            {categoryList}
                            <div className={main.spacer_div}/>
                        </div>
                    </div>
                </div>
            </main>
            
        </>
    )
}