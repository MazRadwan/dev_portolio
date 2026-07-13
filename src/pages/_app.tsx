import type { AppProps } from "next/app";
import Head from "next/head";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";

// Self-hosted at build time by next/font — no runtime CDN <link>.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Expose the real font family names as global :root variables so the
          base (mono) and prose faces resolve everywhere, not just on a wrapper. */}
      <Head>
        <style>{`:root{--app-mono:${plexMono.style.fontFamily};--app-prose:${hanken.style.fontFamily};}`}</style>
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
