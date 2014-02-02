var urlParse = require('url').parse;

function parse (redisURI) {
  var parsed = urlParse(redisURI);

  return {
    auth: parsed.auth,
    host: parsed.hostname,
    port: parseInt(parsed.port || 6379, 10),
    db: parseInt(parsed.pathname && parsed.pathname.substr(1) || 0, 10)
  };
}

function validate (redisURI) {
  var parsed = urlParse(redisURI);

  if (!parsed.protocol || parsed.protocol !== 'redis:') {
    throw new TypeError('A protocol must be specified in the Redis URI connection scheme (e.g. redis:)');
  }

  if (!parsed.hostname) {
    throw new TypeError('A hostname must be specified in the Redis URI connection scheme (e.g. redis://localhost)');
  }

  return redisURI;
}

module.exports = {};
module.exports.parse = parse;
module.exports.validate = validate;
