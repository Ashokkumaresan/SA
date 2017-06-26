  $(document).ready(function() {         
loadMainDashboard();
         
$('#side-menu .nav-link').on('click',function(){
  var sel=$(this).attr("data-value");
  if(sel!="null"){
                 $.ajax( {
                  url:''+sel+'.html',
                  success:function(data) {
                    $('#containerHolder').children().remove();
                    $('#containerHolder').append(data);                    
                  },
                  error:function(a,b,c){
                    console.log(a);
                  }
               });
  }
  else{
        loadMainDashboard();
  }
});            

         });

  function loadMainDashboard(){
                   $.ajax( {
                  url:'mainDashboard.html',
                  success:function(data) {
                   $('#containerHolder').children().remove();
                    $('#containerHolder').append(data);                    
                  },
                  error:function(a,b,c){
                    console.log(a);
                  }
               });
  }