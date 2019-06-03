const settings = require('./settings')

/**
 * Override global settings. Ignore unknown settings.
 *
 * @param {Object} customSettings - Custom settings
 * @returns {Object} new
 */
const setup = function (customSettings) {
  return Object.assign(settings, customSettings)
}

module.exports = setup
