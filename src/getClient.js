const { connect } = require('mqtt')
const { clients, subscriptions } = require('./cache')
const settings = require('./settings')

function generateClientId (prefix) {
  return prefix + '_' + Math.random().toString(16).substr(2, 8)
}

function createClient (scope, options = {}) {
  const connectUrl = options.apiUrl || settings.apiUrl
  const connectOptions = {
    username: 'authorization',
    password: options.authorization || scope.apiKey,
    clientId: generateClientId(settings.clientIdPrefix),
    keepalive: settings.keepAlive,
    reconnectPeriod: settings.reconnectPeriod
  }

  return new Promise((resolve, reject) => {
    const client = connect(connectUrl, connectOptions)
    client.on('connect', initClient(client, scope, resolve))
    client.on('close', cleanUp(client, scope, reject))
    client.on('error', cleanUp(client, scope, reject))
    client.on('message', (path, message) => onMessage(scope, path, message))
  })
}

function initClient (client, scope, callback) {
  return function () {
    const scopeSubscriptions = subscriptions.get(scope)

    if (scopeSubscriptions) {
      Object.keys(scopeSubscriptions).forEach(path => client.subscribe(path))
    }

    callback(client)
  }
}

function cleanUp (client, scope, callback) {
  return function (error) {
    clients.delete(scope)

    if (!scope.pubsubClient) {
      client.end()
      callback(error)
    } else {
      Reflect.deleteProperty(scope, 'pubsubClient')
    }
  }
}

function onMessage (scope, path, message) {
  const scopeSubscriptions = subscriptions.get(scope)
  const handlers = scopeSubscriptions && scopeSubscriptions[path]
  if (handlers) {
    handlers.forEach(onMessage => onMessage(message))
  }
}

const getClient = async function (scope, options) {
  let client = clients.get(scope)

  if (!client) {
    client = await createClient(scope, options)
    clients.set(scope, client)
    scope.pubsubClient = client
  }

  return client
}

module.exports = getClient
