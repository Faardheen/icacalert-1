"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _validateRegisterInput = _interopRequireDefault(require("../utils/validateRegisterInput.js"));

var _constants = require("../constants.js");

var _showErr = _interopRequireDefault(require("../utils/showErr.js"));

var _auth = require("../utils/auth.js");

var _default = {
  Mutation: {
    register: function () {
      var _register = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args) {
        var errMsg, email, phone, password, hashedPassword, currentUser, _ref, errors, isValid, user;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errMsg = '';
                email = args.email, phone = args.phone, password = args.password;
                _context.next = 4;
                return _bcrypt["default"].hash(password, 12);

              case 4:
                hashedPassword = _context.sent;
                _context.next = 7;
                return _User["default"].findOne({
                  email: email
                });

              case 7:
                currentUser = _context.sent;
                _context.next = 10;
                return (0, _validateRegisterInput["default"])(args);

              case 10:
                _ref = _context.sent;
                errors = _ref.errors;
                isValid = _ref.isValid;

                if (isValid) {
                  _context.next = 16;
                  break;
                }

                errMsg = errors.email || errors.password || errors.phone;
                return _context.abrupt("return", (0, _showErr["default"])(false, 'register', errMsg));

              case 16:
                if (!currentUser) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("return", (0, _showErr["default"])(false, 'register', _constants.USER_EXISTS));

              case 18:
                _context.prev = 18;
                _context.next = 21;
                return new _User["default"]({
                  email: email,
                  phone: phone,
                  password: hashedPassword
                }).save();

              case 21:
                user = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  user: user
                });

              case 25:
                _context.prev = 25;
                _context.t0 = _context["catch"](18);
                errMsg = _context.t0.name === _constants.VAL_ERR ? _constants.INV_NO : _constants.REG_ERR;
                return _context.abrupt("return", (0, _showErr["default"])(false, 'register', errMsg));

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[18, 25]]);
      }));

      function register(_x, _x2) {
        return _register.apply(this, arguments);
      }

      return register;
    }(),
    login: function login(_, _ref2, _ref3) {
      var email = _ref2.email,
          password = _ref2.password;
      var SECRET = _ref3.SECRET,
          SECRET2 = _ref3.SECRET2;
      return (0, _auth.tryLogin)(email, password, _User["default"], SECRET, SECRET2);
    }
  }
};
exports["default"] = _default;
//# sourceMappingURL=user.js.map