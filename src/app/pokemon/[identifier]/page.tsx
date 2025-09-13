import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react/ssr';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Container } from '@/components/ui/container';
import { MainWrapper } from '@/components/ui/main-wrapper';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  getPokemon,
  getPokemonImgs,
  getTypeColor,
  getTypeGradient,
  LAST_POKEMON_ID,
} from '@/lib/api';
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
  const gradient = getTypeGradient(colors);

  const nextPokemon =
    pokemon.id === LAST_POKEMON_ID
      ? await getPokemon(1)
      : await getPokemon(String(pokemon.id + 1));
  const prevPokemon =
    pokemon.id === 1
      ? await getPokemon(LAST_POKEMON_ID)
      : await getPokemon(String(pokemon.id));

  return (
    <MainWrapper>
      <Container className="space-y-6">
        <div
          className="fixed top-0 bottom-0 left-0 -z-10 aspect-square h-full w-1/10 blur-2xl"
          style={gradient}
        />
        <div
          className="fixed top-0 right-0 bottom-0 -z-10 aspect-square h-full w-1/10 blur-2xl"
          style={gradient}
        />
        <h1 className="text-center text-4xl font-bold md:text-[100px]">
          {toTitleCase(pokemon.name)}
        </h1>
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
            <CarouselPrevious variant="ghost" size="icon" />
            <CarouselNext variant="ghost" size="icon" />
          </div>
        </Carousel>
        <h2
          className="text-center text-2xl font-semibold"
          aria-label="Pokemon id in pokedex"
        >
          {formatPokemonId(pokemon.id)}
        </h2>
        <div>
          <h2 className="sr-only" id="types">
            Types
          </h2>
          <ul className="mx-auto w-fit space-x-2" aria-labelledby="types">
            {pokemon.types.map(({ type }) => (
              <li
                key={type.name}
                style={{
                  backgroundColor: getTypeColor(type.name),
                }}
                className="inline-block rounded-sm px-2 py-0.5 text-sm font-medium"
              >
                {toTitleCase(type.name)}
              </li>
            ))}
          </ul>
        </div>

        <Table className="mx-auto max-w-md">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Stat</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pokemon.stats.map(({ base_stat, stat }) => {
              const percentage = Math.min((base_stat / 255) * 100, 100);
              return (
                <TableRow key={stat.name}>
                  <TableCell className="pr-10">
                    {toTitleCase(stat.name)}
                  </TableCell>
                  <TableCell>{base_stat}</TableCell>
                  <TableCell>
                    <div className="bg-foreground h-fit w-[255px] rounded-full">
                      <div
                        className="bg-accent rounded-full px-2 py-0.5"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="mx-auto grid max-w-md grid-cols-1 items-center justify-center gap-4 sm:grid-cols-3">
          {prevPokemon && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/pokemon/${prevPokemon.id}`}>
                <ArrowLeftIcon />
                {toTitleCase(prevPokemon.name)}
              </Link>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link href="/">See all Pokémons</Link>
          </Button>
          {nextPokemon && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/pokemon/${nextPokemon.id}`}>
                {toTitleCase(nextPokemon.name)}
                <ArrowRightIcon />
              </Link>
            </Button>
          )}
        </div>
      </Container>
    </MainWrapper>
  );
}
