var dairyService=(function(){
	var insertDetails=function(data){
		//alert(JSON.stringify(data));
		var res=generic.service.invoke("generic","Ajax",this,[{"service":"http://localhost:3000/api/dairy","type":"POST","data":data,"callback":insertSuccess}]);
	}

	var insertSuccess=function(res){
			alert("Insert Sccuess")
	}

		var updateDetails=function(data){
		//alert(JSON.stringify(data));
		var res=generic.service.invoke("generic","Ajax",this,[{"service":"http://localhost:3000/api/dairy","type":"PUT","data":data,"callback":updateSuccess}]);
	}
	var updateSuccess=function(res){
		alert("Update Sccuess")
	}

	var loadDateTime=function(){
		var d=new Date();
		$('#txtdate').val(d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear());
		$('#txttime').val(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
	}
	var checkDateEntry=function(){
		var d=$('#txtdate').val();
		generic.service.invoke("generic","Ajax",this,[{"service":"http://localhost:3000/api/checkDate","type":"GET","data":{"date":$('#txtdate').val()},"callback":successCheckDate}]);
	}
	var successCheckDate=function(res){
		//alert('entry')
		if(!res.status){
			var _obj={
				"date":$('#txtdate').val(),
				"timeSlot":[
				{
					"time":$('#txttime').val(),
					"content":$('#txtdetails').val()
				}
				]
			}
			//alert('before');
			_obj=JSON.stringify(_obj);
			insertDetails(_obj);
		}
		else{
				var _obj={		
				"find":{
					"date":$('#txtdate').val()
				},
				"time":{		
					"time":$('#txttime').val(),
					"content":$('#txtdetails').val()	
					}						
			}
			_obj=JSON.stringify(_obj);
			updateDetails(_obj);
		}
	}
	return{
		insert:insertDetails,
		load:loadDateTime,
		check:checkDateEntry
	}

})();
dairyService.load();
$(document).ready(function(e){
	$('#txtdairysubmit').click(function(e){
		//alert('hi');
		dairyService.check();		
	});
});