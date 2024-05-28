import Head from 'next/head';
import MapSvg from '../pages/components/map';
import '../styles/map-page/MapPage.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>SVG Pan and Zoom</title>
        <meta name="description" content="SVG Pan and Zoom Example in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>SVG Pan and Zoom</h1>
        <MapSvg />
      </main>
    </div>
  );
}