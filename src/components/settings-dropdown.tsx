'use client';

import { useRouter } from '@bprogress/next/app';
import { GearIcon } from '@phosphor-icons/react/ssr';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DEFAULT_LIMIT } from '@/lib/api';
import { arrayFromNumber } from '@/lib/utils';

function SettingsDropdown() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleLimit = (limit: number) => {
    const params = new URLSearchParams(searchParams);
    if (limit === DEFAULT_LIMIT) params.delete('limit');
    else params.set('limit', limit.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <GearIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Pokemons on page</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={searchParams.get('limit') || DEFAULT_LIMIT.toString()}
          onValueChange={str => handleLimit(Number(str))}
        >
          {arrayFromNumber(4).map(i => {
            const value = i === 0 ? DEFAULT_LIMIT / 2 : i * DEFAULT_LIMIT;
            return (
              <DropdownMenuRadioItem key={value} value={value.toString()}>
                {value}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { SettingsDropdown };
