import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from "next/link";
import React from 'react';
import styles from "@/styles/officialResourcesModal.module.css"
import Modal from 'react-modal';

// Todo: styling here is a gigantic mess and I'm sorry
// 
function KSSResourcesMobile({openState, afterOpen, closeModal}) {
    return (
        <Modal
            isOpen = {openState}
            onRequestClose={closeModal}
            onAfterOpen={afterOpen}
            className="resourcesPopupModalContainer" // fun fact: this does not have to be a real class, just something other than the default to get rid of the default styling
            overlayClassName="popupOverlay"
        >
            <div id = {styles.resourcesPopupModalBGClick} onClick = {closeModal}/>
            <div style = {{position: "absolute", top:"0px", bottom:"0px", left:"0px", right:"0px", paddingRight: "calc(100vw/10)",  paddingLeft: "calc(100vw/10)", background: "var(--b3BG)", margin: "25px", borderRadius: "32px", animation: "0.5s cubic-bezier(0.02, 0.38, 0.22, 0.98) 0s 1 slideInTop"}}>
                
                <div className = "overlapContainer" style={{overflow:"hidden"}}>
                    <div className={styles.modalBackgroundContainer} >
                        <div className = {styles.modalBackground} >
                            <div id={styles.logoContainer}>
                                <img src = "svg_assets/kssLogo.svg" id = {styles.kssResourcesPageLogo}/>
                            </div>

                            <div onClick={closeModal} id={styles.kssResourcesCloseLink}>
                                <img src = "svg_assets/x_icon.svg" id ={styles.kssResourcesCloseIcon}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className = {styles.modalForeground} >
                        <h1 style = {{color: "white", marginTop:"1em"}}>Official KSS Resources</h1>
                        <div className = {styles.mobileResourceLinkContainer}><a className={styles.resourceLink} href="https://outlook.office365.com/owa/calendar/KCVIStudentServices1@limestoneschools.onmicrosoft.com/bookings/" target="_blank">Student Services</a></div>
                        <div className = {styles.mobileResourceLinkContainer}><a className={styles.resourceLink} href="https://cdnsm5-ss16.sharpschool.com/UserFiles/Servers/Server_352698/File/Board/School%20Year%20Calendar/2024-07-02-2024-2025-LDSB%20School%20Year%20Calendar.pdf" target="_blank">School Year Calendar</a></div>
                        <div className = {styles.mobileResourceLinkContainer}><a className={styles.resourceLink} href="https://app.myblueprint.ca/student/dashboard" target="_blank">My Blueprint (Course Selection)</a></div>
                        <div className = {styles.mobileResourceLinkContainer}><a className={styles.resourceLink} href="https://ldsb.elearningontario.ca/d2l/home/13979494" target="_blank">D2L Minds Online</a></div>
                        <div className = {styles.mobileResourceLinkContainer}><a className={styles.resourceLink} href="https://ldsb.myontarioedu.ca/aspen/logonSSO.do?deploymentId=ldsbsis&districtId=*dst" target="_blank">Aspen (Course Schedules)</a></div>
                        <div style={{height:"20px"}}/>
                    </div>
                </div>
            </div>
        </Modal>
    );
  }
  
  export default KSSResourcesMobile;