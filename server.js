/**
 * Created by Bryan on 11/27/2017.
 */
const express = require('express'),
      path = require('path');

app = new express();

let port = process.env.PORT || 8080;

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin');
    res.header("Access-Control-Max-Age", "86400"); // 24 hours

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

// app.use(allowCrossDomain);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname + 'public/index.html'));
});

app.get('/env', (req, res) => {
  res.json(process.env);
});

app.listen(port, (err) => {
    if(err) {
        console.log('error starting tsr manager station');
        console.log(err);
    }
   console.log(`listening on port ${port}`);
});
