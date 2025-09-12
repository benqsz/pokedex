import './globals.css';
import type { Metadata } from 'next';
import { getPokemon, getPokemons } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Pokedex',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const pokemon = await getPokemon('bulbasaur');
  const pokemons = await getPokemons();
  console.log(pokemon, pokemons);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
