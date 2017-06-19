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
var generic=(function(){
function eventHandlers(_obj){
	var _list={};
	_list[_obj]= _list[_obj] || {};
	_obj.addEvent=function(_type,_listener){
		if(!_list[_obj][_type]){
			_list[_obj][_type]=[];
		}
		if(_list[_obj][_type].indexOf(_listener)==-1){
			_list[_obj][_type].push(_listener);
		}
	};

	_obj.removeEvent=function(_type,_listener){
		if(_list[_obj][_type]){
			var _i=_list[_obj][_type].indexOf(_listener);
			if(_i!=-1)
				_list[_obj][_type].splice(_i,1);
		}
	};
	_obj.dispatch=function(_type,_args){
		if(_list[_obj][_type]){
			_list[_obj][_type].forEach(function(_fn){
				_fn(_args);
			});
		}
	}
}
return{
	event:eventHandlers
}
})();