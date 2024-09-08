import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from "next/link";
import React from 'react';
import main from '../styles/test-page/main.module.css'



const TestPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function scrollingElement(scrollPos) {
      const mainColour = "#BA7312";
      const heroContent = <div className={main.heroSection}>
        <img
        src="/art_assets/waifu1.png"
        style={{width:500,height:500}}
        ></img>
        
      </div>;
      if (scrollPos < 67) {

        return <div className={main.tilesFlexBox} style={{ alignItem: "center", justifyContent: "center" }}>
          <div style={{
            backgroundColor: mainColour,
            width: window.innerWidth - scrollPos * 3,
            height: window.innerHeight - scrollPos * 3,
            borderRadius: scrollPos / 2,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}>
            {heroContent}
          </div>
        </div>
      } else if (scrollPos < window.innerWidth / 3.4) {
        console.log(scrollPos)
        return <div className={main.tilesFlexBox}>
          <div style={{
            backgroundColor: mainColour,
            width: window.innerWidth - 67 * 3 - (scrollPos - 67) * 5,
            height: window.innerHeight - 200,
            borderRadius: 50,
            position: "fixed",
            top: 100,
            left: 100
          }}></div>

          <div style = {{
            width: window.innerWidth / 3.4,
            height: window.innerHeight - 200,
            backgroundColor: "red",
            position: "fixed",
            marginLeft: window.innerWidth - 67 * 3 - (scrollPos - 67) * 5 + 150,
            position: "fixed",
            top: 100
            }}>

          </div>
          <div style = {{width: 50, height: "100vh", backgroundColor: "red", position: "fixed", marginLeft: 100}}>

          </div> 
        </div>
      } else if (scrollPos > window.innerWidth / 3.4) {
        return <div className={main.tilesFlexBox} style={{ alignItem: "center", justifyContent: "center" }}>
          <div style={{
            backgroundColor: mainColour,
            width: window.innerWidth - window.innerWidth / 3.4 * 2,
            height: window.innerHeight - 200,
            borderRadius: 50,
            position: "fixed",
            top: 100,
            left: 100
          }}></div>
        </div>
      }
    }
    const handleScroll = () => {
      setScrollY([window.scrollY, scrollingElement(window.scrollY)]);
    };

    // just trigger this so that the initial state 
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };


  }, []);


  return (
    <>
      <Head>
        <title>Test Page!</title>

        <meta name="description" content="KSS Directory is a student-run resource repository for Kingston Secondary School, where you can easily access a complete announcement archive, alongside a plethora of other student resources! Made by Matthew Kong." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" sizes="76x76" href="static/compassLogo.ico" />
      </Head>
      <div style={{ height: 8000 }}> {/* just added to make scrollbar available */}
        <div style={{ position: "fixed", top: 0 }}>
          {scrollY[0]}
        </div>
        {scrollY[1]}
      </div>
    </>
  );
};

export default TestPage;