'use client';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <title>Ape Ai</title>
        <meta name="Ape.Ai" content="A PWA built with Love ❤️" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png"/>
      </head>

      <body
        className={`antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
