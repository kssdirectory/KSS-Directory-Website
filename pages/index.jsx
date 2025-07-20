import Head from 'next/head'
import { useState } from 'react'
import Link from "next/link";
import React from 'react';
import OfficialResourcesModal from "@/components/index/OfficialResourcesModal" 
import Modal from 'react-modal';
import CafeteriaMenu from '@/components/index/CafeteriaBox';
import useIsClientSide from '@/hooks/useIsClientSide';
import AnnouncementsModal from '@/components/index/AnnouncementModal';
import AnnouncementsList from '@/components/index/AnnouncementsList';

Modal.setAppElement('#__next');

// This is the hopefully static URL for the server that the website sends HTTP requests to. 
// URL of the current web server is "https://musical-blindly-cheetah.ngrok-free.app"
// Local URL of webServer.py is obviously http://127.0.0.1:8000
// It is set through the .env.local file for development and through the vercel dashboard for production
// const webServerURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  // Runs everytime the state changes

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
  }

  const [anceModalContent, setModalCont] = useState([["a", "b", "c", "d"], ["a", "b", "c", "d"], ["a", "b", "c", "d"], ["a", "b", "c", "d"]])

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

  // Handle edgecase when using back arrow
  if (useIsClientSide()) {
    if (!(anceModalIsOpen || resModalIsOpen)) {
      document.body.style.overflow = 'auto';
    }
  }

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
        <main className="body">
          <div>
              <AnnouncementsModal 
                openState={anceModalIsOpen}
                afterOpen={afterOpenAnceModal}
                closeModal={closeAnceModal}
                announcementContent={anceModalContent}
              />

              <OfficialResourcesModal
                openState={resModalIsOpen}
                afterOpen={afterOpenResModal}
                closeModal={closeResModal}
              />
          </div>

          <div className = "wrapper">
              <Link className = "button0" href = "about">
                  <div className = "overlapContainer">

                      <div className = "background">
                          <div style = {{ "position": "absolute", "overflow": "hidden", "width": "100%", "height": "100%" }}>
                              <div id = "heroButtonText1">KSS
                                  <span className = "heroButtonTextOutline"> DIRECTORY KSS DIRECTORY</span>
                              </div>
                              <div id = "heroButtonText2">
                                  <span className = "heroButtonTextOutline"> KSS DIRECTORY KSS </span>
                                  DIRECT
                                  <span className = "heroButtonTextOutline">ORY KSS DIRECTORY</span>
                              </div>
                              <div id = "heroButtonText3">
                                  <span className = "heroButtonTextOutline">KSS DIRECTORY KSS DIRECT</span>
                                  ORY
                              </div>
                          </div>
                      </div>

                      <div className = "foreground">
                          <div className = "overlapContainer">
                              <div className = "background">
                                  <div className = "overlapContainer">
                                      <div className = "background" id = "b0GradientOpaque"></div>
                                      <div className = "foreground" id = "b0Gradient"></div>
                                  </div>
                              </div>
                              <div className = "foreground">
                                  <h5>Learn more!</h5>
                                  <img src = "svg_assets/arrow_icon.svg" className = "arrowIcon"/>
                                  <div id = "b0Text">
                                    <img src = "svg_assets/compass_logo_vector.svg" id = "b0CompassLogo"/>
                                    <h4 style = {{ "color": "white" }}>KSS Directory is a student-run resource repository for Kingston Secondary School! Scroll down to see a full announcement archive, or click on one of the buttons on the right to access the plethora of other KSS resources.</h4>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </Link>
              <div className = "verticalButtonWrapper1">
                  <a href = "#mainAnnouncementsSection" className = "button1">
                      
                      <div className = "overlapContainer">
                          
                          <div className = "background">
                              <div id = "b1Ance1">
                                  <div className = "b1AnceTag"></div>
                                  <div id = "b1AnceBrief1"></div>
                                  <div id = "b1AnceDetails1"></div>
                              </div>
                              <div id = "b1Ance2">
                                  <div className = "b1AnceTag"></div>
                                  <div id = "b1AnceBrief2"></div>
                                  <div id = "b1AnceDetails2"></div>
                              </div>
                              <div id = "b1Ance3">
                                  <div className = "b1AnceTag"></div>
                                  <div id = "b1AnceBrief3"></div>
                                  <div id = "b1AnceDetails3"></div>
                              </div>
                          </div>

                          <div className = "foreground">
                              <div className = "overlapContainer">
                                  <div className = "background">
                                      <div className = "overlapContainer">
                                          <div className = "background" id = "b1GradientOpaque"></div>
                                          <div className = "foreground" id = "b1Gradient"></div>
                                      </div>
                                  </div>
                                  <div className = "foreground">
                                    <div id = "b1Text">
                                      <h3>ANNOUNCEMENTS</h3>
                                      <h4>Scroll to see a complete archive of KSS announcements!</h4>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </a>
                  <Link className = "button2" href = "map-page">
                      <div className = "overlapContainer">

                          <div className = "background">
                              <div style = {{ "position": "absolute", "width": "100%", "height": "100%", "overflow": "hidden", "border-radius": "25px" }}>
                                  <img src = "svg_assets/b2Map.svg" id = "b2Map"/>
                              </div>
                          </div>
                          <div className = "foreground">
                              <div className = "overlapContainer">
                                  <div className = "background">
                                      <div className = "overlapContainer">
                                          <div className = "background" id = "b2GradientOpaque"></div>
                                          <div className = "foreground" id = "b2Gradient"></div>
                                      </div>
                                  </div>
                                  <div className = "foreground">
                                      <img src = "svg_assets/arrow_icon.svg" className = "arrowIcon"/>
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
              <div className = "verticalButtonWrapper2">
                  <div className = "button3">

                      <div className = "overlapContainer">

                          <div className = "background">
                            <img src = "svg_assets/kssLogo.svg" id = "kssLogo"/>
                          </div>

                          <div className = "foreground">
                              <div className = "overlapContainer">
                                  <div className = "background">
                                      <div className = "overlapContainer">
                                          <div className = "background" id = "b3GradientOpaque"></div>
                                          <div className = "foreground" id = "b3Gradient">
                                          </div>
                                      </div>
                                  </div>
                                  <div className = "foreground">
                                      <div className="b3LinkContainer" >
                                          <div className = "b3Links"><a href="https://outlook.office365.com/owa/calendar/KCVIStudentServices1@limestoneschools.onmicrosoft.com/bookings/" target="_blank"><h4>Student Services</h4></a></div>
                                          <div className = "b3Links"><a href="https://cdnsm5-ss16.sharpschool.com/UserFiles/Servers/Server_352698/File/Board/School%20Year%20Calendar/2024-07-02-2024-2025-LDSB%20School%20Year%20Calendar.pdf" target="_blank"><h4>School Year Calendar</h4></a></div>
                                          <div className = "b3Links"><a href="https://app.myblueprint.ca/student/dashboard" target="_blank"><h4>My Blueprint (Course Selection)</h4></a></div>
                                          <div className = "b3Links"><a href="https://ldsb.elearningontario.ca/d2l/home/13979494" target="_blank"><h4>D2L Minds Online</h4></a></div>
                                          <div className = "b3Links"><a href="https://ldsb.myontarioedu.ca/aspen-go/student/schedule" target="_blank"><h4>Aspen (Course Schedules)</h4></a></div>
                                      </div>
                                      <h3>OFFICIAL KSS RESOURCES</h3>
                                  </div>
                              </div>
                          </div>

                          <div onClick={OpenResModal} className = "button3MobileLink"/>
                      </div>

                  </div>
                  <Link className = "button4" href = "clubs">
                      <div className = "overlapContainer">

                          <div className = "background">
                              <div className = "overlapContainer">
                                  <div className = "background">
                                      <img src = "svg_assets/b4Folder.svg" id = "b4Folder"/>
                                  </div>
                                  <div className = "foreground">
                                      <img src = "svg_assets/b4Arrow.svg" id = "b4Arrow" />
                                  </div>
                              </div>
                              
                          </div>

                          <div className = "foreground">
                              <div className = "overlapContainer">
                                  <div className = "background">
                                      <div className = "overlapContainer">
                                          <div className = "background" id = "b4GradientOpaque"></div>
                                          <div className = "foreground" id = "b4Gradient"></div>
                                      </div>
                                  </div>
                                  <div className = "foreground">
                                    <img src = "svg_assets/arrow_icon.svg" className = "arrowIcon"/>
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
          <div className="scrollWrapper">
            <div className = "leftInfoContainer">
              <div className="infoFlex">
                <div className= "twoColumnDisabled">
                  <CafeteriaMenu/>
                </div>
              </div>
            </div>
            <div className="annnouncementContainer" id = "mainAnnouncementsSection">
              <AnnouncementsList 
                setModalCont={setModalCont}
                openAnceModal={openAnceModal}
              />
            </div>
            <div className="rightInfoContainer">
              <div className="infoFlex">
                <div className="discordPromptBox">
                  <div className="discordPromptContainer">
                    <div className="discordPromptTextContainer"> 
                      <div className="infoHeaderText"> Join our Discord! </div>
                      <div className="infoBodyText"> Subscribe to specific topics and get daily announcement pings. </div>
                    </div>
                    
                    <a href = "https://discord.gg/BJtVbtqdDY" className="discordButton">

                      <img src = "svg_assets/about_page/discord.svg" className="discordIcon"/>
                    </a>
                  </div>  
                </div>
                <div className = "twoColumnEnabled">
                  <CafeteriaMenu/>
                </div>
              </div>
            </div>
          </div>
        </main>
    </>
  )
}