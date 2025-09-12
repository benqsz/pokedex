import { ComponentProps } from 'react';

type Props = ComponentProps<'main'>;

function MainWrapper({ children, className, ...props }: Props) {
  return (
    <main className={className} {...props}>
      {children}
    </main>
  );
}

export { MainWrapper };
