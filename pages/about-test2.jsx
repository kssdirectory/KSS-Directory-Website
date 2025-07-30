import main from '../styles/about-page/main.module.css'
import Column from '@/components/about/VerticalOutlines';
import Hero from '@/components/about/AboutHero';
import Head from 'next/head';
import Link from "next/link";
import React from 'react';

function aboutTest() {

    var vertColumns = [];
    var webContributors = [["Matthew Kong", "2024-2025"], ["Matthew Kabin","2024-2026"], ["Ethan Tian", "2024-2026"]];
    var discordContributors = [["Hilary Sun", "2022-2023"], ["Carrie Zhang", "2023-2024"], ["Ali Elsebaie", "2024-2025"], ["Valerie Sun", "2024-2026"]];
    var artContributors = [["Arzoi Bajwa", "2024-2025"], ["Matthew Kong", "2023-2024"], ["Ethan Tian", "2024-2026"]];
    var marketingContributors = [["Carrie Zhang", "2024-2025"], ["Matthew Kong", "2023-2024"], ["Selina Zhou", "2024-2025"]];
    var contributorList = [webContributors, discordContributors, artContributors, marketingContributors]



    for (const contributor of contributorList) {

    };

    return (
        <div className = {main.body}>
            <div className = {main.columnsDiv}>
                {vertColumns}
                <Hero/>
              </div>
            </div>    
    );
}

export default aboutTest;