import Link from 'next/link'
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
        <div>
            <h1>Hello</h1>
            {listed_pages.map(listed_pages => (
                <Link href={'/clubs/' + listed_pages.Content.Metadata.URL} key={listed_pages.Content.Metadata.URL}>
                    <div>
                        <h3>{listed_pages.Content.Metadata.Club_Name}</h3>
                    </div>
                </Link>
            ))}
        </div>
    )
}