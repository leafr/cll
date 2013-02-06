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

function modifyFS(files, callback){
  files.forEach(function(file){
    if (!fs.existsSync(file)) fs.unlink(file);
  });

  callback();

  files.forEach(function(file){
    fs.unlink(file);
  });
}

describe('logging', function(){
  var app = path.resolve('./test/app.js')
    , cmd = command('node ' + app)
    , base = path.resolve('./test/outputs')
    , files = ['foo', 'bar'].map(function(f){ return path.join(base, f) });

  it('writes to stdout', function(done){
    assertStdout(cmd('stdout'), '  info     foo bar\n', done)
  })
  
  it('writes to outputs', function(done){
    cll.config({files: files});

    cll.info('foo bar', function(file){
      assert.equal('  info     foo bar\n', fs.readFileSync(file))
      done()
    })
    
    done()

    files.forEach(function(file){
      fs.unlink(file);
    });
  })
})

