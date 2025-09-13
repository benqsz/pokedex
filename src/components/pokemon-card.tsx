import * as motion from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';
import { NamedAPIResource } from 'pokenode-ts';
import { getPokemon, getPokemonImgs } from '@/lib/api';
import { formatPokemonId, toTitleCase } from '@/lib/utils';

type Props = {
  pokemon: NamedAPIResource;
};

async function PokemonCard({ pokemon }: Props) {
  const pokemonData = await getPokemon(pokemon.name);
  if (!pokemonData) return null;
  const image = getPokemonImgs(pokemonData.sprites);

  return (
    <li className="relative h-60 rounded-md border pt-2">
      <Link
        href={`/pokemon/${pokemonData.id}`}
        className="flex h-full flex-col items-center justify-center"
      >
        <span className="text-secondary-foreground absolute top-1 left-1">
          {formatPokemonId(pokemonData.id)}
        </span>
        <motion.div
          initial={false}
          className="flex-grow"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={image[0]}
            alt={`${toTitleCase(pokemonData.name)} sprite`}
            width={160}
            height={160}
            className="m-auto h-9/10 w-auto"
          />
        </motion.div>
        <h2>{toTitleCase(pokemonData.name)}</h2>
      </Link>
    </li>
  );
}

export { PokemonCard };
