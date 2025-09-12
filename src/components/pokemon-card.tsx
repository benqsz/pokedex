import Image from 'next/image';
import Link from 'next/link';
import { NamedAPIResource } from 'pokenode-ts';
import { getPokemon, getPokemonImages } from '@/lib/api';
import { toTitleCase } from '@/lib/utils';

type Props = {
  pokemon: NamedAPIResource;
};

async function PokemonCard({ pokemon }: Props) {
  const pokemonData = await getPokemon(pokemon.name);
  if (!pokemonData) return null;

  return (
    <li className="border text-center">
      <Link href={`/pokemon/${pokemonData.id}`}>
        <Image
          src={getPokemonImages(pokemonData.sprites)[0]}
          alt={`${toTitleCase(pokemonData.name)} sprite`}
          width={160}
          height={160}
          className="mx-auto"
        />
        <h2>{toTitleCase(pokemonData.name)}</h2>
      </Link>
    </li>
  );
}

export { PokemonCard };
