import { useState } from "react";
import type { FAQ } from "@/data/home";
import { AnimatePresence, motion } from "motion/react";

type FaqProps = {
  contents: FAQ[];
};

const FaqSection = ({ contents }: FaqProps) => {
  const [openId, setOpenId] = useState(contents[0]?.id ?? "");

  return (
    <section
      id="faq"
      className="w-full bg-surface-cream px-6 pt-12 pb-16 font-sans"
    >
      <div className="mx-auto max-w-[680px]">
        <h2 className="text-center font-serif-display text-[28px] leading-[32px] font-normal text-black md:text-[32px] md:leading-[42px]">
          FAQ
        </h2>

        <div className="border-t border-neutral-500">
          {contents.map((content, index) => {
            const isOpen = openId === content.id;
            const isLast = index === contents.length - 1;

            return (
              <div
                key={content.id}
                className={isLast ? "" : "border-b border-neutral-500"}
              >
                <motion.button
                  type="button"
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-4 text-left"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  onClick={() =>
                    setOpenId((currentId) =>
                      currentId === content.id ? "" : content.id,
                    )
                  }
                >
                  <span className="font-sans text-[18px] font-bold leading-[28px] text-neutral-900">
                    {index + 1}. "{content.question}"
                  </span>
                  <span
                    className={`relative mt-1 h-[25px] w-[25px] shrink-0 transition-transform duration-200 cursor-pointer ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    <span className="absolute top-1/2 left-0 h-px w-full bg-black" />
                    <span className="absolute top-0 left-1/2 h-full w-px bg-black" />
                  </span>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 font-sans text-[18px] font-normal leading-[28px] text-neutral-900">
                        {content.answer.map((block, blockIndex) => (
                          <div
                            key={`${content.id}-${block.title ?? blockIndex}`}
                            className="mb-6 last:mb-0"
                          >
                            {block.title && (
                              <h3 className="mb-1 font-sans text-[18px] font-bold leading-[28px] text-neutral-900">
                                {block.title}
                              </h3>
                            )}
                            {block.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
