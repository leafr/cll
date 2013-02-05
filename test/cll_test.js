var assert = require('assert')
  , cll = require('./../lib/cll')
  , exec = require('child_process').exec
  , path = require('path');


function assertStdout(command, text, done){
  exec(command, function(error, stdout, stderr){
    assert.equal(stdout, text);
    done();
  });
}

describe('logging', function(){
  var app = path.resolve('./test/app.js')
    , command = 'node ' + app;

  it('writes to stdout', function(done){
    assertStdout(command, '  info     foo bar\n', done)
  })

})

// TODO:
//
//   cll.outputs({
//     file: 'outputs/foo',
//     file: 'outputs/bar'
//   })
//
