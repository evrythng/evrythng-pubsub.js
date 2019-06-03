# evrythng-pubsub.js

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

Plugin for [`evrythng.js`](https://github.com/evrythng/evrythng.js) (v5.1.0 and
above) allowing easy subscription and publication to resources such as Thngs,
products, and actions using either MQTT or WebSockets.


## Install

### npm

```
npm i --save evrythng-pubsub
```

Then require it into any module.

```js
const evrythng = require('evrythng')
const PubSub = require('evrythng-pubsub')

evrythng.use(PubSub)
```

### CDN

Add it as a script tag to your page:

```html
<script src="https://d10ka0m22z5ju5.cloudfront.net/js/evrythng-pubsub/1.0.0/evrythng-pubsub-1.0.0.js"></script>
```

Then use in the same manner as for Node:


```html
<script>
  evrythng.use(PubSub)
</script>
```


## Usage

After installing the plugin with `evrythng.use()`, three methods are added to
all resource types, such as Thngs, products, actions, etc. if they are
[available as subscription topics](https://developers.evrythng.com/docs/pubsub#section-available-topics).

* `.subscribe(onMessage)` - Subscribe to topic updates with a callback.
* `.unsubscribe()` - Unsubscribe from topic updates.
* `.publish(payload)` - Publish to a topic with payload data, such as an action.


## Examples

Subscribe to all actions:

```js
const onActionCreated = (action) => {
  console.log(`Action created: ${action.id} of type ${action.type}`)
}

await user.action('all').subscribe(onActionCreated)
```

Pubish a new action:

```js
const payload = { type: 'scans', thng: thngId }

await user.action('all').publish(payload)
```

Unsubscribe from all actions:

```js
await user.action('all').unsubscribe()
```


## Testing

Use the `tests/browser` and `tests/node` directories to test this SDK in the
browser or Node, or run the Mocha test suite using a testable Trusted
Application API Key:

```
export TRUSTED_API_KEY=a87s9j3h...

npm test
```
