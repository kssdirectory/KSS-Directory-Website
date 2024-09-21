import navbar from "/styles/directorynavbar.module.css";
import Link from 'next/link';

const NavBar = ({ extra_additions, text_color = "#072136", center_on_mobile = false}) => {
    const logoPositionClass = center_on_mobile ? navbar.navbar_center : navbar.navbar_right;

    return (
        <header>
            <div className = {navbar.headerFlex}>
                <div className={[navbar.header_logo_button, logoPositionClass].join(" ")}>
                    <Link href="/" className={[navbar.header_link, logoPositionClass].join(" ")}>
                        <div className={[navbar.header_logo_div, logoPositionClass].join(" ")}>
                            <div className={navbar.dir_logo_BG}>
                                <img src = "/svg_assets/compass_logo_vector.svg" className={navbar.kssdir_logo}/>
                            </div>
                            <p style={{color:text_color}} className = {navbar.kssdir_logo_text}>DIRECTORY</p>                        
                        </div>
                    </Link>
                </div>
                <div className = {navbar.headerOptionsDiv}>
                    <Link href = "/directory/#whatWeDo" className = {navbar.headerOption}>
                        <p>What We Do</p>
                    </Link>
                    <Link href = "/" className = {navbar.headerOption}>
                        <p>About</p>
                    </Link>
                    <Link href = "/clubs" className = {navbar.headerOption}>
                        <p>Contact</p>
                    </Link>
                </div>
                {extra_additions}
            </div> 
        </header>
    );
};

export default NavBar;