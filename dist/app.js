function create() {
}/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BASE_URL = 'https://api.twitter.com';

global.create = function (label, consumer_key, consumer_secret) {
    return new Twitter({
        key: consumer_key || UserProperties.getProperty('TWITTER_CONSUMER_KEY'),
        secret: consumer_secret || UserProperties.getProperty('TWITTER_CONSUMER_SECRET'),
        label: label || 'Twitter'
    });
};

var Twitter = function () {
    function Twitter(props) {
        _classCallCheck(this, Twitter);

        this.service = OAuth1.createService(props.label).setAccessTokenUrl(BASE_URL + '/oauth/access_token').setRequestTokenUrl(BASE_URL + '/oauth/request_token').setAuthorizationUrl(BASE_URL + '/oauth/authorize').setConsumerKey(props.key).setConsumerSecret(props.secret).setCallbackFunction('authCallback').setPropertyStore(PropertiesService.getUserProperties());
    }

    _createClass(Twitter, [{
        key: 'authorize',
        value: function authorize() {
            if (this.service.hasAccess()) {
                Logger.log('Already authorized');
            } else {
                Logger.log('Authorization URL: ' + this.service.authorize());
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.service.reset();
        }
    }, {
        key: 'authCallback',
        value: function authCallback(request) {
            var isAuthorized = this.service.handleCallback(request);
            var mimeType = ContentService.MimeType.TEXT;
            return ContentService.createTextOutput(isAuthorized ? 'Success' : 'Denied').setMimeType(mimeType);
        }
    }, {
        key: 'get',
        value: function get(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            params.tweet_mode = 'extended';
            var q = Object.keys(params).map(function (key) {
                return key + '=' + params[key];
            }).join('&');

            var response = this.service.fetch(BASE_URL + '/1.1/' + path + '.json?' + q);
            return JSON.parse(response);
        }
    }, {
        key: 'post',
        value: function post(path, data) {
            data.tweet_mode = 'extended';
            var response = this.service.fetch(BASE_URL + '/1.1/' + path + '.json', {
                method: 'post',
                payload: data
            });
            return JSON.parse(response);
        }
    }, {
        key: 'getCredentials',
        value: function getCredentials() {
            Logger.log(this.get('account/verify_credentials'));
        }
    }, {
        key: 'testTweet',
        value: function testTweet() {
            Logger.log(this.post('statuses/update', { status: 'Test tweet from Google Apps Script' }));
        }
    }]);

    return Twitter;
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);