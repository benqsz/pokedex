import { Skeleton } from '@/components/ui/skeleton';
import { arrayFromNumber } from '@/lib/utils';

type Props = {
  count: number;
};

function PokemonListSkeleton({ count }: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {arrayFromNumber(count).map(i => (
        <Skeleton key={i} className="h-60 w-full" />
      ))}
    </div>
  );
}

export { PokemonListSkeleton };
