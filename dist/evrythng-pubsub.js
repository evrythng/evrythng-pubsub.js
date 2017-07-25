/**
 * EVRYTHNG-PUBSUB.JS v1.0.0-pre.11
 * (c) 2012-2017 EVRYTHNG Ltd. London / New York / San Francisco.
 * Released under the Apache Software License, Version 2.0.
 * For all details and usage:
 * https://github.com/evrythng/evrythng-pubsub.js
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('evrythng')) :
	typeof define === 'function' && define.amd ? define(['exports', 'evrythng'], factory) :
	(factory((global.EVTPubSub = global.EVTPubSub || {}),global.EVT));
}(this, (function (exports,evrythng) { 'use strict';

evrythng._Resource.subscribe = function () {
  console.log('subscribing');
};

var version = '1.0.0';

exports.version = version;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=evrythng-pubsub.js.map
