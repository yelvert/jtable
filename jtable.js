(function() {
  var root = this;
  var previousUnderscore = root._;
  var breaker = {};
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
  var slice = ArrayProto.slice, unshift = ArrayProto.unshift, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
  var nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce, nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every, nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind;
  var _ = function(obj) {
    return new wrapper(obj)
  };
  if(typeof module !== "undefined" && module.exports) {
    module.exports = _;
    _._ = _
  }else {
    root["_"] = _
  }
  _.VERSION = "1.1.7";
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if(obj == null) {
      return
    }
    if(nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context)
    }else {
      if(obj.length === +obj.length) {
        for(var i = 0, l = obj.length;i < l;i++) {
          if(i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
            return
          }
        }
      }else {
        for(var key in obj) {
          if(hasOwnProperty.call(obj, key)) {
            if(iterator.call(context, obj[key], key, obj) === breaker) {
              return
            }
          }
        }
      }
    }
  };
  _.map = function(obj, iterator, context) {
    var results = [];
    if(obj == null) {
      return results
    }
    if(nativeMap && obj.map === nativeMap) {
      return obj.map(iterator, context)
    }
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list)
    });
    return results
  };
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = memo !== void 0;
    if(obj == null) {
      obj = []
    }
    if(nativeReduce && obj.reduce === nativeReduce) {
      if(context) {
        iterator = _.bind(iterator, context)
      }
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator)
    }
    each(obj, function(value, index, list) {
      if(!initial) {
        memo = value;
        initial = true
      }else {
        memo = iterator.call(context, memo, value, index, list)
      }
    });
    if(!initial) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    return memo
  };
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    if(obj == null) {
      obj = []
    }
    if(nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if(context) {
        iterator = _.bind(iterator, context)
      }
      return memo !== void 0 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator)
    }
    var reversed = (_.isArray(obj) ? obj.slice() : _.toArray(obj)).reverse();
    return _.reduce(reversed, iterator, memo, context)
  };
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if(iterator.call(context, value, index, list)) {
        result = value;
        return true
      }
    });
    return result
  };
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if(obj == null) {
      return results
    }
    if(nativeFilter && obj.filter === nativeFilter) {
      return obj.filter(iterator, context)
    }
    each(obj, function(value, index, list) {
      if(iterator.call(context, value, index, list)) {
        results[results.length] = value
      }
    });
    return results
  };
  _.reject = function(obj, iterator, context) {
    var results = [];
    if(obj == null) {
      return results
    }
    each(obj, function(value, index, list) {
      if(!iterator.call(context, value, index, list)) {
        results[results.length] = value
      }
    });
    return results
  };
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if(obj == null) {
      return result
    }
    if(nativeEvery && obj.every === nativeEvery) {
      return obj.every(iterator, context)
    }
    each(obj, function(value, index, list) {
      if(!(result = result && iterator.call(context, value, index, list))) {
        return breaker
      }
    });
    return result
  };
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator = iterator || _.identity;
    var result = false;
    if(obj == null) {
      return result
    }
    if(nativeSome && obj.some === nativeSome) {
      return obj.some(iterator, context)
    }
    each(obj, function(value, index, list) {
      if(result |= iterator.call(context, value, index, list)) {
        return breaker
      }
    });
    return!!result
  };
  _.include = _.contains = function(obj, target) {
    var found = false;
    if(obj == null) {
      return found
    }
    if(nativeIndexOf && obj.indexOf === nativeIndexOf) {
      return obj.indexOf(target) != -1
    }
    any(obj, function(value) {
      if(found = value === target) {
        return true
      }
    });
    return found
  };
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return(method.call ? method || value : value[method]).apply(value, args)
    })
  };
  _.pluck = function(obj, key) {
    return _.map(obj, function(value) {
      return value[key]
    })
  };
  _.max = function(obj, iterator, context) {
    if(!iterator && _.isArray(obj)) {
      return Math.max.apply(Math, obj)
    }
    var result = {computed:-Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value:value, computed:computed})
    });
    return result.value
  };
  _.min = function(obj, iterator, context) {
    if(!iterator && _.isArray(obj)) {
      return Math.min.apply(Math, obj)
    }
    var result = {computed:Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value:value, computed:computed})
    });
    return result.value
  };
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return{value:value, criteria:iterator.call(context, value, index, list)}
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0
    }), "value")
  };
  _.groupBy = function(obj, iterator) {
    var result = {};
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value)
    });
    return result
  };
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while(low < high) {
      var mid = low + high >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid
    }
    return low
  };
  _.toArray = function(iterable) {
    if(!iterable) {
      return[]
    }
    if(iterable.toArray) {
      return iterable.toArray()
    }
    if(_.isArray(iterable)) {
      return slice.call(iterable)
    }
    if(_.isArguments(iterable)) {
      return slice.call(iterable)
    }
    return _.values(iterable)
  };
  _.size = function(obj) {
    return _.toArray(obj).length
  };
  _.first = _.head = function(array, n, guard) {
    return n != null && !guard ? slice.call(array, 0, n) : array[0]
  };
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, index == null || guard ? 1 : index)
  };
  _.last = function(array) {
    return array[array.length - 1]
  };
  _.compact = function(array) {
    return _.filter(array, function(value) {
      return!!value
    })
  };
  _.flatten = function(array) {
    return _.reduce(array, function(memo, value) {
      if(_.isArray(value)) {
        return memo.concat(_.flatten(value))
      }
      memo[memo.length] = value;
      return memo
    }, [])
  };
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1))
  };
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var result = [];
    _.reduce(initial, function(memo, el, i) {
      if(0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) {
        memo[memo.length] = el;
        result[result.length] = array[i]
      }
      return memo
    }, []);
    return result
  };
  _.union = function() {
    return _.uniq(_.flatten(arguments))
  };
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0
      })
    })
  };
  _.difference = function(array, other) {
    return _.filter(array, function(value) {
      return!_.include(other, value)
    })
  };
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, "length"));
    var results = new Array(length);
    for(var i = 0;i < length;i++) {
      results[i] = _.pluck(args, "" + i)
    }
    return results
  };
  _.indexOf = function(array, item, isSorted) {
    if(array == null) {
      return-1
    }
    var i, l;
    if(isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1
    }
    if(nativeIndexOf && array.indexOf === nativeIndexOf) {
      return array.indexOf(item)
    }
    for(i = 0, l = array.length;i < l;i++) {
      if(array[i] === item) {
        return i
      }
    }
    return-1
  };
  _.lastIndexOf = function(array, item) {
    if(array == null) {
      return-1
    }
    if(nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return array.lastIndexOf(item)
    }
    var i = array.length;
    while(i--) {
      if(array[i] === item) {
        return i
      }
    }
    return-1
  };
  _.range = function(start, stop, step) {
    if(arguments.length <= 1) {
      stop = start || 0;
      start = 0
    }
    step = arguments[2] || 1;
    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);
    while(idx < len) {
      range[idx++] = start;
      start += step
    }
    return range
  };
  _.bind = function(func, obj) {
    if(func.bind === nativeBind && nativeBind) {
      return nativeBind.apply(func, slice.call(arguments, 1))
    }
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(obj, args.concat(slice.call(arguments)))
    }
  };
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if(funcs.length == 0) {
      funcs = _.functions(obj)
    }
    each(funcs, function(f) {
      obj[f] = _.bind(obj[f], obj)
    });
    return obj
  };
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return hasOwnProperty.call(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments)
    }
  };
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function() {
      return func.apply(func, args)
    }, wait)
  };
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)))
  };
  var limit = function(func, wait, debounce) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var throttler = function() {
        timeout = null;
        func.apply(context, args)
      };
      if(debounce) {
        clearTimeout(timeout)
      }
      if(debounce || !timeout) {
        timeout = setTimeout(throttler, wait)
      }
    }
  };
  _.throttle = function(func, wait) {
    return limit(func, wait, false)
  };
  _.debounce = function(func, wait) {
    return limit(func, wait, true)
  };
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if(ran) {
        return memo
      }
      ran = true;
      return memo = func.apply(this, arguments)
    }
  };
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments));
      return wrapper.apply(this, args)
    }
  };
  _.compose = function() {
    var funcs = slice.call(arguments);
    return function() {
      var args = slice.call(arguments);
      for(var i = funcs.length - 1;i >= 0;i--) {
        args = [funcs[i].apply(this, args)]
      }
      return args[0]
    }
  };
  _.after = function(times, func) {
    return function() {
      if(--times < 1) {
        return func.apply(this, arguments)
      }
    }
  };
  _.keys = nativeKeys || function(obj) {
    if(obj !== Object(obj)) {
      throw new TypeError("Invalid object");
    }
    var keys = [];
    for(var key in obj) {
      if(hasOwnProperty.call(obj, key)) {
        keys[keys.length] = key
      }
    }
    return keys
  };
  _.values = function(obj) {
    return _.map(obj, _.identity)
  };
  _.functions = _.methods = function(obj) {
    var names = [];
    for(var key in obj) {
      if(_.isFunction(obj[key])) {
        names.push(key)
      }
    }
    return names.sort()
  };
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for(var prop in source) {
        if(source[prop] !== void 0) {
          obj[prop] = source[prop]
        }
      }
    });
    return obj
  };
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for(var prop in source) {
        if(obj[prop] == null) {
          obj[prop] = source[prop]
        }
      }
    });
    return obj
  };
  _.clone = function(obj) {
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj)
  };
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj
  };
  _.isEqual = function(a, b) {
    if(a === b) {
      return true
    }
    var atype = typeof a, btype = typeof b;
    if(atype != btype) {
      return false
    }
    if(a == b) {
      return true
    }
    if(!a && b || a && !b) {
      return false
    }
    if(a._chain) {
      a = a._wrapped
    }
    if(b._chain) {
      b = b._wrapped
    }
    if(a.isEqual) {
      return a.isEqual(b)
    }
    if(b.isEqual) {
      return b.isEqual(a)
    }
    if(_.isDate(a) && _.isDate(b)) {
      return a.getTime() === b.getTime()
    }
    if(_.isNaN(a) && _.isNaN(b)) {
      return false
    }
    if(_.isRegExp(a) && _.isRegExp(b)) {
      return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline
    }
    if(atype !== "object") {
      return false
    }
    if(a.length && a.length !== b.length) {
      return false
    }
    var aKeys = _.keys(a), bKeys = _.keys(b);
    if(aKeys.length != bKeys.length) {
      return false
    }
    for(var key in a) {
      if(!(key in b) || !_.isEqual(a[key], b[key])) {
        return false
      }
    }
    return true
  };
  _.isEmpty = function(obj) {
    if(_.isArray(obj) || _.isString(obj)) {
      return obj.length === 0
    }
    for(var key in obj) {
      if(hasOwnProperty.call(obj, key)) {
        return false
      }
    }
    return true
  };
  _.isElement = function(obj) {
    return!!(obj && obj.nodeType == 1)
  };
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === "[object Array]"
  };
  _.isObject = function(obj) {
    return obj === Object(obj)
  };
  _.isArguments = function(obj) {
    return!!(obj && hasOwnProperty.call(obj, "callee"))
  };
  _.isFunction = function(obj) {
    return!!(obj && obj.constructor && obj.call && obj.apply)
  };
  _.isString = function(obj) {
    return!!(obj === "" || obj && obj.charCodeAt && obj.substr)
  };
  _.isNumber = function(obj) {
    return!!(obj === 0 || obj && obj.toExponential && obj.toFixed)
  };
  _.isNaN = function(obj) {
    return obj !== obj
  };
  _.isBoolean = function(obj) {
    return obj === true || obj === false
  };
  _.isDate = function(obj) {
    return!!(obj && obj.getTimezoneOffset && obj.setUTCFullYear)
  };
  _.isRegExp = function(obj) {
    return!!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false))
  };
  _.isNull = function(obj) {
    return obj === null
  };
  _.isUndefined = function(obj) {
    return obj === void 0
  };
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this
  };
  _.identity = function(value) {
    return value
  };
  _.times = function(n, iterator, context) {
    for(var i = 0;i < n;i++) {
      iterator.call(context, i)
    }
  };
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      addToWrapper(name, _[name] = obj[name])
    })
  };
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id
  };
  _.templateSettings = {evaluate:/<%([\s\S]+?)%>/g, interpolate:/<%=([\s\S]+?)%>/g};
  _.template = function(str, data) {
    var c = _.templateSettings;
    var tmpl = "var __p=[],print=function(){__p.push.apply(__p,arguments);};" + "with(obj||{}){__p.push('" + str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(c.interpolate, function(match, code) {
      return"'," + code.replace(/\\'/g, "'") + ",'"
    }).replace(c.evaluate || null, function(match, code) {
      return"');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('"
    }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');";
    var func = new Function("obj", tmpl);
    return data ? func(data) : func
  };
  var wrapper = function(obj) {
    this._wrapped = obj
  };
  _.prototype = wrapper.prototype;
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj
  };
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain)
    }
  };
  _.mixin(_);
  each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      method.apply(this._wrapped, arguments);
      return result(this._wrapped, this._chain)
    }
  });
  each(["concat", "join", "slice"], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain)
    }
  });
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this
  };
  wrapper.prototype.value = function() {
    return this._wrapped
  }
})();
(function() {
  var root = this;
  var previousBackbone = root.Backbone;
  var Backbone;
  if(typeof exports !== "undefined") {
    Backbone = exports
  }else {
    Backbone = root.Backbone = {}
  }
  Backbone.VERSION = "0.5.3";
  var _ = root._;
  if(!_ && typeof require !== "undefined") {
    _ = require("underscore")._
  }
  var $ = root.jQuery || root.Zepto || root.ender;
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this
  };
  Backbone.emulateHTTP = false;
  Backbone.emulateJSON = false;
  Backbone.Events = {bind:function(ev, callback, context) {
    var calls = this._callbacks || (this._callbacks = {});
    var list = calls[ev] || (calls[ev] = []);
    list.push([callback, context]);
    return this
  }, unbind:function(ev, callback) {
    var calls;
    if(!ev) {
      this._callbacks = {}
    }else {
      if(calls = this._callbacks) {
        if(!callback) {
          calls[ev] = []
        }else {
          var list = calls[ev];
          if(!list) {
            return this
          }
          for(var i = 0, l = list.length;i < l;i++) {
            if(list[i] && callback === list[i][0]) {
              list[i] = null;
              break
            }
          }
        }
      }
    }
    return this
  }, trigger:function(eventName) {
    var list, calls, ev, callback, args;
    var both = 2;
    if(!(calls = this._callbacks)) {
      return this
    }
    while(both--) {
      ev = both ? eventName : "all";
      if(list = calls[ev]) {
        for(var i = 0, l = list.length;i < l;i++) {
          if(!(callback = list[i])) {
            list.splice(i, 1);
            i--;
            l--
          }else {
            args = both ? Array.prototype.slice.call(arguments, 1) : arguments;
            callback[0].apply(callback[1] || this, args)
          }
        }
      }
    }
    return this
  }};
  Backbone.Model = function(attributes, options) {
    var defaults;
    attributes || (attributes = {});
    if(defaults = this.defaults) {
      if(_.isFunction(defaults)) {
        defaults = defaults.call(this)
      }
      attributes = _.extend({}, defaults, attributes)
    }
    this.attributes = {};
    this._escapedAttributes = {};
    this.cid = _.uniqueId("c");
    this.set(attributes, {silent:true});
    this._changed = false;
    this._previousAttributes = _.clone(this.attributes);
    if(options && options.collection) {
      this.collection = options.collection
    }
    this.initialize(attributes, options)
  };
  _.extend(Backbone.Model.prototype, Backbone.Events, {_previousAttributes:null, _changed:false, idAttribute:"id", initialize:function() {
  }, toJSON:function() {
    return _.clone(this.attributes)
  }, get:function(attr) {
    return this.attributes[attr]
  }, escape:function(attr) {
    var html;
    if(html = this._escapedAttributes[attr]) {
      return html
    }
    var val = this.attributes[attr];
    return this._escapedAttributes[attr] = escapeHTML(val == null ? "" : "" + val)
  }, has:function(attr) {
    return this.attributes[attr] != null
  }, set:function(attrs, options) {
    options || (options = {});
    if(!attrs) {
      return this
    }
    if(attrs.attributes) {
      attrs = attrs.attributes
    }
    var now = this.attributes, escaped = this._escapedAttributes;
    if(!options.silent && this.validate && !this._performValidation(attrs, options)) {
      return false
    }
    if(this.idAttribute in attrs) {
      this.id = attrs[this.idAttribute]
    }
    var alreadyChanging = this._changing;
    this._changing = true;
    for(var attr in attrs) {
      var val = attrs[attr];
      if(!_.isEqual(now[attr], val)) {
        now[attr] = val;
        delete escaped[attr];
        this._changed = true;
        if(!options.silent) {
          this.trigger("change:" + attr, this, val, options)
        }
      }
    }
    if(!alreadyChanging && !options.silent && this._changed) {
      this.change(options)
    }
    this._changing = false;
    return this
  }, unset:function(attr, options) {
    if(!(attr in this.attributes)) {
      return this
    }
    options || (options = {});
    var value = this.attributes[attr];
    var validObj = {};
    validObj[attr] = void 0;
    if(!options.silent && this.validate && !this._performValidation(validObj, options)) {
      return false
    }
    delete this.attributes[attr];
    delete this._escapedAttributes[attr];
    if(attr == this.idAttribute) {
      delete this.id
    }
    this._changed = true;
    if(!options.silent) {
      this.trigger("change:" + attr, this, void 0, options);
      this.change(options)
    }
    return this
  }, clear:function(options) {
    options || (options = {});
    var attr;
    var old = this.attributes;
    var validObj = {};
    for(attr in old) {
      validObj[attr] = void 0
    }
    if(!options.silent && this.validate && !this._performValidation(validObj, options)) {
      return false
    }
    this.attributes = {};
    this._escapedAttributes = {};
    this._changed = true;
    if(!options.silent) {
      for(attr in old) {
        this.trigger("change:" + attr, this, void 0, options)
      }
      this.change(options)
    }
    return this
  }, fetch:function(options) {
    options || (options = {});
    var model = this;
    var success = options.success;
    options.success = function(resp, status, xhr) {
      if(!model.set(model.parse(resp, xhr), options)) {
        return false
      }
      if(success) {
        success(model, resp)
      }
    };
    options.error = wrapError(options.error, model, options);
    return(this.sync || Backbone.sync).call(this, "read", this, options)
  }, save:function(attrs, options) {
    options || (options = {});
    if(attrs && !this.set(attrs, options)) {
      return false
    }
    var model = this;
    var success = options.success;
    options.success = function(resp, status, xhr) {
      if(!model.set(model.parse(resp, xhr), options)) {
        return false
      }
      if(success) {
        success(model, resp, xhr)
      }
    };
    options.error = wrapError(options.error, model, options);
    var method = this.isNew() ? "create" : "update";
    return(this.sync || Backbone.sync).call(this, method, this, options)
  }, destroy:function(options) {
    options || (options = {});
    if(this.isNew()) {
      return this.trigger("destroy", this, this.collection, options)
    }
    var model = this;
    var success = options.success;
    options.success = function(resp) {
      model.trigger("destroy", model, model.collection, options);
      if(success) {
        success(model, resp)
      }
    };
    options.error = wrapError(options.error, model, options);
    return(this.sync || Backbone.sync).call(this, "delete", this, options)
  }, url:function() {
    var base = getUrl(this.collection) || this.urlRoot || urlError();
    if(this.isNew()) {
      return base
    }
    return base + (base.charAt(base.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
  }, parse:function(resp, xhr) {
    return resp
  }, clone:function() {
    return new this.constructor(this)
  }, isNew:function() {
    return this.id == null
  }, change:function(options) {
    this.trigger("change", this, options);
    this._previousAttributes = _.clone(this.attributes);
    this._changed = false
  }, hasChanged:function(attr) {
    if(attr) {
      return this._previousAttributes[attr] != this.attributes[attr]
    }
    return this._changed
  }, changedAttributes:function(now) {
    now || (now = this.attributes);
    var old = this._previousAttributes;
    var changed = false;
    for(var attr in now) {
      if(!_.isEqual(old[attr], now[attr])) {
        changed = changed || {};
        changed[attr] = now[attr]
      }
    }
    return changed
  }, previous:function(attr) {
    if(!attr || !this._previousAttributes) {
      return null
    }
    return this._previousAttributes[attr]
  }, previousAttributes:function() {
    return _.clone(this._previousAttributes)
  }, _performValidation:function(attrs, options) {
    var error = this.validate(attrs);
    if(error) {
      if(options.error) {
        options.error(this, error, options)
      }else {
        this.trigger("error", this, error, options)
      }
      return false
    }
    return true
  }});
  Backbone.Collection = function(models, options) {
    options || (options = {});
    if(options.comparator) {
      this.comparator = options.comparator
    }
    _.bindAll(this, "_onModelEvent", "_removeReference");
    this._reset();
    if(models) {
      this.reset(models, {silent:true})
    }
    this.initialize.apply(this, arguments)
  };
  _.extend(Backbone.Collection.prototype, Backbone.Events, {model:Backbone.Model, initialize:function() {
  }, toJSON:function() {
    return this.map(function(model) {
      return model.toJSON()
    })
  }, add:function(models, options) {
    if(_.isArray(models)) {
      for(var i = 0, l = models.length;i < l;i++) {
        this._add(models[i], options)
      }
    }else {
      this._add(models, options)
    }
    return this
  }, remove:function(models, options) {
    if(_.isArray(models)) {
      for(var i = 0, l = models.length;i < l;i++) {
        this._remove(models[i], options)
      }
    }else {
      this._remove(models, options)
    }
    return this
  }, get:function(id) {
    if(id == null) {
      return null
    }
    return this._byId[id.id != null ? id.id : id]
  }, getByCid:function(cid) {
    return cid && this._byCid[cid.cid || cid]
  }, at:function(index) {
    return this.models[index]
  }, sort:function(options) {
    options || (options = {});
    if(!this.comparator) {
      throw new Error("Cannot sort a set without a comparator");
    }
    this.models = this.sortBy(this.comparator);
    if(!options.silent) {
      this.trigger("reset", this, options)
    }
    return this
  }, pluck:function(attr) {
    return _.map(this.models, function(model) {
      return model.get(attr)
    })
  }, reset:function(models, options) {
    models || (models = []);
    options || (options = {});
    this.each(this._removeReference);
    this._reset();
    this.add(models, {silent:true});
    if(!options.silent) {
      this.trigger("reset", this, options)
    }
    return this
  }, fetch:function(options) {
    options || (options = {});
    var collection = this;
    var success = options.success;
    options.success = function(resp, status, xhr) {
      collection[options.add ? "add" : "reset"](collection.parse(resp, xhr), options);
      if(success) {
        success(collection, resp)
      }
    };
    options.error = wrapError(options.error, collection, options);
    return(this.sync || Backbone.sync).call(this, "read", this, options)
  }, create:function(model, options) {
    var coll = this;
    options || (options = {});
    model = this._prepareModel(model, options);
    if(!model) {
      return false
    }
    var success = options.success;
    options.success = function(nextModel, resp, xhr) {
      coll.add(nextModel, options);
      if(success) {
        success(nextModel, resp, xhr)
      }
    };
    model.save(null, options);
    return model
  }, parse:function(resp, xhr) {
    return resp
  }, chain:function() {
    return _(this.models).chain()
  }, _reset:function(options) {
    this.length = 0;
    this.models = [];
    this._byId = {};
    this._byCid = {}
  }, _prepareModel:function(model, options) {
    if(!(model instanceof Backbone.Model)) {
      var attrs = model;
      model = new this.model(attrs, {collection:this});
      if(model.validate && !model._performValidation(attrs, options)) {
        model = false
      }
    }else {
      if(!model.collection) {
        model.collection = this
      }
    }
    return model
  }, _add:function(model, options) {
    options || (options = {});
    model = this._prepareModel(model, options);
    if(!model) {
      return false
    }
    var already = this.getByCid(model);
    if(already) {
      throw new Error(["Can't add the same model to a set twice", already.id]);
    }
    this._byId[model.id] = model;
    this._byCid[model.cid] = model;
    var index = options.at != null ? options.at : this.comparator ? this.sortedIndex(model, this.comparator) : this.length;
    this.models.splice(index, 0, model);
    model.bind("all", this._onModelEvent);
    this.length++;
    if(!options.silent) {
      model.trigger("add", model, this, options)
    }
    return model
  }, _remove:function(model, options) {
    options || (options = {});
    model = this.getByCid(model) || this.get(model);
    if(!model) {
      return null
    }
    delete this._byId[model.id];
    delete this._byCid[model.cid];
    this.models.splice(this.indexOf(model), 1);
    this.length--;
    if(!options.silent) {
      model.trigger("remove", model, this, options)
    }
    this._removeReference(model);
    return model
  }, _removeReference:function(model) {
    if(this == model.collection) {
      delete model.collection
    }
    model.unbind("all", this._onModelEvent)
  }, _onModelEvent:function(ev, model, collection, options) {
    if((ev == "add" || ev == "remove") && collection != this) {
      return
    }
    if(ev == "destroy") {
      this._remove(model, options)
    }
    if(model && ev === "change:" + model.idAttribute) {
      delete this._byId[model.previous(model.idAttribute)];
      this._byId[model.id] = model
    }
    this.trigger.apply(this, arguments)
  }});
  var methods = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "rest", "last", "without", "indexOf", "lastIndexOf", "isEmpty", "groupBy"];
  _.each(methods, function(method) {
    Backbone.Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)))
    }
  });
  Backbone.Router = function(options) {
    options || (options = {});
    if(options.routes) {
      this.routes = options.routes
    }
    this._bindRoutes();
    this.initialize.apply(this, arguments)
  };
  var namedParam = /:([\w\d]+)/g;
  var splatParam = /\*([\w\d]+)/g;
  var escapeRegExp = /[-[\]{}()+?.,\\^$|#\s]/g;
  _.extend(Backbone.Router.prototype, Backbone.Events, {initialize:function() {
  }, route:function(route, name, callback) {
    Backbone.history || (Backbone.history = new Backbone.History);
    if(!_.isRegExp(route)) {
      route = this._routeToRegExp(route)
    }
    Backbone.history.route(route, _.bind(function(fragment) {
      var args = this._extractParameters(route, fragment);
      callback.apply(this, args);
      this.trigger.apply(this, ["route:" + name].concat(args))
    }, this))
  }, navigate:function(fragment, triggerRoute) {
    Backbone.history.navigate(fragment, triggerRoute)
  }, _bindRoutes:function() {
    if(!this.routes) {
      return
    }
    var routes = [];
    for(var route in this.routes) {
      routes.unshift([route, this.routes[route]])
    }
    for(var i = 0, l = routes.length;i < l;i++) {
      this.route(routes[i][0], routes[i][1], this[routes[i][1]])
    }
  }, _routeToRegExp:function(route) {
    route = route.replace(escapeRegExp, "\\$&").replace(namedParam, "([^/]*)").replace(splatParam, "(.*?)");
    return new RegExp("^" + route + "$")
  }, _extractParameters:function(route, fragment) {
    return route.exec(fragment).slice(1)
  }});
  Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, "checkUrl")
  };
  var hashStrip = /^#*/;
  var isExplorer = /msie [\w.]+/;
  var historyStarted = false;
  _.extend(Backbone.History.prototype, {interval:50, getFragment:function(fragment, forcePushState) {
    if(fragment == null) {
      if(this._hasPushState || forcePushState) {
        fragment = window.location.pathname;
        var search = window.location.search;
        if(search) {
          fragment += search
        }
      }else {
        fragment = window.location.hash
      }
    }
    fragment = decodeURIComponent(fragment.replace(hashStrip, ""));
    if(!fragment.indexOf(this.options.root)) {
      fragment = fragment.substr(this.options.root.length)
    }
    return fragment
  }, start:function(options) {
    if(historyStarted) {
      throw new Error("Backbone.history has already been started");
    }
    this.options = _.extend({}, {root:"/"}, this.options, options);
    this._wantsPushState = !!this.options.pushState;
    this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
    var fragment = this.getFragment();
    var docMode = document.documentMode;
    var oldIE = isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7);
    if(oldIE) {
      this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
      this.navigate(fragment)
    }
    if(this._hasPushState) {
      $(window).bind("popstate", this.checkUrl)
    }else {
      if("onhashchange" in window && !oldIE) {
        $(window).bind("hashchange", this.checkUrl)
      }else {
        setInterval(this.checkUrl, this.interval)
      }
    }
    this.fragment = fragment;
    historyStarted = true;
    var loc = window.location;
    var atRoot = loc.pathname == this.options.root;
    if(this._wantsPushState && !this._hasPushState && !atRoot) {
      this.fragment = this.getFragment(null, true);
      window.location.replace(this.options.root + "#" + this.fragment);
      return true
    }else {
      if(this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = loc.hash.replace(hashStrip, "");
        window.history.replaceState({}, document.title, loc.protocol + "//" + loc.host + this.options.root + this.fragment)
      }
    }
    if(!this.options.silent) {
      return this.loadUrl()
    }
  }, route:function(route, callback) {
    this.handlers.unshift({route:route, callback:callback})
  }, checkUrl:function(e) {
    var current = this.getFragment();
    if(current == this.fragment && this.iframe) {
      current = this.getFragment(this.iframe.location.hash)
    }
    if(current == this.fragment || current == decodeURIComponent(this.fragment)) {
      return false
    }
    if(this.iframe) {
      this.navigate(current)
    }
    this.loadUrl() || this.loadUrl(window.location.hash)
  }, loadUrl:function(fragmentOverride) {
    var fragment = this.fragment = this.getFragment(fragmentOverride);
    var matched = _.any(this.handlers, function(handler) {
      if(handler.route.test(fragment)) {
        handler.callback(fragment);
        return true
      }
    });
    return matched
  }, navigate:function(fragment, triggerRoute) {
    var frag = (fragment || "").replace(hashStrip, "");
    if(this.fragment == frag || this.fragment == decodeURIComponent(frag)) {
      return
    }
    if(this._hasPushState) {
      var loc = window.location;
      if(frag.indexOf(this.options.root) != 0) {
        frag = this.options.root + frag
      }
      this.fragment = frag;
      window.history.pushState({}, document.title, loc.protocol + "//" + loc.host + frag)
    }else {
      window.location.hash = this.fragment = frag;
      if(this.iframe && frag != this.getFragment(this.iframe.location.hash)) {
        this.iframe.document.open().close();
        this.iframe.location.hash = frag
      }
    }
    if(triggerRoute) {
      this.loadUrl(fragment)
    }
  }});
  Backbone.View = function(options) {
    this.cid = _.uniqueId("view");
    this._configure(options || {});
    this._ensureElement();
    this.delegateEvents();
    this.initialize.apply(this, arguments)
  };
  var selectorDelegate = function(selector) {
    return $(selector, this.el)
  };
  var eventSplitter = /^(\S+)\s*(.*)$/;
  var viewOptions = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
  _.extend(Backbone.View.prototype, Backbone.Events, {tagName:"div", $:selectorDelegate, initialize:function() {
  }, render:function() {
    return this
  }, remove:function() {
    $(this.el).remove();
    return this
  }, make:function(tagName, attributes, content) {
    var el = document.createElement(tagName);
    if(attributes) {
      $(el).attr(attributes)
    }
    if(content) {
      $(el).html(content)
    }
    return el
  }, delegateEvents:function(events) {
    if(!(events || (events = this.events))) {
      return
    }
    if(_.isFunction(events)) {
      events = events.call(this)
    }
    this.undelegateEvents();
    for(var key in events) {
      var method = this[events[key]];
      if(!method) {
        throw new Error('Event "' + events[key] + '" does not exist');
      }
      var match = key.match(eventSplitter);
      var eventName = match[1], selector = match[2];
      method = _.bind(method, this);
      eventName += ".delegateEvents" + this.cid;
      if(selector === "") {
        $(this.el).bind(eventName, method)
      }else {
        $(this.el).delegate(selector, eventName, method)
      }
    }
  }, undelegateEvents:function() {
    $(this.el).unbind(".delegateEvents" + this.cid)
  }, _configure:function(options) {
    if(this.options) {
      options = _.extend({}, this.options, options)
    }
    for(var i = 0, l = viewOptions.length;i < l;i++) {
      var attr = viewOptions[i];
      if(options[attr]) {
        this[attr] = options[attr]
      }
    }
    this.options = options
  }, _ensureElement:function() {
    if(!this.el) {
      var attrs = this.attributes || {};
      if(this.id) {
        attrs.id = this.id
      }
      if(this.className) {
        attrs["class"] = this.className
      }
      this.el = this.make(this.tagName, attrs)
    }else {
      if(_.isString(this.el)) {
        this.el = $(this.el).get(0)
      }
    }
  }});
  var extend = function(protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child
  };
  Backbone.Model.extend = Backbone.Collection.extend = Backbone.Router.extend = Backbone.View.extend = extend;
  var methodMap = {"create":"POST", "update":"PUT", "delete":"DELETE", "read":"GET"};
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];
    var params = _.extend({type:type, dataType:"json"}, options);
    if(!params.url) {
      params.url = getUrl(model) || urlError()
    }
    if(!params.data && model && (method == "create" || method == "update")) {
      params.contentType = "application/json";
      params.data = JSON.stringify(model.toJSON())
    }
    if(Backbone.emulateJSON) {
      params.contentType = "application/x-www-form-urlencoded";
      params.data = params.data ? {model:params.data} : {}
    }
    if(Backbone.emulateHTTP) {
      if(type === "PUT" || type === "DELETE") {
        if(Backbone.emulateJSON) {
          params.data._method = type
        }
        params.type = "POST";
        params.beforeSend = function(xhr) {
          xhr.setRequestHeader("X-HTTP-Method-Override", type)
        }
      }
    }
    if(params.type !== "GET" && !Backbone.emulateJSON) {
      params.processData = false
    }
    return $.ajax(params)
  };
  var ctor = function() {
  };
  var inherits = function(parent, protoProps, staticProps) {
    var child;
    if(protoProps && protoProps.hasOwnProperty("constructor")) {
      child = protoProps.constructor
    }else {
      child = function() {
        return parent.apply(this, arguments)
      }
    }
    _.extend(child, parent);
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    if(protoProps) {
      _.extend(child.prototype, protoProps)
    }
    if(staticProps) {
      _.extend(child, staticProps)
    }
    child.prototype.constructor = child;
    child.__super__ = parent.prototype;
    return child
  };
  var getUrl = function(object) {
    if(!(object && object.url)) {
      return null
    }
    return _.isFunction(object.url) ? object.url() : object.url
  };
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };
  var wrapError = function(onError, model, options) {
    return function(resp) {
      if(onError) {
        onError(model, resp, options)
      }else {
        model.trigger("error", model, resp, options)
      }
    }
  };
  var escapeHTML = function(string) {
    return string.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
  }
}).call(this);
var JTABLE = {Backbone:{Models:{}, Collections:{}, Views:{}, Templates:{}}};
(function($) {
  $.fn.jtable = function(options) {
    var options = options || {};
    var jtable = new JTABLE.Backbone.Views.jtable({el:this, jtableOptions:options});
    jtable.render()
  }
})(jQuery);
var JTABLE = JTABLE || {};
JTABLE.version = {major:0, minor:2, patch:"development"};
JTABLE.version.toString = function() {
  return[JTABLE.version.major, JTABLE.version.minor, JTABLE.version.patch].join(".")
};
JTABLE.Backbone.Templates.jtable = _.template("   <div class='jtable-header'></div>   <div class='jtable-table'></div>   <div class='jtable-footer'></div> ");
JTABLE.Backbone.Templates.header = _.template("   Header ");
JTABLE.Backbone.Templates.table = _.template("   Table ");
JTABLE.Backbone.Templates.footer = _.template("   Footer ");
JTABLE.Backbone.Views.jtable = Backbone.View.extend({template:JTABLE.Backbone.Templates.jtable, initialize:function() {
  _.bindAll(this, "render");
  this.el = this.options.el;
  this.jtableOptions = this.options.jtableOptions;
  $(this.el).data("jtable", this);
  $(this.el).addClass("jtable-container")
}, render:function() {
  $(this.el).html(this.template({view:this}));
  this.header_view = new JTABLE.Backbone.Views.header({mainView:this});
  this.header_view.render();
  this.table_view = new JTABLE.Backbone.Views.table({mainView:this});
  this.table_view.render();
  this.footer_view = new JTABLE.Backbone.Views.footer({mainView:this});
  this.footer_view.render();
  return this
}});
JTABLE.Backbone.Views.header = Backbone.View.extend({template:JTABLE.Backbone.Templates.header, initialize:function() {
  _.bindAll(this);
  this.mainView = this.options.mainView;
  this.el = this.mainView.$(".jtable-header")
}, render:function() {
  $(this.el).html(this.template({view:this}));
  return this
}});
JTABLE.Backbone.Views.table = Backbone.View.extend({template:JTABLE.Backbone.Templates.table, initialize:function() {
  _.bindAll(this, "render");
  this.mainView = this.options.mainView;
  this.el = this.mainView.$(".jtable-table")
}, render:function() {
  $(this.el).html(this.template({view:this}));
  return this
}});
JTABLE.Backbone.Views.footer = Backbone.View.extend({template:JTABLE.Backbone.Templates.footer, initialize:function() {
  _.bindAll(this, "render");
  this.mainView = this.options.mainView;
  this.el = this.mainView.$(".jtable-footer")
}, render:function() {
  $(this.el).html(this.template({view:this}));
  return this
}});

