import "./globals.css";
import Header from "@/components/global/Header.js";
import { inter } from "./fonts.js";

export const metadata = {
  title: "Izichartz",
  description: "The best software design tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
