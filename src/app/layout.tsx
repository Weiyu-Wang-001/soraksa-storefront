import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "SoraKsa | Pause. Breathe. Feel.", description: "Incense for the in-between." };
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="en"><body>{children}</body></html>; }
