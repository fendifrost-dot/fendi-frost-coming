import Seo from "@/components/Seo";
import StructuredData from "@/components/StructuredData";
import Hero from "@/components/home/Hero";
import CurrentEra from "@/components/home/CurrentEra";
import FeaturedMusic from "@/components/home/FeaturedMusic";
import VisualFilm from "@/components/home/VisualFilm";
import FashionBridge from "@/components/home/FashionBridge";
import ArchiveTeaser from "@/components/home/ArchiveTeaser";
import Workhouse from "@/components/home/Workhouse";
import JoinRunway from "@/components/home/JoinRunway";

const Index = () => {
  return (
    <>
      <Seo path="/" />
      <StructuredData />
      <Hero />
      <CurrentEra />
      <FeaturedMusic />
      <VisualFilm />
      <FashionBridge />
      <ArchiveTeaser />
      <Workhouse />
      <JoinRunway />
    </>
  );
};

export default Index;
