import Link from 'next/link';
import { Icon } from '@/components/icon';
import { Container } from '@/components/ui/container';

function Header() {
  return (
    <header className="sticky top-0">
      <Container className="flex h-fit items-center gap-4 space-y-0">
        <Link href="/">
          <Icon size={32} />
        </Link>
        <input type="search" className="border" />
      </Container>
    </header>
  );
}

export { Header };
