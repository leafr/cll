var cll = require('./../lib/cll')
  , path = require('path')
  , args = process.argv.slice(2)
  , type = args[0];

cll.configure({
  levelmark: 'text',
  colors: false
});

cll.info('foo bar');

