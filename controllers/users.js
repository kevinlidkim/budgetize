var queryString = require('querystring');
var https = require('https');

// Token Endpoint
var hostUrl = "hack.softheon.io";
var tokenEndpointPath = "/api/identity/core/connect/token";

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
            // console.log("Response:")
            // console.log(chunk);
            var access_token = JSON.parse(chunk).access_token;
            // a_c = chunk;
            // callback(user, chunk, response);
            return response.status(200).json({
              access_token: access_token,
              status: 'Logged in successfully',
              user: user
            })
        });
    });

    postRequest.write(postData);
    postRequest.end();

    // console.log(a_c);
    // return a_c;
    // callback(user, a_c, response);
}

exports.login = function(req, res) {

  if (req.body.username == "kev" && req.body.password == "abc") {
    // get softheon access token
    return requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope, req.body.username, res);
    
      // return res.status(200).json({
      //   status: 'Logged in successfully',
      //   user: req.body.username
      // })
  } else {
    return res.status(500).json({
      status: 'Could not log in user'
    });
  }
}


// function callback(user, token, res) {

//   console.log('callback');
//   console.log(token);

//   return res.status(200).json({
//     access_token: token,
//     status: 'Logged in successfully',
//     user: user
//   })
// }

// exports.login = function(req, res) {

//   if (req.body.username == "kev" && req.body.password == "abc") {
//     // get softheon access token
//     return requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope)
//       .then(function(obj) {
//         console.log(obj);
//         return res.status(200).json({
//           access_token: obj.access_token,
//           status: 'Logged in successfully',
//           user: req.body.username
//         })
//       })
//       .catch(function(err) {
//         return res.status(500).json({
//           status: 'Failed to retrieve access token'
//         })
//       })
//   } else {
//     return res.status(500).json({
//       status: 'Could not log in user'
//     });
//   }
// }

// exports.login = function(req, res) {

//   if (req.body.username == "kev" && req.body.password == "abc") {
//     // get softheon access token
//     var promise = new Promise(function(resolve, reject) {
//       var res = requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope);
//       if (res) {
//         resolve(res);
//       } else {
//         reject("what went wrong");
//       }
//     });

//     promise.then(function(result) {
//       console.log(result);
//       console.log('yo');
//     }, function(err) {
//       console.log(err);
//       console.log('boo');
//     })


//   } else {
//     return res.status(500).json({
//       status: 'Could not log in user'
//     });
//   }
// }

// exports.login = function(req, res) {

//   if (req.body.username == "kev" && req.body.password == "abc") {
//     // get softheon access token
//     var promise = [];
//     promise.push(requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope));
//     Promise.all(promise)
//       .then(function(obj) {
//         console.log(obj);
//         return res.status(200).json({
//           access_token: obj.access_token,
//           status: 'Logged in successfully',
//           user: req.body.username
//         })
//       })
//       .catch(function(err) {
//         return res.status(500).json({
//           status: 'Failed to retrieve access token'
//         })
//       })
//   } else {
//     return res.status(500).json({
//       status: 'Could not log in user'
//     });
//   }
// }

// exports.login = function(req, res) {

//   if (req.body.username == "kev" && req.body.password == "abc") {
//     // get softheon access token
//     var obj = requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope);
//     console.log(obj);
//     console.log("YOOO");
//     console.log(obj.access_token);
//       return res.status(200).json({
//         access_token: obj.access_token,
//         status: 'Logged in successfully',
//         user: req.body.username
//       })
//   } else {
//     return res.status(500).json({
//       status: 'Could not log in user'
//     });
//   }
// }

// exports.login = function(req, res) {

//   if (req.body.username == "kev" && req.body.password == "abc") {
//     // get softheon access token
//     return requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope)
//       .then(function(obj) {
//         console.log(obj);
//         return res.status(200).json({
//           access_token: obj.access_token,
//           status: 'Logged in successfully',
//           user: req.body.username
//         })
//       })
//       .catch(function(err) {
//         return res.status(500).json({
//           status: 'Failed to retrieve access token'
//         })
//       })
//   } else {
//     return res.status(500).json({
//       status: 'Could not log in user'
//     });
//   }
// }