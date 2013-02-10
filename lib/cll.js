/*
 * Module dependencies
 */
var fs = require('fs');

/*
 * @class cll
 */
var cll = function() {
  this.config = {
    pid: false,
    gid: false,
    colors: true,
    levelmark: 'smile',
    padding: '  ',
    time: false,
    stdout: true,
    file: false,
    delimiter: ' '
  };
};

cll.prototype.colors = {
  info:  '\033[34m',
  debug: '\033[32m',
  error: '\033[31m',
  warn:  '\033[33m',
  fatal: '\033[35m',
  reset: '\033[0m'
};

cll.prototype.smiles = {
  info:  [ "(^▼^)", "◕‿◕", "ᶘᵒᴥᵒᶅ" ],
  error: [ "(-_-;)", "(-_-')", "(-_-U)", "(-_-#)"],
  warn:  [ "(?_?)", "(@_@)", "◕ ¸ ◕"],
  fatal: [ "(O//o)", "(o//O)", "(>//<)"],
  debug: [ "(>'_')>O", "(>'_'>)#", "(>'_')>~", "¬_¬"]
};

/*
 * @method configure
 * @param {Object} options
 * @return {self}
 */
cll.prototype.configure = function(opts){
  var conf = this.config;
  var attr;
  var hasOwn = Object.prototype.hasOwnProperty;

  for (attr in opts) { 
    if (hasOwn.call(opts, attr) && hasOwn.call(conf, attr))
      conf[attr] = opts[attr];
  }
  
  return this;
};

/*
 * @method writeStdout
 * @param {String} message
 * @return {undefined}
 */
cll.prototype.writeStdout = function(message){
  process.stdout.write(message);
};

/*
 * @method writeFile
 * @param {String} message
 * @param {String} file
 * @param {Function} callback
 * @return {undefined}
 */
cll.prototype.writeFile = function(message, file, cb){
  fs.appendFile(file, message, function(err, stdout, stder){
    if (err) throw err;
    cb && cb();
  });
};

/*
 * @method getTime
 * @return {String} current time
 */
cll.prototype.getTime = function(){
  return (new Date).toLocaleTimeString();
};

/*
 * @method getPid
 * @return {Number} current process pid
 */
cll.prototype.getPid = function(){
  return process.pid;
};

/*
 * @method paint
 * @param {String} message
 * @param {String} level
 * @return {String} painted message
 */
cll.prototype.paint = function(message, level){
  var colors = this.colors;
  var color = colors[level];
  var reset = colors.reset;
  return color + message + reset;
};

/*
 * @method getGid
 * @return {Number} current process gid
 */
cll.prototype.getGid = function(){
  return process.getgid();
};

/*
 * @method pickSmile
 * @param {String} level
 * @return {String} smile
 */
cll.prototype.pickSmile = function(level){
  var smiles = this.smiles[level];
  return smiles[Math.floor(Math.random() * smiles.length)];
};

/*
 * @method getLevelmark
 * @param {String} type
 * @param {String} level
 * @return {String} levelmark
 */
cll.prototype.getLevelmark = function(type, level){
  var levelmark = type === 'text'
    ? level
    : this.pickSmile(level);
  var length = 10 - levelmark.length;
  var padding = Array(length).join(' ');
  return levelmark + padding;
};

/*
 * @method generateMessage
 * @param {String} level
 * @param {String} text
 * @return {String} generated message
 */
cll.prototype.generateMessage = function(level, text){
  var conf = this.config;
  var msg = [text];

  if (conf.time) msg.unshift(this.getTime());
  if (conf.gid) msg.unshift(this.getGid());
  if (conf.pid) msg.unshift(this.getPid());
  if (conf.levelmark) msg.unshift(this.getLevelmark(conf.levelmark, level));
  if (conf.delimiter) msg = msg.join(conf.delimiter);
  if (conf.colors) msg = this.paint(msg, level);

  return conf.padding + msg + '\n';
};

/*
 * @method log
 * @param {String} level
 * @param {String} text
 * @param {Function} callback
 * @return {undefined}
 */
cll.prototype.log = function(level, text, callback){
  var conf = this.config;
  var message = this.generateMessage(level, text);
  if (conf.stdout) this.writeStdout(message);
  if (conf.file) this.writeFile(message, conf.file, callback);
};

cll.prototype.info  = function(text, cb){ this.log('info',  text, cb) };
cll.prototype.debug = function(text, cb){ this.log('debug', text, cb) };
cll.prototype.warn  = function(text, cb){ this.log('warn',  text, cb) };
cll.prototype.error = function(text, cb){ this.log('error', text, cb) };
cll.prototype.fatal = function(text, cb){ this.log('fatal', text, cb) };

/*
 * Expose an instance of cll
 */
module.exports = new cll();

