"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _config = require("./bin/config.js");

var _path = _interopRequireDefault(require("path"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _auth = require("./utils/auth.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require('dotenv').config();

var SECRET = process.env.SECRET;
var SECRET2 = process.env.SECRET2;
var typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)((0, _mergeGraphqlSchemas.fileLoader)(_path["default"].join(__dirname, './schema')));
var resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)((0, _mergeGraphqlSchemas.fileLoader)(_path["default"].join(__dirname, './resolvers')));

var startServer = function startServer() {
  var app = (0, _express["default"])();
  app.use((0, _cors["default"])('*'));
  app.use(_express["default"]["static"]('dist'));

  if (process.env.NODE_ENV === 'production') {
    app.get('*', function (req, res) {
      res.sendFile(_path["default"].resolve('dist', 'index.html'));
    });
  }

  var addUser =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      var token, _jwt$verify, user, refreshToken, newTokens;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers['x-token'];

              if (!token) {
                _context.next = 15;
                break;
              }

              _context.prev = 2;
              _jwt$verify = _jsonwebtoken["default"].verify(token, SECRET), user = _jwt$verify.user;
              req.user = user;
              _context.next = 15;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](2);
              refreshToken = req.headers['x-refresh-token'];
              _context.next = 12;
              return (0, _auth.refreshTokens)(token, refreshToken, SECRET, SECRET2);

            case 12:
              newTokens = _context.sent;

              if (newTokens.token && newTokens.refreshToken) {
                res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
                res.set('x-token', newTokens.token);
                res.set('x-refresh-token', newTokens.refreshToken);
              }

              req.user = newTokens.user;

            case 15:
              next();

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 7]]);
    }));

    return function addUser(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  app.use(addUser);

  _mongoose["default"].connect(_config.db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }, function (err, res) {
    if (err) {
      console.log('mongodb failed to connect');
      console.log(err);
    } else {
      console.log('connection success');
    }
  });

  new _apolloServerExpress.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: function context(_ref2) {
      var req = _ref2.req;
      return {
        SECRET: SECRET,
        SECRET2: SECRET2,
        user: req.user
      };
    }
  }).applyMiddleware({
    app: app
  });
  app.listen({
    port: _config.port
  }, function () {
    console.log("Server runnning on port ".concat(_config.port));
  });
};

startServer();
//# sourceMappingURL=server.js.map