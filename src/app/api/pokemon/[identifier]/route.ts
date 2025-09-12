import { NextRequest, NextResponse } from 'next/server';
import { PokemonClient } from 'pokenode-ts';
import { logError } from '@/lib/utils';

const API = new PokemonClient();

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/pokemon/[identifier]'>,
) {
  const { identifier } = await ctx.params;

  try {
    if (typeof identifier === 'number') {
      const pokemon = await API.getPokemonById(identifier);
      return NextResponse.json({ ...pokemon }, { status: 200 });
    } else {
      const pokemon = await API.getPokemonByName(identifier);
      return NextResponse.json({ ...pokemon }, { status: 200 });
    }
  } catch (error) {
    logError(`api/pokemon/${identifier}`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
