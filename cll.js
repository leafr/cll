/*
 * Cute little logger
 *
 * TODO: timestamp
 *       pid, ppid, pgid, sid
 *
 *       allow to change/add outputs
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

var padding = '  '
  , levelmark = 'smile'
  , levelmarkSmile = function(lvl) { return rand(smiles[lvl]) }
  , levelmarkText = function(lvl) { return lvl }
  , getLevelmark = levelmarkSmile

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
      break;
  }
}

function log(color, level) {
  return function(msg) {
    var levelmark = getLevelmark(level)
      , length = 10 - levelmark.length
      , paddingRight = Array(length).join(' ')

    console.log(padding + color + levelmark + paddingRight + msg + colors.reset)
  }
}

exports.info    = log(colors.blue, 'info')
exports.warning = log(colors.grown, 'warning')
exports.error   = log(colors.red, 'error')
exports.fatal   = log(colors.purple, 'fatal')
exports.debug   = log(colors.green, 'debug')

exports.config = function(options){
  if (p = options.padding) padding = Array(p + 1).join(' ');
  if (l = options.levelmark) changeLevelmark(l);
}

