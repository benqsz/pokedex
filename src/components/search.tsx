'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) params.set('query', term);
    else params.delete('query');

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <label className="sr-only" htmlFor="search">
        Search for pokemons
      </label>
      <input
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
