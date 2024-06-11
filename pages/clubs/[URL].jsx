const webServerURL = "https://a23b-35-227-86-218.ngrok-free.app"


export const getStaticPaths = async () => {
    const res = await fetch(webServerURL + "/club_repo_main");
    const data = await res.json();

    const paths = data.map(stuff => {
        return {
            params: { URL: stuff.Content.Metadata.URL.toString() }
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
        props: { stuff: data },
        revalidate: 10 // re-generate the page when a new request comes in?
    }
}

const individualClubPage = ( stuff ) => {
    return (
        <div>
            <h1>{stuff.stuff.Metadata.Club_Name}</h1>
            <p>{stuff.stuff.Basic_Info.Description}</p>
        </div>
    )
}

export default individualClubPage