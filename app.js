const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const log = require('log-to-file');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/',function(req, res, next) {
	log(JSON.stringify(req.body), 'requests.log');
	console.log(req.body);
	res.status(200).json({});
});
module.exports = app;
