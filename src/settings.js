/**
 * Settings can be applied globally or for individual requests.
 * Available options are provided below:
 *
 * @typedef {Object} Settings
 * @param {string} apiUrl - Pubsub API url of request
 * @param {number} reconnectPeriod - Retry period in ms after a disconnection
 * @param {number} keepAlive - Interval to send heartbeats over the socket
 * @param {string} clientIdPrefix - Prefix for every client ID
 */

/**
 * Default settings.
 *
 * @type {Settings}
 */
const defaultSettings = {
  apiUrl: typeof window === 'undefined'
    // Node
    ? 'mqtts://mqtt.evrythng.com:8883'
    // Browser
    : 'wss://ws.evrythng.com:443/mqtt',
  reconnectPeriod: 1000,
  keepAlive: 50,
  clientIdPrefix: 'evrythng-pubsub.js'
}

const settings = Object.assign({}, defaultSettings)

module.exports = settings
