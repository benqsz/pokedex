import { arrayFromNumber } from '@/lib/utils';

const SKELETON_COUNT = 12;

function PokemonListSkeleton() {
  return (
    <div className="grid list-none grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {arrayFromNumber(SKELETON_COUNT).map(i => (
        <div key={i} className="bg-muted h-200 w-full" />
      ))}
    </div>
  );
}

export { PokemonListSkeleton };
