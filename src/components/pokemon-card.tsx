import Image from 'next/image';
import Link from 'next/link';
import { NamedAPIResource } from 'pokenode-ts';
import { getPokemon } from '@/lib/api';

type Props = {
  pokemon: NamedAPIResource;
};

async function PokemonCard({ pokemon }: Props) {
  const pokemonData = await getPokemon(pokemon.name);
  if (!pokemonData) return null;

  return (
    <li className="border text-center">
      <Link href={`/pokemon/${pokemonData.id}`}>
        {pokemonData.sprites.front_default && (
          <Image
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            width={160}
            height={160}
            className="mx-auto"
          />
        )}
        <h2>{pokemonData.name}</h2>
      </Link>
    </li>
  );
}

export { PokemonCard };
