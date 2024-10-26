import { hslToHex } from "@/util/util";
import { useEffect, useState } from "react";

const webServerURL = process.env.NEXT_PUBLIC_BACKEND_URL;

function AnnouncementsList({setModalCont, openAnceModal}) {
    //console.log("URL IS: " + webServerURL);
    const [index, updateIndex] = useState(0);
    const errorCheck = [];

    const [anceList, setAnceList] = useState();

    const numAnceToLoad = 7;
    let loadMore = <button className="loadMore" onClick={() => updateIndex(index + 1)}>Load more...</button>;
  
    const yearSeparator = (
      <div className="yearSeparatorDiv" key="YearSeparator">  
        <div className='yearSeparatorLine'/>
        <p className='yearSeparatorText'>Last Year</p>
        <div className='yearSeparatorLine'/>
      </div>
    );

    useEffect(() => {
        // Any code here will only run once on page load, or when 'index' var is updated
        // because of the 'index' var that is passed through
        // Sending an HTTP request to the web server
        const myRequest = new Request(webServerURL + "/ance/batch/" + numAnceToLoad + "/" + index);
        fetch(myRequest, { method: "GET", headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" } }).then((response) => {
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
            loadMore = <button className="loadMore-disabled">Load more...</button>
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
                    dateIdentifierList.push(<div className="dateIdentifier-day" key = {section[0]+sectionNum}>{<div>{section[0]}</div>}</div>)

                    // date
                    dateIdentifierList.push(<div className="dateIdentifier-date" key = {section[2]+section[3]+section[1]+sectionNum}>{section[2] + "/" + section[3] + "/" + section[1]}</div>)
                    
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
                                const anceType = <div className="anceType" key = {i + "anceType" + key2}>{indivAnceSort[i][0][0]}</div>
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
                                    specificAnceBrief.push(<div className="anceTag" key = {k + "anceSorted" + key2} style = {{"background": indivAnceColour + 10, "border": "1px solid " + indivAnceColour, "color": indivAnceColour}}>{indivAnceSort[i][k][1]}</div>)
                                } else {
                                    specificAnceBrief.push(<div className="anceTag" key = {k + "anceSorted" + key2} style = {{"background": "#62626210", "border": "1px solid #626262", "color": "#626262"}}>{indivAnceSort[i][k][1]}</div>)
                                }


                                // announcement brief description
                                specificAnceBrief.push(<div className="anceBrief" key = {k + " " + i + "anceBrief" + key2}>{indivAnceSort[i][k][2]}</div>)

                                // container css class used here to allow for the announcement tag and brief description to be in the same line.
                                specificAnce.push(<div className="container" key = {k + " " + i +"specificAnce" + key2}>{specificAnceBrief}</div>)

                                // announcement detailed description
                                // if (indivAnceSort[i][k][3].length > 86) {
                                //   // just like with the announcement brief description, this checks if the detailed description is too long

                                //   specificAnce.push(<div className="anceDtls" key = {k + " " + i + "anceDtls" + key2}>{indivAnceSort[i][k][3].slice(0, 86) + "..."}</div>)
                                // } else {
                                //   specificAnce.push(<div className="anceDtls" key = {k + " " + i + "anceDtls" + key2}>{indivAnceSort[i][k][3]}</div>)
                                // }
                                specificAnce.push(<div className="anceDtls" key = {k + " " + i + "anceDtls" + key2}>{indivAnceSort[i][k][3]}</div>)

                                // All of the parts of a specific individual announcement are pushed (as React objects) to this list
                                // It is given the CSS class called "anceSection" so that the hover effect can work
                                specificAnceSect.push(<div className="anceSection" key = {k + " " + i + "anceSection" + key2} onClick = {() => {openAnceModal(); setModalCont([valueDict[0], ances])}}>{specificAnce}</div>)
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
                anceCards.push(<div className="anceCards" key = {key + "anceCards"}>{indivAnce}</div>)
            }
        }
    }
    


    return (
        <>
            {/* Container used to centre the buttons */}
            {/* Commenting it out because I can't implement the features in time for the start of school... */}
            {/*
            <div className="buttonCentre">
                <div style={{ "width": "34rem", "margin-top": '1.5rem', "margin-bottom": '3rem' }} className="buttonCentre">

                <button className="regularButton" style={{ "margin-left": "0" }}>Date</button>

                <button className="regularButton" id = "searchButton">
                    <div className="container">
                    <span id = "searchButtonText">Search</span>
                    <img src = "svg_assets/searchIcon.svg" className = "searchIcon" />
                    </div>
                </button>

                <button className="regularButton" style={{ "margin-right": "0" }}>Club</button>
                </div>
            </div>
            */}

            {/* this is to call the anceCards variable that was set before */}
            {anceCards}

            {/* container class used here so that the "load more" button can be centred horizontally */}
            <div className="buttonCentre">
                {/* this is to call the button was set before */}
                {/* needs to be a React compeonent because it changes depending on if there are any announcements available to load. */}
                {loadMore}
            </div>
        </>
    );
}

export default AnnouncementsList;