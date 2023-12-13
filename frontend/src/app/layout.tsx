import Menu from "@/components/menu/menu.component";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { UserAuth } from "./user_auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Celestial Magnet Cards",
  description: "Celestial Magnet Cards, sell and trade fantasy cards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`overflow-hidden ${inter.className}`}>
        <Providers>
          <UserAuth>
            <Menu />
            {children}
          </UserAuth>
        </Providers>
      </body>
    </html>
  );
}
