import promotion1Desktop from "@/assets/img-promotion_desktop.jpg";
import promotion1Mobile from "@/assets/img-promotion_mobi.jpg";
import promotion2Desktop from "@/assets/img-promotion2_desktop.jpg";
import promotion2Mobile from "@/assets/img-promotion2_mobi.jpg";
import epaper1 from "@/assets/epaper_01.jpg";
import epaper2 from "@/assets/epaper_02.jpg";
import epaper3 from "@/assets/epaper_03.jpg";
import newspaperImage from "@/assets/newspaper.png";
import truckImage from "@/assets/truck.png";
import digitalImage from "@/assets/digital01.png";

export type HomeProduct = {
  id: string;
  alt: string;
  imageLarge: string;
  imageSmall: string;
};

export type Subscribe = {
  id: string;
  period: string;
  price: number;
  fullprice?: number;
  addition: string;
  type?: string;
};

export type Epaper = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type FAQContentBlock = {
  title?: string;
  paragraphs: string[];
};

export type FAQ = {
  id: string;
  question: string;
  answer: FAQContentBlock[];
};

export type FormatButton = {
  label: string;
  href: string;
};

export type Format = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  mainImage: string;
  subImage?: string;
  backgroundColor: "neutral" | "blue";
  buttons: FormatButton[];
};

export const ourProducts: HomeProduct[] = [
  {
    id: "1",
    alt: "Epaper subscription promotion",
    imageLarge: promotion1Desktop,
    imageSmall: promotion1Mobile,
  },
  {
    id: "2",
    alt: "Bangkok Post digital promotion",
    imageLarge: promotion2Desktop,
    imageSmall: promotion2Mobile,
  },
  {
    id: "3",
    alt: "Epaper subscription promotion",
    imageLarge: promotion1Desktop,
    imageSmall: promotion1Mobile,
  },
];

export const subscribePlan: Subscribe[] = [
  {
    id: "1",
    period: "1 Month",
    price: 700,
    addition: "Plus 5 free back issues",
    type: "Introductory",
  },
  {
    id: "2",
    period: "3 Months",
    price: 1700,
    fullprice: 2100,
    addition: "Plus 10 free back issues",
  },
  {
    id: "3",
    period: "6 Months",
    price: 2800,
    fullprice: 4200,
    addition: "Plus 30 free back issues",
  },
  {
    id: "4",
    period: "12 Months",
    price: 4700,
    fullprice: 8400,
    addition: "Plus 5 free back issues",
    type: "Popular Pack",
  },
  {
    id: "5",
    period: "36 Months",
    price: 12600,
    fullprice: 25200,
    addition: "Plus 10 free back issues",
  },
  {
    id: "6",
      period: "Epaper + Print Bundle\n12 Months",
    price: 12850,
    addition: "Plus 30 free back issues",
  },
];

