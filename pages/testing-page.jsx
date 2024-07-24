import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from "next/link";
import React from 'react';
import main from '../styles/test-page/main.module.css'


function TestingPage() {
    const hasHTML = 
        <div>
            <h1>
                Something
            </h1>
        </div>
    ;

    const hasText = "Some Text"

    return (
        <>
        <Head>
            <title>
                Test(ing)
            </title>
        </Head>
        <div>
            <p>
                Test, with the ing being very important <br></br>
                {hasText}
            </p>
            {hasHTML}
        </div>
        </>
    )
}

export default TestingPage;