'use strict';

const privatekey = 'lorem ipsum dolor secre key';
const encryptor = require('simple-encryptor')(privatekey);
//const loadsh = require('./../bower_components/lodash/lodash.min.js');


const cookieHandler = {
  setCookie: (req, res, userValue) => {
    //console.log('ADD COOOKIE', userValue.id);
    res.cookie('quiz-token', cookieHandler.encodeSecretCookie(userValue.id));

  },
  encodeSecretCookie: (value)=> {
    return encryptor.encrypt(value);
  },
  getCookie: (req) => {
    //console.log('GET COOOKIE', cookieHandler.decodeSecretCookie(req.cookies['quiz-token']));
    return cookieHandler.decodeSecretCookie(req.cookies['quiz-token']);
  },
  decodeSecretCookie: (value)=> {
    return encryptor.decrypt(value);
  },
  clearCookie: (res)=> {
    res.clearCookie('quiz-token');
  }
};
module.exports = {
  'setCookie': cookieHandler.setCookie,
  'getCookie': cookieHandler.getCookie,
  'clearCookie': cookieHandler.clearCookie
};
