var dairyService=(function(){
	var insertDetails=function(data){
		var res=generic.service.invoke("generic","Ajax",this,[{"service":"http://localhost:3000/api/dairy","type":"POST","data":data,"callback":insertSuccess}]);
	}

	var insertSuccess=function(res){

	}
	var loadDateTime=function(){
		var d=new Date();
		$('#txtdate').val(d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear());
		$('#txttime').val(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
	}
	return{
		insert:insertDetails,
		load:loadDateTime,
	}

})();
dairyService.load();
$(document).ready(function(e){
	$('#txtdairysubmit').click(function(e){
		alert('hi');
	});
});