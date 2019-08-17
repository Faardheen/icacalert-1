"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n\ttype Query {\n\t\tdummy: String\n\t}\n\ttype User {\n\t\tid: Int!\n\t\temail: String!\n\t\tpassword: String!\n\t\tphone: String!\n\t\talerts: [Alert!]!\n\t}\n\n\ttype RegisterResponse {\n\t\tok: Boolean!\n\t\tuser: User\n\t\terrors: Error\n\t}\n\n\ttype LoginResponse {\n\t\tok: Boolean!\n\t\tuser: User\n\t\ttoken: String\n\t\trefreshToken: String\n\t\terrors: Error\n\t}\n\n\ttype Mutation {\n\t\tregister(\n\t\t\temail: String!\n\t\t\tpassword: String!\n\t\t\tphone: String!\n\t\t): RegisterResponse!\n\t\tlogin(email: String!, password: String!): LoginResponse!\n\t}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _apolloServerExpress.gql)(_templateObject());

exports["default"] = _default;
//# sourceMappingURL=user.js.map