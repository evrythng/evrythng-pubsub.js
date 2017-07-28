import { subscriptions } from './cache'

function removeSubscription (scope, path) {
  const scopeSubscriptions = subscriptions.get(scope)
  if (!scopeSubscriptions) Reflect.deleteProperty(scopeSubscriptions, path)
}

function unsubscribeTopic (client, topic) {
  return new Promise((resolve, reject) => {
    client.unsubscribe(topic, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

export default async function unsubscribe (callback) {
  const client = this.scope.pubsubClient

  if (!client) {
    const err = new Error('Pubsub client not initialized.')
    if (callback) callback(err)
    throw err
  }

  try {
    await unsubscribeTopic(client, this.path)
    removeSubscription(this.scope, this.path)
    if (callback) callback(null, client)
    return client
  } catch (err) {
    if (callback) callback(err)
    throw err
  }
}
