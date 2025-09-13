import { GithubLogoIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { ThemeButton } from '@/components/ui/theme-button';

function Header() {
  return (
    <header className="bg-background/70 sticky top-0 z-10 backdrop-blur-xs">
      <Container className="flex h-fit items-center justify-between gap-4 space-y-0">
        <Link href="/">
          <span className="sr-only">Pokedex logo- go to home page</span>
          <Icon size={32} />
        </Link>
        <div className="space-x-2">
          <ThemeButton className="rounded-full" />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Github repository"
            title="Github"
            className="rounded-full"
            asChild
          >
            <Link
              href={process.env.GITHUB_URL || '#'}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubLogoIcon size={64} />
            </Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}

export { Header };
