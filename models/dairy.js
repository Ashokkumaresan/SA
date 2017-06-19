var mongoose=require('mongoose');
var dairiesSchema=mongoose.Schema({
	username:{
		type:String
	},
	date:{
		type:String
	}
});
var Dairies=module.exports=mongoose.model("Dairies",dairiesSchema);

module.exports.getDairy=function (callback) {
	// body...
	Dairies.find(callback);
}
