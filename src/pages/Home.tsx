import FaqSection from "@/components/FaqSection";
import FormatSection from "@/components/FormatSection";
import ProductCarousel from "@/components/ProductCarousel";
import ReadEpaperSection from "@/components/ReadEpaperSection";
import SubscribeSection from "@/components/SubscribeSection";
import {
  epaper,
  faqs,
  formatPlan,
  ourProducts,
  subscribePlan,
} from "@/data/home";

const Home = () => {
  return (
    <>
      <ProductCarousel products={ourProducts} />
      <SubscribeSection contents={subscribePlan} />
      <ReadEpaperSection contents={epaper} />
      <FaqSection contents={faqs} />
      <FormatSection formats={formatPlan} />
    </>
  );
};

export default Home;
