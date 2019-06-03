const mqtt = require('mqtt')
const { clients, subscriptions } = require('./cache')
const settings = require('./settings')

/**
 * Generate a client ID using a random number.
 *
 * @param {string} prefix - ID prefix.
 * @returns {string} Generated client ID.
 */
const generateClientId = prefix => `${prefix}_${Math.random().toString(16).substr(2, 8)}`

/**
 * Initialise a client for this scope.
 *
 * @param {object} client - mqtt.js client.
 * @param {object} scope - evrythng.js scope.
 * @param {function} callback - Callback called once client is initialised.
 */
const initClient = (client, scope, callback) => () => {
  const scopeSubscriptions = subscriptions.get(scope)
  if (scopeSubscriptions) {
    Object.keys(scopeSubscriptions).forEach(path => client.subscribe(path))
  }

  callback(client)
}

/**
 * Clean up a client, in case of error.
 *
 * @param {object} client - mqtt.js client.
 * @param {object} scope - evrythng.js scope.
 * @param {function} callback - Callback called once client is cleaned up.
 */
const cleanUp = (client, scope, callback) => (error) => {
  clients.delete(scope)

  if (!scope.pubsubClient) {
    client.end()
    callback(error)
    return
  }

  delete scope.pubsubClient
}

/**
 * When a message arrives from mqtt.js, notify all relevant subscriptions.
 *
 * @param {object} scope - evruthng.js scope.
 * @param {string} path - The APi path, used as MQTT topic.
 * @param {object} message - The received message.
 */
const onMessage = (scope, path, message) => {
  const scopeSubscriptions = subscriptions.get(scope)
  const handlers = scopeSubscriptions && scopeSubscriptions[path]
  if (handlers) {
    handlers.forEach(onMessage => onMessage(message))
  }
}

/**
 * Create a mqtt.js client object and setup connection handlers.
 *
 * @param {object} scope - evruthng.js scope.
 * @param {object} [options] - Optional options such as apiUrl and apiKey.
 * @returns {Promise} Promise that resolves on connection, or rejects on error.
 */
const createClient = (scope, options = {}) => new Promise((resolve, reject) => {
  const connectUrl = options.apiUrl || settings.apiUrl
  const connectOptions = {
    username: 'authorization',
    password: options.authorization || scope.apiKey,
    clientId: generateClientId(settings.clientIdPrefix),
    keepalive: settings.keepAlive,
    reconnectPeriod: settings.reconnectPeriod
  }

  const client = mqtt.connect(connectUrl, connectOptions)
  client.on('connect', initClient(client, scope, resolve))
  client.on('close', cleanUp(client, scope, reject))
  client.on('error', cleanUp(client, scope, reject))
  client.on('message', (path, message) => onMessage(scope, path, message))
})

/**
 * Get a client for the given scope.
 *
 * @param {object} scope - evruthng.js scope.
 * @param {object} [options] - Optional options such as apiUrl and apiKey.
 * @returns {Promise} Promise that resolves to the new or existing MQTT client.
 */
const getClient = (scope, options) => {
  let client = clients.get(scope)
  if (!client) {
    return createClient(scope, options).then((newClient) => {
      clients.set(scope, newClient)
      scope.pubsubClient = newClient

      return newClient
    })
  }

  return Promise.resolve(client)
}

module.exports = getClient
