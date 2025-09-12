import { NamedAPIResourceList } from 'pokenode-ts';
import { PokemonCard } from '@/components/pokemon-card';
import { getPokemon } from '@/lib/api';

type Props = {
  paginatedPokemons: NamedAPIResourceList;
};

async function PokemonList({ paginatedPokemons }: Props) {
  const pokemons = await Promise.all(
    paginatedPokemons.results.map(
      async pokemon => await getPokemon(pokemon.name),
    ),
  ).then(pokemons => pokemons.filter(p => p !== null));

  return (
    <ul className="grid list-none grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {pokemons.map(pokemon => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </ul>
  );
}

export { PokemonList };
