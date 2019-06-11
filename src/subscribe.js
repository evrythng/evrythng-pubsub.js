const { subscriptions } = require('./cache')
const getClient = require('./getClient')

/**
 * Add a subscription to a scope's subscriptions.
 *
 * @param {object} scope - evrythng.js scope.
 * @param {string} path - The API path, used as MQTT topic.
 * @param {function} onMessage - Callback for the topic to be registered.
 */
const addSubscription = (scope, path, onMessage) => {
  let existing = subscriptions.get(scope)
  if (!existing) {
    existing = {}
    subscriptions.set(scope, existing)
  }

  if (!existing[path]) {
    existing[path] = []
  }

  existing[path].push(onMessage)
}

/**
 * Handle and deserialise JSON payload that may be an EVRYTHNG resource.
 *
 * @param {function} deserializer - The resource deserializer to use.
 * @param {function} onMessage - Callback for incoming messages.
 * @returns {function} Function accepting the actual message received.
 */
const jsonHandler = (deserializer, onMessage) => (message) => {
  // Incoming as Buffer.
  let response = message.toString()
  try {
    // Try to parse as JSON and then to the corresponding resource class.
    response = deserializer(JSON.parse(response))
  } catch (e) {}

  onMessage(response)
}

/**
 * Subscribe to a topic using a given client.
 *
 * @param {object} client - mqtt.js client.
 * @param {string} topic - The topic to subscribe to.
 * @returns {Promise} Promise that resolves on subscription, or rejects on error.
 */
const subscribeTopic = (client, topic) => new Promise((resolve, reject) => {
  client.subscribe(topic, (err) => {
    if (err) {
      reject(err)
      return
    }

    resolve()
  })
})

/**
 * Subscribe to a topic for this resource.
 *
 * @param {function} onMessage - Callback for messages received.
 * @param {object} [options] - Optional options.
 * @returns {Promise} Promise that resolves on subscription, or rejects on error.
 */
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
