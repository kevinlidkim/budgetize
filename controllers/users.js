var queryString = require('querystring');
var https = require('https');
var $ = require('jQuery');


// Token Endpoint
var hostUrl = "hack.softheon.io";
var tokenEndpointPath = "/api/identity/core/connect/token";
var creditcardEndpointPath = '/api/payments/v1/creditcards';
var enterpriseEndpointPath = '/api/enterprise';
var paymentEndpoint = '/api/payments/v1/payments'
// var creditcardEndpoint = 'https://hack.softheon.io/api/payments/v1/creditcards'

// Example Client Credentials
var clientId = "hack002";
var clientSecret = "hack002";
var scope = "paymentapi enterpriseapi";

function encodeClientCredentials (clientId, clientSecret) {
    var clientCredentials = clientId + ':' + clientSecret;
    return new Buffer(clientCredentials).toString('base64');
}

// requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope);
function requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope, user, response) {
  // var a_c = "";

  var encodedClientCredentials = encodeClientCredentials(clientId, clientSecret);
  // Set the post data
  var postData = queryString.stringify({
      'grant_type' : 'client_credentials',
      'scope' : scope    
  });
  // Set the post options
  var postOptions = {
      host: hostUrl,
      port: '443',
      path: tokenEndpointPath,
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
          'Authorization': 'Basic ' + encodedClientCredentials
      }
  };
  // Set the post request
  var postRequest = https.request(postOptions, function(res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk){
          var access_token = JSON.parse(chunk).access_token;
          return response.status(200).json({
            access_token: access_token,
            status: 'Logged in successfully',
            user: user
          })
      });
  });

  postRequest.write(postData);
  postRequest.end();

}

exports.login = function(req, res) {

  if (req.body.username == "kev" && req.body.password == "abc") {
    // get softheon access token
    return requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope, req.body.username, res);
  } else {
    return res.status(500).json({
      status: 'Could not log in user'
    });
  }
}


function getCreditcardToken(creditcard, access_token, response, budget) {

  var stringCreditcard = JSON.stringify(creditcard);

  // Set the post options
  var postOptions = {
      host: hostUrl,
      port: '443',
      path: creditcardEndpointPath,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token
      }
  };
  // Set the post request
  var postRequest = https.request(postOptions, function(res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        var payment_token = JSON.parse(chunk).token;
        if (payment_token) {
          return response.status(200).json({
            payment_token: payment_token,
            status: 'Saved card',
            budget: budget
          })
        } else {
          return response.status(500).json({
            status: 'Invalid card',
            budget: ''
          })
        }
      });
  });

  postRequest.write(stringCreditcard);
  postRequest.end();

}

exports.saveCard = function(req, res) {

  var obj = {
    cardNumber: req.body.creditcard,
    securityCode: req.body.cvn,
    expirationMonth: req.body.month,
    expirationYear: req.body.year,
    cardHolderName: req.body.owner,
    billingAddress: req.body.billingAddress,
    test: req.body.billingAddress,
    email: req.body.email
  }

  // hit softheon api to get credit card token
  if (req.body.creditcard != "") {
    // return res.status(200).json({
    //   status: 'Saved card'
    // });
    return getCreditcardToken(obj, req.body.access_token, res, req.body.budget);
  } else {
    return res.status(500).json({
      status: 'Could not save card'
    });
  }
}


function payCreditcardToken(payment_obj, access_token, response) {

  var payment = JSON.stringify(payment_obj);
  // Set the post options
  var postOptions = {
      host: hostUrl,
      port: '443',
      path: paymentEndpoint,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + access_token
      }
  };
  // Set the post request
  var postRequest = https.request(postOptions, function(res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('chunk');
        console.log(chunk);
      });
  });

  postRequest.write(payment);
  postRequest.end();

}

exports.purchase = function(req, res) {

  // console.log(req.body);

  var paymentMethod = {
    PaymentToken: req.body.payment_token,
    Type: "Credit Card"
  }
  var payment = {
    PaymentAmount: Number(req.body.price.replace(/[^0-9\.]+/g,"")),
    Description: req.body.item,
    PaymentMethod: paymentMethod
  }

  if (req.body.access_token != "" && req.body.payment_token != "") {
    return payCreditcardToken(payment, req.body.access_token, res);
  }
}
