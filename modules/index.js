var stu=require('./student');
var dep=require('./department');
var emitter=require('./emitter');

module.exports={
	student:stu,
	department:dep.dep,
	emitter:emitter
}