export const epaper: Epaper[] = [
  {
    id: "1",
    title: "Familiar newspaper layout, beautifully preserved",
    description:
      "Enjoy the classic print experience, thoughtfully adapted for your screen.",
    image: epaper1,
  },
  {
    id: "2",
    title: "Read anytime, anywhere on any device",
    description:
      "Stay connected to the news whether you're at home, at work or on the move.",
    image: epaper2,
  },
  {
    id: "3",
    title: "Complete archive at your fingertips",
    description:
      "Access past issues anytime and revisit the stories that matter to you.",
    image: epaper3,
  },
  {
    id: "4",
    title: "Full issues, including all special publications",
    description:
      "Get the complete newspaper experience, with every section and special edition included.",
    image: epaper1,
  },
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question:
      "What is the difference between reading the Bangkok Post newspaper, the Epaper, and the website?",
    answer: [
      {
        title: "Epaper",
        paragraphs: [
          "The Epaper can be accessed anywhere in the world on up to three mobile devices and one web browser with a single login.",
          "The annual plan is more affordable than the printed edition and includes translation into over 20 languages. You can conveniently read on a web browser or in our application. The app allows you to read both online and offline by downloading the Epaper and saving it for offline reading, with content identical to the printed newspaper.",
        ],
      },
      {
        title: "Printed Newspaper",
        paragraphs: [
          "Our newspaper has been published for 80 years, offering premium-quality content on paper. Besides daily updates, it is perfect as a collectible. You will also enjoy crosswords and comic strips, which are not available on our website.",
        ],
      },
      {
        title: "Website",
        paragraphs: [
          "The website brings you the fastest updates, with breaking news from our editorial newsroom. You may also subscribe to newsletters for exclusive updates delivered to your inbox. In addition, the site offers a wide range of categories and features, including Learning tools, vocabulary cards, video podcasts, and more.",
        ],
      },
      {
        paragraphs: [
          "For more details, please contact our staff.",
          "Email: enewspaper@bangkokpost.co.th",
          "Tel: 0-2616-4615 (Mon-Fri 8:30 AM-5:30 PM, UTC+7)",
        ],
      },
    ],
  },
  {
    id: "2",
    question: "Do you offer a free trial of the Epaper for new readers?",
    answer: [
      {
        paragraphs: [
          "Yes. You can request a free 3-day trial by contacting us.",
          "Email: enewspaper@bangkokpost.co.th",
          "Tel: 0-2616-4615 (Mon-Fri 8:30 AM-5:30 PM, UTC+7)",
        ],
      },
    ],
  },
  {
    id: "3",
    question: "Can I still read the Epaper if I'm offline?",
    answer: [
      {
        paragraphs: [
          "Yes. Our app allows you to read both online and offline. You can download the Epaper and save it for offline reading.",
        ],
      },
    ],
  },
  {
    id: "4",
    question: "How do I switch from a monthly plan to a yearly one?",
    answer: [
      {
        paragraphs: [
          "You can switch via your account on our website or contact our staff for assistance.",
          "Email: enewspaper@bangkokpost.co.th",
          "Tel: 0-2616-4615 (Mon-Fri 8:30 AM-5:30 PM, UTC+7)",
        ],
      },
    ],
  },
  {
    id: "5",
    question: "How do I create an account?",
    answer: [
      {
        paragraphs: [
          "You can create an account at https://www.bangkokpost.com/Epaper or contact our staff for assistance.",
          "Email: enewspaper@bangkokpost.co.th",
          "Tel: 0-2616-4615 (Mon-Fri 8:30 AM-5:30 PM, UTC+7)",
        ],
      },
    ],
  },
  {
    id: "6",
    question: "I've forgotten my password.",
    answer: [
      {
        paragraphs: [
          "If you have forgotten your password, click here to reset it on the site and use your registered email address. If you still need assistance, please contact Customer Service.",
          "Email: enewspaper@bangkokpost.co.th",
          "Tel: 0-2616-4615 (Mon-Fri 8:30 AM-5:30 PM, UTC+7)",
        ],
      },
    ],
  },
  {
    id: "7",
    question: "Can I use my account on multiple devices?",
    answer: [
      {
        paragraphs: [
          "Yes. You can use your account on up to three mobile devices and one web browser using a single login.",
        ],
      },
    ],
  },
  {
    id: "8",
    question: "Do you have an application for reading the news?",
    answer: [
      {
        paragraphs: [
          "Yes. A free Epaper is available. You can also access it through your web browser.",
        ],
      },
    ],
  },
  {
    id: "9",
    question: "How do I cancel my subscription?",
    answer: [
      {
        paragraphs: [
          "You can cancel at any time by contacting our staff.",
          "Email: enewspaper@bangkokpost.co.th",
          "Tel: 0-2616-4615 (Mon-Fri 8:30 AM-5:30 PM, UTC+7)",
          "*Please be advised that all payments are non-refundable.",
        ],
      },
    ],
  },
  {
    id: "10",
    question: "How can I check my subscription status?",
    answer: [
      {
        paragraphs: [
          "You can view your current status and plan details in My profile under the My Subscription section.",
        ],
      },
    ],
  },
  {
    id: "11",
    question: "Why can I not access the content after payment?",
    answer: [
      {
        paragraphs: [
          "Please ensure that you have completed all the required information in the steps following your payment and that you have received an activation email to verify your account.",
          "If you have already completed these steps and still cannot access the service, please check your status at My profile under the My Subscription section or contact our support team for further assistance.",
        ],
      },
    ],
  },
];

export const formatPlan: Format[] = [
  {
    id: "print",
    title: "Print Subscription",
    subtitle: "Thailand Only",
    description:
      "Get the Bangkok Post delivered to your home in Bangkok and enjoy the classic print reading experience.",
    mainImage: newspaperImage,
    subImage: truckImage,
    backgroundColor: "neutral",
    buttons: [
      {
        label: "Subscribe",
        href: "#",
      },
      {
        label: "Whare to find us",
        href: "#",
      },
    ],
  },
  {
    id: "digital",
    title: "Digital Subscription",
    description:
      "Unlimited access to Bangkok Post's exclusive online journalism, including premium stories, expert insight, and real-time updates.",
    mainImage: digitalImage,
    backgroundColor: "blue",
    buttons: [
      {
        label: "Subscribe",
        href: "#subscribe",
      },
    ],
  },
];
