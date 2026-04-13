# Vapor Lyrics

A Spicetify extension for vaporwave-styled lyrics, built with **Bun**.

## Development
This project uses Bun for bundling and TypeScript for development.

### Scripts
- `bun run build`: Bundles the extension into `Vapor-Lyrics.js`.
- `bun run watch`: Automatically rebuilds whenever you change files in `src/`.

## Installation
1. Ensure you have [Bun](https://bun.sh) installed.
2. Build the extension:
   ```bash
   bun run build
   ```
3. Copy the `Vapor-Lyrics.js` and `manifest.json` to your Spicetify `Extensions/Vapor Lyrics` folder (or just point Spicetify to this directory).
4. Run:
   ```powershell
   spicetify config extensions Vapor-Lyrics.js
   spicetify apply
   ```
