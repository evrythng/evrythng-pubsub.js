const mqtt = require('mqtt')
const { clients, subscriptions } = require('./cache')
const settings = require('./settings')

const generateClientId = prefix => `${prefix}_${Math.random().toString(16).substr(2, 8)}`

const initClient = (client, scope, callback) => () => {
  const scopeSubscriptions = subscriptions.get(scope)
  if (scopeSubscriptions) {
    Object.keys(scopeSubscriptions).forEach(path => client.subscribe(path))
  }

  callback(client)
}

const cleanUp = (client, scope, callback) => (error) => {
  clients.delete(scope)

  if (!scope.pubsubClient) {
    client.end()
    callback(error)
    return
  }

  delete scope.pubsubClient
}

const onMessage = (scope, path, message) => {
  const scopeSubscriptions = subscriptions.get(scope)
  const handlers = scopeSubscriptions && scopeSubscriptions[path]
  if (handlers) {
    handlers.forEach(onMessage => onMessage(message))
  }
}

const createClient = (scope, options = {}) => {
  const connectUrl = options.apiUrl || settings.apiUrl
  const connectOptions = {
    username: 'authorization',
    password: options.authorization || scope.apiKey,
    clientId: generateClientId(settings.clientIdPrefix),
    keepalive: settings.keepAlive,
    reconnectPeriod: settings.reconnectPeriod
  }

  return new Promise((resolve, reject) => {
    const client = mqtt.connect(connectUrl, connectOptions)
    client.on('connect', initClient(client, scope, resolve))
    client.on('close', cleanUp(client, scope, reject))
    client.on('error', cleanUp(client, scope, reject))
    client.on('message', (path, message) => onMessage(scope, path, message))
  })
}

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
