import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from "next/link";
import React from 'react';
import main from '../styles/about-page/main.module.css'


function AboutPage() {
    return (
      <>
        <Head>
            <title>About KSS Directory</title>
            <meta name="description" content="KSS Directory is a student-run resource repository for Kingston Secondary School, where you can easily access a complete announcement archive, alongside a plethora of other student resources! Made by Matthew Kong." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" sizes="76x76" href="static/compassLogo.ico" />
        </Head>
        <div className = {main.body}>
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
          
          <div className={main.textContainer}>
            <p id = {main.heroTextAbove}>Hey, traveler!</p>
            <h1 id = {main.heroText}>Welcome to the KSS Directory!</h1>
            <p id = {main.heroTextBody}>KSS Directory is a student-run resource repository for Kingston Secondary School! We aim to catalogue all of the events happening at KSS, and serve as a convenient and organized archive. Daily announcements and many school/studying resources are hosted here, all in one place!</p>
            <div id = {main.heroButtonSection}>
              <div>
                <a href = "https://discord.gg/BJtVbtqdDY" id = {main.discordButton}>
                  <img src = "svg_assets/about_page/discord.svg" id = {main.discordIcon}/>
                </a>
              </div>
              <div>
                <Link href = "/" id = {main.whatsUpButton}>
                  <p id = {main.whatsUpButtonText}>
                    See what's up
                  </p>
                </Link>
              </div>
            </div>
            <div>
            {/* I have ruined the Matthew K. monopoly */}
              <p id = {main.creditsText}>Website by<br/>Matthew Kong, Matthew Kabin & Ethan Tian.</p>
            </div>
          </div>
        </div>
      </>
      
    );
  }

  
  export default AboutPage;