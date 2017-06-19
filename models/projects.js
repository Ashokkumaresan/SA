var mongoose=require('mongoose');
var projectsSchema=mongoose.Schema({
	projectName:{
		type:String
	},
	description:{
		type:String
	},
	startDate:{
		type:String
	},
	endDate:{
		type:String
	},
	websiteLink:{
		type:String
	},
	ftpUsername:{
		type:String
	},
	ftpPassword:{
		type:String
	},
	assigned:{
		type:String
	},
	status:{
		type:String
	}
});

var Projects=module.exports=mongoose.model("projects",projectsSchema);

module.exports.getProjects=function(callback){
	Projects.find(callback)
}