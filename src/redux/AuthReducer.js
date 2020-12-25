"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AuthAction = require("./AuthAction");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var authState = [];

var authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : authState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _AuthAction.authActionType.ADD:
      state.push(action.payload);
      return _toConsumableArray(state);

    case _AuthAction.authActionType.DELETE:
      state.splice(action.payload, 1);
      return _toConsumableArray(state);

    default:
      return state;
  }
};

var _default = authReducer;
exports["default"] = _default;