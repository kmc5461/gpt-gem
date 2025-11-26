import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google'; // Oswald for headlines, Inter for body
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'ARCHETYPE | Enterprise Streetwear',
  description: 'Redefining modern luxury.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${oswald.variable} font-sans bg-white text-zinc-950 antialiased selection:bg-black selection:text-white`}>
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}