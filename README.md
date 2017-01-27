# evrythng-pubsub.js
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Getting started

### Install evrythng-pubsub.js using npm.

```javascript
npm install evrythng-pubsub
```

Then require it into any module.

```javascript
const EVT = require('evrythng')
const EVTPubSub = require('evrythng-pubsub')

EVT.use(EVTPubSub)

/* ... Init app using EVT.js ... */

app.scan().then(match => {
  app.redirect(match.redirections[0].redirectUrl)
})
```

### Browser

To use immutable from a browser, download `dist/evrythng-pubsub.min.js` or use a CDN such as CDNJS or jsDelivr.

Then, add it as a script tag to your page:

```html
<script src="evrythng.min.js"></script>
<script src="evrythng-pubsub.min.js"></script>
<script>
    EVT.use(EVTPubSub)

    /* ... Init app using EVT.js ... */

    app.scan().then(match => {
      app.redirect(match.redirections[0].redirectUrl)
    })
</script>
```

Or use an AMD loader (such as RequireJS):

```javascript
require(['./evrythng.min.js', './evrythng-pubsub.min.js'], (EVT, EVTPubSub) => {
    EVT.use(EVTPubSub)

    /* ... Init app using EVT.js ... */

    app.scan().then(match => {
      app.redirect(match.redirections[0].redirectUrl)
    })
})
```

If you're using browserify, the `evrythng-pubsub npm module also works from the browser.
