import Head from 'next/head'
import Link from "next/link"
import React from 'react'
import main from "/styles/directory/index/main.module.css"
import NavBar from '@/components/directory/DirectoryNavBar.jsx'
import Image from "next/image"

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
            <div className = {main.page}>
                <div style = {{flexDirection:"column", display:"flex", height:"100dvh"}} class="flex-container">
                    <div style = {{flexShrink:"0"}}>
                        <div className = {main.body}>

                            <div id = {main.hero}>
                                <Image src="/static/sunset.png" alt="bleh" fill={true}/>
                                <rect className = {main.gradient2}/>
                                <rect className = {main.gradient1}/>
                                <div className = {main.heroContent_div}>
                                    <h1 className = {main.heroText}>supporting <br/>student-made <br/>solutions</h1>
                                    <div className = {main.heroLogoDiv}>
                                        <div id = {main.starLogo}>
                                            <img src = "svg_assets/logo_assets/innerStar.svg" id = {main.innerStar}/>
                                            <svg id = {main.outerStarSVGBox1}>
                                            <path className = {main.outerStar} stroke="white" fill = "none" stroke-width="2.2" d="m90.02,0l-.58,14.41-1.44,36.03-1.28,31.91-1.47-.72-11.53-5.64-7.69-3.76,5.2,6.8,7.8,10.2,1.02,1.33-30.98,7.51-35.05,8.5-14.02,3.4,14.41.58,36.03,1.44,31.91,1.28-.72,1.47-5.64,11.53-3.76,7.69,6.8-5.2,10.2-7.8,1.33-1.02,7.51,30.98,8.5,35.05,3.4,14.02.58-14.41,1.44-36.03,1.28-31.91,1.47.72,11.53,5.64,7.69,3.76-5.2-6.8-7.8-10.2-1.02-1.33,30.98-7.51,35.05-8.5,14.02-3.4-14.41-.58-36.03-1.44-31.91-1.28.72-1.47,5.64-11.53,3.76-7.69-6.8,5.2-10.2,7.8-1.33,1.02-7.51-30.98-8.5-35.05-3.4-14.02h0Z"/>
                                            </svg>
                                            <svg id = {main.outerStarSVGBox2}>
                                            <path className = {main.outerStar} stroke="white" fill = "none" stroke-width="2.2" d="m90.02,0l-.58,14.41-1.44,36.03-1.28,31.91-1.47-.72-11.53-5.64-7.69-3.76,5.2,6.8,7.8,10.2,1.02,1.33-30.98,7.51-35.05,8.5-14.02,3.4,14.41.58,36.03,1.44,31.91,1.28-.72,1.47-5.64,11.53-3.76,7.69,6.8-5.2,10.2-7.8,1.33-1.02,7.51,30.98,8.5,35.05,3.4,14.02.58-14.41,1.44-36.03,1.28-31.91,1.47.72,11.53,5.64,7.69,3.76-5.2-6.8-7.8-10.2-1.02-1.33,30.98-7.51,35.05-8.5,14.02-3.4-14.41-.58-36.03-1.44-31.91-1.28.72-1.47,5.64-11.53,3.76-7.69-6.8,5.2-10.2,7.8-1.33,1.02-7.51-30.98-8.5-35.05-3.4-14.02h0Z"/>
                                            </svg>
                                            <div id = {main.ring1}>
                                            <img src = "svg_assets/logo_assets/innerRing.svg" id = {main.innerRing1}/>
                                            <img src = "svg_assets/logo_assets/outerRing.svg" id = {main.outerRing1}/>
                                            </div>
                                            <div id = {main.ring2}>
                                            <img src = "svg_assets/logo_assets/innerRing.svg" id = {main.innerRing2}/>
                                            <img src = "svg_assets/logo_assets/outerRing.svg" id = {main.outerRing2}/>
                                            </div>
                                            <div id = {main.ring3}>
                                            <img src = "svg_assets/logo_assets/innerRing.svg" id = {main.innerRing3}/>
                                            <img src = "svg_assets/logo_assets/outerRing.svg" id = {main.outerRing3}/>
                                            </div>
                                            <div id = {main.ring4}>
                                            <img src = "svg_assets/logo_assets/innerRing.svg" id = {main.innerRing4}/>
                                            <img src = "svg_assets/logo_assets/outerRing.svg" id = {main.outerRing4}/>
                                            </div>
                                        </div>
                                        <div className = {main.logoBackground}>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            
                            <div id = {main.whatWeDo}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </>
    )
}

export default homepage;