import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type Props = ComponentProps<'div'>;

function Container({ children, className, ...props }: Props) {
  return (
    <div
      className={cn('mx-auto max-w-5xl space-y-4 px-4 py-2', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Container };
