redisuri
========

Validate and parse Redis URI connection schemes


### Redis URI Connection Scheme

The URI connection scheme expects the following parameters:

- `redis://`: **Required.** A protocol prefix to indentifying this as URI connection format.
- `auth@`: Optional. If specified, [AUTH password](http://redis.io/commands/AUTH) used to connect to the redis database.
- `host`: **Required.** A network location (e.g. hostname or IP address) of the redis server.
- `:port`: Optional. The server port assigned to the redis process. Defaults to `6379`.
- `/database`: Optional. An available redis database number. Defaults to `0`.


### API

**parse(uri)**

Parse the passed `uri` into an object containing four properties: `auth`, `host`, `port`, `db`. Note that if no AUTH password is provided, the `auth` property is set to `null`.

```
var redisuri = require('redisuri');

console.log(redisuri.validate('redis://localhost:6379'));
// => { auth: null, host: 'localhost', port: 6379, db: 0 }

console.log(redisuri.validate('redis://authstring@192.168.1.1:6379/7'));
// => { auth: authstring, host: '192.168.1.1', port: 6379, db: 7 }
```

**validate(uri)**

Ensures that the passed `uri` contains the `redis:` protocol and specifies a hostname. Throws a `TypeError` if either condition fails. If successful, returns the passed uri for convienient chaining with `redisURI.parse`.

```
var redisuri = require('redisuri');

var uri = 'redis://localhost:6379';
var bad = 'localhost';

console.log(redisuri.validate(uri));
// => 'redis://localhost:6379'

console.log(redisuri.validate(bad));
// => TypeError: A protocol must be specified in the Redis URI connection scheme (e.g. redis:)
```

### Tests

```
npm test
```

### Contribute

PRs are welcome! For bugs, please include a failing test which passes when your PR is applied.
