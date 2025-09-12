import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { MainWrapper } from '@/components/ui/main-wrapper';
import { getPokemon } from '@/lib/api';

// TODO - metadata & prerendering

export default async function PokemonPage(
  props: PageProps<'/pokemon/[identifier]'>,
) {
  const { identifier } = await props.params;
  const pokemon = await getPokemon(identifier);
  if (!pokemon) notFound();

  return (
    <MainWrapper>
      <Container>
        <h1>{pokemon.name}</h1>
      </Container>
    </MainWrapper>
  );
}
