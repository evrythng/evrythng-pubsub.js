const settings = require('./settings')
const setup = require('./setup')
const publish = require('./publish')
const subscribe = require('./subscribe')
const unsubscribe = require('./unsubscribe')

/**
 * The PubSub plugin
 */
const PubSub = {
  settings,
  setup,

  /**
   * evrythng.js required install() method, given 'api'
   *
   * @param {object} api - evrythng.js plugin API object.
   */
  install: (api) => {
    api.resources.Resource.prototype.subscribe = subscribe
    api.resources.Resource.prototype.unsubscribe = unsubscribe
    api.resources.Resource.prototype.publish = publish
  }
}

module.exports = PubSub
