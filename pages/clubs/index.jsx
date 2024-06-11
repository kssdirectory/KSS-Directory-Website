import Link from 'next/link'
const webServerURL = "https://a23b-35-227-86-218.ngrok-free.app"


export const getServerSideProps = async () => {
    const res = await fetch(webServerURL + "/club_repo_main")
    const data = await res.json();
    return {
        props: { stuff: data }
    }
}

export default function clubsPage({ stuff }) {
    return (
        <div>
            <h1>Hello</h1>
            {stuff.map(stuff => (
                <Link href={'/clubs/' + stuff.Content.Metadata.URL} key={stuff.Content.Metadata.URL}>
                    <div>
                        <h3>{stuff.Content.Metadata.Club_Name}</h3>
                    </div>
                </Link>
            ))}
        </div>
    )
}