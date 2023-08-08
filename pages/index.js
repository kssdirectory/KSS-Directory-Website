import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from "next/link";

headers: new Headers({
  "ngrok-skip-browser-warning": "true",
})

// function checkForErrors(errorCheck, )
const loadMore = "loading"
export default function Home() {
  // Runs everytime the state changes

  const [anceList, setAnceList] = useState()

  const [index, updateIndex] = useState(0)
  const numAnceTotal = 7
  let loadMore = <button class="loadMore" onClick={() => updateIndex(index + 1)}>Load more...</button>
  const errorCheck = []

  useEffect(() => {
    // Any code here will only run once on page load, or when 'index' var is updated
    // because of the 'index' var that is passed through

    // Sending an HTTP request to the web server
    // Change this to the correct URL
    const myRequest = new Request("https://a23b-35-227-86-218.ngrok-free.app/ance/batch/" + numAnceTotal + "/" + index);
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
        const valueDict = JSON.parse(value)

        // anceTags is a list of all the announcement categories
        const anceTags = []

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
                    specificAnceBrief.push(<div class="anceTag" key = {k + "anceSorted" + key2}>{indivAnceSort[i][k][1]}</div>)

                    // announcement brief description
                    specificAnceBrief.push(<div class="anceBrief" key = {k + " " + i + "anceBrief" + key2}>{indivAnceSort[i][k][2]}</div>)

                    // container css class used here to allow for the announcement tag and brief description to be in the same line.
                    specificAnce.push(<div class="container" key = {k + " " + i +"specificAnce" + key2}>{specificAnceBrief}</div>)

                    // announcement detailed description
                    if (indivAnceSort[i][k][3].length > 86) {
                      // just like with the announcement brief description, this checks if the detailed description is too long

                      specificAnce.push(<div class="anceDtls" key = {k + " " + i + "anceDtls" + key2}>{indivAnceSort[i][k][3].slice(0, 86) + "..."}</div>)
                    } else {
                      specificAnce.push(<div class="anceDtls" key = {k + " " + i + "anceDtls" + key2}>{indivAnceSort[i][k][3]}</div>)
                    }

                    // All of the parts of a specific individual announcement are pushed (as React objects) to this list
                    // It is given the CSS class called "anceSection" so that the hover effect can work
                    specificAnceSect.push(<div class="anceSection" key = {k + " " + i + "anceSection" + key2} onClick = {() => console.log(valueDict[0])}>{specificAnce}</div>)
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

        // pushing the indivAnce list to anceCards, which is the base Announcement card part
        // CSS class of "anceCards" used to determine how the announcement card itself looks.
        anceCards.push(<div class="anceCards" key = {key + "anceCards"}>{indivAnce}</div>)
      }
    }
  }



  return (
    <>
      <Head>
        <title>KSS Directory</title>

        {/* Setting the website metadata (if that's what you call it), this shows up on embeds and I think google search? */}
        <meta name="description" content="KSS Directory is Kingston Secondary School’s #1 student-run resource repository, where you can easily access a complete announcement archive, alongside a plethora of other student resources." />

        {/* Not exactly sure what this to be honest, but when I remove it, it breaks my website */}
        {/* I think it sets the viewable area of my website? This is my first time using NextJS and React, so I don't really know */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Setting the favicon of the site to the KSS Directory logo */}
        <link rel="icon" sizes="76x76" href="static/compassLogo.ico" />

      </Head>

      <main class="body">

        <div class = "wrapper">
            <div class = "button0">
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
            </div>
            <div class = "verticalButtonWrapper1">
                <Link href = "#mainAnnouncementsSection" class = "button1">
                    
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
                </Link>
                <div class = "button2">
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
                </div>
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
                                        <div class = "foreground" id = "b3Gradient"></div>
                                    </div>
                                </div>
                                <div class = "foreground">
                                    <div style = {{ "display": "flex", "flex-flow": "column wrap", "width": "100%", "height": "80%", "justify-content": "center", "padding-top": "8%" }}>
                                        <div class = "b3Links"><a href="" target="_blank"><h4>23/24 Semester 1 Timetables</h4></a></div>
                                        <div class = "b3Links"><a href="" target="_blank"><h4>School Year Calendar</h4></a></div>
                                        <div class = "b3Links"><a href="" target="_blank"><h4>Official KSS Floor Plans</h4></a></div>
                                        <div class = "b3Links"><a href="https://ldsb.elearningontario.ca/d2l/home/13979494" target="_blank"><h4>D2L Minds Online</h4></a></div>
                                        <div class = "b3Links"><a href="https://ldsb.myontarioedu.ca/aspen/logonSSO.do?deploymentId=ldsbsis&districtId=*dst" target="_blank"><h4>Aspen (Course Schedules)</h4></a></div>

                                    </div>
                                    <h3>OFFICIAL KSS RESOURCES</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class = "button4">
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
                                  <div id = "b4Text">
                                    <h3>SCHOOLWORK DATABASES</h3>
                                    <h4>A database of resources to help with your schoolwork!</h4>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container" style = {{"padding-top": "50px"}} id = "mainAnnouncementsSection">
          {/* Container used to centre the buttons */}
          <div class="buttonCentre">
            <div style={{ "width": "34rem", "margin-top": '1.5rem', "margin-bottom": '3rem' }} class="buttonCentre">

              {/* Date filter button */}
              <button class="regularButton" style={{ "margin-left": "0" }}>Date</button>

              {/* search button */}
              <button class="regularButton" id = "searchButton">
                <div class="container">
                  <span id = "searchButtonText">Search</span>
                  <img src = "svg_assets/searchIcon.svg" class = "searchIcon" />
                </div>
              </button>

              {/* club filter button */}
              <button class="regularButton" style={{ "margin-right": "0" }}>Club</button>
            </div>
          </div>
        </div>

        {/* this is to call the anceCards variable that was set before */}
        {anceCards}

        <div class="container">
          {/* container class used here so that the "load more" button can be centred horizontally */}
          <div class="buttonCentre">
            {/* this is to call the button was set before */}
            {/* needs to be a React compeonent because it changes depending on if there are any announcements available to load. */}
            {loadMore}
          </div>
        </div>

      </main>
    </>
  )


}

