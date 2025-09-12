'use client';

import { MoonStarsIcon, SunIcon } from '@phosphor-icons/react/ssr';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type props = {
  className?: string;
};

export const ThemeButton = ({ className }: props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const dark = document.documentElement.classList.toggle('dark');
        setIsDarkMode(dark);
      });
    }).ready;

    const { height, left, top, width } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );
  };
  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label="Toggle theme"
      title="Toggle theme"
      ref={buttonRef}
      onClick={changeTheme}
      className={cn('cursor-pointer', className)}
    >
      {isDarkMode ? <SunIcon size={32} /> : <MoonStarsIcon size={32} />}
    </Button>
  );
};
