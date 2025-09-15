import { Suspense } from 'react';
import { PokemonList } from '@/components/pokemon-list';
import { PokemonListSkeleton } from '@/components/pokemon-list-skeleton';
import { PokemonPagination } from '@/components/pokemon-pagination';
import { Search } from '@/components/search';
import { Container } from '@/components/ui/container';
import { MainWrapper } from '@/components/ui/main-wrapper';
import { DEFAULT_LIMIT, getPaginatedPokemons } from '@/lib/api';
import { SettingsDropdown } from '@/components/settings-dropdown';

export default async function HomePage(props: PageProps<'/'>) {
  const searchParams = await props.searchParams;
  const query = (searchParams?.query as string) || '';
  const currentPage = Number(searchParams?.page) || 1;
  const currentLimit = Number(searchParams?.limit) || DEFAULT_LIMIT;
  const paginatedPokemons = await getPaginatedPokemons(
    currentLimit,
    (currentPage - 1) * currentLimit,
    query,
  );
  const totalPages = Math.ceil(paginatedPokemons.count / currentLimit);

  return (
    <MainWrapper>
      <Container>
        <Suspense>
          <div className="flex gap-2">
            <Search />
            <SettingsDropdown />
          </div>
        </Suspense>

        <h1>Pokedex</h1>
        <Suspense
          key={query + currentPage}
          fallback={<PokemonListSkeleton count={currentLimit} />}
        >
          <PokemonList pokemons={paginatedPokemons.results} />
        </Suspense>
        <Suspense>
          <PokemonPagination totalPages={totalPages} visiblePages={3} />
        </Suspense>
      </Container>
    </MainWrapper>
  );
}
