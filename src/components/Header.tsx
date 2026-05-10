import { useEffect, useState } from "react";
import logo from "@/assets/icon/bp-logo.svg";
import { UserRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Our product", href: "#our-products" },
  { label: "How to subscribe", href: "#subscribe" },
  { label: "Read Epaper", href: "#epaper" },
  { label: "FAQ", href: "#faq" },
  { label: "Account", href: "#" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const targetId = location.hash.replace("#", "");

    window.setTimeout(() => {
      const targetElement = document.getElementById(targetId);

      if (!targetElement) {
        return;
      }

      const headerOffset = 80;
      const targetTop =
        targetElement.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: targetTop - headerOffset,
        behavior: "smooth",
      });
    }, 0);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  const handleNavigate = (href: string) => {
    setIsMenuOpen(false);

    if (href === "#") {
      navigate("/");
      return;
    }

    if (href.startsWith("#")) {
      navigate({
        pathname: "/",
        hash: href,
      });
      return;
    }

    navigate(href);
  };

  return (
    <header className="z-999 w-full fixed">
      <div className="flex h-20 w-full items-center justify-between bg-blue-600 px-5 sm:px-8 lg:px-13">
        <a
          href="/"
          aria-label="Bangkok Post home"
          className="shrink-0"
          onClick={(event) => {
            event.preventDefault();
            handleNavigate("/");
          }}
        >
          <img
            src={logo}
            alt="Bangkok Post"
            className="h-10 w-55 max-w-[62vw]"
          />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-4 md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                handleNavigate(link.href);
              }}
              className="text-[15px] font-normal leading-5 text-surface-white transition-opacity hover:opacity-75"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="flex h-12 w-12 items-center justify-center md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="relative block h-8 w-8">
            <span
              className={`absolute left-0 top-1.5 h-0.75 w-8 rounded-full bg-surface-white transition-transform ${
                isMenuOpen ? "translate-y-2.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.75 w-8 rounded-full bg-surface-white transition-opacity ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-6.5 h-0.75 w-8 rounded-full bg-surface-white transition-transform ${
                isMenuOpen ? "-translate-y-2.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="absolute left-0 top-20 min-h-[calc(100vh-5rem)] w-full bg-surface-white px-6 py-14 shadow-md md:hidden"
        >
          <ul className="flex flex-col items-center gap-10 font-['DM_Sans'] text-[24px] leading-7 text-blue-600">
            <li>
              <a
                href="/"
                className="flex items-center gap-3"
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate("/");
                }}
              >
                <div className="rounded-full h-8 w-8 border-2 flex justify-center items-center border-blue-600 p-1">
                  <UserRound />
                </div>
                Sign in
              </a>
            </li>
            {navLinks
              .filter((link) => link.label !== "Account")
              .map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavigate(link.href);
                    }}
                    className="text-blue-600 underline-offset-4 hover:underline"
                  >
                    {link.label === "Read Epaper" ? "Read now" : link.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
