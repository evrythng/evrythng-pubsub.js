/* eslint-env jasmine */
import * as EVTPubSub from '../../src/evrythng-pubsub'

describe('EVTPubSub', () => {
  it('should contain version', () => {
    expect(EVTPubSub.version).toBeDefined()
  })

  it('should contain correct version', () => {
    expect(EVTPubSub.version).toBe('1.0.0')
  })
})
