var cll = require('./../lib/cll')
  , path = require('path')
  , args = process.argv.slice(2)
  , type = args[0];

file1 = ('./outputs/foo')

cll.config({
  levelmark: 'text',
  colors: false
});

cll.info('foo bar');






