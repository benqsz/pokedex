import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { MainWrapper } from '@/components/ui/main-wrapper';
import { getPokemon, getPokemonImages } from '@/lib/api';
import { toTitleCase } from '@/lib/utils';
import Image from 'next/image';

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
        <span>#{pokemon.id.toString().padStart(3, '0')}</span>
        <h1> {toTitleCase(pokemon.name)}</h1>
        <div>
          <h2>Type</h2>
          {pokemon.types.map(({ type }) => (
            <span key={type.name}>{toTitleCase(type.name)} </span>
          ))}
        </div>
        <div>
          <h2>Abilities</h2>
          {pokemon.abilities.map(({ ability }) => (
            <span key={ability.name}>{toTitleCase(ability.name)} </span>
          ))}
        </div>
        <div>
          <h2>Stats</h2>
          {pokemon.stats.map(({ stat, base_stat }) => (
            <div key={stat.name}>
              {toTitleCase(stat.name)}: {base_stat}
            </div>
          ))}
        </div>
        <div>
          <h2>Moves</h2>
          {pokemon.moves.map(({ move }) => (
            <span key={move.name}>{toTitleCase(move.name)} </span>
          ))}
        </div>
        <div>
          <h2>Dimensions</h2>
          <div>Height: {pokemon.height / 10} m</div>
          <div>Weight: {pokemon.weight / 10} kg</div>
        </div>

        <Image
          src={getPokemonImages(pokemon.sprites)[0]}
          width={200}
          height={200}
          priority
          alt={toTitleCase(pokemon.name)}
        />
      </Container>
    </MainWrapper>
  );
}
