const { username, password, hostname, port, alias } = require('./dbinfo.js');
const { SECRET, SECRET2 } = require('./secrets.js');

module.exports = {
	port: process.env.PORT || 5000,
	db: `mongodb://${username}:${password}@${hostname}:${port}/${alias}`,
	db_dev: `mongodb://localhost:27017/${alias}`,
	SECRET,
	SECRET2
}