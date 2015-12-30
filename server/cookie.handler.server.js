'use strict';

const privatekey = 'lorem ipsum dolor secre key';
const encryptor = require('simple-encryptor')(privatekey);

//var obj = {name: 'meszi:_12'};


const cookieHandler = {
  setSecretCookie: (value)=> {
    const randomSecret = value + parseInt(Math.random() * 100);
    const encrypted = encryptor.encrypt(randomSecret);
    return encrypted;
    //console.log(encryptor.decrypt(encrypted));
    //console.log(req.signedCookies['name']);
  },
  getSecretCookie: ()=> {
    //console.log(req.signedCookies['name']);
  }
};

module.exports = {
  'setSecretCookie': cookieHandler.setSecretCookie,
  'getSecretCookie': cookieHandler.getSecretCookie
};
