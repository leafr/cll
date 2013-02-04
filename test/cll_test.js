var assert = require('assert')
  , cll = require('./../lib/cll')

describe('logging', function() {
  it('log', function() {
    cll.info('zomg')

    cll.config({
      timestamp: true,
      pid: true
    })

    cll.info('zomg')
  })
})

