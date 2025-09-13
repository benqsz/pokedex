import { ImageResponse } from 'next/og';
import { getPokemon, getPokemonImgs, getTypeColor } from '@/lib/api';
import { LayoutOgImage } from '@/app/opengraph-image';
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
  const gradient = {
    background:
      colors.length === 1
        ? colors[0]
        : `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 100%)`,
  };

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
            top: 0,
            left: 0,
            bottom: 0,
            height: '100%',
            width: '10%',
            filter: 'blur(40px)',
            position: 'absolute',
            ...gradient,
          }}
        />
        <div
          style={{
            top: 0,
            right: 0,
            bottom: 0,
            height: '100%',
            width: '10%',
            filter: 'blur(40px)',
            position: 'absolute',
            ...gradient,
          }}
        />
        <img
          src={getPokemonImgs(pokemon.sprites)[0]}
          alt={toTitleCase(pokemon.name)}
          width={200}
          height={200}
        />
        <div style={{ marginTop: 40 }}>Pokedex</div>
        <div style={{ fontSize: 24, marginTop: 20 }}>
          {formatPokemonId(pokemon.id)} - {toTitleCase(pokemon.name)}
        </div>
      </div>
    ),
  );
}
