import logo from "@/assets/icon/bp-logo.svg";

const Header = () => {
  return (
    <div className="bg-blue-600 w-full h-20 flex justify-between items-center px-[52px]">
      <div className="flex-1">
        <img src={logo} alt="logo" className="h-10 w-[220px]" />
      </div>
      <div className="flex-1 flex justify-start items-center gap-4">
        <a
          href=""
          className="text-surface-white font-normal text-[15px] leading-5"
        >
          Our product
        </a>
        <a
          href=""
          className="text-surface-white font-normal text-[15px] leading-5"
        >
          How to subscribe
        </a>
        <a
          href=""
          className="text-surface-white font-normal text-[15px] leading-5"
        >
          Read Epaper
        </a>
        <a
          href=""
          className="text-surface-white font-normal text-[15px] leading-5"
        >
          FAQ
        </a>
        <a
          href=""
          className="text-surface-white font-normal text-[15px] leading-5"
        >
          Account
        </a>
      </div>
    </div>
  );
};

export default Header;
