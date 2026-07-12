import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { SITE } from "@/data/site";

export default function Home() {
  return (
    <>
      <Head>
        <title>{SITE.title}</title>
        <meta name="description" content={SITE.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={SITE.title} />
        <meta property="og:description" content={SITE.description} />
        <meta property="og:site_name" content={SITE.name} />
        <meta property="og:locale" content="en_CA" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={SITE.title} />
        <meta name="twitter:description" content={SITE.description} />
      </Head>
      <Layout>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </Layout>
    </>
  );
}
