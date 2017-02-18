require('babel-register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var _ = require('underscore');

var routes = require('./app/routes');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});


var queryString = require('querystring');
var https = require('https');

// Token Endpoint
var hostUrl = "developer.softheon.com";
var tokenEndpointPath = "/IdentityServer3.WebHost/core/connect/token";

// Example Client Credentials
var clientId = "hack002";
var clientSecret = "hack002";
var scope = "identity";

app.post('/api/request_access', function(req, res) {
  requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope);
})

// requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope);
function requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope) {

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
            console.log("Response:")
            console.log(chunk);
        });
    });

    postRequest.write(postData);
    postRequest.end();
}




var server = require('http').createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
