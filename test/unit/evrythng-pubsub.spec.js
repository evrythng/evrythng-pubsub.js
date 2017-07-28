/* eslint-env jasmine */
import * as EVTPubSub from '../../src/evrythng-pubsub'

describe('EVTPubSub', () => {
  it('should contain settings', () => {
    expect(EVTPubSub.settings).toBeDefined()
  })
})
