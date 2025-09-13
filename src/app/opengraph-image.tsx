import { ImageResponse } from 'next/og';

export const size = {
  height: 400,
  width: 800,
};

export const contentType = 'image/png';

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={200}
          height={200}
          viewBox="0 0 200 200"
        >
          <circle
            cx={100}
            cy={100}
            r={95}
            fill="#f0f0f0"
            stroke="#333"
            strokeWidth={3}
          />
          <path
            fill="#e53e3e"
            d="M5 100a95 95 0 0 1 190 0 95 95 0 0 1-95 95 95 95 0 0 1-95-95Z"
          />
          <path fill="#fff" d="M5 100a95 95 0 0 0 95 95 95 95 0 0 0 95-95Z" />
          <path fill="#333" d="M5 90h190v20H5z" />
          <circle cx={100} cy={100} r={25} fill="#333" />
          <circle cx={100} cy={100} r={18} fill="#f0f0f0" />
          <circle cx={100} cy={100} r={10} fill="#e2e8f0" stroke="#94a3b8" />
          <ellipse cx={96} cy={96} fill="#fff" opacity={0.7} rx={4} ry={3} />
          <circle
            cx={100}
            cy={100}
            r={95}
            fill="none"
            stroke="#333"
            strokeWidth={3}
          />
        </svg>
        <div style={{ marginTop: 40 }}>Pokedex</div>
      </div>
    ),
  );
}
