/*var privatekey = 'lorem ipsum dolor secre key';
var encryptor = require('simple-encryptor')(privatekey);
var obj = {name:'meszi:_12'};
var encrypted = encryptor.encrypt(obj);
//console.log(encrypted);
var objDec = encryptor.decrypt(encrypted);
//console.log(objDec);*/

const cookieHandler = (app)=> {
  //console.log(req.signedCookies['name']);
};
module.exports = (app)=> {
  cookieHandler(app);
};
