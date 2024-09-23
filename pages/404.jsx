import Button from '@/components/Button';
import Link from 'next/link'
import Head from 'next/head'
import main from '../styles/404-page/main.module.css'
import React from 'react';

function pageNotFound() {
    return(
        <>
            <Head>
                <title>
                    404
                </title>

                    <meta name="description" content="KSS Directory is a student-run resource repository for Kingston Secondary School, where you can easily access a complete announcement archive, alongside a plethora of other student resources! Made by Matthew Kong." />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" sizes="76x76" href="static/compassLogo.ico" />
            </Head>
            <div style = {{background:"var(--b0BG)"}}>
                <div style = {{flexDirection:"column", display:"flex", height:"100dvh"}} className="flex-container">
                    <div style = {{flexShrink:"0"}}>
                        {/* <NavBar
                            text_color='#ffffff'>
                        </NavBar> */}
                        <div className = {main.body}>
                            <div id = {main.compassIntro}>
                                <img src = "/svg_assets/compass_logo_vector.svg" id = {main.compassInfinite}/>
                            </div>

                            <div className = {main.textContainer}>
                                    <p id = {main.subheading}>How did you get here?</p>
                                    <h1 id = {main.heroText}>404 - Page Not Found</h1>
                                    <p id = {main.text}>It seems you've wandered far. Stay a while, won't you?</p>
                            
                                <div style = {{paddingTop: "30px", animationDelay: "3s"}}>
                                    <Link id = {main.returnButton} href = "/">
                                        <p1 id = {main.buttonText}> Here, let's head back now</p1>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default pageNotFound;