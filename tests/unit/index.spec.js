const { expect } = require('chai')
const evrythng = require('evrythng')
const PubSub = require('../')

const { TRUSTED_API_KEY } = process.env
if (!TRUSTED_API_KEY) {
  throw new Error('Please export TRUSTED_API_KEY')
}

describe('evrythng-pubsub.js', () => {
  let trustedApp, thng

  before(async () => {
    trustedApp = new evrythng.TrustedApplication(TRUSTED_API_KEY)
    await trustedApp.init()

    thng = await trustedApp.thng().create({ name: 'Test' })
  })

  after(async () => {
    await trustedApp.thng(thng.id).delete()
  })

  it('should install the plugin', () => {
    const attempt = () => evrythng.use(PubSub)

    expect(attempt).to.not.throw()
  })

  it('should have a settings property', async () => {
    expect(PubSub.settings).to.be.an('object')
  })

  it('should have default settings', async () => {
    expect(PubSub.settings.apiUrl).to.be.a('string')
    expect(PubSub.settings.reconnectPeriod).to.be.a('number')
    expect(PubSub.settings.keepAlive).to.be.a('number')
    expect(PubSub.settings.clientIdPrefix).to.be.a('string')
  })

  it('should have a setup method', async () => {
    expect(PubSub.setup).to.be.a('function')
  })

  it('should add the subscribe method to resources', async () => {
    expect(trustedApp.thng(thng.id).subscribe).to.be.a('function')
  })

  it('should add the unsubscribe method to resources', async () => {
    expect(trustedApp.thng(thng.id).unsubscribe).to.be.a('function')
  })

  it('should add the publish method to resources', async () => {
    expect(trustedApp.thng(thng.id).publish).to.be.a('function')
  })

  it('should subscribe and receive a published message', (done) => {
    const onMessage = async (message) => {
      expect(message).to.be.an('object')
      expect(message.id).to.have.length(24)
      expect(message.type).to.equal('scans')

      await trustedApp.action('all').unsubscribe()
      done()
    }

    trustedApp.action('all').subscribe(onMessage)
      .then(() => trustedApp.action('all').create({ type: 'scans', thng: thng.id }))
  })

  it('should publish to a topic', (done) => {
    const onMessage = (message) => {
      expect(message).to.be.an('object')
      expect(message.id).to.have.length(24)
      expect(message.type).to.equal('scans')

      done()
    }

    trustedApp.action('all').subscribe(onMessage)
      .then(() => trustedApp.action('all').publish({ type: 'scans', thng: thng.id }))
  })

  it('should unsubscribe from all actions', async () => {
    await trustedApp.action('all').unsubscribe()
  })
})
