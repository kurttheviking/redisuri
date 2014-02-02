var chai = require('chai');
var should = chai.should();

var redisURI = require('./index');


describe('redisURI ->', function () {
  var authURI = 'redis://authcode@192.168.1.1:7379/8';
  var unauthURI = 'redis://localhost:9379/10';

  var goodURIs = [
    authURI,
    unauthURI,
    'redis://192.168.1.1:7379',
    'redis://authcode@redis.myapp.com',
    'redis://redis.myapp.com:7379',
    'redis://redis.myapp.com/8'
  ];

  var badURIs = [
    'authcode@192.168.1.1:7379/8',
    'localhost',
    'redis',
    ' ',
    ''
  ];

  it('validates good redis uris', function () {
    goodURIs.forEach(function (_uri) {
      chai.expect(function () { return redisURI.validate(_uri); }).to.not.throw(Error);
    });
  });

  it('throws on bad redis uris', function () {
    badURIs.forEach(function (_uri) {
      chai.expect(function () { return redisURI.validate(_uri); }).to.throw(TypeError);
    });
  });

  it('parses uri components into redis parameters', function () {
    var connAuth = redisURI.parse(authURI);
    chai.expect(connAuth.auth).to.equal('authcode');
    chai.expect(connAuth.host).to.equal('192.168.1.1');
    chai.expect(connAuth.port).to.equal(7379);
    chai.expect(connAuth.db).to.equal(8);

    var connUnauth = redisURI.parse(unauthURI);
    chai.expect(connUnauth.auth).to.be.null;
    chai.expect(connUnauth.host).to.equal('localhost');
    chai.expect(connUnauth.port).to.equal(9379);
    chai.expect(connUnauth.db).to.equal(10);
  });
});
