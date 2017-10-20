var express = require('express');
var User = require('./models/user.js'); 
var app = express();
var mongoose = require('mongoose');
var dateTime = require('node-datetime');
var path = require('path');
mongoose.connect('mongodb://test:test@ds049486.mlab.com:49486/to_do');
app.use('/', express.static(path.join(__dirname, 'views')));

app.get('/',function(req,res){
  res.sendFile('index.html');
}
);
app.get('/api/imagesearch/:search', function(req, res, next){

res.redirect('https://www.googleapis.com/customsearch/v1/?key=AIzaSyAtAnTqxkpsZ8xZwmOTTvAhjP3bGZsvSuM&cx=005043962408257534056:dfhagqtvqps&q='+req.params.search+'&offset='+req.query.offset+'&searchType=image');

var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
console.log(formatted);
var newUser =new User();
newUser.local.term = req.params.search;
		newUser.local.when = formatted;
		console.log(newUser.local.term + " " + newUser.local.when);
		newUser.save(function(err){
			if(err)
				throw err;
		});
});
app.get('/api/latest/imagesearch/', function(req, res, next){

var query = User.find({}, null, {limit: 10, sort: {'epoch': -1}});
query.exec(function(err, docs) { res.send(docs); });
});
 
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
