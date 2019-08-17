"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Alert = _interopRequireDefault(require("../models/Alert.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _showErr = _interopRequireDefault(require("../utils/showErr"));

var _constants = require("../constants");

var _districtNameFormatter = require("../utils/districtNameFormatter");

var _typeFormatter = require("../utils/typeFormatter");

var _axios = _interopRequireDefault(require("axios"));

var _default = {
  Query: {
    allAlerts: function () {
      var _allAlerts = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var alerts;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Alert["default"].find({}).populate("user");

              case 3:
                alerts = _context.sent;
                return _context.abrupt("return", alerts);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function allAlerts() {
        return _allAlerts.apply(this, arguments);
      }

      return allAlerts;
    }(),
    alerts: function () {
      var _alerts = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(_, _ref) {
        var districtName, _alerts2;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                districtName = _ref.districtName;
                _context2.prev = 1;
                _alerts2 = _Alert["default"].find({
                  geo: (0, _districtNameFormatter.districtNameFormatter)(districtName)
                }).populate("user");
                return _context2.abrupt("return", _alerts2);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](1);
                console.log(_context2.t0);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 6]]);
      }));

      function alerts(_x, _x2) {
        return _alerts.apply(this, arguments);
      }

      return alerts;
    }(),
    types: function () {
      var _types = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(_, _ref2) {
        var type, alerts;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                type = _ref2.type;
                _context3.prev = 1;
                alerts = _Alert["default"].find({
                  type: (0, _typeFormatter.typeFormatter)(type)
                }).populate("user");
                return _context3.abrupt("return", alerts);

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](1);
                console.log(_context3.t0);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 6]]);
      }));

      function types(_x3, _x4) {
        return _types.apply(this, arguments);
      }

      return types;
    }()
  },
  Mutation: {
    createAlert: function () {
      var _createAlert = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(_, _ref3, _ref4) {
        var type, description, lat, _long, userId, user, geoUrl, res, alert, currentUser, _currentUser;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                type = _ref3.type, description = _ref3.description, lat = _ref3.lat, _long = _ref3["long"], userId = _ref3.userId;
                user = _ref4.user;
                geoUrl = "http://www.geoplugin.net/extras/location.gp?lat=".concat(lat, "&lon=").concat(_long, "&format=json");
                _context4.next = 5;
                return _axios["default"].get(geoUrl);

              case 5:
                res = _context4.sent;
                _context4.prev = 6;
                _context4.next = 9;
                return new _Alert["default"]({
                  type: type,
                  description: description,
                  lat: lat,
                  "long": _long,
                  geo: res.data.geoplugin_region
                });

              case 9:
                alert = _context4.sent;

                if (!user) {
                  _context4.next = 23;
                  break;
                }

                _context4.next = 13;
                return _User["default"].findById(user.id);

              case 13:
                currentUser = _context4.sent;
                alert.user = currentUser;
                _context4.next = 17;
                return alert.save(alert);

              case 17:
                currentUser.alerts.push(alert);
                _context4.next = 20;
                return currentUser.save();

              case 20:
                return _context4.abrupt("return", {
                  ok: true,
                  alert: alert
                });

              case 23:
                _context4.next = 25;
                return _User["default"].findById(userId);

              case 25:
                _currentUser = _context4.sent;
                alert.user = _currentUser;
                _context4.next = 29;
                return alert.save(alert);

              case 29:
                _currentUser.alerts.push(alert);

                _context4.next = 32;
                return _currentUser.save();

              case 32:
                return _context4.abrupt("return", {
                  ok: true,
                  alert: alert
                });

              case 33:
                _context4.next = 38;
                break;

              case 35:
                _context4.prev = 35;
                _context4.t0 = _context4["catch"](6);
                return _context4.abrupt("return", (0, _showErr["default"])(false, "alert", _constants.ALERT_ERR));

              case 38:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[6, 35]]);
      }));

      function createAlert(_x5, _x6, _x7) {
        return _createAlert.apply(this, arguments);
      }

      return createAlert;
    }()
  }
};
exports["default"] = _default;
//# sourceMappingURL=alert.js.map