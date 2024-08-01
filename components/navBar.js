import navbar from "../styles/navbar.module.css";
import Link from 'next/link';

const NavBar = ({ extra_additions, text_color = "#072136"}) => {
    return (
        <header className={navbar.header}>
            <div className={navbar.header_logo_button}>
                <Link href="/" className={navbar.header_link}>
                    <div className={navbar.header_logo_div}>
                        <div className={navbar.kssdir_logo_BG}>
                            <img src = "../svg_assets/compass_logo_vector.svg" className={navbar.kssdir_logo}/>
                        </div>
                        <p style={{color:text_color}} className={navbar.kssdir_logo_text}>KSS DIRECTORY</p>                        
                    </div>
                </Link>
            </div>
            {extra_additions} 
        </header>
    );
};

export default NavBar;