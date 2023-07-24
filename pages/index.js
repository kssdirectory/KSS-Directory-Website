import Head from 'next/head'
import { useState, useEffect } from 'react'



// function checkForErrors(errorCheck, )
const loadMore = "loading"
export default function Home() {
  // Runs everytime the state changes
  
  const [anceList, setAnceList] = useState()

  const[index, updateIndex] = useState(0)
  const numAnceTotal = 7
  let loadMore = <button class = "loadMore" onClick = {() => updateIndex(index + 1)}>Load more...</button>
  
  const errorCheck = []

  useEffect(() => {
    // Any code here will only run once on page load, or when 'index' var is updated
    // because of the 'index' var that is passed through
    
    // Sending an HTTP request to the web server
    // Change this to the correct URL
    const myRequest = new Request("https://3b13-35-227-86-218.ngrok-free.app/ance/batch/" + numAnceTotal + "/" + index);
    fetch(myRequest, {method:"GET", headers:{Accept:"application/json"}})

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
          const tempList = anceList
          for (const [key, value]  of Object.entries(response)) {
            tempList[key] = value
          }
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
      loadMore = <button class = "loadMore-disabled">Load more...</button>
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
            dateIdentifierList.push(<div class = "dateIdentifier-day">{<div>{section[0]}</div>}</div>)

            // date
            dateIdentifierList.push(<div class = "dateIdentifier-date">{section[2] + "/" + section[3] + "/" + section[1]}</div>)

            indivAnce.push(<div>{dateIdentifierList}</div>)
            
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
            if(ances[0] === tag) {
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
            const anceType = <div class = "anceType">{indivAnceSort[i][0][0]}</div>
            repeatAnceTypeCheck.push(indivAnceSort[i][0][0])
            specificAnceSect.push(anceType)
          }

          for (let k = 0; k < indivAnceSort[i].length; k++) {
            // iterating through each individual announcement to get the details, e.g. brief announcement descriptions.
            if (!errorCheck.includes(indivAnceSort[i][k])) {
              const specificAnce = []
              const specificAnceBrief = []
              // announcement tag, e.g., graphic design club
              specificAnceBrief.push(<div class = "anceTag">{indivAnceSort[i][k][1]}</div>)
              
              // announcement brief description
              if (indivAnceSort[i][k][2].length > 80) {
                // this checks if the announcement brief description is too long, and then only pushes the first 80 characters
                // necessary to ensure that it doesn't flow over the announcement cards
                // contrary to popular belief, the condensed KSS Directory announcements are for some reason often not that condensed...
                // not my problem, I'm just the guy that's coding the website I guess.
                // I don't actually write the condensed announcements lol
                specificAnceBrief.push(<div class = "anceBrief">{indivAnceSort[i][k][2].slice(0,80) + "..."}</div>)
              } else {
                specificAnceBrief.push(<div class = "anceBrief">{indivAnceSort[i][k][2]}</div>)
              }
              
              // container css class used here to allow for the announcement tag and brief description to be in the same line.
              specificAnce.push(<div class = "container">{specificAnceBrief}</div>)
              
              // announcement detailed description
              if (indivAnceSort[i][k][3].length > 86) {
                // just like with the announcement brief description, this checks if the detailed description is too long

                specificAnce.push(<div class = "anceDtls">{indivAnceSort[i][k][3].slice(0,86) + "..."}</div>)
              } else{
                specificAnce.push(<div class = "anceDtls">{indivAnceSort[i][k][3]}</div>)
              }

              // All of the parts of a specific individual announcement are pushed (as React objects) to this list
              // It is given the CSS class called "anceSection" so that the hover effect can work
              specificAnceSect.push(<div class = "anceSection">{specificAnce}</div>)

              // pushing the announcement to the errorCheck list so that it doesn't render multiple times
              errorCheck.push(indivAnceSort[i][k])
            }
            
          }
          
          // pushing each individual announcement connected to a category to the indivAnce list, together
          indivAnce.push(<div>{specificAnceSect}</div>)

        }
            }
          }
          }
        
          // pushing the indivAnce list to anceCards, which is the base Announcement card part
          // CSS class of "anceCards" used to determine how the announcement card itself looks.
        anceCards.push(<div class = "anceCards">{indivAnce}</div>)
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

        {/* Importing the search icon */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>

      <header>
        <div class = "container">
          {/* div with container class used so that all divs immediately inside of it can be overlapping */}

          {/* this div is for the background blur thing, scroll downwards on the site to see it in action */}
          <div id = "inside-header-bg">
          </div>

          {/* This header is for all of the elements that actually go inside of the header, i.e., links */}
          <div id = "inside-header">
            <a href = "https://kss.limestone.on.ca/">KSS Website</a>
            <a href = "https://ldsb.elearningontario.ca/d2l/home/13979494">D2L</a>
            <a href = "https://ldsb.myontarioedu.ca/aspen/logonSSO.do?deploymentId=ldsbsis&districtId=*dst">Aspen</a>
            <a href = "https://discord.gg/smmE34cHZh">Join our Discord!</a>
          </div>
        </div>
      </header>

      <main class = "body" style = {{"padding-top": "200px"}}>

        {/* Main title */}
        <h1 style = {{"text-align": "center"}}>Welcome to <b class = "h1-highlight">KSS Directory!</b></h1>

        {/* description of the site */}
        <p style = {{"width": "40%", "text-align": "center", "margin-left": "auto", "margin-right": "auto", "margin-bottom": "2rem"}}><b>KSS Directory is Kingston Secondary School’s #1 student-run resource repository!</b> <br></br>Easily access a complete announcement archive, alongside the plethora of other student resources, by scrolling or clicking one of the following buttons.</p>
        
        <div class = "container">
          {/* Container used to centre the buttons */}
          <div class = "buttonCentre">
            <div style = {{"width":"34rem", "margin-top": '1.5rem', "margin-bottom": '3rem'}} class = "buttonCentre">

              {/* Date filter button */}
              <button class = "regularButton" style = {{"margin-left": "0"}}>Date</button>

              {/* search button */}
              <button class = "regularButton">
                <div class = "container">
                Search
                <span class="material-symbols-outlined">
                search
                </span>
                </div>
              </button>

              {/* club filter button */}
              <button class = "regularButton" style = {{"margin-right": "0"}}>Club</button>
            </div>
          </div>
        </div>

        {/* this is to call the anceCards variable that was set before */}
        {anceCards}

        <div class = "container">
        {/* container class used here so that the "load more" button can be centred horizontally */}
          <div class = "buttonCentre">
            {/* this is to call the button was set before */}
            {/* needs to be a React compeonent because it changes depending on if there are any announcements available to load. */}
            {loadMore}
          </div>
        </div>
        
      </main>
    </>
  )


}

