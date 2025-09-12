import Link from 'next/link';
import { Container } from '@/components/ui/container';

function Footer() {
  return (
    <footer className="text-center">
      <Container>
        <Link
          href="httsp://szawracki.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary-foreground text-sm decoration-1 underline-offset-4 hover:underline active:underline"
        >
          Beniamin Szawracki
        </Link>
      </Container>
    </footer>
  );
}

export { Footer };
