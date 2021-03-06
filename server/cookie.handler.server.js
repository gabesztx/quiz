'use strict';

const privatekey = 'lorem ipsum dolor secre key';
const encryptor = require('simple-encryptor')(privatekey);
//const loadsh = require('./../bower_components/lodash/lodash.min.js');


const cookieHandler = {
  setCookie: (req, res, userValue) => {
    res.cookie('quiz-token', cookieHandler.encodeSecretCookie(userValue));
    return this;
  },
  encodeSecretCookie: (value)=> {
    return encryptor.encrypt(value);
  },
  getCookie: (req) => {
    return cookieHandler.decodeSecretCookie(req.cookies['quiz-token']);
  },
  decodeSecretCookie: (value)=> {
    return encryptor.decrypt(value);
  },
  clearCookie: (res)=> {
    res.clearCookie('quiz-token');
    return this;
  }
};
module.exports = {
  'setCookie': cookieHandler.setCookie,
  'getCookie': cookieHandler.getCookie,
  'clearCookie': cookieHandler.clearCookie
};
