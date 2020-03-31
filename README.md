# hindsight

> Generate prop documentation for Svelte components.

## Quick Start

```bash
npx hindsight 'src/**/*.svelte'
```

## Usage

### CLI

```bash
yarn add -D hindsight
yarn run hindsight 'src/**/*.svelte'
```

### Node.js

```js
const hindsight = require("hindsight");

(async () => {
  const types = await hindsight({ include: ["temp/**/*.{svelte,html}"] });
})();
```

## License

[MIT](LICENSE)
