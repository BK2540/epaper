type ButtonType = {
  title: string;
  size?: "small" | "large";
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};

const CustomButton = ({ title, size, onClick, type }: ButtonType) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={`${size === "small" ? "h-10 text-[15px] leading-5" : "h-12.5 text-xl leading-5"} rounded-[5px] bg-black flex justify-center items-center text-white font-['DM_Serif_Text']  min-w-26`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
