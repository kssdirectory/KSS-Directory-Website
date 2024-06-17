import navbar from "../styles/navbar.module.css";
import Link from 'next/link';

const NavBar = ({ extra_additions }) => {
    return (
        <header className={navbar.header}>
            <div className={navbar.header_logo_button}>
                <Link href="/" style={{width: "200px", margin:0, height: "inherit", display: "inline-flex", textDecoration: "none"}}>
                    <div className={navbar.header_logo_div}>
                        <div className={navbar.kssdir_logo_BG}>
                            <img src = "../svg_assets/compass_logo_vector.svg" className={navbar.kssdir_logo}/>
                        </div>
                        <p className={navbar.kssdir_logo_text}>KSS DIRECTORY</p>                        
                    </div>
                </Link>
            </div>
            {extra_additions}
        </header>
    );
};

export default NavBar;