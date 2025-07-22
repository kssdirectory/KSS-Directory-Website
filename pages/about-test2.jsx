import main from '../styles/about-page/main.module.css'
import Column from '@/components/about/VerticalOutlines';
import Hero from '@/components/about/AboutHero';
import Head from 'next/head';
import Link from "next/link";
import React from 'react';

function aboutTest() {

    var vertOffsets = [0, 0, 93, 98, 0, 0];
    var heights = [50, 100, 40, 20, 30];
    var vertColumns = [];
    var contributors = [["Matthew Kong", "2024-2025"], ["Matthew Kabin","2024-2026"], ["Ethan Tian", "2024-2026"]]

    for (const offset of vertOffsets) {
        vertColumns.push(
            <Column
                vertOffset = {offset}
                heightList = {heights}
                line1 = {"Web & Bot"}
                line2 = {"Development"}
                nameList = {contributors}
            />
        )
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