import localFont from "next/font/local";
import { Inter } from "next/font/google";
import {Yusei_Magic} from "next/font/google";
import { Noto_Serif_JP } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const yuseiMagic = Yusei_Magic({
  weight: "400",
  variable: "--font-yusei",
  subsets: ["latin"],
});

export const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "500","600"],
  variable: "--font-noto",
  subsets: ["latin"],
});
