(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
'use strict';

/**
 * Dependencies.
 */

var lancasterStemmer = require('wooorm/lancaster-stemmer@0.1.4');

/**
 * DOM elements.
 */

var $input = document.getElementsByTagName('input')[0];
var $output = document.getElementsByTagName('output')[0];

/**
 * Event handler.
 */

function oninputchange() {
    $output.textContent = lancasterStemmer($input.value);
}

/**
 * Listen.
 */

$input.addEventListener('input', oninputchange);

/**
 * Initial answer.
 */

oninputchange();

}, {"wooorm/lancaster-stemmer@0.1.4":2}],
2: [function(require, module, exports) {
'use strict';

var STOP,
    INTACT,
    CONTINUE,
    PROTECT,
    rules,
    EXPRESSION_VOWELS;

/*
 * Constants.
 */

STOP = -1;
INTACT = 0;
CONTINUE = 1;
PROTECT = 2;
EXPRESSION_VOWELS = /[aeiouy]/;

/*
 * Rules.
 */

rules = {
    'a': [
        {
            'match': 'ia',
            'replacement': '',
            'type': INTACT
        },
        {
            'match': 'a',
            'replacement': '',
            'type': INTACT
        }
    ],
    'b': [
        {
            'match': 'bb',
            'replacement': 'b',
            'type': STOP
        }
    ],
    'c': [
        {
            'match': 'ytic',
            'replacement': 'ys',
            'type': STOP
        },
        {
            'match': 'ic',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'nc',
            'replacement': 'nt',
            'type': CONTINUE
        }
    ],
    'd': [
        {
            'match': 'dd',
            'replacement': 'd',
            'type': STOP
        },
        {
            'match': 'ied',
            'replacement': 'y',
            'type': CONTINUE
        },
        {
            'match': 'ceed',
            'replacement': 'cess',
            'type': STOP
        },
        {
            'match': 'eed',
            'replacement': 'ee',
            'type': STOP
        },
        {
            'match': 'ed',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'hood',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'e': [
        {
            'match': 'e',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'f': [
        {
            'match': 'lief',
            'replacement': 'liev',
            'type': STOP
        },
        {
            'match': 'if',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'g': [
        {
            'match': 'ing',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'iag',
            'replacement': 'y',
            'type': STOP
        },
        {
            'match': 'ag',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'gg',
            'replacement': 'g',
            'type': STOP
        }
    ],
    'h': [
        {
            'match': 'th',
            'replacement': '',
            'type': INTACT
        },
        {
            'match': 'guish',
            'replacement': 'ct',
            'type': STOP
        },
        {
            'match': 'ish',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'i': [
        {
            'match': 'i',
            'replacement': '',
            'type': INTACT
        },
        {
            'match': 'i',
            'replacement': 'y',
            'type': CONTINUE
        }
    ],
    'j': [
        {
            'match': 'ij',
            'replacement': 'id',
            'type': STOP
        },
        {
            'match': 'fuj',
            'replacement': 'fus',
            'type': STOP
        },
        {
            'match': 'uj',
            'replacement': 'ud',
            'type': STOP
        },
        {
            'match': 'oj',
            'replacement': 'od',
            'type': STOP
        },
        {
            'match': 'hej',
            'replacement': 'her',
            'type': STOP
        },
        {
            'match': 'verj',
            'replacement': 'vert',
            'type': STOP
        },
        {
            'match': 'misj',
            'replacement': 'mit',
            'type': STOP
        },
        {
            'match': 'nj',
            'replacement': 'nd',
            'type': STOP
        },
        {
            'match': 'j',
            'replacement': 's',
            'type': STOP
        }
    ],
    'l': [
        {
            'match': 'ifiabl',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'iabl',
            'replacement': 'y',
            'type': STOP
        },
        {
            'match': 'abl',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ibl',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'bil',
            'replacement': 'bl',
            'type': CONTINUE
        },
        {
            'match': 'cl',
            'replacement': 'c',
            'type': STOP
        },
        {
            'match': 'iful',
            'replacement': 'y',
            'type': STOP
        },
        {
            'match': 'ful',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ul',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'ial',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ual',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'al',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'll',
            'replacement': 'l',
            'type': STOP
        }
    ],
    'm': [
        {
            'match': 'ium',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'um',
            'replacement': '',
            'type': INTACT
        },
        {
            'match': 'ism',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'mm',
            'replacement': 'm',
            'type': STOP
        }
    ],
    'n': [
        {
            'match': 'sion',
            'replacement': 'j',
            'type': CONTINUE
        },
        {
            'match': 'xion',
            'replacement': 'ct',
            'type': STOP
        },
        {
            'match': 'ion',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ian',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'an',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'een',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'en',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'nn',
            'replacement': 'n',
            'type': STOP
        }
    ],
    'p': [
        {
            'match': 'ship',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'pp',
            'replacement': 'p',
            'type': STOP
        }
    ],
    'r': [
        {
            'match': 'er',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ear',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'ar',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'ior',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'or',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ur',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'rr',
            'replacement': 'r',
            'type': STOP
        },
        {
            'match': 'tr',
            'replacement': 't',
            'type': CONTINUE
        },
        {
            'match': 'ier',
            'replacement': 'y',
            'type': CONTINUE
        }
    ],
    's': [
        {
            'match': 'ies',
            'replacement': 'y',
            'type': CONTINUE
        },
        {
            'match': 'sis',
            'replacement': 's',
            'type': STOP
        },
        {
            'match': 'is',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ness',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ss',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'ous',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'us',
            'replacement': '',
            'type': INTACT
        },
        {
            'match': 's',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 's',
            'replacement': '',
            'type': STOP
        }
    ],
    't': [
        {
            'match': 'plicat',
            'replacement': 'ply',
            'type': STOP
        },
        {
            'match': 'at',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ment',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ent',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ant',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ript',
            'replacement': 'rib',
            'type': STOP
        },
        {
            'match': 'orpt',
            'replacement': 'orb',
            'type': STOP
        },
        {
            'match': 'duct',
            'replacement': 'duc',
            'type': STOP
        },
        {
            'match': 'sumpt',
            'replacement': 'sum',
            'type': STOP
        },
        {
            'match': 'cept',
            'replacement': 'ceiv',
            'type': STOP
        },
        {
            'match': 'olut',
            'replacement': 'olv',
            'type': STOP
        },
        {
            'match': 'sist',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'ist',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'tt',
            'replacement': 't',
            'type': STOP
        }
    ],
    'u': [
        {
            'match': 'iqu',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'ogu',
            'replacement': 'og',
            'type': STOP
        }
    ],
    'v': [
        {
            'match': 'siv',
            'replacement': 'j',
            'type': CONTINUE
        },
        {
            'match': 'eiv',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'iv',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'y': [
        {
            'match': 'bly',
            'replacement': 'bl',
            'type': CONTINUE
        },
        {
            'match': 'ily',
            'replacement': 'y',
            'type': CONTINUE
        },
        {
            'match': 'ply',
            'replacement': '',
            'type': PROTECT
        },
        {
            'match': 'ly',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ogy',
            'replacement': 'og',
            'type': STOP
        },
        {
            'match': 'phy',
            'replacement': 'ph',
            'type': STOP
        },
        {
            'match': 'omy',
            'replacement': 'om',
            'type': STOP
        },
        {
            'match': 'opy',
            'replacement': 'op',
            'type': STOP
        },
        {
            'match': 'ity',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ety',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'lty',
            'replacement': 'l',
            'type': STOP
        },
        {
            'match': 'istry',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'ary',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ory',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'ify',
            'replacement': '',
            'type': STOP
        },
        {
            'match': 'ncy',
            'replacement': 'nt',
            'type': CONTINUE
        },
        {
            'match': 'acy',
            'replacement': '',
            'type': CONTINUE
        }
    ],
    'z': [
        {
            'match': 'iz',
            'replacement': '',
            'type': CONTINUE
        },
        {
            'match': 'yz',
            'replacement': 'ys',
            'type': STOP
        }
    ]
};

/**
 * Detect if a value is acceptable to return, or should
 * be stemmed further.
 *
 * @param {string} value - Input.
 * @return {boolean} Whether the input is acceptable.
 */
function isAcceptable(value) {
    return EXPRESSION_VOWELS.test(value.charAt(0)) ?
        value.length > 1 :
        value.length > 2 && EXPRESSION_VOWELS.test(value);
}

/**
 * Apply rules to a value.
 *
 * @param {string} value - Value to stem.
 * @param {boolean} isIntact - Whether the input is unchanged.
 * @return {string} stem according to Lancaster.
 */
function applyRules(value, isIntact) {
    var ruleset,
        index,
        length,
        rule,
        next,
        breakpoint;

    ruleset = rules[value.charAt(value.length - 1)];

    if (!ruleset) {
        return value;
    }

    index = -1;
    length = ruleset.length;

    while (++index < length) {
        rule = ruleset[index];

        if (!isIntact && rule.type === INTACT) {
            continue;
        }

        breakpoint = value.length - rule.match.length;

        if (
            breakpoint < 0 ||
            value.substr(breakpoint) !== rule.match
        ) {
            continue;
        }

        if (rule.type === PROTECT) {
            return value;
        }

        next = value.substr(0, breakpoint) + rule.replacement;

        if (!isAcceptable(next)) {
            continue;
        }

        if (rule.type === CONTINUE) {
            return applyRules(next, false);
        }

        return next;
    }

    return value;
}

/**
 * Stem a value.
 *
 * @param {string} value - Value to stem.
 * @return {string} stem according to Lancaster.
 */
function lancasterStemmer(value) {
    return applyRules(String(value).toLowerCase(), true);
}

/*
 * Expose `lancasterStemmer`.
 */

module.exports = lancasterStemmer;

}, {}]}, {}, {"1":""})