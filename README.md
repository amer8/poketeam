# PokéTeam

PokéTeam is a small [Next.js](https://nextjs.org/) app for building six-Pokémon teams from random [PokéAPI](https://pokeapi.co/) pulls. It runs entirely in the browser: fetched Pokémon are cached locally with IndexedDB, saved teams are stored in the same browser, and the app can be exported as a static site for GitHub Pages.

## Features

- Build a team by drawing random Pokémon until all six slots are filled.
- Start from an auto-generated team name, then rename it before saving.
- Browse saved teams and sort them by total base experience or name.
- Filter the team list by Pokémon type.
- Open a saved team to inspect it or delete it.
- Toggle between light and dark color modes.

## Stack

- Next.js 16 with the Pages Router
- React 19
- TypeScript
- IndexedDB via [`idb`](https://github.com/jakearchibald/idb)
- PokéAPI for Pokémon and ability data
- Static export output for GitHub Pages deployment

## Prerequisites

- Node.js `>= 24.0.0`
- Yarn `>= 1.22.17`
- A browser with IndexedDB enabled

## Getting Started

Install dependencies and start the local dev server:

```bash
yarn install
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000). The root route redirects to `/team/list`.

No environment variables are required.

`package.json` also defines `yarn start`, but this project is configured for static export, so the primary production artifact is the generated `out/` directory.

## Attribution

- [PokéAPI](https://pokeapi.co/) is created by [Paul Hallett](https://phalt.github.io/) and other [PokéAPI contributors](https://github.com/PokeAPI/pokeapi#contributing) around the world. Pokémon and Pokémon character names are trademarks of Nintendo.
- ["Poké Ball icon"](https://commons.wikimedia.org/wiki/File:Pok%C3%A9_Ball_icon.svg) by Andreuvv is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
