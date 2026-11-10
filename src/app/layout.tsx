import type { Metadata } from 'next';
import { Allura, Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '500', '600', '700'], style: ['normal', 'italic'] });
const allura = Allura({ subsets: ['latin'], variable: '--font-script', weight: '400' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'A Little Something For You',
  description: 'A little corner of the internet, made with love.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body className={`${cormorant.variable} ${allura.variable} ${dmSans.variable}`}>{children}</body></html>;
}
