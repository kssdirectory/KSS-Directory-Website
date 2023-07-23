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
    // Any code here will only run once (on page load)
    // because of array that is passed through
    // runs everytime the array changes
    
    console.log("button")
    console.log(index)
    const myRequest = new Request("http://127.0.1:8000/ance/batch/" + numAnceTotal + "/" + index);
  
    fetch(myRequest, {method:"GET", headers:{Accept:"application/json"}})

      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })

      .then((response) => {
        //setAnceList(response)
        console.log("anceList!!")
        console.log(anceList)
        if (anceList) {
          const tempList = anceList
          for (const [key, value]  of Object.entries(response)) {
            tempList[key] = value
          }
        } else {
          setAnceList(response)
        }
      });

  }, [index])

  const anceCards = []
  if (anceList) {
    if (anceList.Last === true) {
      loadMore = <button class = "loadMore-disabled">Load more...</button>
    }
    for (const [key, value] of Object.entries(anceList)) {
      const repeatAnceTypeCheck = []
      const indivAnce = []
      const indivAnceUnsort = []

      if (typeof value !== 'boolean') {
        const valueDict = JSON.parse(value)
        const anceTags = []
        for (const [sectionNum, section] of Object.entries(valueDict)) {
          const abc = []
          if (sectionNum === "0") {
            // I.e., if the announcement section is a date identifier.
            const dateIdentifierList = [] 

            // day
            dateIdentifierList.push(<div class = "dateIdentifier-day">{<div>{section[0]}</div>}</div>)

            // date
            dateIdentifierList.push(<div class = "dateIdentifier-date">{section[2] + "/" + section[3] + "/" + section[1]}</div>)

            indivAnce.push(<div>{dateIdentifierList}</div>)
            
          } else {
            // I.e., if the announcement section is a regular club/event announcement.
            if (!anceTags.includes(section[0])) {
              anceTags.push(section[0])
            }
            indivAnceUnsort.push(section)
            //const a = <div style = {{background: "green", margin: "5px"}}>{section[2]}</div>
            // indivAnce.push(<div><p> {a}</p></div>)
          }
        }

        const indivAnceSort = []
        for (const [key, tag] of Object.entries(anceTags)) {
          const sortAnceTemp = []
          for (const [key2, ances] of Object.entries(indivAnceUnsort)) {
            if(ances[0] === tag) {
              sortAnceTemp.push(ances)
          if (!indivAnceSort.includes(sortAnceTemp)) {
            // I don't know why, but sometimes my code errors and duplicates announcements
            // I think it may have to do with the fact that the page is calling this function multiple times
            // Because the page has to reload (a behaviour of Next.js and HTTP request delays)
            indivAnceSort.push(sortAnceTemp)
          }
        for (let i = 0; i < indivAnceSort.length; i++) {

          // Sorts annoucements by type
          const specificAnceSect = []
          if (!repeatAnceTypeCheck.includes(indivAnceSort[i][0][0])) {
            const anceType = <div class = "anceType">{indivAnceSort[i][0][0]}</div>
            repeatAnceTypeCheck.push(indivAnceSort[i][0][0])
            specificAnceSect.push(anceType)
          }
          for (let k = 0; k < indivAnceSort[i].length; k++) {
            if (!errorCheck.includes(indivAnceSort[i][k])) {
              const specificAnce = []
              const specificAnceBrief = []
              // announcement tag, e.g., graphic design club
              specificAnceBrief.push(<div class = "anceTag">{indivAnceSort[i][k][1]}</div>)
              
              // announcement brief description
              if (indivAnceSort[i][k][2].length > 80) {
                specificAnceBrief.push(<div class = "anceBrief">{indivAnceSort[i][k][2].slice(0,80) + "..."}</div>)
              } else {
                specificAnceBrief.push(<div class = "anceBrief">{indivAnceSort[i][k][2]}</div>)
              }

              specificAnce.push(<div class = "container">{specificAnceBrief}</div>)
              
              if (indivAnceSort[i][k][3].length > 86) {
              // announcement detailed description
                specificAnce.push(<div class = "anceDtls">{indivAnceSort[i][k][3].slice(0,86) + "..."}</div>)
              } else{
                specificAnce.push(<div class = "anceDtls">{indivAnceSort[i][k][3]}</div>)
              }
              specificAnceSect.push(<div class = "anceSection">{specificAnce}</div>)
              console.log("specificAnceSect")
              console.log(indivAnceSort[i])
              console.log(k)
              errorCheck.push(indivAnceSort[i][k])
            }
            
          }
          
          indivAnce.push(<div>{specificAnceSect}</div>)

        }
        

            }
          }
          }
          console.log("sorted")
          console.log(indivAnceSort)
        anceCards.push(<div class = "anceCards">{indivAnce}</div>)
        }
        //console.log("aowfeij")
        //console.log(value)
        // anceCards.push(<div class = "anceCards"><p> {indivAnce}</p></div>)
        
      }
    }
  
  

  return (
    <>
      <Head>
        <title>KSS Directory</title>
        <meta name="description" content="KSS Directory is Kingston Secondary School’s #1 student-run resource repository, where you can easily access a complete announcement archive, alongside a plethora of other student resources." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" sizes="76x76" href="static/compassLogo.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>

      <header>
        <div class = "container">
          <div id = "inside-header-bg">
          </div>
          <div id = "inside-header">
            <a href = "https://kss.limestone.on.ca/">KSS Website</a>
            <a href = "https://ldsb.elearningontario.ca/d2l/home/13979494">D2L</a>
            <a href = "https://ldsb.myontarioedu.ca/aspen/logonSSO.do?deploymentId=ldsbsis&districtId=*dst">Aspen</a>
            <a href = "https://discord.gg/smmE34cHZh" style = {{"right":"0"}}>Join our Discord!</a>
          </div>
        </div>
      </header>

      <main class = "body" style = {{"padding-top": "200px"}}>
        <h1 style = {{"text-align": "center"}}>Welcome to <b class = "h1-highlight">KSS Directory!</b></h1>
        <p style = {{"width": "40%", "text-align": "center", "margin-left": "auto", "margin-right": "auto", "margin-bottom": "2rem"}}><b>KSS Directory is Kingston Secondary School’s #1 student-run resource repository!</b> <br></br>Easily access a complete announcement archive, alongside the plethora of other student resources, by scrolling or clicking one of the following buttons.</p>
        <div class = "container">
          <div class = "buttonCentre">
            <div style = {{"width":"34rem", "margin-top": '1.5rem', "margin-bottom": '3rem'}} class = "buttonCentre">
              <button class = "regularButton" style = {{"margin-left": "0"}}>Date</button>
              <button class = "regularButton">
                <div class = "container">
                Search
                <span class="material-symbols-outlined">
                search
                </span>
                </div>
              </button>
              <button class = "regularButton" style = {{"margin-right": "0"}}>Club</button>
            </div>
          </div>
        </div>
        {anceCards}
        {/* setNumber changes number and updates page upon change */}
        <div class = "container">
          <div class = "buttonCentre">
            {loadMore}
          </div>
        </div>
        
      </main>
    </>
  )


}

