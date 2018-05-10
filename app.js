var express = require('express');
var faker = require('faker');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var  app = express();

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  port: '8080',	
  host: "localhost",
  user: "root",
  password: "root",
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  database: 'mydb'
});

app.post('/register',function(req,res){
	var entry = {
		name: req.body.name,
		address: req.body.address
	}
	connection.query('INSERT INTO customers SET ?',entry, function(err,results){
		if (err) throw err;
		console.log('results');
		res.redirect('/');	
	});

})

app.get('/' ,function(req,res){
	var q = 'SELECT COUNT(*) AS count from customers';
	connection.query(q,function(err,results){
		if (err) throw err;
		var count = results[0].count;
		// res.send('We have ' +count+ ' users!');
		res.render('home',{data:count});
	});
	
});

app.get('/foo' ,function(req,res){
	res.send('Hello from our FOO!!!');
});

app.listen(8080,function(){
	console.log('App is ready...');
});
