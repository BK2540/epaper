import { useEffect, useRef, useState } from "react";
import type { Epaper } from "@/data/home";
import { motion } from "motion/react";

type EpaperProps = {
  contents: Epaper[];
};

const AUTO_SLIDE_DELAY = 10000;
const DRAG_THRESHOLD = 50;
const CAROUSEL_MEDIA_QUERY = "(max-width: 1023px)";

const ReadEpaperSection = ({ contents }: EpaperProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const selectedContent = contents[activeIndex];

  const goToNextSlide = () => {
    if (contents.length === 0) {
      return;
    }

    setActiveIndex((currentIndex) => (currentIndex + 1) % contents.length);
  };

  const goToPreviousSlide = () => {
    if (contents.length === 0) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? contents.length - 1 : currentIndex - 1,
    );
  };

  useEffect(() => {
    if (contents.length <= 1) {
      return;
    }

    const mediaQuery = window.matchMedia(CAROUSEL_MEDIA_QUERY);

    if (!mediaQuery.matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % contents.length);
    }, AUTO_SLIDE_DELAY);

    return () => window.clearInterval(intervalId);
  }, [contents.length]);

  if (!selectedContent) {
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
    <div
      id="epaper"
      className="flex h-full w-full flex-col items-center gap-[58px] bg-surface-white px-6 pt-[60px] pb-[107px] xl:pl-[95px] xl:pr-[91px] "
    >
      <h2 className="text-center font-serif-display text-[28px] leading-[32px] font-normal text-black md:text-[32px] md:leading-[42px]">
        There's a better way to experience the <br /> Bangkok Post Epaper
      </h2>

      {/* small screen */}
      <div
        className="w-full touch-pan-y lg:hidden"
        onPointerDown={(event) => handleDragStart(event.clientX)}
        onPointerUp={(event) => handleDragEnd(event.clientX)}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
        <div className="overflow-hidden bg-surface-white">
          <img
            src={selectedContent.image}
            alt={selectedContent.title}
            className="aspect-[609/489] w-full object-cover"
          />
          <div className="border-l-5 border-neutral-300 bg-surface-cream px-3 py-4 h-[202px] sm:h-[140px]">
            <h2 className="font-sans text-2xl sm:text-[28px] font-medium leading-9 text-black">
              {selectedContent.title}
            </h2>
            <p className="mt-2 font-sans text-[18px] sm:text-[20px] font-normal leading-8 text-black">
              {selectedContent.description}
            </p>
          </div>
        </div>

        {contents.length > 1 && (
          <div className="mt-7 flex items-center justify-center gap-5">
            {contents.map((content, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={content.id}
                  type="button"
                  aria-label={`Show Epaper feature ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  className={`rounded-full transition-colors h-2.5 w-2.5 ${
                    isActive
                      ? " bg-black"
                      : " bg-neutral-500 hover:bg-neutral-600"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* large screen */}
      <div className="hidden w-full grid-cols-1 gap-[13px] md:items-start lg:grid lg:grid-cols-[1.3fr_1fr] 2xl:max-w-[1280px]">
        <img
          src={selectedContent.image}
          alt={selectedContent.title}
          className="aspect-[609/489] w-full object-cover lg:max-h-[489px]"
        />

        <div className="flex flex-col max-h-[490px] justify-between h-full">
          {contents.map((content) => (
            <motion.button
              type="button"
              className={`border-l-4 px-4 text-left transition-colors cursor-pointer ${
                selectedContent.id === content.id
                  ? "border-blue-100 bg-blue-100/30 py-3 text-xl "
                  : "border-transparent bg-transparent text-[24px]"
              }`}
              key={content.id}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                x: selectedContent.id === content.id ? 4 : 0,
              }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={() => setActiveIndex(contents.indexOf(content))}
            >
              <h2 className="font-sans  font-medium leading-[32px] text-black">
                {content.title}
              </h2>
              <p className="mt-1 font-sans text-[15px] font-normal leading-[22px] text-black">
                {content.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadEpaperSection;
