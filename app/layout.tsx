import type { Metadata } from "next";
import { Fraunces, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PRODUCT_NAME, PRODUCT_TAGLINE } from "@/lib/brand";
import "./globals.css";
const sans = Source_Sans_3({
variable: "--font-sans",
subsets: ["latin"],
});
const serif = Fraunces({
variable: "--font-serif",
subsets: ["latin"],
});
const mono = IBM_Plex_Mono({
variable: "--font-mono",
weight: ["400", "500"],
subsets: ["latin"],
});
export const metadata: Metadata = {
metadataBase: new URL("https://shop-sitter.vercel.app"),
title: {
default: `${PRODUCT_NAME} — ${PRODUCT_TAGLINE}`,
template: `%s · ${PRODUCT_NAME}`,
},
description: PRODUCT_TAGLINE,
applicationName: PRODUCT_NAME,
openGraph: {
title: PRODUCT_NAME,
description: PRODUCT_TAGLINE,
siteName: PRODUCT_NAME,
type: "website",
locale: "en_US",
},
twitter: {
card: "summary",
title: PRODUCT_NAME,
description: PRODUCT_TAGLINE,
},
};
export default function RootLayout({ children }: LayoutProps<"/">) {
return (
<html
lang="en"
className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
>
<body className="flex min-h-full flex-col bg-background font-sans text-foreground">
<SiteHeader />
<main className="flex-1">{children}</main>
<SiteFooter />
</body>
</html>
);
}
