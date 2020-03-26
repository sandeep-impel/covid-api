const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/',function(req, res, next) {
	console.log(req.body);
	res.status(200).json({});
});
module.exports = app;
