"use strict";

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const METHODS = ["DELETE", "GET", "HEAD", "PATCH", "POST", "PUT", "SEARCH"];
var URLpath = '/';
var attribute = '';

class API {
  static setUrl(url, attr) {
    URLpath = url;
    attribute = attr;
  }

}

_defineProperty(API, "http", new Proxy({}, {
  get(target, propKey) {
    var _this = this;

    propKey = propKey.toString() + '';
    const method = METHODS.find(function (method) {
      _newArrowCheck(this, _this);

      return propKey.startsWith(method.toLowerCase());
    }.bind(this));
    if (!method) return;
    const path = URLpath + propKey.substring(method.length).replace(/([a-z])([A-Z])/g, '$1/$2').replace(/\$/g, '/$/').toLowerCase();
    return function () {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _newArrowCheck(this, _this);

      const finalPath = path.replace(/\$/g, function () {
        _newArrowCheck(this, _this2);

        return args.shift();
      }.bind(this));
      const queryOrBody = args.shift() || {};

      if (method.toLowerCase() == 'get' || method.toLowerCase() == "head") {
        let query = Object.keys(queryOrBody).map(function (k) {
          _newArrowCheck(this, _this2);

          return encodeURIComponent(k) + '=' + encodeURIComponent(queryOrBody[k]);
        }.bind(this)).join('&');
        var url = finalPath + '?' + query;
        return fetch(url + (attribute || ''), {
          method: method
        });
      }

      return fetch(finalPath + (attribute || ''), {
        method: method,
        mode: 'cors',
        queryOrBody
      });
    }.bind(this);
  }

}));

module.exports = API;