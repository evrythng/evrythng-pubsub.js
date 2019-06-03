const evrythng = require('evrythng')
const PubSub = require('evrythng-pubsub')

evrythng.use(PubSub)

const { TRUSTED_API_KEY } = process.env

const onMessage = message => console.log(JSON.stringify(message))

const main = async () => {
  if (!TRUSTED_API_KEY) {
    throw new Error('Please export TRUSTED_API_KEY')
  }

  const trustedApp = new evrythng.TrustedApplication(TRUSTED_API_KEY)
  await trustedApp.init()

  await trustedApp.action('all').subscribe(onMessage)
  console.log(`Subscribed to all actions in project ${trustedApp.project}`)
}

main()
