import type { Format } from "@/data/home";

type FormatProps = {
  formats: Format[];
};

const cardBackgroundClass: Record<Format["backgroundColor"], string> = {
  neutral: "bg-neutral-200",
  blue: "bg-blue-100",
};

const FormatSection = ({ formats }: FormatProps) => {
  return (
    <section
      id="format"
      className="w-full bg-surface-white px-6 pt-12 pb-16 font-sans"
    >
      <div className="mx-auto max-w-[690px] xl:max-w-[1280px]">
        <h2 className="mx-auto xl:max-w-[760px] text-center font-serif-display text-[28px] leading-[32px] font-normal text-black md:text-[32px] md:leading-[42px]">
          Choose the format you prefer, and enjoy even more with your
          subscription.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 ">
          {formats.map((format) => (
            <article
              key={format.id}
              className={`flex flex-col items-center px-[72px] py-10 text-center ${cardBackgroundClass[format.backgroundColor]}`}
            >
              <div className="flex w-full items-center justify-center">
                <img
                  src={format.mainImage}
                  alt={format.title}
                  className={`object-contain ${format.id === "print" ? "h-[99px]" : "h-[68px]"} `}
                />
              </div>

              <h2 className="mt-[15px] font-serif-display text-[20px] font-normal leading-[26px] text-black">
                {format.title}
                {format.subtitle && (
                  <span className="ml-1 font-sans text-[13px] font-normal leading-[26px]">
                    ({format.subtitle})
                  </span>
                )}
              </h2>
              <p className="max-w-[320px] mt-[15px] font-sans text-[13px] font-normal leading-5 text-black">
                {format.description}
              </p>
              <div className="flex flex-wrap justify-center gap-5 mt-[15px]">
                {format.buttons.map((button) => (
                  <a
                    key={button.label}
                    href={button.href}
                    className="flex h-[40px] min-w-[132px] items-center justify-center rounded-[5px] bg-black px-5 font-serif-text text-[15px] leading-5 text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {button.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormatSection;
