import clsx from "clsx";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MoveFinder",
  description: "Find the best movie for your days.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-base-100">
      <body className={clsx(inter.className, "h-full bg-base-100")}>
        {children}
      </body>
    </html>
  );
}
