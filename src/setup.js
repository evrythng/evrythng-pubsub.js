const settings = require('./settings')

/**
 * Override global settings. Ignore unknown settings.
 *
 * @param {object} customSettings - Custom settings to apply.
 * @returns {object} The new settings.
 */
const setup = customSettings => Object.assign(settings, customSettings)

module.exports = setup
