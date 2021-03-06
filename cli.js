#!/usr/bin/env node
'use strict';

/* Dependencies. */
var pack = require('./package.json');
var stemmer = require('./');

/* Arguments. */
var argv = process.argv.slice(2);

/* Program. */
if (
  argv.indexOf('--help') !== -1 ||
  argv.indexOf('-h') !== -1
) {
  console.log(help());
} else if (
  argv.indexOf('--version') !== -1 ||
  argv.indexOf('-v') !== -1
) {
  console.log(pack.version);
} else if (argv.length === 0) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (data) {
    console.log(stem(data));
  });
} else {
  console.log(stem(argv.join(' ')));
}

/* Core. */
function stem(values) {
  return values.split(/\s+/g).map(stemmer).join(' ');
}

/* Help. */
function help() {
  return [
    '',
    'Usage: ' + pack.name + ' [options] <words...>',
    '',
    pack.description,
    '',
    'Options:',
    '',
    '  -h, --help           output usage information',
    '  -v, --version        output version number',
    '',
    'Usage:',
    '',
    '# output stems',
    '$ ' + pack.name + ' considerations',
    stem('considerations'),
    '',
    '# output stems from stdin',
    '$ echo "detestable vileness" | ' + pack.name,
    stem('detestable vileness')
  ].join('\n  ') + '\n';
}
