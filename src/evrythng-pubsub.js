// Globals
export { default as settings } from './settings'
export { default as setup } from './setup'

// Install / Extend core behaviour
import { _Resource } from 'evrythng'
import subscribe from './subscribe'
import unsubscribe from './unsubscribe'

Reflect.defineProperty(_Resource.prototype, 'subscribe', { value: subscribe })
Reflect.defineProperty(_Resource.prototype, 'unsubscribe', { value: unsubscribe })
// Reflect.defineProperty(_Resource.prototype, 'publish', { value: publish })
