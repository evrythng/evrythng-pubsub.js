const settings = require('./settings')
const setup = require('./setup')
const publish = require('./publish')
const subscribe = require('./subscribe')
const unsubscribe = require('./unsubscribe')

const PubSub = {
  settings,
  setup,
  install: (api) => {
    api.resources.Resource.prototype.subscribe = subscribe
    api.resources.Resource.prototype.unsubscribe = unsubscribe
    api.resources.Resource.prototype.publish = publish
  }
}

module.exports = PubSub
