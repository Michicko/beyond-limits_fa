import { Roboto, Poppins } from "next/font/google";
import localFont from "next/font/local";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--roboto",
});

const formula_condensed = localFont({
  src: [
    {
      path: "../../public/fonts/FormulaCondensed-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/FormulaCondensed-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--formula-condensed",
});

export { formula_condensed, roboto };
