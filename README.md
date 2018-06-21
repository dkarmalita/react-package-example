roadmap
[ ] cookbook


https://github.com/firstlookmedia/react-scripts/blob/master/package.json
https://docs.npmjs.com/files/package.json#files

package.json
```
  "files": [
    "LICENSE",
    "README.md",
    "index.js",
    "server.js",
    "server.browser.js",
    "server.node.js",
    "test-utils.js",
    "unstable-native-dependencies.js",
    "cjs/",
    "umd/"
  ],
  "homepage": "https://reactjs.org/",
  "keywords": [
    "react"
  ],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/facebook/react.git"
  },
  "deprecated": false,
  "description": "React package for working with the DOM.",
  "bugs": {
    "url": "https://github.com/facebook/react/issues"
  },
  "bundleDependencies": false,
  "browser": {
    "./server.js": "./server.browser.js"
  },

```

LICENSE
```
ISC License

Copyright (c) 2018-present, Dmitriy Karmalita

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```
https://choosealicense.com/licenses/isc/

CHANGES.md
```
## 0.1.2

 - restructured for overlay style package compatibility

## 0.1.0

 - removed asap because it was broken, probably down to the
   philosophy.

## 0.0.3

 - removed q-util
 - fixed asap so it returns a value if completed

## 0.0.2

 - added q-util

## 0.0.1

 - initial version

```

README.md
https://gist.github.com/PurpleBooth/109311bb0361f32d87a2

Intro
Motivation
Notes
Installation
Example
Styling
Custom Components
On NPM