const { subscriptions } = require('./cache')
const getClient = require('./getClient')

const addSubscription = (scope, path, onMessage) => {
  let scopeSubscriptions = subscriptions.get(scope)
  if (!scopeSubscriptions) {
    scopeSubscriptions = {}
    subscriptions.set(scope, scopeSubscriptions)
  }

  if (!scopeSubscriptions[path]) {
    scopeSubscriptions[path] = []
  }

  scopeSubscriptions[path].push(onMessage)
}

const jsonHandler = (deserializer, onMessage) => (message) => {
  // Incoming as Buffer.
  let response = message.toString()

  // Try to parse as JSON and then to the corresponding resource class.
  try {
    response = deserializer(JSON.parse(response))
  } catch (e) {}

  onMessage(response)
}

const subscribeTopic = (client, topic) => new Promise((resolve, reject) => {
  client.subscribe(topic, (err) => {
    if (err) {
      reject(err)
      return
    }

    resolve()
  })
})

const subscribe = function (onMessage, options = {}) {
  if (!onMessage) {
    throw new Error('onMessage callback missing.')
  }

  const messageHandler = jsonHandler(this.deserialize.bind(this), onMessage)
  return getClient(this.scope, options)
    .then(client => subscribeTopic(client, this.path))
    .then(() => addSubscription(this.scope, this.path, messageHandler))
}

module.exports = subscribe
