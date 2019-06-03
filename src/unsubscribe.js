const { subscriptions } = require('./cache')

const removeSubscription = (scope, path) => {
  const scopeSubscriptions = subscriptions.get(scope)
  if (!scopeSubscriptions) {
    return
  }

  delete scopeSubscriptions[path]
}

const unsubscribeTopic = (client, topic) => new Promise((resolve, reject) => {
  client.unsubscribe(topic, (err) => {
    if (err) {
      reject(err)
      return
    }

    resolve()
  })
})

const unsubscribe = function () {
  const client = this.scope.pubsubClient

  if (!client) {
    throw new Error('PubSub client not initialized, or is not subscribed')
  }

  return unsubscribeTopic(client, this.path)
    .then(() => removeSubscription(this.scope, this.path))
}

module.exports = unsubscribe
