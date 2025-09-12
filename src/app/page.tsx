import { PokemonList } from '@/components/pokemon-list';
import { Container } from '@/components/ui/container';
import { MainWrapper } from '@/components/ui/main-wrapper';
import { getPaginatedPokemons } from '@/lib/api';

export default async function HomePage() {
  const paginatedPokemons = await getPaginatedPokemons();

  return (
    <MainWrapper>
      <Container>
        <h1>Pokedex</h1>
        <PokemonList paginatedPokemons={paginatedPokemons} />
      </Container>
    </MainWrapper>
  );
}
