
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const cormorant = localFont({
  src: [
    {
      path: './fonts/CormorantGaramond-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/CormorantGaramond-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/CormorantGaramond-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/CormorantGaramond-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/CormorantGaramond-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-serif',
});

const allura = localFont({
  src: './fonts/Allura-Regular.ttf',
  variable: '--font-script',
  weight: '400',
});

const dmSans = localFont({
  src: [
    {
      path: './fonts/DMSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/DMSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/DMSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'A Little Something For You',
  description: 'A little corner of the internet, made with love.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${cormorant.variable} ${allura.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
