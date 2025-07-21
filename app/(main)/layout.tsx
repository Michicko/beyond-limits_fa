import type { Metadata } from "next";
import "@/app/styles/globals.css";
import styles from "./Layout.module.css";
import clsx from "clsx";
import Nav from "@/components/main/nav/Nav";
import { formula_condensed, roboto } from "@/app/styles/fonts";
import Footer from "@/components/main/Footer/footer";
import NextTopLoader from "nextjs-toploader";
import Auth from "@/components/Auth/Auth";
import { Toaster as ReactToaster } from "react-hot-toast";
import Script from "next/script";
import Analytics from "@/components/main/Analytics/Analytics";

export const metadata: Metadata = {
  title: {
    default: "Beyond Limits Fa | Nigerian Youth Development Program",
    template: "%s | Beyond Limits Fa",
  },
  description: "Beyond Limits Fa is Nigerian Youth Development Program",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/x-icon",
        url: "/images/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
    apple: [
      {
        url: "/touch-icon-ipad.png",
        rel: "apple-touch-icon",
        sizes: "152x152",
      },
      {
        url: "/touch-icon-ipad-retina.png",
        rel: "apple-touch-icon",
        sizes: "167x167",
      },
      {
        url: "/touch-icon-iphone-retina.png",
        rel: "apple-touch-icon",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${formula_condensed.variable} ${roboto.variable}`}
    >
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-40D6SPQ2G7"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-40D6SPQ2G7');
            `,
          }}
        />
      </head>
      <body className={clsx(styles.layout)}>
        <Analytics />
        <ReactToaster />
        <NextTopLoader color="#ffd700" height={4} />
        <Auth>
          <Nav />
          <div className={clsx(styles["main-container"])}>
            {!children ? <div>Loading...</div> : children}
          </div>
          <Footer />
        </Auth>
      </body>
    </html>
  );
}
