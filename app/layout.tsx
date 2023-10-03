import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter, yuseiMagic } from "./fonts";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.css";
import TimerProvider from "features/timer/provider/TimerProvider";
import { AuthContext, AuthProvider } from "@/lib/firebase-auth/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "constants/mui_color";
import SelectedNavItemContextProvider from "@/components/ui/NavMenu/NavSelectProvider";

export const metadata = {
  title: "AI Assistant - Change the way you work",
  description:
    "AI Assistant is a productivity tool that helps you to manage your emails and tasks. It is powered by GPT-4, the most advanced AI language model.",
  twitter: {
    card: "summary_large_image",
    title: "AI Assistant - Change the way you work",
    description:
      "AI Assistant is a productivity tool that helps you to manage your emails and tasks. It is powered by GPT-4, the most advanced AI language model.",
    creator: "@steventey",
  },
  metadataBase: new URL("https://precedent.dev"),
  themeColor: "#FFFFF",
};

declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['primary'];
  }

  interface PaletteOptions {
    custom?: PaletteOptions['primary'];
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable, yuseiMagic.variable)}>
        <Suspense fallback="..."></Suspense>
        <AuthProvider>
          <SelectedNavItemContextProvider>
            {/* <ThemeProvider theme={theme}> */}
            {children}
            {/* </ThemeProvider> */}
          </SelectedNavItemContextProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
