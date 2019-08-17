"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var AlertSchema = new _mongoose.Schema({
  type: {
    type: String,
    required: true,
    "default": ''
  },
  description: {
    type: String,
    required: false,
    "default": 'no description provided'
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lat: {
    type: Number,
    "default": 0
  },
  "long": {
    type: Number,
    "default": 0
  },
  timeStamp: {
    type: Date,
    "default": new Date().getTime()
  },
  geo: {
    type: String,
    "default": 'Port-Louis',
    required: false
  }
});

var _default = (0, _mongoose.model)('Alert', AlertSchema);

exports["default"] = _default;
//# sourceMappingURL=Alert.js.map