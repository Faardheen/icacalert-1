"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showErr = void 0;

var showErr = function showErr(ok, path, message) {
  return {
    ok: ok,
    errors: {
      path: path,
      message: message
    }
  };
};

exports.showErr = showErr;
//# sourceMappingURL=showErr.js.map