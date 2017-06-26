var dashboardService=(function(){
		var dashboardLoad=function(data){
			var res=generic.service.invoke("generic","Ajax",this,[{"service":"http://localhost:3000/api/dashboard","type":"GET","data":{},"callback":dashboardSuccess}]);
			
		}
		var dashboardSuccess=function(res){
			if(res.length>0){
				//alert(res);
				var _obj=res[0];
				$('.hsUserName').text(_obj.username);
				$('.hsUserimg').attr('src',_obj.imageurl);
			}
			else
				window.location="/";
		}
	
	return{
		dashboard:dashboardLoad
	}
})();

$(document).ready(function(e){
	dashboardService.dashboard();
});