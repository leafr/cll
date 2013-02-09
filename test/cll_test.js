var assert = require('assert')
  , cll = require('./../lib/cll')
  , exec = require('child_process').exec
  , path = require('path')
  , fs = require('fs');
  
function assertStdout(command, text, done){
  exec(command, function(error, stdout, stderr){
    assert.equal(stdout, text);
    done();
  });
}

function command(start){
  return function(args){
    return start + ' ' + args;
  }
}

describe('logging', function(){
  var app = path.resolve('./test/app.js')
    , cmd = command('node ' + app)
    , base = path.resolve('./test/outputs')
    , file = path.join(base, 'foo');

  it('writes to stdout', function(done){
    assertStdout(cmd('stdout'), '   info      foo bar\n', done);
  });

  it('writes to file', function(done){
    cll.configure({
      colors: false,
      levelmark: 'text',
      file: file
    });

    cll.info('foo bar', function(){
      assert.equal('   info      foo bar\n', fs.readFileSync(file, 'utf8'));
      done();
    });
  });
});

