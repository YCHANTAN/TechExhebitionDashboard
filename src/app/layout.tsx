import "@/app/globals.css";
import { Providers } from "@/app/providers";

export const metadata = {
  title: "LIFEVENT",
  description: "Lifewood Tech Exhibition Intelligence Platform",
  icons: {
    icon: "/LIFEVENT ICON.png",
    shortcut: "/LIFEVENT ICON.png",
    apple: "/LIFEVENT ICON.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F7F7F7] text-[#133020] antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
