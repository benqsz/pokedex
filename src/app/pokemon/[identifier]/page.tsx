import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPokemon } from '@/lib/api';
import { toTitleCase } from '@/lib/utils';

export async function generateMetadata(
  props: PageProps<'/pokemon/[identifier]'>,
): Promise<Metadata> {
  const { identifier } = await props.params;
  const pokemon = await getPokemon(identifier);
  if (!pokemon) notFound();

  return {
    title: toTitleCase(pokemon.name),
  };
}

const POKEMON_COUNT = 151;

// Pre generating using getPokemon or getPokemons is not available because route handlers during build are not running
export function generateStaticParams() {
  const ids = Array.from({ length: POKEMON_COUNT }, (_, i) =>
    (i + 1).toString(),
  );
  return ids.map(id => {
    return { identifier: id };
  });
}

export default async function PokemonPage(
  props: PageProps<'/pokemon/[identifier]'>,
) {
  const { identifier } = await props.params;
  const pokemon = await getPokemon(identifier);
  if (!pokemon) notFound();

  return <div>{pokemon.name}</div>;
}
