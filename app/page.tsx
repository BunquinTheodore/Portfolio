import Navbar from "@/components/Navbar";
import CinematicPortfolio from "@/components/CinematicPortfolio";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Theodore Bunquin",
  url: "https://bunquintheodore.github.io",
  jobTitle: "Full Stack Developer and Data Analyst",
  address: {
    "@type": "PostalAddress",
    addressCountry: "Philippines",
  },
  sameAs: [
    "https://github.com/BunquinTheodore",
    "https://www.linkedin.com/in/theodore-bunquin-4150ba255/",
    "https://www.facebook.com/theodore.bunquin.7",
  ],
  knowsAbout: [
    "Full Stack Development",
    "Data Analysis",
    "Flutter",
    "Next.js",
    "Laravel",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <CinematicPortfolio />
    </>
  );
}
