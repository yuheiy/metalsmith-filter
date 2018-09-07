# metalsmith-filter

A Metalsmith plugin to filter files.

## Installation

```bash
npm install @yuheiy/metalsmith-filter
```

## Usage

```js
const filter = require('@yuheiy/metalsmith-filter')
const path = require('path')

metalsmith.use(
  filter((filename, data) => {
    // Include only files with extension `.html`
    return path.extname(filename) === '.html'
  }),
)
```

## License

MIT
