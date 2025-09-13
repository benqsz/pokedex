'use client';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';

type Props = Omit<ComponentProps<typeof Button>, 'onClick'>;

function GoBackButton(props: Props) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return <Button onClick={handleGoBack} {...props}></Button>;
}

export { GoBackButton };
