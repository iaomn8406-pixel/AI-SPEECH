import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "نُـطْـق | منصة الذكاء الاصطناعي لتأهيل وتطوير مهارات الأطفال",
  description: "المنصة الذكية المتكاملة لمساعدة الأطفال في علاج تأخر الكلام، تصحيح مخارج الحروف، عسر القراءة، وتنمية مهارات التواصل الاجتماعي.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
