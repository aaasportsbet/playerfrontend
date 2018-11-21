

var express = require('express')
var apiRoutes = express.Router();

var home = require('./mockdata/home.json');
var personal = require('./mockdata/personal.json');



apiRoutes.get('/home', function (req, res) {
	res.json(home);
});


apiRoutes.get('/personal', function (req, res) {
	res.json(personal);
});



module.exports = apiRoutes;
