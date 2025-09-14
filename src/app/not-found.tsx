import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MainWrapper } from '@/components/ui/main-wrapper';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFoundPage() {
  return (
    <MainWrapper>
      <Container className="mt-30 flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold sm:text-5xl md:text-7xl">
          Page not found ;(
        </h1>
        <Button variant="outline" asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </Container>
    </MainWrapper>
  );
}
