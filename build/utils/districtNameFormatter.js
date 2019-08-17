"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.districtNameFormatter = void 0;

var districtNameFormatter = function districtNameFormatter(districtName) {
  var namesArr = [];
  districtName.split("+").forEach(function (n) {
    var name = n.substring(0, 1).toUpperCase() + n.substring(1, n.length);
    namesArr.push(name);
  });
  return namesArr.join(" ");
};

exports.districtNameFormatter = districtNameFormatter;
//# sourceMappingURL=districtNameFormatter.js.map