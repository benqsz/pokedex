import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from 'pokenode-ts';

type Props = {
  pokemon: Pokemon;
};
function PokemonCard({ pokemon }: Props) {
  return (
    <li className="border text-center">
      <Link href={`/pokemon/${pokemon.id}`}>
        {pokemon.sprites.front_default && (
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={160}
            height={160}
            className="mx-auto"
          />
        )}
        <h2>{pokemon.name}</h2>
      </Link>
    </li>
  );
}

export { PokemonCard };
