"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeFormatter = void 0;

var typeFormatter = function typeFormatter(type) {
  var namesArr = [];
  type.split("+").forEach(function (n) {
    namesArr.push(n);
  });
  namesArr[0].charAt(0).toUpperCase();
  namesArr[0] = namesArr[0].charAt(0).toUpperCase() + namesArr[0].slice(1);
  return namesArr.join(" ");
};

exports.typeFormatter = typeFormatter;
//# sourceMappingURL=typeFormatter.js.map