const jwksRsa = require('jwks-rsa');
const expressJwt = require('express-jwt');
const RSA_PUBLIC_KEY = require('./JWT').RSA_PUBLIC_KEY;

const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ['sha1', 'RS256', 'HS256']
});

module.exports.checkIfAuthenticated = checkIfAuthenticated;