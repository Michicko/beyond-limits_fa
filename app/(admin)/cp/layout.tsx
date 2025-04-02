import type { Metadata } from "next";
import "@/app/styles/globals.css";
import { roboto } from "@/app/styles/fonts";
// import { Provider } from "@/components/ui/provider";
// import RootLayout from "@/components/admin/Layout/RootLayout";
// import PageProvider from "@/providers/pageProvider";
import NextTopLoader from "nextjs-toploader";
// import { Toaster } from "@/components/ui/toaster";
// import Auth from "@/components/Auth/Auth";

export const metadata: Metadata = {
  title: "Beyon Limits Fa | Youth development for Remo stars fc",
  description: "Portal",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={{ scrollPaddingTop: 0 }}
      suppressHydrationWarning
      className={`${roboto.variable}`}
    >
      <body>
        <NextTopLoader color="#ffd700" height={4} />
        {/* <Auth> */}
        {/* <PageProvider> */}
        {/* <Provider> */}
        <>
          {/* <Toaster /> */}
          {/* <RootLayout>{children}</RootLayout> */}
        </>
        {/* </Provider> */}
        {/* </PageProvider> */}
        {/* </Auth> */}
      </body>
    </html>
  );
}
