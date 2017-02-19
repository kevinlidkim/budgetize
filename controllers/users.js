var queryString = require('querystring');
var https = require('https');


// Token Endpoint
var hostUrl = "hack.softheon.io";
var tokenEndpointPath = "/api/identity/core/connect/token";
var creditcardEndpointPath = '/api/payments/v1/creditcards';
var enterpriseEndpointPath = '/api/enterprise';
var paymentEndpoint = '/api/payments/v1/payments'
var folderEndpoint = '/api/enterprise/content/v1/folder'
var templateEndpoint = '/api/enterprise/template/v1/ftl'

var my_type = 20462;


// Example Client Credentials
var clientId = "hack002";
var clientSecret = "hack002";
var scope = "paymentapi enterpriseapi";


function encodeClientCredentials (clientId, clientSecret) {
    var clientCredentials = clientId + ':' + clientSecret;
    return new Buffer(clientCredentials).toString('base64');
}

function insertEntity(token, payment, user) {

  // console.log("INSERTING");
  // console.log(user);

  var folder = {
    "Acl": -1,
    "Type": my_type,
    "Name": "Purchased " + payment['Description'] + " for $" + parseInt(payment['PaymentAmount']),
    "Profiles": [
      {
        "Acl": -1,
        "Type": 1,
        "Strings": [
          user, payment['Description']
        ],
        "Integers": [
          payment['PaymentAmount']
        ],
        "Doubles": [
        ],
        "Dates": [
        ]
      }
    ]
  };

  // Set the post options
  var postOptions = {
      host: hostUrl,
      port: '443',
      path: folderEndpoint + "/2",
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  };
  // Set the post request
  var postRequest = https.request(postOptions, function(res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('create new entity chunk');
        console.log(chunk);
      });
  });

  postRequest.write(JSON.stringify(folder));
  postRequest.end();

}


function insertTemplate(token) {

  var template = {
    "Category": "Common",
    "Type": my_type,
    "Name": "Transactions",
    "Profiles": [
      {
        "Type": 1,
        "Name": "Item",
        "Fields": [
          {
            "Name": "Customer",
            "Type": "String",
            "Index": 0,
            "Position": 0,
            "Length": 255
          },
          {
            "Name": "Item Name",
            "Type": "String",
            "Index": 1,
            "Position": 1,
            "Length": 255
          },
          {
            "Name": "Price",
            "Type": "Integer",
            "Index": 0,
            "Position": 0
          }
        ]
      }
    ],
    "Drawers": [2]
  }

  // Set the post options
  var postOptions = {
      host: hostUrl,
      port: '443',
      path: templateEndpoint,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  };
  // Set the post request
  var postRequest = https.request(postOptions, function(res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('create new template chunk');
        console.log(chunk);
      });
  });

  postRequest.write(JSON.stringify(template));
  postRequest.end();

}

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

          // Create a template for current user
          insertTemplate(access_token);

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


function payCreditcardToken(access_token, payment_obj, response, user) {

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
        console.log('payment with payment_token chunk');
        console.log(chunk);
        var auth = JSON.parse(chunk).result.status;

        // STORE TRANSACTION TO SOFTHEON API
        insertEntity(access_token, payment_obj, user);

        if (auth == 'Authorized') {
          return response.status(200).json({
            status: 'Successful transaction',
            data: JSON.parse(chunk)
          })
        } else {
          return response.status(200).json({
            status: 'Unsuccessful transaction'
          })
        }
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
    return payCreditcardToken(req.body.access_token, payment, res, req.body.user);
  } else {
    return res.status(500).json({
      status: 'Unknown access token or payment token'
    })
  }
}

exports.getTransactions = function(req, res) {
  if (req.body.access_token != "" && req.body.user != "") {
    return getEntities(req.body.access_token, req.body.user, res);
  } else {
    return res.status(500).json({
      status: 'Unknown transaction access token or user'
    })
  }
}

function getEntities(token, user, response) {

  // console.log(user);

  // Set the post options
  var getOptions = {
      host: hostUrl,
      port: '443',
      path: folderEndpoint + "?drawerID=2&type=" + my_type,
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      }
  };
  // Set the post request
  var getRequest = https.request(getOptions, function(res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('get entities chunk');
        console.log(chunk);
        return response.status(200).json({
          status: 'Successful transaction',
          data: JSON.parse(chunk)
        })
      });
  });

  getRequest.end();

}
