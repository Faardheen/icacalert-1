"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Validator = require('validator');

var isEmpty = require('is-empty');

var _default = function _default(data) {
  var errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email address is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, {
    min: 6,
    max: 30
  })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Please include your phone number';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

exports["default"] = _default;
//# sourceMappingURL=validateRegisterInput.js.map