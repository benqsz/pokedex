import Link from 'next/link';
import { Icon } from '@/components/icon';
import { Search } from '@/components/search';
import { Container } from '@/components/ui/container';

function Header() {
  return (
    <header className="bg-background/70 sticky top-0 z-10 backdrop-blur-xs">
      <Container className="flex h-fit items-center gap-4 space-y-0">
        <Link href="/">
          <Icon size={32} />
        </Link>
        <Search />
      </Container>
    </header>
  );
}

export { Header };
