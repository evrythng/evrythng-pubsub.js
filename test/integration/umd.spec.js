(function (root, factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    define(['evrythng', 'evrythng-pubsub'], factory)
  } else if (typeof module === 'object' && module.exports) {
    factory(require('evrythng'), require('../../dist/evrythng-pubsub'))
  } else {
    factory(root.EVT, root.EVTPubSub)
  }
}(this, function factory (EVT, EVTPubSub) {
  /* eslint-env jasmine */

  describe('EVTPubSub Distribution', () => {
    it('should exist', () => {
      expect(EVTPubSub).toBeDefined()
      expect(EVT._Resource.subscribe).toBeDefined()
    })
  })
}))

