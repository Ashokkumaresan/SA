var gre=require('./modules');
var emitter=require('events');
var uti=require('util');
var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var projects=require('./models/projects');
var dairies=require('./models/dairy');

mongoose.connect('mongodb://localhost/SA');
var db=mongoose.connection;
var schema=mongoose.Schema;
var studentschema=new schema({
	firstname:String,
	lastname:String,
	age:String,
	education:String
});
var student=mongoose.model('student',studentschema);
var urlencparse=bodyParser.urlencoded({extended:false});
gre.student("Trisha");
gre.department("Movie");
var emi=new emitter();
emi.on("first",function(){
console.log("First EMitter message");
});
emi.on("first",function(){
console.log("Second EMitter message");
});
emi.emit("first");

function one(){
	this.greeting="Demo for inheritance";
}

uti.inherits(one,emitter);

one.prototype.message=function(){
	console.log(this.greeting);
	this.emit("showmsg",this.greeting);;
}
var two=new one();
two.on("showmsg",function(s){
console.log("Displaying from inherted function "+s);
});
two.message();


var company=function(){
	this.comname="Hotshotsolutions";
	this.members=3;
}
company.prototype.showcompany=function(){
	console.log(`Our company ${this.comname} members are ${this.members}`);
}
var life=function(){
	company.call(this);
	this.career="Developer";
}
uti.inherits(life,company);
var ashok=new life();
ashok.showcompany();
var app=new express();
var port=process.env.PORT || 3000;

//app.use('/public',express.static(__dirname + '/assets'));
app.use('/',express.static(__dirname + '/pages'));
//app.set('view engine','ejs');
app.get('/',function(req,res){
       console.log(req);
   //  res.sendFile('index.html');

});

app.get('/api/projects',function(req,res){
	projects.getProjects(function(err,project){
		if(err)
			res.send("Error while retreving data");
		else 
			res.json(project);
	});
});

app.get('/api/dairy',function(req,res){
	dairies.getDairy(function(err,dairy){
		if(err)
			res.send('Error while retreving data');
		else
			res.json(dairy);
	});
});

/*app.get('/login',function(req,res){
       console.log(req);
     res.sendFile('login.html');

});
app.use('/',function(req,res,next){
console.log("Request url: "+req.url);
student.find({},function(err,data){
	if (err) throw err;
	data.forEach(function(value){
		console.log(value);
	});	
});
next();
});

app.get('/',function(req,res){
res.render("index",{ID:""});
});
app.get('/api',function(req,res){
	res.json({firstname:"Ashok",lastname:"Kumaresan"});
});
app.get('/student/:id',function(req,res){
res.render("index",{ID:req.params.id,Name:req.query.name});
});
app.post('/student',urlencparse,function(req,res){

res.send("Thank you!!");
console.log(req.body.firstname);
console.log(req.body.lastname);
//res.sendStatus(400);
});*/
app.listen(port);
