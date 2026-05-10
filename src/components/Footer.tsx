const footerLinks = [
  "Terms of use",
  "Republishing permission",
  "Privacy policy",
  "Cookies policy",
  "Online advertising",
  "Contact us",
  "Tell us what you think",
  "Partnership",
];

const Footer = () => {
  return (
    <footer className="w-full text-surface-white">
      <div className="bg-black px-14 py-8 lg:hidden">
        <div className="max-w-[680px] font-sans text-left">
          <h2 className="font-bold text-[20px] leading-5 text-surface-white">
            Troubleshoot ?
          </h2>
          <p className="mt-[15px] text-[15px] font-normal leading-8">
            Contact{" "}
            <a
              href="mailto:enewspaper@bangkokpost.co.th"
              className="underline underline-offset-2"
            >
              enewspaper@bangkokpost.co.th
            </a>{" "}
            or call{" "}
            <a href="tel:026164000" className="underline underline-offset-2">
              02 616 4000
            </a>{" "}
            ext.4615, 4618 (M-F 8.30 a.m. - 5.30 p.m.)
          </p>
        </div>
      </div>

      <div className="bg-blue-600  lg:bg-black px-14 py-8 xl:px-20">
        <div className="flex flex-col items-start gap-4 font-sans lg:font-serif-display sm:gap-5">
          <p className="font-normal text-[15px] leading-5 text-surface-white">
            &copy;2026 Bangkok Post Public Company Limited
          </p>

          <nav aria-label="Footer navigation" className="hidden lg:block">
            <ul className="flex flex-col items-start gap-3 text-[14px] leading-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:text-[15px]">
              {footerLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-surface-white transition-opacity hover:opacity-75"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
