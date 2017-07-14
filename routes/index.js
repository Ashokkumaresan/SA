var express=require('express');
var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var router=express.Router();
var mongo=require('mongodb');
router.use(bodyParser.json());
router.use(cookieParser());
router.use(session({secret: "hotshot"}));

/*Start Login service*/
router.get('/api/login',function(req,res){
	var query=req.query;
	console.log(query);
	MongoClient=mongo.MongoClient;
	var url='mongodb://localhost/SA';
	MongoClient.connect(url,function(err,db){
		if(err){
			console.log("Error in connecting database");
		}
		else{
			var collection=db.collection("login");
			collection.find(query).toArray(function(err,result){
				if(err){
					console.log("Error is getting data "+err);
				}
				else{					
					//res.json(result.length);
					if(result.length>0){
							if(!req.session.User){
								req.session.User=[];
								req.session.User=result;
							}
							var data = 'dashboard.html';
							res.header('Content-Length', data.length);
							var obj={"status":true,"loc":data};
							res.json(obj);
			//return res.redirect('http://localhost:3000/dashboard.html');
					}else{
							delete req.session["User"];
							res.header('Content-Length', 100);
							var obj={"status":false};
							res.json(obj);
					}
				}
			});
			db.close();
		} 	
	});
});

/*End Login service*/
/*Start Dashboard service*/
router.get('/api/dashboard',function(req,res){
if(req.session.User){
	console.log("From Dashboard: "+req.session.User);
	res.json(req.session.User);
}
else{
	var obj={"status":false};
	res.json(obj);
}
});
/*ENd Dashboard service*/

/*Start Dairy service*/

router.get('/api/dairy',function(req,res){	
var query={};
query["username"]=req.session.User[0].username;
console.log(query);
MongoClient=mongo.MongoClient;
var url='mongodb://localhost/SA';
MongoClient.connect(url,function(err,db){
if(err){
	console.log("Error is getting data "+err);
}
else{
	var collection=db.collection("dairies");
		collection.find(query).sort({date:1}).toArray(function(err,result){
			if(err){
				console.log("Error is getting data "+err);
			}
			else{
				if(result.length>0){					
					res.json(result);			
				}else{							
						res.header('Content-Length', 100);
						var obj={"status":false};
						res.json(obj);
					}
			}
			});
			db.close();
}
});
});

router.get('/api/searchdairy',function(req,res){	
	console.log("Search:"+req.query);
	var query=req.query;
	query["username"]=req.session.User[0].username;	
	MongoClient=mongo.MongoClient;
	console.log(query);
var url='mongodb://localhost/SA';
MongoClient.connect(url,function(err,db){
if(err){
	console.log("Error is getting data "+err);
}
else{
	var collection=db.collection("dairies");
		collection.find(query).toArray(function(err,result){
			if(err){
				console.log("Error is getting data "+err);
			}
			else{
				if(result.length>0){					
					res.json(result);			
				}else{							
						res.header('Content-Length', 100);
						var obj={"status":false};
						res.json(obj);
					}
			}
			});
			db.close();
}
});

});


router.post('/api/dairy',function(req,res){
	console.log("In Post");
var query=req.body;
query["username"]=req.session.User[0].username;
console.log(query);
MongoClient=mongo.MongoClient;
var url='mongodb://localhost/SA';
MongoClient.connect(url,function(err,db){
if(err){
	console.log("Error is getting data "+err);
}
else{
	var collection=db.collection("dairies");
	collection.insert(query);
	res.header('Content-Length', 100);
	var obj={"status":true};
	res.json(obj);
}
});
});


router.put('/api/dairy',function(req,res){
	console.log("In Put");
var query=req.body;
query["username"]=req.session.User[0].username;
console.log(query);
MongoClient=mongo.MongoClient;
var url='mongodb://localhost/SA';
MongoClient.connect(url,function(err,db){
if(err){
	console.log("Error is getting data "+err);
}
else{
	var collection=db.collection("dairies");
	collection.update({"username":query.username,"date":query.find.date},{$push:{timeSlot:query.time}});
	res.header('Content-Length', 100);
	var obj={"status":true};
	res.json(obj);
}
});
});



router.get('/api/checkDate',function(req,res){
var query=req.query;
	MongoClient=mongo.MongoClient;
	var url='mongodb://localhost/SA';
	MongoClient.connect(url,function(err,db){
		if(err){
			console.log("Error in connecting database");
		}
		else{
			var collection=db.collection("dairies");
			collection.find(query).toArray(function(err,result){
				if(err){
					console.log("Error is getting data "+err);
				}
				else{					
					//res.json(result.length);
					if(result.length>0){
							res.header('Content-Length', 100);
							var obj={"status":true};
							res.json(obj);
			//return res.redirect('http://localhost:3000/dashboard.html');
					}else{							
							res.header('Content-Length', 100);
							var obj={"status":false};
							res.json(obj);
					}
				}
			});
			db.close();
		} 	
	});
});
/*End Dairy service*/
module.exports=router;