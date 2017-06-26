window.chartColors = {
	red: 'rgb(255, 98, 98)',
	orange: 'rgb(240, 173, 78)',
	yellow: 'rgb(255, 184, 3)',
	green: 'rgb(44, 196, 205)',
	blue: 'rgb(108, 139, 239)',
	purple: 'rgb(97, 61, 124)',
	grey: 'rgb(231,233,237)'
};


window.randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}
generic=(function(){
	var serviceList=serviceList || {};
	serviceList.addService=function(name,alias,fn){
			if(!serviceList[name]){
				serviceList[name]=[];				
			}
			var _obj=new Object();
			_obj.alias=alias;
			_obj.fun=fn;
			serviceList[name].push(_obj);
	};
	serviceList.removeService=function(name,alias){
		if(serviceList[name]){		
		if(alias==undefined){	
			delete serviceList[name];			
		}
		else{
			var _i=-1;
			serviceList[name].forEach(function(value,index){
				if(value.alias==alias){
					_i=index;
				return false;
				}
			});
			if(_i!=-1)
				serviceList[name].splice(_i,1);
		}	 
	}
	};
	serviceList.invoke=function(name,alias,_this,_args){		
		if(serviceList[name]){
			serviceList[name].forEach(function(value,index){
				if(value.alias==alias){
					value.fun.apply(_this,_args);
				return false;
				}
			});
		}
	};	
	
		var invokeService=function(_obj){
						$.ajax({
						url: _obj.service,
						// dataType: "jsonp",
						data: _obj.data,	
						contentType: 'application/json',						
						type: _obj.type,
						json: true,
						crossDomain: true,	
						success: function (data) {	
							_obj.callback(data);
						},
						error: function (xhr, status, error) {
							console.log('Error: ' + error.message);							
						},
					});
	}
	serviceList.addService("generic","Ajax",invokeService);
	return{
		service:serviceList
	}
})();

