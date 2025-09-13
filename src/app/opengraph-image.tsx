import { ImageResponse } from 'next/og';
import { Icon } from '@/components/ui/icon';
export const size = {
  height: 400,
  width: 800,
};

export const contentType = 'image/png';

export { Image as LayoutOgImage };

export default function Image() {
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
        <Icon size={200} />
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
      </div>
    ),
  );
}
