'use client';
import { useRouter } from '@bprogress/next/app';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    if (term) params.set('query', term);
    else params.delete('query');

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <label className="sr-only" htmlFor="search">
        Search for pokemons
      </label>
      <Input
        id="search"
        type="search"
        placeholder="Search for pokemons!"
        className="border"
        onChange={e => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}

export { Search };
