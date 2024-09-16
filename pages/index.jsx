import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from "next/link";
import React from 'react';
import OfficialResourcesModal from "@/components/index/OfficialResourcesModal" 
import Modal from 'react-modal';

headers: new Headers({
  "ngrok-skip-browser-warning": "true",
})

Modal.setAppElement('#__next');

const announcementPopupModal = {
  content: {
    width: "100%",
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
};

const bgColour = "#072136"

// This is the hopefully static URL for the server that the website sends HTTP requests to. 
// URL of the current web server is "https://musical-blindly-cheetah.ngrok-free.app"
// Local URL of webServer.py is obviously http://127.0.0.1:8000
// It is set through the .env.local file for development and through the vercel dashboard for production
const webServerURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const loadMore = "loading"
export default function Home() {
  // Runs everytime the state changes

  function hslToHex(hue, sat, light) {
    // Function to turn HSL values into hex, which is needed becuase the web server provides the 
    // colour for the banner of each club as a hue value. The JSX(?) here doesn't recognize HSL
    // for some reason....
    light /= 100;
    const a = sat * Math.min(light, 1 - light) / 100;
    const f = n => {
      const k = (n + hue / 30) % 12;
      const color = light - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  const [anceModalIsOpen, setAnceModalIsOpen] = React.useState(false);

  function openAnceModal() {
    setAnceModalIsOpen(true);
  }

  function afterOpenAnceModal() {
    // references are now sync'd and can be accessed.
    document.body.style.overflow = 'hidden' 
  }

  function closeAnceModal() {
    setAnceModalIsOpen(false);
    document.body.style.overflow = 'auto' 
    setModalColour("#A1A1A1")
    setclubDtlsDesc(noClubDtlsDesc)
    setClubDtlsFlex(<div></div>)
  }

  const [modalCont, setModalCont] = useState([["a", "b", "c", "d"], ["a", "b", "c", "d"], ["a", "b", "c", "d"], ["a", "b", "c", "d"]])
  const [modalColour, setModalColour] = useState("#FFFFFF")
  const noClubDtlsDesc = <h2 id = "clubDtlsDesc">No description added yet. Please contact the KSS Directory Maintainers on our <a href = 'https://discord.gg/BJtVbtqdDY' style = {{"fontWeight": 100, "margin": "0px", "textDecoration": "underline"}}>Discord Server</a> to see if one can be added! Thanks :)</h2>
  const [clubDtlsDesc, setclubDtlsDesc] = useState(noClubDtlsDesc)
  const [clubDtlsFlex, setClubDtlsFlex] = useState(<div></div>)
  const [socialsListBG, setSocialsListBG] = useState(<div></div>)

  const [anceList, setAnceList] = useState()

  const [index, updateIndex] = useState(0)
  const numAnceTotal = 7
  let loadMore = <button class="loadMore" onClick={() => updateIndex(index + 1)}>Load more...</button>

  const yearSeparator = (
    <div className="yearSeparatorDiv" key="YearSeparator">  
      <div className='yearSeparatorLine'/>
      <p className='yearSeparatorText'>Last Year</p>
      <div className='yearSeparatorLine'/>
    </div>
  );

  const errorCheck = []

  // Resources modal stuff
  const [resModalIsOpen, setResModalIsOpen] = useState(false);
  function OpenResModal(){
    //console.log("Trying to open res modal");
    setResModalIsOpen(true);
    //console.log(resModalIsOpen);
  }

  function afterOpenResModal() {
    // make sure scrolling on page is disabled while modal is open
    document.body.style.overflow = 'hidden' 
  } 

  function closeResModal() {
    document.body.style.overflow = 'auto'
    setResModalIsOpen(false);
  }
  
  //console.log("URL IS: " + webServerURL);
  useEffect(() => {
    // Any code here will only run once on page load, or when 'index' var is updated
    // because of the 'index' var that is passed through
    // Sending an HTTP request to the web server
    const myRequest = new Request(webServerURL + "/ance/batch/" + numAnceTotal + "/" + index);
    fetch(myRequest, { method: "GET", headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" } })

      .then((response) => {
        // if the web server doesn't respond, return an error
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })

      .then((response) => {
        // if the web server does respond, check if anceList has been defined yet
        // I need to do this because the webpage runs the code several times
        // and so the useEffect() function is not synced with the rest of the program.
        if (anceList) {
          const tempList = {...anceList};
          for (const [key, value] of Object.entries(response)) {
            tempList[key] = value
          }
          setAnceList(tempList);
        } else {

          // if anceList has not been defined yet, define it as the response Object.
          setAnceList(response)
        }
      });

  }, [index])

  useEffect(() => {
    // Function for retrieving club info data from web server

    // Used to have the following in brackets, but it always evaluates to true
    // modalCont !== [["a", "b", "c", "d"], ["a", "b", "c", "d"], ["a", "b", "c", "d"], ["a", "b", "c", "d"]]
    if (true) {
      let modalContUpdated = modalCont[1][1]

      if (modalCont[1][1].includes(" ")) {
        modalContUpdated = (modalCont[1][1].replace(" ", "%20"))
      }
      
      const myRequest = new Request(webServerURL + "/clubinfo/" + modalContUpdated);
      fetch(myRequest, { method: "GET", headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" } })
  
      .then((response) => {
        // if the web server doesn't respond, return an error
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })

      .then((response) => {

        if (response !== "none") {
          setModalColour(hslToHex(response['Colour'], 60, 62))

          if ("Description" in response) {
            setclubDtlsDesc(<h2 id = "clubDtlsDesc">{response["Description"]}</h2>)
          } else {
            setclubDtlsDesc(noClubDtlsDesc)
          }
          let clubDtlsFlexTemp = []
          for (const i of [ "Location", "Supervisor(s)", "Meeting times/dates"]) {
            if (i in response) {
              if (i == "Meeting times/dates") {
                clubDtlsFlexTemp.push(<div class = "clubDtlsFlexItemBG" style = {{"flex": 1.6}}>
                  <h2 class = "clubDtlsFlexItemTitle">{i}</h2>
                  <h2 class = "clubDtlsFlexItemDtls">{response[i]}</h2>
                </div>)
              } else {
                clubDtlsFlexTemp.push(<div class = "clubDtlsFlexItemBG">
                  <h2 class = "clubDtlsFlexItemTitle">{i}</h2>
                  <h2 class = "clubDtlsFlexItemDtls">{response[i]}</h2>
                </div>)
              }
              
            }
          }

          const socialsListFileNames = ["discord", "instagram", "classroom", "linktr", "tiktok", "youtu"]

          if ("Socials" in response) {
            let socialsList = []
            let socialsListNotReact = []
            for (let i = 0; i < response["Socials"].length; i++) {
              for (const k of socialsListFileNames) {
                if (response["Socials"][i].includes(k)) {
                  socialsList.push(
                    <a style = {{"background": "rgba(255, 255, 255, 0)", "padding": "0px", "border": "0px", "margin": "0px", "padding": "0px", "height": "auto"}} href={response["Socials"][i]} target="_blank">
                      <img src = {"svg_assets/socials_icons/" + k + ".svg"} class = "socialsButtons"/>
                    </a>
                  )
                  socialsListNotReact.push(response["Socials"][i])
                }
              } 
            } if (socialsList.length !== response["Socials"].length) {
                for (const i of response["Socials"]) {
                  if (!socialsListNotReact.includes(i)) {
                    socialsList.push(
                      <a style = {{"background": "rgba(255, 255, 255, 0)", "padding": "0px", "border": "0px", "margin": "0px", "padding": "0px", "height": "auto"}} href={i} target="_blank">
                        <img src = {"svg_assets/socials_icons/unknown.svg"} class = "socialsButtons"/>
                      </a>
                    )
                  }
                }
              }
            setSocialsListBG(<div id = "socialsListBG">{socialsList}</div>)
          } else {
            setSocialsListBG('')
          }
          setClubDtlsFlex(clubDtlsFlexTemp)

        } else {
          setModalColour("#A1A1A1")
          setclubDtlsDesc(noClubDtlsDesc)
          setClubDtlsFlex('')
          setSocialsListBG('')
        }
        
      })
    }
  
  }, [modalCont])

  // anceCards is the list with all of the React components for the announcement cards
  const anceCards = []

  if (anceList) {
    // Checking if anceList has been declared yet.
    // This is needed, because anceList is initially undefined because the program executes before useEffect() finishes running.

    if (anceList.Last === true) {
      // Checking if the announcement batch that was returned by the HTTP request is the final one
      // i.e., if there are any other announcements left on the web server that haven't yet been sent over.

      // If it is the last one, then this sets loadMore (which is the button that loads more announcements) to a disabled state
      // This prevents users from clicking on it, which prevents the front-end from sending a "none"-type HTTP request (I think that's what they're called?) 
      loadMore = <button class="loadMore-disabled">Load more...</button>
    }

    let yearSeparatorInserted = false;

    for (const [key, value] of Object.entries(anceList)) {
      // iterating through anceList, which is an object
      // each 'value' is another object (stored as a string) that represents all of the announcements for a given day.

      // repeateAnceTypeCheck is needed to make sure that it doesn't duplicate renders
      // My website loads several times, which causes this part of the code to run several times.
      // This is because it's waiting for the useEffect() function to finish.
      const repeatAnceTypeCheck = []

      // indivAnce stores individual announcements as React components, e.g., the entire announcement for Graphic Design Club for a given day.
      const indivAnce = []

      // same as above, but unsorted and as regular JS objects.
      const indivAnceUnsort = []

      if (typeof value !== 'boolean') {
        // checking if it's a boolean
        // needed because anceList always has a boolean variable that tells the website that if it's the last batch of not.

        // 'value' is originally a string, so this converts it back into a dictionary
        // note: i'm not sure why, but it's no longer a string? so i just set valueDict equal to value straight up
        // great code yes.
        const valueDict = value

        // anceTags is a list of all the announcement categories
        const anceTags = []

        // format: [YYYY][MM][DD]
        let anceCardDate = 99999999;
        const yearCutoffDate = 20240810;

        for (const [sectionNum, section] of Object.entries(valueDict)) {
          // iterating through each individual announcement in the dictionary of the full day's announcements

          if (sectionNum === "0") {
            // I.e., if the announcement section is a date identifier type.

            // this variable stores the date identifer parts as a React component
            const dateIdentifierList = []

            // day
            dateIdentifierList.push(<div class="dateIdentifier-day" key = {section[0]+sectionNum}>{<div>{section[0]}</div>}</div>)

            // date
            dateIdentifierList.push(<div class="dateIdentifier-date" key = {section[2]+section[3]+section[1]+sectionNum}>{section[2] + "/" + section[3] + "/" + section[1]}</div>)
            
            anceCardDate = parseInt(section[1].toString() + section[2].toString() + section[3].toString());

            indivAnce.push(<div key = {sectionNum + "dateIdentifierList"}>{dateIdentifierList}</div>)

          } else {
            // I.e., if the announcement section is a regular club/event announcement.

            if (!anceTags.includes(section[0])) {
              // checks if anceTags (which is a list of all the announcement categories) already has the current category name
              // this is needed because for some reason it would render the announcement category name for each individual announcement
              anceTags.push(section[0])
            }

            indivAnceUnsort.push(section)
          }
        }

        //the sorted list of individual announcements, stored as regular JS objects
        const indivAnceSort = []

        for (const [key, tag] of Object.entries(anceTags)) {
          // iterating through each announcement category name
          const sortAnceTemp = []
          for (const [key2, ances] of Object.entries(indivAnceUnsort)) {
            if (ances[0] === tag) {
              sortAnceTemp.push(ances)
              if (!indivAnceSort.includes(sortAnceTemp)) {
                // I don't know why, but sometimes my code errors and duplicates announcements
                // I think it may have to do with the fact that the page is calling this function multiple times
                // Because the page has to reload (a behaviour of Next.js and HTTP request delays)
                // the use of this "temporary" variable mitigates somewhat.
                indivAnceSort.push(sortAnceTemp)
              }

              for (let i = 0; i < indivAnceSort.length; i++) {
                // iterating through all of the sorted individual announcement objects

                // Sorts annoucements by type
                const specificAnceSect = []
                if (!repeatAnceTypeCheck.includes(indivAnceSort[i][0][0])) {
                  // checks if the announcement has already been parsed
                  // again, this is necessary because of the weird duplicating behaviour of NextJS/React I think?
                  const anceType = <div class="anceType" key = {i + "anceType" + key2}>{indivAnceSort[i][0][0]}</div>
                  repeatAnceTypeCheck.push(indivAnceSort[i][0][0])
                  specificAnceSect.push(anceType)
                }

                for (let k = 0; k < indivAnceSort[i].length; k++) {
                  // iterating through each individual announcement to get the details, e.g. brief announcement descriptions.
                  if (!errorCheck.includes(indivAnceSort[i][k])) {
                    const specificAnce = []
                    const specificAnceBrief = []
                    // announcement tag, e.g., graphic design club

                    if (indivAnceSort[i][k][4] !== "none") {
                      let indivAnceColour = hslToHex(indivAnceSort[i][k][4], 80, 40)
                      specificAnceBrief.push(<div class="anceTag" key = {k + "anceSorted" + key2} style = {{"background": indivAnceColour + 10, "border": "1px solid " + indivAnceColour, "color": indivAnceColour}}>{indivAnceSort[i][k][1]}</div>)
                    } else {
                      specificAnceBrief.push(<div class="anceTag" key = {k + "anceSorted" + key2} style = {{"background": "#62626210", "border": "1px solid #626262", "color": "#626262"}}>{indivAnceSort[i][k][1]}</div>)
                    }


                    // announcement brief description
                    specificAnceBrief.push(<div class="anceBrief" key = {k + " " + i + "anceBrief" + key2}>{indivAnceSort[i][k][2]}</div>)

                    // container css class used here to allow for the announcement tag and brief description to be in the same line.
                    specificAnce.push(<div class="container" key = {k + " " + i +"specificAnce" + key2}>{specificAnceBrief}</div>)

                    // announcement detailed description
                    // if (indivAnceSort[i][k][3].length > 86) {
                    //   // just like with the announcement brief description, this checks if the detailed description is too long

                    //   specificAnce.push(<div class="anceDtls" key = {k + " " + i + "anceDtls" + key2}>{indivAnceSort[i][k][3].slice(0, 86) + "..."}</div>)
                    // } else {
                    //   specificAnce.push(<div class="anceDtls" key = {k + " " + i + "anceDtls" + key2}>{indivAnceSort[i][k][3]}</div>)
                    // }
                    specificAnce.push(<div class="anceDtls" key = {k + " " + i + "anceDtls" + key2}>{indivAnceSort[i][k][3]}</div>)

                    // All of the parts of a specific individual announcement are pushed (as React objects) to this list
                    // It is given the CSS class called "anceSection" so that the hover effect can work
                    specificAnceSect.push(<div class="anceSection" key = {k + " " + i + "anceSection" + key2} onClick = {() => {openAnceModal(); setModalCont([valueDict[0], ances])}}>{specificAnce}</div>)
                    // put valueDict[0] for the announcement date details
                    // put ances for the specific announcement details

                    // pushing the announcement to the errorCheck list so that it doesn't render multiple times
                    errorCheck.push(indivAnceSort[i][k])
                  }

                }

                // pushing each individual announcement connected to a category to the indivAnce list, together
                indivAnce.push(<div key = {i + "indivAnce" + key2}>{specificAnceSect}</div>)

              }
            }
          }
        }

        // Insert year separator (somewhat janky solution)
        if (!yearSeparatorInserted && anceCardDate < yearCutoffDate) {
          anceCards.push(yearSeparator);
          yearSeparatorInserted = true;
        }

        // pushing the indivAnce list to anceCards, which is the base Announcement card part
        // CSS class of "anceCards" used to determine how the announcement card itself looks.
        anceCards.push(<div class="anceCards" key = {key + "anceCards"}>{indivAnce}</div>)
      }
    }
  }

// idk how the backend is gonna link so have fun putting this into an if statement later

let weeklyCafMenu = []; 

  // weeklyCafMenu.push(
  //   <div className = "cafDayContainer">
  //     <rect className = "cafTextLine"></rect>
  //     <div className = "cafDayInformation">
  //       <h2>[Day of Week]</h2>
  //       <p>[$x.xx] | [food item]</p>
  //     </div>
  //   </div>
  // )

  weeklyCafMenu.push(
    <div className = "cafDayContainer">
      <rect className = "cafTextLine"></rect>
      <div className = "cafDayInformation">
        <h2>Tuesday</h2>
        <p>$2 | Mac & Cheese</p>
      </div>
    </div>
  )

  weeklyCafMenu.push(
    <div className = "cafDayContainer">
      <rect className = "cafTextLine"></rect>
      <div className = "cafDayInformation">
        <h2>Wednesday</h2>
        <p>$3 | Pizza (Pepperoni/Cheese)</p>
      </div>
    </div>
  )

  var cafeteriaBoxElement = (
    <div className = "cafMenuBox">
      <div className = "cafTitleCard">
        <div className = "infoHeaderText">Cafeteria Menu</div>
        <div className = "infoBodyText">Take a look ahead at this week's lunchtime cafeteria menu!</div>
      </div>
      <div className = "cafMenuContainer">
        {weeklyCafMenu}
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>KSS Directory</title>

        {/* Setting the website metadata (if that's what you call it), this shows up on embeds and I think google search? */}
        <meta name="description" content="KSS Directory is a student-run resource repository for Kingston Secondary School, where you can easily access a complete announcement archive, alongside a plethora of other student resources! " />

        {/* Not exactly sure what this to be honest, but when I remove it, it breaks my website */}
        {/* I think it sets the viewable area of my website? This is my first time using NextJS and React, so I don't really know */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>

        {/* Setting the favicon of the site to the KSS Directory logo */}
        <link rel="icon" sizes="76x76" href="static/compassLogo.ico" />

      </Head>
        <main class="body">
          <div>
              <Modal
                isOpen={anceModalIsOpen}
                onAfterOpen={afterOpenAnceModal}
                onRequestClose={closeAnceModal}
                className="announcementPopupModalBG"
                overlayClassName="popupOverlay"
                
              >
                <div class = "announcementPopupModalBG">
                  <div class = "announcementPopupModalBGClick" onClick = {closeAnceModal}>
                  </div>
                  <div class = "announcementPopupModal">
                    <div class = "overlapContainer" id = "overlapContainerAnnouncementPopupModalColourBG">
                      <div class = "background" style = {{"background": modalColour}} id = "announcementPopupModalColourBG"></div>
                      <div class = "foreground" id = "announcementPopupModalColourFG">
                        <div class = "overlapContainer" style = {{"width": "100%"}}>
                          <div class = "background">
                            <h3 id = "announcementPopupModalTagBG">{modalCont[1][1]}</h3>
                          </div>
                          <div class = "foreground">
                            <div class = "overlapContainer">
                              <div class = "background">
                                <div id = "announcementPopupModalTagFlexBox">
                                  <div class = "announcementPopupModalTagSides" style = {{"background": modalColour}}></div>
                                  <div id = "announcementPopupModalTag">
                                    <h3 id = "announcementPopupModalTagText">{modalCont[1][1]}</h3>
                                  </div>
                                  <div class = "announcementPopupModalTagSides" style = {{"background": modalColour}}></div>
                                </div>
                              </div>
                              <div class = "foreground">
                                <button onClick={closeAnceModal} id = "announcementPopupModalXIconBG">
                                  <img src = "svg_assets/x_icon.svg" id = "announcementPopupModalXIcon"/>
                                </button>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class = "overlapContainer" id = "overlapContainerAnnouncementPopupModalColourBG">
                      <div class = "background" id = "announcementPopupModalColourBelowBG" style = {{"background": modalColour}}></div>
                      <div class = "foreground" id = "announcementPopupModalColourBelowFG"></div>
                    </div>
                    <div style = {{"transform": "translateY(-48px)"}}>
                      <h2 id = "announcementPopupModalAnceBrief">{modalCont[1][2]}</h2>
                      <h2 id = "announcementPopupModalAnceDtls">{modalCont[1][3]}</h2>
                      <div id = "clubDtlsBorder">
                        <h2 id = "clubDtlsLegend">Club/event details</h2>
                        <h2 id = "clubDtlsName">{modalCont[1][1]}</h2>
                        {clubDtlsDesc}
                        <div id = "clubDtlsFlexBox">
                          {clubDtlsFlex}
                        </div>
                        {socialsListBG}
                      </div> 
                    </div>
                  </div>
                </div>
                
              </Modal>

              <OfficialResourcesModal
                openState={resModalIsOpen}
                afterOpen={afterOpenResModal}
                closeModal={closeResModal}
              />
          </div>

          <div class = "wrapper">
              <Link class = "button0" href = "about">
                  <div class = "overlapContainer">

                      <div class = "background">
                          <div style = {{ "position": "absolute", "overflow": "hidden", "width": "100%", "height": "100%" }}>
                              <div id = "heroButtonText1">KSS
                                  <span class = "heroButtonTextOutline"> DIRECTORY KSS DIRECTORY</span>
                              </div>
                              <div id = "heroButtonText2">
                                  <span class = "heroButtonTextOutline"> KSS DIRECTORY KSS </span>
                                  DIRECT
                                  <span class = "heroButtonTextOutline">ORY KSS DIRECTORY</span>
                              </div>
                              <div id = "heroButtonText3">
                                  <span class = "heroButtonTextOutline">KSS DIRECTORY KSS DIRECT</span>
                                  ORY
                              </div>
                          </div>
                      </div>

                      <div class = "foreground">
                          <div class = "overlapContainer">
                              <div class = "background">
                                  <div class = "overlapContainer">
                                      <div class = "background" id = "b0GradientOpaque"></div>
                                      <div class = "foreground" id = "b0Gradient"></div>
                                  </div>
                              </div>
                              <div class = "foreground">
                                  <h5>Learn more!</h5>
                                  <img src = "svg_assets/arrow_icon.svg" class = "arrowIcon"/>
                                  <div id = "b0Text">
                                    <img src = "svg_assets/compass_logo_vector.svg" id = "b0CompassLogo"/>
                                    <h4 style = {{ "color": "white" }}>KSS Directory is a student-run resource repository for Kingston Secondary School! Scroll down to see a full announcement archive, or click on one of the buttons on the right to access the plethora of other KSS resources.</h4>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Link>
              <div class = "verticalButtonWrapper1">
                  <a href = "#mainAnnouncementsSection" class = "button1">
                      
                      <div class = "overlapContainer">
                          
                          <div class = "background">
                              <div id = "b1Ance1">
                                  <div class = "b1AnceTag"></div>
                                  <div id = "b1AnceBrief1"></div>
                                  <div id = "b1AnceDetails1"></div>
                              </div>
                              <div id = "b1Ance2">
                                  <div class = "b1AnceTag"></div>
                                  <div id = "b1AnceBrief2"></div>
                                  <div id = "b1AnceDetails2"></div>
                              </div>
                              <div id = "b1Ance3">
                                  <div class = "b1AnceTag"></div>
                                  <div id = "b1AnceBrief3"></div>
                                  <div id = "b1AnceDetails3"></div>
                              </div>
                          </div>

                          <div class = "foreground">
                              <div class = "overlapContainer">
                                  <div class = "background">
                                      <div class = "overlapContainer">
                                          <div class = "background" id = "b1GradientOpaque"></div>
                                          <div class = "foreground" id = "b1Gradient"></div>
                                      </div>
                                  </div>
                                  <div class = "foreground">
                                    <div id = "b1Text">
                                      <h3>ANNOUNCEMENTS</h3>
                                      <h4>Scroll to see a complete archive of KSS announcements!</h4>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </a>
                  <Link class = "button2" href = "map-page">
                      <div class = "overlapContainer">

                          <div class = "background">
                              <div style = {{ "position": "absolute", "width": "100%", "height": "100%", "overflow": "hidden", "border-radius": "25px" }}>
                                  <img src = "svg_assets/b2Map.svg" id = "b2Map"/>
                              </div>
                          </div>
                          <div class = "foreground">
                              <div class = "overlapContainer">
                                  <div class = "background">
                                      <div class = "overlapContainer">
                                          <div class = "background" id = "b2GradientOpaque"></div>
                                          <div class = "foreground" id = "b2Gradient"></div>
                                      </div>
                                  </div>
                                  <div class = "foreground">
                                      <img src = "svg_assets/arrow_icon.svg" class = "arrowIcon"/>
                                      <div id = "b2Text">
                                        <h3>INTERACTIVE MAP</h3>
                                        <h4>Click to view an interactive map of KSS and its surrounding area!</h4>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Link>
              </div>
              <div class = "verticalButtonWrapper2">
                  <div class = "button3">

                      <div class = "overlapContainer">

                          <div class = "background">
                            <img src = "svg_assets/kssLogo.svg" id = "kssLogo"/>
                          </div>

                          <div class = "foreground">
                              <div class = "overlapContainer">
                                  <div class = "background">
                                      <div class = "overlapContainer">
                                          <div class = "background" id = "b3GradientOpaque"></div>
                                          <div class = "foreground" id = "b3Gradient">
                                          </div>
                                      </div>
                                  </div>
                                  <div class = "foreground">
                                      <div class="b3LinkContainer" >
                                          <div class = "b3Links"><a href="https://outlook.office365.com/owa/calendar/KCVIStudentServices1@limestoneschools.onmicrosoft.com/bookings/" target="_blank"><h4>Student Services</h4></a></div>
                                          <div class = "b3Links"><a href="https://cdnsm5-ss16.sharpschool.com/UserFiles/Servers/Server_352698/File/Board/School%20Year%20Calendar/2024-07-02-2024-2025-LDSB%20School%20Year%20Calendar.pdf" target="_blank"><h4>School Year Calendar</h4></a></div>
                                          <div class = "b3Links"><a href="https://app.myblueprint.ca/student/dashboard" target="_blank"><h4>My Blueprint (Course Selection)</h4></a></div>
                                          <div class = "b3Links"><a href="https://ldsb.elearningontario.ca/d2l/home/13979494" target="_blank"><h4>D2L Minds Online</h4></a></div>
                                          <div class = "b3Links"><a href="https://ldsb.myontarioedu.ca/aspen/logonSSO.do?deploymentId=ldsbsis&districtId=*dst" target="_blank"><h4>Aspen (Course Schedules)</h4></a></div>
                                      </div>
                                      <h3>OFFICIAL KSS RESOURCES</h3>
                                  </div>
                              </div>
                          </div>

                          <div onClick={OpenResModal} class = "button3MobileLink"/>
                      </div>

                  </div>
                  <Link class = "button4" href = "clubs">
                      <div class = "overlapContainer">

                          <div class = "background">
                              <div class = "overlapContainer">
                                  <div class = "background">
                                      <img src = "svg_assets/b4Folder.svg" id = "b4Folder"/>
                                  </div>
                                  <div class = "foreground">
                                      <img src = "svg_assets/b4Arrow.svg" id = "b4Arrow" />
                                  </div>
                              </div>
                              
                          </div>

                          <div class = "foreground">
                              <div class = "overlapContainer">
                                  <div class = "background">
                                      <div class = "overlapContainer">
                                          <div class = "background" id = "b4GradientOpaque"></div>
                                          <div class = "foreground" id = "b4Gradient"></div>
                                      </div>
                                  </div>
                                  <div class = "foreground">
                                    <img src = "svg_assets/arrow_icon.svg" class = "arrowIcon"/>
                                    <div id = "b4Text">
                                      <h3>CLUB REPOSITORY <sup>BETA</sup></h3>
                                      <h4>Information on KSS Clubs compiled by their respective teams!</h4>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </Link>
              </div>
          </div>

          {/* This wrapper holds the side content (discord prompt, current menu) while also centering the announcements list on screen*/}
          <div class="scrollWrapper">
            <div class = "leftInfoContainer">
              <div class="infoFlex">
                <div class= "twoColumnDisabled">
                  {cafeteriaBoxElement}
                </div>
              </div>
            </div>
            <div class="annnouncementContainer" id = "mainAnnouncementsSection">
              {/* Container used to centre the buttons */}
              {/* Commenting it out because I can't implement the features in time for the start of school... */}
              {/*
                <div class="buttonCentre">
                  <div style={{ "width": "34rem", "margin-top": '1.5rem', "margin-bottom": '3rem' }} class="buttonCentre">

                    <button class="regularButton" style={{ "margin-left": "0" }}>Date</button>

                    <button class="regularButton" id = "searchButton">
                      <div class="container">
                        <span id = "searchButtonText">Search</span>
                        <img src = "svg_assets/searchIcon.svg" class = "searchIcon" />
                      </div>
                    </button>

                    <button class="regularButton" style={{ "margin-right": "0" }}>Club</button>
                  </div>
                </div>
              */}

              {/* this is to call the anceCards variable that was set before */}
              {anceCards}

              {/* container class used here so that the "load more" button can be centred horizontally */}
              <div class="buttonCentre">
                {/* this is to call the button was set before */}
                {/* needs to be a React compeonent because it changes depending on if there are any announcements available to load. */}
                {loadMore}
              </div>
            </div>
            <div class="rightInfoContainer">
              <div class="infoFlex">
                <div class="discordPromptBox">
                  <div class="discordPromptContainer">
                    <div class="discordPromptTextContainer"> 
                      <div class="infoHeaderText"> Join our Discord! </div>
                      <div class="infoBodyText"> Subscribe to specific topics and get daily announcement pings. </div>
                    </div>
                    
                    <a href = "https://discord.gg/BJtVbtqdDY" class="discordButton">

                      <img src = "svg_assets/about_page/discord.svg" class="discordIcon"/>
                    </a>
                  </div>  
                </div>
                <div class = "twoColumnEnabled">
                  {cafeteriaBoxElement}
                </div>
              </div>
            </div>
          </div>

        </main>
    </>
  )


}
