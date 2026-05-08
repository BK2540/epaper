import { useEffect, useRef, useState } from "react";
import type { HomeProduct } from "@/data/home";

type ProductCarouselProps = {
  products: HomeProduct[];
};

const AUTO_SLIDE_DELAY = 5000;
const DRAG_THRESHOLD = 50;

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const activeProduct = products[activeIndex];

  const goToNextSlide = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % products.length);
  };

  const goToPreviousSlide = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? products.length - 1 : currentIndex - 1,
    );
  };

  useEffect(() => {
    if (products.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(goToNextSlide, AUTO_SLIDE_DELAY);

    return () => window.clearInterval(intervalId);
  }, [products.length]);

  if (!activeProduct) {
    return null;
  }

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX;
  };

  const handleDragEnd = (clientX: number) => {
    if (dragStartX.current === null) {
      return;
    }

    const dragDistance = clientX - dragStartX.current;
    dragStartX.current = null;

    if (Math.abs(dragDistance) < DRAG_THRESHOLD) {
      return;
    }

    if (dragDistance < 0) {
      goToNextSlide();
      return;
    }

    goToPreviousSlide();
  };

  return (
    <section id="our-products" className="w-full">
      <div
        className="relative overflow-hidden bg-blue-100 touch-pan-y max-h-50 xl:max-h-75 2xl:max-h-max"
        onPointerDown={(event) => handleDragStart(event.clientX)}
        onPointerUp={(event) => handleDragEnd(event.clientX)}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={activeProduct.imageSmall}
          />
          <img
            src={activeProduct.imageLarge}
            alt={activeProduct.alt}
            className="block w-full object-cover h-full"
          />
        </picture>
      </div>

      {products.length > 1 && (
        <div className="flex items-center justify-center gap-2 py-3">
          {products.map((product, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={product.id}
                type="button"
                aria-label={`Show promotion ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className={`h-3.5 w-3.5 rounded-full transition-colors ${
                  isActive ? "bg-black" : "bg-neutral-500 hover:bg-neutral-600"
                }`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProductCarousel;
