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

        <link rel="canonical" href="https://mazradwan.netlify.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mazradwan.netlify.app/" />
        <meta property="og:image" content="https://mazradwan.netlify.app/og.png?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:title" content={SITE.title} />
        <meta property="og:description" content={SITE.description} />
        <meta property="og:site_name" content={SITE.name} />
        <meta property="og:locale" content="en_CA" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://mazradwan.netlify.app/og.png?v=2" />
        <meta name="twitter:title" content={SITE.title} />
        <meta name="twitter:description" content={SITE.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Maz Radwan",
              jobTitle: "Senior Programmer / Analyst",
              url: "https://mazradwan.netlify.app",
              sameAs: [
                "https://github.com/MazRadwan",
                "https://linkedin.com/in/maz-radwan",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Newfoundland and Labrador Health Services",
              },
              knowsAbout: [
                "AI-agent orchestration",
                ".NET enterprise systems",
                "Identity and access management",
                "LLM security",
                "AWS",
                "Azure",
              ],
            }),
          }}
        />
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
