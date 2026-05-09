import type { Epaper } from "@/data/home";

type EpaperProps = {
  contents: Epaper[];
};

const ReadEpaperSection = ({ contents }: EpaperProps) => {
  return <div id="epaper">Read Epaper</div>;
};

export default ReadEpaperSection;
