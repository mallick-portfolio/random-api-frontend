import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EasyBoard",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        {children}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
