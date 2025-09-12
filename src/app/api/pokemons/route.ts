import { NextRequest, NextResponse } from 'next/server';
import { PokemonClient } from 'pokenode-ts';
import { getURL, logError } from '@/lib/utils';

const API = new PokemonClient();

const API_URL = 'https://pokeapi.co/api/v2/';

export async function GET(_req: NextRequest) {
  const searchParams = _req.nextUrl.searchParams;

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (isNaN(limit) || isNaN(offset) || limit < 1 || offset < 0) {
    return NextResponse.json(
      { error: 'Invalid query parameters' },
      { status: 400 },
    );
  }

  try {
    const pokemons = await API.listPokemons(offset, limit);

    return NextResponse.json(
      {
        ...pokemons,
        next: pokemons.next?.replace(API_URL, getURL),
        previous: pokemons.previous?.replace(API_URL, getURL),
      },
      { status: 200 },
    );
  } catch (error) {
    logError('api/pokemons', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
