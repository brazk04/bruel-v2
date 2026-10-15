import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NoiseOverlay } from "@/components/layout/noise-overlay";
import { ContactChoiceProvider } from "@/components/contact/contact-choice";
import { site } from "@/lib/constants/site";
import "./globals.css";
import "./identity.css";

const display = localFont({
  src: [
    { path: "../assets/fonts/barlow-condensed-600.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/barlow-condensed-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--type-display", display: "swap", fallback: ["Arial Narrow", "Arial"],
});
const mono = localFont({ src: "../assets/fonts/ibm-plex-mono-500.woff2", weight: "500", style: "normal", variable: "--type-mono", display: "swap", fallback: ["Courier New"] });

export const metadata: Metadata = { title: { default: site.title, template: `%s | ${site.name}` }, description: site.description, openGraph: { title: site.title, description: site.description, siteName: site.name, locale: "pt_BR", type: "website" }, robots: { index: true, follow: true } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#050505" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${display.variable} ${mono.variable}`}><body><ContactChoiceProvider><a className="skip-link" href="#conteudo">Pular para conteúdo</a><NoiseOverlay /><Header /><main id="conteudo">{children}</main><Footer /></ContactChoiceProvider></body></html>;
}
