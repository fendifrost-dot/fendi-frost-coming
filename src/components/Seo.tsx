import { Helmet } from "react-helmet-async";
import { siteMeta } from "@/config/site";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "music.song" | "music.album";
  noindex?: boolean;
}

const Seo = ({
  title,
  description = siteMeta.description,
  path = "/",
  image = siteMeta.defaultOgImage,
  type = "website",
  noindex = false,
}: SeoProps) => {
  const fullTitle = title ? `${title} | Fendi Frost` : siteMeta.title;
  const canonical = `${siteMeta.url}${path === "/" ? "" : path}`;
  const absoluteImage = image.startsWith("http") ? image : `${siteMeta.url}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Fendi Frost" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
};

export default Seo;
