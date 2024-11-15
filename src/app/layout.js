import "@/styles/reset.css";
import "@/styles/normalize.css";
import "@/styles/variables.css";
import "@/styles/global.css";

import { helveticaNowDisplay } from "@/config/fonts";

export const metadata = {
  title: "Resonator",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${helveticaNowDisplay.className}`}>{children}</body>
    </html>
  );
}
