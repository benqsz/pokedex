import './globals.css';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Providers } from '@/components/providers';
import { getURL } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    default: 'Pokédex',
    template: '%s | Pokédex',
  },
  description: 'Made by benqsz <github.com/benqsz>',
  openGraph: {
    title: 'Pokédex',
    description: 'Made by benqsz <github.com/benqsz>',
    url: getURL,
    siteName: getURL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
