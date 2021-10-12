"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GoogleTagManager", {
  enumerable: true,
  get: function get() {
    return _googleTagManager.default;
  }
});
Object.defineProperty(exports, "GoogleTranslator", {
  enumerable: true,
  get: function get() {
    return _googleTranslator.default;
  }
});
Object.defineProperty(exports, "HumDashManager", {
  enumerable: true,
  get: function get() {
    return _humDashManager.default;
  }
});
Object.defineProperty(exports, "StaticFooter", {
  enumerable: true,
  get: function get() {
    return _staticFooter.default;
  }
});
Object.defineProperty(exports, "StaticHeader", {
  enumerable: true,
  get: function get() {
    return _staticHeader.default;
  }
});

var _staticHeader = _interopRequireDefault(require("./header/staticHeader"));

var _staticFooter = _interopRequireDefault(require("./footer/staticFooter"));

var _googleTranslator = _interopRequireDefault(require("./common/googleTranslator"));

var _googleTagManager = _interopRequireDefault(require("./socialModules/googleTagManager"));

var _humDashManager = _interopRequireDefault(require("./socialModules/humDashManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }