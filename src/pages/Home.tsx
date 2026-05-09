import FaqSection from "@/components/FaqSection";
import ProductCarousel from "@/components/ProductCarousel";
import ReadEpaperSection from "@/components/ReadEpaperSection";
import SubscribeSection from "@/components/SubscribeSection";
import { epaper, ourProducts, subscribePlan } from "@/data/home";

const Home = () => {
  return (
    <>
      <ProductCarousel products={ourProducts} />
      <SubscribeSection contents={subscribePlan} />
      <ReadEpaperSection contents={epaper} />
      <FaqSection />
    </>
  );
};

export default Home;
