import './globals.css';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: {
    default: 'Pokédex',
    template: '%s | Pokédex',
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
