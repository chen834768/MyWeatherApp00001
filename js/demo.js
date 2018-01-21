var aa="123";
console.log(aa);
let button=document.getElementsByClassName("button");
console.log(button);

window.onload=function(){
	// 当点击按钮时出现弹框
	button[0].onclick=function(){
		// alert("这是一个按钮");
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="none";
	}

	var pos= document.getElementsByClassName("pos");
	pos[0].onclick= function(){
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="block";
	}
}
// 关于城市的数据
$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType: "jsonp",
	method:"get",
	success:function(obj){
		var city=obj.data;
		console.log(city);
	}
})
// 关于天气的数据
$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType: "jsonp",
	method:"get",
	success:function(obj){
		var tq=obj.data;
		console.log(tq);
		// var tem= tq.weather.current_temperature;
		console.log(tq.weather.current_temperature);

	}
})
