import FaqSection from "@/components/FaqSection";
import ProductCarousel from "@/components/ProductCarousel";
import ReadEpaperSection from "@/components/ReadEpaperSection";
import SubscribeSection from "@/components/SubscribeSection";
import { ourProducts } from "@/data/home";

const Home = () => {
  return (
    <div>
      <ProductCarousel products={ourProducts} />
      <SubscribeSection />
      <ReadEpaperSection />
      <FaqSection />
    </div>
  );
};

export default Home;
