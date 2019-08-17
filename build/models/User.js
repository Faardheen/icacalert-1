"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  },
  alerts: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Alert'
  }]
});

var _default = (0, _mongoose.model)('User', UserSchema);

exports["default"] = _default;
//# sourceMappingURL=User.js.map