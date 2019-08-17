"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n\ttype Alert {\n\t\tid: String!\n\t\ttype: String!\n\t\tdescription: String!\n\t\tuser: User\n\t\tlat: Float\n\t\tlong: Float\n\t\ttimeStamp: String\n\t\tgeo: String\n\t}\n\n\ttype Query {\n\t\tallAlerts: [Alert]!\n\t\talerts(districtName: String): [Alert!]!\n\t\ttypes(type: String): [Alert!]!\n\t}\n\n\ttype AlertResponse {\n\t\tok: Boolean!\n\t\talert: Alert\n\t\terrors: Error\n\t}\n\n\ttype Mutation {\n\t\tcreateAlert(type: String!, description: String, lat: Float, long: Float, geo: String, userId: String): AlertResponse!\n\t}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=alert.js.map