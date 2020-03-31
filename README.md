# hindsight

> Generate prop documentation for Svelte components.

**NOTE** This is a work in progress. See the [v0.1.0 project roadmap](https://github.com/metonym/hindsight/projects/1).

The aim of this project is to quickly generate documentation for a Svelte component given its exported properties. The output format could be text, markdown or JSON.

## Approach

The input is a glob of svelte components. For each component:

1. Collect writable variables (i.e. `let`) using the `svelte.compile` API
2. Parse the file into an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) using the `svelte.parse` API
3. Walk the AST and annotate types (prop name/value/default value)

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
