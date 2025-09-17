# Pokedex

## Prerequisites

- [node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

## Getting Started

```bash
    # Clone the repository
    git clone https://github.com/benqsz/pokedex.git

    # Navigate to the project directory
    cd pokedex

    # Install dependencies
    pnpm install

    # Start the development server
    pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

## Architecture

This project shows a list of pokemons using data from the [PokéAPI](https://pokeapi.co/).

### Functionalities

1. Home page
   - Displays list of Pokémons
   - A search bar allows users to filter Pokémons by name
   - Pagination
   - Option to adjust the number of Pokémon displayed per page
   - Each pokemon card shows pokemon name, image and id with link to details page
2. Pokemon details page
    - Displays detailed information about the selected pokemon

### Technologies

- Next.js
- TypeScript
- Tailwind CSS
- Pokenode-ts - node.js wrapper for the PokéAPI with built-in types.

### Requirements

- [x] Display 12 Pokémon on the home page with pagination
- [x] Show Pokémon name and image on the card
- [x] Pokémon cards link to their respective details page
- [x] Search bar to filter pokemons by name
- [x] Show a loading skeleton for the Pokémon list
- [x] Fully responsive design
- [x] Public API using Next.js route handlers communicating with PokéAPI via Pokenode-ts
- [x] Custom UI components using the ShadCN UI library
- [x] TypeScript integration

### Additional features

- [x] Dark mode
- [x] Automatically generated `sitemap.xml` and `robots.txt`
- [x] SEO optimizations, including metadata and Open Graph image using `vercel/og`
- [x] Possibility to display more pokemons on home page
- [x] Custom 404 page

## Metrics

![image](https://img.shields.io/badge/Performance-100-green)
![image](https://img.shields.io/badge/Accessibility-100-green)
![image](https://img.shields.io/badge/Best_practices-100-green)
![image](https://img.shields.io/badge/Seo-100-green)

You can view the full Lighthouse reports here:

- [Home page report](/public/lighthouse-home.html)
- [Pokemon page report](/public/lighthouse-pokemon.html)

## License

[MIT](LICENSE)
