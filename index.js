// /*
// * File to start server * */

var express = require('express');
var app = express();
var port = 3000;
var _data = require('../my-demo/client/lib/data');
var bodyParser = require('body-parser');
var path = require('path');
var url = require('url');
// express.static('./src/index.js'); 
app.use(bodyParser.json()); // for parsing
// application/json
app.use(bodyParser.urlencoded({extended: true}));
// GET method route

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"))
});

app.get('/medicine/read', function (req, res) {
    var parsedurl = url.parse(req.url, true);
    var path = parsedurl.pathname;
    var requiredPath = path.replace(/^\/+|\/+$/g,'');
    _data
        .read('test', 'newFile', function (err, data) {
            // console.log('this was the error: ', err);
            console.log(req.method + ' ' + requiredPath + ' ' + res.statusCode);
        })
    return req.body;
})

// POST method route
app.post('/medicine/write', function (req, res) {
    var parsedurl = url.parse(req.url, true);
    var path = parsedurl.pathname;
    var requiredPath = path.replace(/^\/+|\/+$/g,'');
    _data.write('test', 'newFile', req.body, function (err) {
        // console.log('this was the error: ', err);
        console.log(err);
        console.log(req.method + ' ' + requiredPath + ' ' + res.statusCode);
    })
     res.send(req.body);
})

app.post('/medicine/update', function (req, res) {
    var parsedurl = url.parse(req.url, true);
    var path = parsedurl.pathname;
    var requiredPath = path.replace(/^\/+|\/+$/g,'');
    _data
        .update('test', 'newFile', req.body, function (err) {
            // console.log('this was the error: ', err);
            console.log(err);
            console.log(req.method + ' ' + requiredPath + '/' + req.body.Id + ' ' + res.statusCode);
        })
    res.send(req.body)
})

app.post('/medicine/delete', function (req, res) {
    var parsedurl = url.parse(req.url, true);
    var path = parsedurl.pathname;
    var requiredPath = path.replace(/^\/+|\/+$/g,'');
    _data
        .delete('test', 'newFile', req.body, function (err) {
            // console.log('this was the error: ', err);
            console.log(err);
            console.log(req.method + ' ' + requiredPath + '/' + req.body.Id + ' ' + res.statusCode);
        })
    res.send(req.body)
})

app.listen(port, () => console.log(`Medi app listening on port ${port}!`))

