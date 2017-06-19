function Emitter(){
	this.events={};
}
Emitter.prototype.on=function (type,fn) {
	// body...
	this.events[type]=this.events[type]||[];
	this.events[type].push(fn);
}
Emitter.prototype.emit=function(type){
	if(this.events[type]){
	this.events[type].forEach(function(fn){
		fn();
	});
}
}

module.exports=Emitter;