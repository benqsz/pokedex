import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Container } from '@/components/ui/container';
import { GoBackButton } from '@/components/ui/go-back-button';
import { MainWrapper } from '@/components/ui/main-wrapper';
import { getPokemon, getPokemonImgs, getTypeColor } from '@/lib/api';
import { formatPokemonId, toTitleCase } from '@/lib/utils';

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

export default async function PokemonPage(
  props: PageProps<'/pokemon/[identifier]'>,
) {
  const { identifier } = await props.params;
  const pokemon = await getPokemon(identifier);
  if (!pokemon) notFound();

  const imgs = getPokemonImgs(pokemon.sprites);
  const colors = pokemon.types.map(type => getTypeColor(type.type.name));
  const gradient = {
    background:
      colors.length === 1
        ? colors[0]
        : `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 100%)`,
  };

  return (
    <MainWrapper>
      <Container>
        <div
          className="fixed top-0 bottom-0 left-0 -z-10 aspect-square h-full w-1/10 opacity-50 blur-2xl"
          style={gradient}
        />
        <h1 className="text-[100px] font-bold"> {toTitleCase(pokemon.name)}</h1>
        <Carousel
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {imgs.map((img, i) => (
              <CarouselItem key={i}>
                <Image
                  src={img}
                  width={450}
                  height={450}
                  priority
                  sizes="450px"
                  alt={`${toTitleCase(pokemon.name)} sprite ${i + 1}`}
                  className="mx-auto h-auto w-full max-w-md"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex justify-center gap-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        <span>{formatPokemonId(pokemon.id)}</span>
        <ul className="space-x-2">
          {pokemon.types.map(({ type }) => (
            <li
              key={type.name}
              style={{
                backgroundColor: getTypeColor(type.name),
              }}
              className="inline-block rounded-sm px-2 py-0.5 text-sm font-medium"
            >
              {toTitleCase(type.name)}{' '}
            </li>
          ))}
        </ul>
        <div>
          <h2>Abilities</h2>
          {pokemon.abilities.map(({ ability }) => (
            <span key={ability.name}>{toTitleCase(ability.name)} </span>
          ))}
        </div>
        <div>
          <h2>Stats</h2>
          {pokemon.stats.map(({ base_stat, stat }) => (
            <div key={stat.name}>
              {toTitleCase(stat.name)}: {base_stat}
            </div>
          ))}
        </div>
        <div>
          <h2>Dimensions</h2>
          <div>Height: {pokemon.height / 10} m</div>
          <div>Weight: {pokemon.weight / 10} kg</div>
        </div>
        <GoBackButton variant="outline" size="sm" className="mx-auto block">
          Go back
        </GoBackButton>
      </Container>
    </MainWrapper>
  );
}
