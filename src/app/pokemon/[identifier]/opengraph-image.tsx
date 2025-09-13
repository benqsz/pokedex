import { ImageResponse } from 'next/og';
import { LayoutOgImage } from '@/app/opengraph-image';
import {
  getPokemon,
  getPokemonImgs,
  getTypeColor,
  getTypeGradient,
} from '@/lib/api';
import { formatPokemonId, toTitleCase } from '@/lib/utils';

export const size = {
  height: 400,
  width: 800,
};

export const contentType = 'image/png';

export default async function Image(props: PageProps<'/pokemon/[identifier]'>) {
  const { identifier } = await props.params;
  const pokemon = await getPokemon(identifier);
  if (!pokemon) return LayoutOgImage();

  const colors = pokemon.types.map(type => getTypeColor(type.type.name));
  const gradient = getTypeGradient(colors);

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 32,
          fontWeight: 600,
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            bottom: 0,
            display: 'flex',
            filter: 'blur(40px)',
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '10%',
            ...gradient,
          }}
        />
        <div
          style={{
            bottom: 0,
            display: 'flex',
            filter: 'blur(40px)',
            height: '100%',
            position: 'absolute',
            right: 0,
            top: 0,
            width: '10%',
            ...gradient,
          }}
        />
        <img
          src={getPokemonImgs(pokemon.sprites)[0]}
          alt={toTitleCase(pokemon.name)}
          width={200}
          height={200}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 48,
            fontWeight: 800,
            marginTop: 40,
          }}
        >
          Pokedex
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            marginTop: 20,
          }}
        >
          {formatPokemonId(pokemon.id)} - {toTitleCase(pokemon.name)}
        </div>
      </div>
    ),
  );
}
