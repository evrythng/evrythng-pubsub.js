const { subscriptions } = require('./cache')

/**
 * Remove a subscription from a scope's subscriptions.
 *
 * @param {object} scope - evrythng.js scope.
 * @param {string} path - The API path, used as MQTT topic.
 */
const removeSubscription = (scope, path) => {
  const scopeSubscriptions = subscriptions.get(scope)
  if (!scopeSubscriptions) {
    return
  }

  delete scopeSubscriptions[path]
}

/**
 * Unsubscribe from a topic using a given client.
 *
 * @param {object} client - mqtt.js client.
 * @param {string} topic - The topic to subscribe to.
 * @returns {Promise} Promise that resolves on unsubscription, or rejects on error.
 */
const unsubscribeTopic = (client, topic) => new Promise((resolve, reject) => {
  client.unsubscribe(topic, (err) => {
    if (err) {
      reject(err)
      return
    }

    resolve()
  })
})

/**
 * Unsubscribe from a topic for this resource.
 *
 * @returns {Promise} Promise that resolves on unsubscription, or rejects on error.
 */
const unsubscribe = function () {
  const client = this.scope.pubsubClient

  if (!client) {
    throw new Error('PubSub client not initialized, or is not subscribed')
  }

  return unsubscribeTopic(client, this.path)
    .then(() => removeSubscription(this.scope, this.path))
}

module.exports = unsubscribe
