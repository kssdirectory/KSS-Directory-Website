import '@/styles/globals.css'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client = {queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover user-scalable=no"/>
      </Head>
      <Component {...pageProps} />
      <Analytics/>
      </QueryClientProvider>
    </>
  )
}
