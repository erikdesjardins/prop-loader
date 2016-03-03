# prop-loader

Webpack loader to extract properties from JSON.

Based on [`json-loader`](https://github.com/webpack/json-loader).

## Installation

`npm install --save-dev prop-loader`

## Usage

**manifest.json:**

```json
{
	"version": "1.2.3",
	"background": {
		"scripts": ["background.js"]
	}
}
```

**example.js:**

```js
var everything = require('prop!manifest.json');
// everything === { "version": "1.2.3", "background": { "scripts": ["background.js"] } }

var version = require('prop?version!manifest.json')
// version === "1.2.3";

var scripts = require('prop?background.scripts!manifest.json')
// scripts === ["background.js"]
```
