var loginService=(function(){
		var loginSA=function(data){
			var res=generic.service.invoke("generic","Ajax",this,[{"service":"http://localhost:3000/api/login","type":"GET","data":data,"callback":loginSuccess}]);
			
		}
		var loginSuccess=function(res){
			if(res.status)
				window.location=res.loc;
			else
				alert("Invalid Username or Password");
		}
	
	return{
		login:loginSA
	}
})();

$(document).ready(function(e){
$('#btnLogin').click(function(e){
	var user=$('#txtuser').val();
	var pass=$('#txtpass').val();
	if(user!="" && pass!=""){
	loginService.login({"username":user,"password":pass});
}
else{
	alert("Invalid username");
}
});
});