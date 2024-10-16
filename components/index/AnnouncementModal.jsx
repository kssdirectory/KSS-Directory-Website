import React, { useEffect } from 'react';
import styles from "@/styles/officialResourcesModal.module.css"
import Modal from 'react-modal';
import { hslToHex } from '@/util/util';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

const webServerURL = process.env.NEXT_PUBLIC_BACKEND_URL;

function AnnouncementsModal({openState, afterOpen, closeModal, announcementContent}) {
    const noClubDtlsDesc = <h2 id = "clubDtlsDesc">No description added yet. Please contact the KSS Directory Maintainers on our <a href = 'https://discord.gg/BJtVbtqdDY' style = {{"fontWeight": 100, "margin": "0px", "textDecoration": "underline"}}>Discord Server</a> to see if one can be added! Thanks :)</h2>

    let modalColour = "#FFFFFF";
    let clubDtlsDesc = noClubDtlsDesc;
    let clubDtlsFlex = (<div></div>);
    let socialsListBG = (<div></div>);

    // Used to have the following in brackets, but it always evaluates to true
    // modalCont !== [["a", "b", "c", "d"], ["a", "b", "c", "d"], ["a", "b", "c", "d"], ["a", "b", "c", "d"]]
    let modalContUpdated = announcementContent[1][1]

    if (announcementContent[1][1].includes(" ")) {
        modalContUpdated = (announcementContent[1][1].replace(" ", "%20"))
    }

    const { isPending, isError, data } = useQuery({
        queryKey: ['AnnouncementQuery' + announcementContent.toString()],
        queryFn: async () => {
            // don't fetch if using default value
            //console.log("fetching " + modalContUpdated);
            if (modalContUpdated === "b") {
                return "none";
            }

            const res = await fetch(webServerURL + "/clubinfo/" + modalContUpdated)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await res.json();

            if (data.toString() == "none") {
                throw new Error('No cafeteria data!')
            }
            
            return data;
        },
        refetchOnWindowFocus: false,
    })

    // const myRequest = new Request(webServerURL + "/clubinfo/" + modalContUpdated);
    // fetch(myRequest, { method: "GET", headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" } })

    // .then((response) => {
    //     // if the web server doesn't respond, return an error
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();

    // }).then((response) => {}}

    if (!isError && !isPending) {
        let response = data; 
        if (response !== "none") {
            modalColour = hslToHex(response['Colour'], 60, 62);

            if ("Description" in response) {
                clubDtlsDesc = (<h2 id = "clubDtlsDesc">{response["Description"]}</h2>);
            } else {
                clubDtlsDesc = noClubDtlsDesc;
            }
            let clubDtlsFlexTemp = []
            for (const i of [ "Location", "Supervisor(s)", "Meeting times/dates"]) {
            if (i in response) {
                if (response[i] != "") {
                if (i == "Meeting times/dates") {
                    clubDtlsFlexTemp.push(<div className = "clubDtlsFlexItemBG" style = {{"flex": 1.6}}>
                    <h2 className = "clubDtlsFlexItemTitle">{i}</h2>
                    <h2 className = "clubDtlsFlexItemDtls">{response[i]}</h2>
                    </div>)
                } else {
                    clubDtlsFlexTemp.push(<div className = "clubDtlsFlexItemBG">
                    <h2 className = "clubDtlsFlexItemTitle">{i}</h2>
                    <h2 className = "clubDtlsFlexItemDtls" >{response[i]}</h2>
                    </div>)
                }
                }
            }
            }

            const socialsListFileNames = ["discord", "instagram", "classroom", "linktr", "tiktok", "youtube"]

            let socialsContainerObject = <></>;
            if ("Socials" in response) {
            let socialsList = []
            let socialsListNotReact = []

            for (let i = 0; i < response["Socials"].length; i++) {
                for (const k of socialsListFileNames) {
                if (response["Socials"][i].includes(k)) {
                    socialsList.push(
                    <a style = {{"background": "rgba(255, 255, 255, 0)", "padding": "0px", "border": "0px", "margin": "0px", "padding": "0px", "height": "auto"}} href={response["Socials"][i]} target="_blank">
                        <img src = {"svg_assets/socials_icons/" + k + ".svg"} className = "socialsButtons"/>
                    </a>
                    )
                    socialsListNotReact.push(response["Socials"][i])
                }
                } 
            } 

            if (socialsList.length !== response["Socials"].length) {
                for (const i of response["Socials"]) {
                if (!socialsListNotReact.includes(i)) {
                    socialsList.push(
                    <a style = {{"background": "rgba(255, 255, 255, 0)", "padding": "0px", "border": "0px", "margin": "0px", "padding": "0px", "height": "auto"}} href={i} target="_blank">
                        <img src = {"svg_assets/socials_icons/unknown.svg"} className = "socialsButtons"/>
                    </a>
                    )
                }
                }
            }
            
            socialsContainerObject = <div id = "socialsListBG">{socialsList}</div>;
            }

            let clubRepoPromptObject = <></>;
            if ("Club_Repo_URL" in response) {
            clubRepoPromptObject = (
                <Link className="anceModalClubRepoPrompt" href={"/club-pages/" + response["Club_Repo_URL"]}>
                    <div className="clubRepoPromptText">
                        <h2 className="clubDtlsFlexItemTitle">Club Repository</h2>
                        <h2 className="clubDtlsFlexItemDtls">Check out more info on this club’s repository page!</h2>
                    </div>
                    <svg className="clubRepoPromptArrow" viewBox="0 0 50 50" version="1.1">
                        <path d="M13.107,13.107L13.107,17.227L29.427,17.241L11.645,35.023L14.568,37.945L32.348,20.164L32.334,36.484L36.484,36.484L36.484,13.107L13.106,13.107L13.107,13.107Z"/>
                    </svg>
                </Link>
            );
            }

            clubDtlsFlex = clubDtlsFlexTemp;

            socialsListBG = (
                <div className="verticalModalFlex">
                    {socialsContainerObject}
                    {clubRepoPromptObject}
                </div>
            );

        } else {
            modalColour = "#A1A1A1";
            clubDtlsDesc = (noClubDtlsDesc);
            clubDtlsFlex = '';
            socialsListBG = '';
        }
    }

    return (
        <Modal
            isOpen={openState}
            onAfterOpen={afterOpen}
            onRequestClose={closeModal}
            className="announcementPopupModalBG"
            overlayClassName="popupOverlay"
            
            >
            <div className = "announcementPopupModalBG">
                <div className = "announcementPopupModalBGClick" onClick = {closeModal}>
                </div>
                <div className = "announcementPopupModal">
                <div className = "overlapContainer" id = "overlapContainerAnnouncementPopupModalColourBG">
                    <div className = "background" style = {{"background": modalColour}} id = "announcementPopupModalColourBG"></div>
                    <div className = "foreground" id = "announcementPopupModalColourFG">
                    <div className = "overlapContainer" style = {{"width": "100%"}}>
                        <div className = "background">
                        <h3 id = "announcementPopupModalTagBG">{announcementContent[1][1]}</h3>
                        </div>
                        <div className = "foreground">
                        <div className = "overlapContainer">
                            <div className = "background">
                            <div id = "announcementPopupModalTagFlexBox">
                                <div className = "announcementPopupModalTagSides" style = {{"background": modalColour}}></div>
                                <div id = "announcementPopupModalTag">
                                <h3 id = "announcementPopupModalTagText">{announcementContent[1][1]}</h3>
                                </div>
                                <div className = "announcementPopupModalTagSides" style = {{"background": modalColour}}></div>
                            </div>
                            </div>
                            <div className = "foreground">
                            <button onClick={closeModal} id = "announcementPopupModalXIconBG">
                                <img src = "svg_assets/x_icon.svg" id = "announcementPopupModalXIcon"/>
                            </button>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                    </div>
                </div>
                <div className = "overlapContainer" id = "overlapContainerAnnouncementPopupModalColourBG">
                    <div className = "background" id = "announcementPopupModalColourBelowBG" style = {{"background": modalColour}}></div>
                    <div className = "foreground" id = "announcementPopupModalColourBelowFG"></div>
                </div>
                <div style = {{"transform": "translateY(-48px)"}}>
                    <h2 id = "announcementPopupModalAnceBrief">{announcementContent[1][2]}</h2>
                    <h2 id = "announcementPopupModalAnceDtls">{announcementContent[1][3]}</h2>
                    <div id = "clubDtlsBorder">
                    <h2 id = "clubDtlsLegend">Club/event details</h2>
                    <h2 id = "clubDtlsName">{announcementContent[1][1]}</h2>
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
    );

}

export default AnnouncementsModal;