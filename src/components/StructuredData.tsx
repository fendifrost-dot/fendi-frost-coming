import { Helmet } from "react-helmet-async";
import { siteMeta, links } from "@/config/site";

const StructuredData = () => {
  const data = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Fendi Frost",
    url: siteMeta.url,
    image: `${siteMeta.url}${siteMeta.defaultOgImage}`,
    genre: ["Hip-Hop", "House", "Electronic"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chicago",
      addressRegion: "IL",
      addressCountry: "US",
    },
    sameAs: [links.spotify, links.appleMusic, links.instagram, links.soundcloud, links.twitter],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

export default StructuredData;
