import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from "next/link";
import React from 'react';

function ComingSoonPage() {
    return (
        <>
            <Head>
                <title>Coming soon!</title>

                    <meta name="description" content="KSS Directory is a student-run resource repository for Kingston Secondary School, where you can easily access a complete announcement archive, alongside a plethora of other student resources! Made by Matthew Kong." />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" sizes="76x76" href="static/compassLogo.ico" />
            </Head>
            <Link href = "/" style = {{"margin": "0px"}}>
                <div style = {{position: "absolute", top:"0px", bottom:"0px", left:"0px", right:"0px", padding: "calc(100vw/10)", background: "#072136", margin: "25px", "border-radius": "32px", animation: "0.5s cubic-bezier(0.02, 0.38, 0.22, 0.98) 0s 1 slideInTop"}}>
                    <div class = "overlapContainer">
                        <div class = "background">
                            <img src = "art_assets/waifu1.png" style = {{width: "calc(100vh/4)", position: "absolute", bottom: "0px", right: "0px"}}></img>
                        </div>
                        <div class = "foreground" style = {{background: "linear-gradient(0.25turn, #072136, rgba(7, 33, 54, 0))"}}>
                            <h1 style = {{color: "white"}}>This page is coming soon!</h1>
                            <p style = {{marginBottom:"5px", color: "white"}}>Sorry for the wait....</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
  }
  
  export default ComingSoonPage;