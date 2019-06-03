# evrythng-pubsub.js

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Getting started

### Install evrythng-pubsub.js using npm.

```js
npm install evrythng-pubsub
```

Then require it into any module.

```js
const evrythng = require('evrythng')
const PubSub = require('evrythng-pubsub')

evrythng.use(PubSub)
```

### Browser

To use evrythng-pubsub.js from a browser, download `dist/evrythng-pubsub.min.js` or use a CDN such as CDNJS or jsDelivr.

Then, add it as a script tag to your page:

```html
<script src="evrythng-pubsub.js"></script>
<script>
    evrythng.use(PubSub)
</script>
```
