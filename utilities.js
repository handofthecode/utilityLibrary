(function() {
  function createArray(first, last) {
    var arr = [];
    var difference = last - first;
    for (var i = first; i < last; i++) {
      arr.push(i);
    }
    return arr;
  }
  function isPrimitive(thing) {
    var type = typeof thing;
    return thing === null || (type != "object" && type != "function");
  }
  function isSpecified(thing, type) {
    if (isPrimitive(thing)) return typeof thing === type;
    else return typeof thing.valueOf() === type;
  }

  var _ = function(initial) {
    u = {
      last: function() {
        return initial[initial.length - 1];
      },
      first: function() {
        return initial[0];
      },
      without: function(...args) {
        var idx;
        args.forEach(function(el) {
          while (true) {
            idx = initial.indexOf(el)
            if (idx === -1) break;
            initial.splice(idx, 1);
          };
        });
        
        return initial;
      },
      lastIndexOf: function(val) {
        for (var i = initial.length - 1; i >= 0; i--) {
          if (initial[i] === val) return i;
        }

        return -1;
      },
      sample: function(size) {
        if (size === undefined) return initial[0];
        var result = [];
        for (var i = 0; i < size; i++) {
          result.push(initial[i]);
        }

        return result;
      },
      findWhere: function(prop) {
        var matches;
        var propKeys = Object.keys(prop);
        for (var i = 0; i < initial.length; i++) {
          matches = propKeys.filter(function(key) {
            return initial[i][key] === prop[key];
          });

          if (propKeys.length === matches.length) return initial[i];
        }

        return undefined;
      },
      where: function(prop) {
        var key = Object.keys(prop)[0];
        var matches;
        return initial.filter(function(obj) {
          return obj[key] === prop[key];
        });
      },
      pluck: function(key) {
        var foundValues = [];
        for (var i = 0; i < initial.length; i++) {
          if (initial[i].hasOwnProperty(key)) foundValues.push(initial[i][key]);
        }

        return foundValues;
      },
      keys: function() {
        return Object.keys(initial);
      },
      values: function() {
        return Object.values(initial);
      },
      pick: function(...args) {
        var result = [];
        args.forEach(function(key) {
          result[key] = initial[key];
        })

        return result;
      },
      omit: function(...args) {
        var result = Object.assign({}, initial);
        args.forEach(function(key) {
          delete result[key];
        })

        return result;
      },
      has: function(prop) {
        return Object.prototype.hasOwnProperty.call(initial, prop);
      },
    };

    (["isElement", "isArray", "isObject", "isFunction", "isBoolean", "isString", "isNumber"]).forEach(function(method) {
      eval('u.' + method + ' = _.' + method);
    });

    return u;
  };

  _.range = function(...args) {
    if (args.length === 1) {
      return createArray(0, args[0]);
    } else {
      return createArray(args[0], args[1]);
    }
  }
  _.extend = function(...args) {
    var result = args.splice(0, 1)[0];
    var key;
    args.forEach(function(obj) {
      key = Object.keys(obj)[0];
      result[key] = obj[key];
    });

    return result;
  }
  _.isElement = function(thing) {
    return thing instanceof HTMLElement;
  };
  _.isArray = function(thing) {
    return Array.isArray(thing);
  };
  _.isObject = function(thing) {
    return thing instanceof Object;
  };
  _.isFunction = function(thing) {
    return typeof thing === 'function';
  }
  _.isBoolean = function(thing) {
    return isSpecified(thing, 'boolean');
  }
  _.isString = function(thing) {
    return isSpecified(thing, 'string');
  }
  _.isNumber = function(thing) {
    return isSpecified(thing, 'number');
  }

  window._ = _;
})();


