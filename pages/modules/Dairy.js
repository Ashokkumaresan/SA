var dairyService=(function(){
	var insertDetails=function(data){
		//alert(JSON.stringify(data));
		var res=generic.service.invoke("generic","Ajax",this,[{"service":"http://localhost:3000/api/dairy","type":"POST","data":data,"callback":getDairy}]);
	}

		var updateDetails=function(data){
		//alert(JSON.stringify(data));
		var res=generic.service.invoke("generic","Ajax",this,[{"service":"http://localhost:3000/api/dairy","type":"PUT","data":data,"callback":getDairy}]);
	}

	var getDairy=function(){
		$('#txtdetails').val("");
		generic.service.invoke("generic","Ajax",this,[{"service":"http://localhost:3000/api/dairy","type":"GET","data":{},"callback":successGetDate}]);
	}

	var searchDairy=function(){		
		var _date=$('#txtsearch').val();
		var _obj={
				"date":_date
			}		
		//alert(_obj);
		generic.service.invoke("generic","Ajax",this,[{"service":"http://localhost:3000/api/searchdairy","type":"GET","data":_obj,"callback":successGetDate}]);
	}

	var successGetDate =function(res){
		var len=res.length;
		var row="";
		$('#td_body').children().remove();		
		res.forEach(function(value,index){
			value.timeSlot.sort(sortTime);
			value.timeSlot.forEach(function(value1,index1){
			 row+="<tr class='odd' role='row'>"+                 
                  "<td>"+value.date+"</td>"+
                  "<td>"+value1.time+"</td>"+
                  "<td class='center'>"+value1.content+"</td>"+                 
                "</tr>";
                });
		});
		$('#td_body').append(row);
	}
var sortTime=function(a,b){
 return ((a.time > b.time) ? -1 : ((a.time < b.time) ? 1 : 0));
}
var sortDate=function(a,b){
 return ((a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0));
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
		check:checkDateEntry,
		get:getDairy,
		search:searchDairy
	}

})();
setInterval(function(){
dairyService.load();
},1000);
dairyService.get();
$(document).ready(function(e){
	$('#txtdairysubmit').click(function(e){
		//alert('hi');
		dairyService.check();		
	});
	$('#txtdetails').keypress(function(e){
		if(e.which==13)	
			var _resp=confirm("Are you sure to write in your dairy?");
		if(_resp)
			dairyService.check();	
	});
			$('#txtsearch').focus(function(e){
				if($(this).val()=="")
					$(this).val($('#txtdate').val());
	});

		$('#txtsearch').keypress(function(e){
		if(e.which==13)
			dairyService.search();	
	});
});