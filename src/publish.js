const getClient = require('./getClient')

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

const publish = function (payload, options = {}) {
  if (!payload) {
    throw new Error('Payload is missing.')
  }
  
  return getClient(this.scope, options)
    .then(client => publishMessage(client, this.path, payload))
}

module.exports = publish
