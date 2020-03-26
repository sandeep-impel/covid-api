const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const log = require('log-to-file');
const router = express.Router();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.get('/',function(req,res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/',function(req, res, next) {
	log(JSON.stringify(req.body), 'requests.log');
	console.log(req.body);
	res.status(200).json({});
});
app.use('/', router);
module.exports = app;
