'use client';

import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function Providers({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ProgressProvider
        height="2px"
        color="var(--color-accent)"
        options={{ showSpinner: false }}
        shallowRouting
        disableSameURL={false}
      >
        {children}
      </ProgressProvider>
    </NextThemesProvider>
  );
}

export { Providers };
