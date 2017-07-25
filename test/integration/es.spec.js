/* eslint-env jasmine */
import { _Resource } from 'evrythng'
import * as EVTPubSub from '../../dist/evrythng-pubsub.es'

describe('EVTPubSub Distribution', () => {
  it('should exist', () => {
    expect(EVTPubSub).toBeDefined()
    expect(_Resource.subscribe).toBeDefined()
  })
})

