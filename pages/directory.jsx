import Head from 'next/head'
import Link from "next/link"
import React from 'react'
import main from "../styles/directory/main.module.css"
import star from '../styles/about-page/main.module.css'
import NavBar from '@/components/NavBar'
import BackArrowButton from '@/components/BackArrowButton';

function homepage() {
    return (
        <>
            <Head>
                <title>Directory</title>
                <meta name="description" content="Directory is a student-run non-profit that aims to help students personally create resources for their school environments." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" sizes="76x76" href="static/compassLogo.ico" />
            </Head>

            <div style = {{background: "#D9D9D9"}}>
                <NavBar
                    // extra_additions={(
                    //     <>
                    //         <BackArrowButton href = "../"/>
                    //     </>
                    // )}
                />
            </div>
            <div className = {main.background}>
                <div className = {main.body}>
                    <div id = {main.hero}>
                        <h1 className = {main.heroText}>supporting student-made sources</h1>
                        <div id = {main.starLogo}>
                            <img src = "svg_assets/logo_assets/innerStar.svg" id = {star.innerStar}/>
                            <svg id = {star.outerStarSVGBox1}>
                            <path className = {star.outerStar} stroke="white" fill = "none" stroke-width="2.2" d="m90.02,0l-.58,14.41-1.44,36.03-1.28,31.91-1.47-.72-11.53-5.64-7.69-3.76,5.2,6.8,7.8,10.2,1.02,1.33-30.98,7.51-35.05,8.5-14.02,3.4,14.41.58,36.03,1.44,31.91,1.28-.72,1.47-5.64,11.53-3.76,7.69,6.8-5.2,10.2-7.8,1.33-1.02,7.51,30.98,8.5,35.05,3.4,14.02.58-14.41,1.44-36.03,1.28-31.91,1.47.72,11.53,5.64,7.69,3.76-5.2-6.8-7.8-10.2-1.02-1.33,30.98-7.51,35.05-8.5,14.02-3.4-14.41-.58-36.03-1.44-31.91-1.28.72-1.47,5.64-11.53,3.76-7.69-6.8,5.2-10.2,7.8-1.33,1.02-7.51-30.98-8.5-35.05-3.4-14.02h0Z"/>
                            </svg>
                            <svg id = {star.outerStarSVGBox2}>
                            <path className = {star.outerStar} stroke="white" fill = "none" stroke-width="2.2" d="m90.02,0l-.58,14.41-1.44,36.03-1.28,31.91-1.47-.72-11.53-5.64-7.69-3.76,5.2,6.8,7.8,10.2,1.02,1.33-30.98,7.51-35.05,8.5-14.02,3.4,14.41.58,36.03,1.44,31.91,1.28-.72,1.47-5.64,11.53-3.76,7.69,6.8-5.2,10.2-7.8,1.33-1.02,7.51,30.98,8.5,35.05,3.4,14.02.58-14.41,1.44-36.03,1.28-31.91,1.47.72,11.53,5.64,7.69,3.76-5.2-6.8-7.8-10.2-1.02-1.33,30.98-7.51,35.05-8.5,14.02-3.4-14.41-.58-36.03-1.44-31.91-1.28.72-1.47,5.64-11.53,3.76-7.69-6.8,5.2-10.2,7.8-1.33,1.02-7.51-30.98-8.5-35.05-3.4-14.02h0Z"/>
                            </svg>
                            <div id = {star.ring1}>
                            <img src = "svg_assets/logo_assets/innerRing.svg" id = {star.innerRing1}/>
                            <img src = "svg_assets/logo_assets/outerRing.svg" id = {star.outerRing1}/>
                            </div>
                            <div id = {star.ring2}>
                            <img src = "svg_assets/logo_assets/innerRing.svg" id = {star.innerRing2}/>
                            <img src = "svg_assets/logo_assets/outerRing.svg" id = {star.outerRing2}/>
                            </div>
                            <div id = {star.ring3}>
                            <img src = "svg_assets/logo_assets/innerRing.svg" id = {star.innerRing3}/>
                            <img src = "svg_assets/logo_assets/outerRing.svg" id = {star.outerRing3}/>
                            </div>
                            <div id = {star.ring4}>
                            <img src = "svg_assets/logo_assets/innerRing.svg" id = {star.innerRing4}/>
                            <img src = "svg_assets/logo_assets/outerRing.svg" id = {star.outerRing4}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </>
    )
}

export default homepage;