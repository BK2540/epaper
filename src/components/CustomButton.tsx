import { motion } from "motion/react";

type ButtonType = {
  title: string;
  size?: "small" | "large";
  variant?: "solid" | "outline";
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};

const CustomButton = ({
  title,
  size,
  variant = "solid",
  onClick,
  type,
}: ButtonType) => {
  const variantClass =
    variant === "outline"
      ? "border border-black bg-surface-white text-black"
      : "bg-black text-white";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      type={type ? type : "button"}
      onClick={onClick}
      className={`${size === "small" ? "h-10 text-[15px] leading-5 px-5" : "h-12.5 text-xl leading-5 px-18"} ${variantClass} cursor-pointer rounded-[5px] flex justify-center items-center font-['DM_Serif_Text'] min-w-26`}
    >
      {title}
    </motion.button>
  );
};

export default CustomButton;
