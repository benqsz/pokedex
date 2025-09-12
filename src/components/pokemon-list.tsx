import { NamedAPIResource } from 'pokenode-ts';
import { PokemonCard } from '@/components/pokemon-card';

type Props = {
  pokemons: NamedAPIResource[];
};

async function PokemonList({ pokemons }: Props) {
  return (
    <ul className="grid list-none grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {pokemons.map((pokemon, i) => (
        <PokemonCard pokemon={pokemon} key={i} />
      ))}
    </ul>
  );
}

export { PokemonList };
