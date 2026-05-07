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
    <footer className="w-full bg-black px-6 py-10 text-surface-white sm:px-10 lg:px-14 xl:px-20">
      <div className="flex flex-col items-start gap-4 font-['DM_Serif_Text']">
        <p className="text-[15px] font-bold leading-5">
          &copy; 2025 Bangkok Post Public Company Limited
        </p>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 text-[15px] leading-5">
            {footerLinks.map((link) => (
              <li key={link}>
                <a href="#" className="text-surface-white transition-opacity hover:opacity-75">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
