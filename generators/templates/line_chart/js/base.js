/*
 * Base Javascript code for graphics, including D3 helpers.
 */
var exports = module.exports = {};

// Global config
exports.DEFAULT_WIDTH = 600;
exports.MOBILE_THRESHOLD = 500;

// D3 formatters
exports.fmtComma = d3.format(',');
exports.fmtYearAbbrev = d3.time.format('%y');
exports.fmtYearFull = d3.time.format('%Y');
exports.fmtMonthNum = d3.time.format('%m');
