/*
 * Cute little logger
 *
 * TODO: ppid, pgid, sid
 *
 *       allow to change/add outputs
 *
 *       omg, messy code
 *
 */

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

var config = {
  pid: false
}

var padding = '  '
  , color = true
  , levelmark = 'smile'
  , levelmarkSmile = function(lvl) { return rand(smiles[lvl]) }
  , levelmarkText = function(lvl) { return lvl }
  , getLevelmark = levelmarkSmile
  , timestamp = false

var smiles = {
  'info'    : [ "(^▼^)",  "◕‿◕｡", "◕‿◕", "ᶘᵒᴥᵒᶅ" ],
  'error'   : [ "(-_-;)", "(-_-')", "(-_-U)", "(-_-#)" ],
  'warning' : [ "(?_?)", "(@_@)", "◕ ¸ ◕"],
  'fatal'   : [ "(O//o)", "(o//O)", "(>//<)", "(O.O)"],
  'debug'   : [ "(>'_')>O", "(>'_'>)#", "(>'_')>~", "¬_¬"]
}

function rand(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function changeLevelmark(name) {
  switch(name) {
  case 'text':
    getLevelmark = levelmarkText
    break;
  case 'smile':
    getLevelmark = levelmarkSmile
    break;
  default:
    getLevelmark = levelmarkText
  }
}

function log(color, level) {
  return function(msg) {
    var levelmark = getLevelmark(level)
      , length = 10 - levelmark.length
      , paddingRight = Array(length).join(' ')
      , string

    string = padding
    if (color) string += color;
    string += levelmark + paddingRight;
    if (timestamp) string += getTimestamp() + ' ';
    if (config.pid) string += process.pid + ' ';
    string += msg
    if (color) string += colors.reset;

    console.log(string)
  }
}

function getTimestamp() {
  return (new Date).toUTCString();
}

exports.info    = log(colors.blue, 'info')
exports.warning = log(colors.grown, 'warning')
exports.error   = log(colors.red, 'error')
exports.fatal   = log(colors.purple, 'fatal')
exports.debug   = log(colors.green, 'debug')

exports.config = function(options){
  var p, l, c, t, pid

  if (p = options.padding) padding = Array(p + 1).join(' ');
  if (l = options.levelmark) changeLevelmark(l);
  if (c = options.colors) color = c;
  if (t = options.timestamp) timestamp = t;
  if (pid = options.pid) config.pid = pid;
}

