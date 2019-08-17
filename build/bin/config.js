"use strict";

var _require = require('./dbinfo.js'),
    username = _require.username,
    password = _require.password,
    hostname = _require.hostname,
    port = _require.port,
    alias = _require.alias;

module.exports = {
  port: process.env.PORT || 5000,
  db: "mongodb://".concat(username, ":").concat(password, "@").concat(hostname, ":").concat(port, "/").concat(alias),
  db_dev: "mongodb://localhost:27017/".concat(alias)
};
//# sourceMappingURL=config.js.map