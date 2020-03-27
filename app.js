const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const log = require('log-to-file');
const router = express.Router();
const unirest = require('unirest');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const logRequestStart = (req, res, next) => {
    res.on('finish', () => {
        console.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
    })    
    next();
}

app.use(logRequestStart);

router.get('/',function(req,res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/',function(req, res, next) {
	// req.body["custom_fields"] = {
	// 	"location" : req.body.location
	// };

	log(JSON.stringify(req.body), 'requests.log');

	var API_KEY = "AvcKRaWqL1yUfP6sImn";
	var FD_ENDPOINT = "coronawarriors";
	
	var PATH = "/api/v2/tickets";
	var URL =  "https://" + FD_ENDPOINT + ".freshdesk.com"+ PATH;
	
	var fields = {
		'email': req.body.email,
		'subject': req.body.subject,
		'description': req.body.message,
		'custom_fields': {
			"cf_phone_number": parseInt(req.body.phone),
			"cf_city": req.body.city
		},
		'status': 2,
		'priority': 4,
		'group_id': 81000101084
	}
	
	var Request = unirest.post(URL);
	
	Request.auth({
		user: API_KEY,
		pass: "X",
		sendImmediately: true
	})
	.type('json')
	.send(fields)
	.end(function(response) {
		console.log(response.body)
		console.log("Response Status : " + response.status)
		if(response.status == 201) {
			console.log("Location Header : "+ response.headers['location'])
		}
		else{
			console.log("X-Request-Id :" + response.headers['x-request-id']);
		}
	});
	
	res.sendFile(path.join(__dirname+'/success.html'));
});
app.use('/', router);
module.exports = app;