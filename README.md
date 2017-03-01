# prop-loader [![Build Status](https://travis-ci.org/erikdesjardins/prop-loader.svg?branch=master)](https://travis-ci.org/erikdesjardins/prop-loader)

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
var everything = require('prop-loader!manifest.json');
// everything === { "version": "1.2.3", "background": { "scripts": ["background.js"] } }

var version = require('prop-loader?version!manifest.json')
// version === "1.2.3";

var scripts = require('prop-loader?background.scripts!manifest.json')
// scripts === ["background.js"]
```
