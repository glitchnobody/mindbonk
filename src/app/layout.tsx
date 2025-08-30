import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import {
  Geist_Mono,
  Montserrat,
  Atkinson_Hyperlegible,
} from 'next/font/google';
import './globals.css';
import NavBar from './navbar';

const montserratSans = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  fallback: ['Helvetica', 'system-ui', 'arial'],
});

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  variable: '--font-atkinsonhyperlegible',
  weight: ['400', '700'],
  subsets: ['latin'],
  fallback: ['Helvetica', 'system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  fallback: ['mono', 'system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: 'Mindbonk',
  description:
    'A space to explore mental health, psychology, and self-improvement.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserratSans.variable} ${atkinsonHyperlegible.variable} ${geistMono.variable} max-w-420 relative mx-auto px-3 font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <NavBar />
          <main className="max-w-420 mx-auto mt-24"> {children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
