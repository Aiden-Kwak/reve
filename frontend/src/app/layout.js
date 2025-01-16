//import { Geist, Geist_Mono, Inspiration } from "next/font/google";
import "./globals.css";
import NavForm from "@/components/navForm";
/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/

export const metadata = {
  title: "Reve",
  description: "Generated by @Aiden-Kwak",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavForm/>
        {children}
      </body>
    </html>
  );
}
