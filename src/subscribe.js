import getClient from './getClient'
import isFunction from 'lodash-es/isFunction'
import { subscriptions } from './cache'

function addSubscription (scope, path, onMessage) {
  let scopeSubscriptions = subscriptions.get(scope)
  if (!scopeSubscriptions) {
    scopeSubscriptions = {}
    subscriptions.set(scope, scopeSubscriptions)
  }
  if (!scopeSubscriptions[path]) scopeSubscriptions[path] = []
  scopeSubscriptions[path].push(onMessage)
}

function jsonHandler (deserialize, onMessage) {
  return function (message) {
    // Incoming as Buffer.
    let response = message.toString()

    // Try to parse as JSON and then to the corresponding resource class.
    try {
      response = deserialize(JSON.parse(response))
    } catch (e) {}

    onMessage(response)
  }
}

function subscribeTopic (client, topic) {
  return new Promise((resolve, reject) => {
    client.subscribe(topic, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

export default async function subscribe (onMessage, options, callback) {
  if (!onMessage) {
    throw new Error('Message callback missing.')
  }

  if (isFunction(options)) {
    callback = options
    options = {}
  }

  const messageHandler = jsonHandler(this.deserialize.bind(this), onMessage)
  const client = await getClient(this.scope, options)
  try {
    await subscribeTopic(client, this.path)
    addSubscription(this.scope, this.path, messageHandler)
    if (callback) callback(null, client)
    return client
  } catch (err) {
    if (callback) callback(err)
    throw err
  }
}
