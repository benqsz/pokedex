import { Suspense } from 'react';
import { PokemonList } from '@/components/pokemon-list';
import { PokemonListSkeleton } from '@/components/pokemon-list-skeleton';
import { PokemonPagination } from '@/components/pokemon-pagination';
import { Search } from '@/components/search';
import { Container } from '@/components/ui/container';
import { MainWrapper } from '@/components/ui/main-wrapper';
import { DEFAULT_LIMIT, getPaginatedPokemons } from '@/lib/api';

export default async function HomePage(props: PageProps<'/'>) {
  const searchParams = await props.searchParams;
  const query = (searchParams?.query as string) || '';
  const currentPage = Number(searchParams?.page) || 1;
  const paginatedPokemons = await getPaginatedPokemons(
    DEFAULT_LIMIT,
    (currentPage - 1) * DEFAULT_LIMIT,
    query,
  );
  const totalPages = Math.ceil(paginatedPokemons.count / DEFAULT_LIMIT);

  return (
    <MainWrapper>
      <Container>
        <Search />
        <h1>Pokedex</h1>
        <Suspense key={query + currentPage} fallback={<PokemonListSkeleton />}>
          <PokemonList pokemons={paginatedPokemons.results} />
        </Suspense>
        <PokemonPagination totalPages={totalPages} visiblePages={3} />
      </Container>
    </MainWrapper>
  );
}
