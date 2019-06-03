const getClient = require('./getClient')

/**
 * Publish a message to a topic using the given client.
 *
 * @param {object} client - The client to publish with.
 * @param {string} topic - The topic to publish on.
 * @param {*} payload - String or object payload, coverted as required.
 * @returns {Promise} Promise that resolves on success or rejects on error.
 */
const publishMessage = (client, topic, payload) => new Promise((resolve, reject) => {
  const data = typeof payload === 'object' ? JSON.stringify(payload) : payload
  client.publish(topic, data, (err) => {
    if (err) {
      reject(err)
      return
    }

    resolve()
  })
})

/**
 * Publish an update to a topic.
 *
 * @param {*} payload - String or object payload, coverted as required.
 * @param {object} [options] - Optional options.
 * @returns {Promise} Promise that resolves on success or rejects on error.
 */
const publish = function (payload, options = {}) {
  if (!payload) {
    throw new Error('Payload is missing.')
  }

  return getClient(this.scope, options)
    .then(client => publishMessage(client, this.path, payload))
}

module.exports = publish
