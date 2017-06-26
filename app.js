var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var mongo=require('mongodb');
var emitter=require('events');
var uti=require('util');
var gre=require('./modules');
var app= express();
app.use(bodyParser.json());
var urlencparse=bodyParser.urlencoded({extended:false});
var port=process.env.PORT || 3000;
app.use('/',express.static(__dirname + '/pages'));
app.use(express.static(__dirname));

app.use(require('./routes/index'));




app.listen(port);
