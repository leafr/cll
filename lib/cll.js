/*
 * Cute little logger
 *
 * TODO: ppid, sid
 *
 *       allow to change/add outputs
 *
 *       omg, messy code
 *
 */

var fs = require('fs')

var levels = ['info', 'error', 'warning', 'fatal', 'debug'];

var config = {
  pid: false,
  gid: false,
  colors: true,
  levelmark: 'smile',
  padding: '  ',
  timestamp: false
}

var colors = {
  red:    '\033[31m',
  green:  '\033[32m',
  grown:  '\033[33m',
  blue:   '\033[34m',
  purple: '\033[35m',
  aqua:   '\033[36m',
  gray:   '\033[37m',
  reset:  '\033[0m'
}

var levelColors = {
  info:    colors.blue,
  debug:   colors.green,
  error:   colors.red,
  warning: colors.brown,
  fatal:   colors.purple
}

var smiles = {
  'info'    : [ "(^▼^)",  "◕‿◕｡", "◕‿◕", "ᶘᵒᴥᵒᶅ" ],
  'error'   : [ "(-_-;)", "(-_-')", "(-_-U)", "(-_-#)" ],
  'warning' : [ "(?_?)", "(@_@)", "◕ ¸ ◕"],
  'fatal'   : [ "(O//o)", "(o//O)", "(>//<)", "(O.O)"],
  'debug'   : [ "(>'_')>O", "(>'_'>)#", "(>'_')>~", "¬_¬"]
}

var logFiles = [];

function rand(array) {
  return array[Math.floor(Math.random() * array.length)]
}

var levelmark = {
  smile: function(level) { return rand(smiles[level]) },
  text:  function(level) { return level },
}

levelmark.get = config.levelmark === 'smile' ? levelmark.smile : levelmark.text

function addFiles(files){
  logFiles.concat(files);
}

function generateLevelmark(level) {
  var body = levelmark.get(level)
    , length = 10 - body.length
    , paddingRight = Array(length).join(' ')

  return body + paddingRight;
}

function generateTimestamp() {
  return (new Date).toUTCString() + ' ';
}

function generatePid() {
  return process.pid + ' ';
}

function generateGid() {
  return process.getgid() + ' ';
}

function generateString(message, level) {
  var string = [message]
    , color = levelColors[level]
    , reset = colors.reset

  if (config.timestamp) 
    string.unshift(generateTimestamp());

  if (config.pid)
    string.unshift(generatePid());

  if (config.gid)
    string.unshift(generateGid());

  if (config.levelmark)
    string.unshift(generateLevelmark(level));

  if (config.colors) { 
    string.unshift(color);
    string.push(reset);
  }

  string.unshift(config.padding)

  return string.join('')
}

function changeLevelmark(mark) {
  switch(mark) {
  case 'text':
    levelmark.get = levelmark.text;
    break;
  case 'smile':
    levelmark.get = levelmark.smile;
    break;
  case false:
    config.levelmark = false;
    break;
  default:
    getLevelmark = levelmarkText;
  }
}

function createLog(level) {
  return function(message, callback) {
    var string = generateString(message, level)

    logFiles.forEach(function(file){
      fs.appendFile(file, string, function(error, stdout, stderr){
        if (error) throw error;
        callback(file);
      });
    });
    
    console.log(string);
  }
}

levels.forEach(function(level){
  exports[level] = createLog(level)
});

exports.config = function(opts){
  function generatePadding(padding) {
    return Array(padding + 1).join(' ')
  }

  if (opts.padding)   config.padding    = generatePadding(opts.padding);
  if (opts.timestamp) config.timestamp  = opts.timestamp;
  if (opts.pid)       config.pid        = opts.pid;
  if (opts.gid)       config.gid        = opts.gid;

  if (typeof opts.colors    !== 'undefined') config.colors = opts.colors;
  if (typeof opts.levelmark !== 'undefined') changeLevelmark(opts.levelmark);
  
  if (typeof opts.files !== 'undefined') addFiles(opts.files)
};

