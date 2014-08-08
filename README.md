redisuri
========

Validate and parse Redis URI connection schemes


### Redis URI Connection Scheme

The URI connection scheme expects the following parameters:

| Component   | Required?    | Description |
| :---------- | :----------- | :---------- |
| `redis://`  | **Required** | A protocol prefix to indentifying this as URI connection format |
| `auth@`     |              | [AUTH password](http://redis.io/commands/AUTH) to connect to the redis instance |
| `host`      | **Required** | A network location (e.g. hostname or IP address) of the redis server |
| `:port`     |              | The server port assigned to the redis process; defaults to `6379` |
| `/database` |              | An available redis database number; defaults to `0` |


### API

**parse(uri)**

Parse the passed `uri` into an object containing four properties: `auth`, `host`, `port`, `db`. Note that if no AUTH password is provided, the `auth` property is set to `null`.

```
var redisuri = require('redisuri');

console.log(redisuri.parse('redis://localhost:6379'));
// => { auth: null, host: 'localhost', port: 6379, db: 0 }

console.log(redisuri.parse('redis://authstring@192.168.1.1:6379/7'));
// => { auth: authstring, host: '192.168.1.1', port: 6379, db: 7 }
```

**validate(uri)**

Ensures that the passed `uri` contains the `redis:` protocol and specifies a hostname. Throws a `TypeError` if either condition fails. If successful, returns the uri for convienient wrapping with `parse`.

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

Production ready. To run the full unit test suite:

```
npm test
```


### Contribute

PRs are welcome! For bugs, please include a failing test which passes when your PR is applied.
