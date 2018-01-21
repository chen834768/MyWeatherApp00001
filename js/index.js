// 引入远程数据
// 关于城市的信息
var city;
var tianqi;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		city=obj.data;
		console.log(city);
	}
})
// 关于天气信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		console.log(tianqi);
	}
})
// 页面下载函数
window.onload=function(){
	update();

	// 页面交互
	var pos=document.getElementsByClassName("pos")[0];
	var cityBox=document.getElementsByClassName("city")[0];
	// 点击城市出现城市详情页
	pos.onclick=function(){
		cityBox.style.display="block";

	// 点击城市详情，跳转首页，出该城市的情况
	var BOX=$(".city .citys .con .box");
	for(let i in BOX){
		BOX[i].onclick=function(){
			var chengshi=this.innerHTML;
			console.log(chengshi);
			// 调用AJAX函数
			AJAX(chengshi);
			}
		}
	}

// 搜索部分
	var searchBox=document.getElementsByClassName("searchBox")[0];
	var button=document.getElementsByClassName("button")[0];
	var text;
	console.log(button);
	searchBox.onfocus=function(){
		button.innerHTML="确认";
		text=searchBox.value;
}
		button.onclick=function(){
		var neirong=button.innerHTML;
		if(neirong=="取消"){
			var city3=document.getElementsByClassName(".city")[0];
			city3.style.display="none";
		}else{
			for(let i in city){
				for(let j in city[i]){
					if(text==j){
						AJAX(text);
						return;
					}else{
						alert("没有此城市的天气情况");
						return;
					}
			}
		}
		}
	}
}
// 获取点击城市的天气信息函数
function AJAX(str){
	$.ajax({
	url: `https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType: "jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		update();
		var city2=$(".city")[0];
		city2.style.display="none";
	}
})


}



// 获取数据的函数
function update(){
	// 当前城市
	var pos=document.getElementsByClassName("pos")[0];
	pos.innerHTML=tianqi.city;
	// 当前空气质量
	var quality_level=document.getElementsByTagName("h5")[0];
	quality_level.innerHTML=tianqi.weather.quality_level;
	// 当前温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";
	// 当前天气情况
	var current_condition=document.getElementsByClassName("title2")[0];
	current_condition.innerHTML=tianqi.weather.current_condition;
	// 当前风向
	var wind_dir=document.getElementsByClassName("wind_dir")[0];
	wind_dir.innerHTML=tianqi.weather.wind_direction;
	// 获取风的级数
	var wind_level=document.getElementsByClassName("wind_level")[0];
	wind_level.innerHTML=tianqi.weather.wind_level+"级";
	// 今天的天气情况
	var today_icon=document.getElementsByClassName("today_icon")[0];
	today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;
	// 明天的天气情况
	var tomorrow_icon=document.getElementsByClassName("tomorrow_icon")[0];
	tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;
	// 今天的气温
	var tod_high_tem=document.getElementsByClassName("tod1")[0];
	tod_high_tem.innerHTML=tianqi.weather.dat_high_temperature+"°/";

	var tod_low_tem=document.getElementsByClassName("tod2")[0];
	tod_low_tem.innerHTML=tianqi.weather.dat_low_temperature+"°";
	// 明天的气温
	var tom_high_tem=document.getElementsByClassName("tom1")[0];
	tom_high_tem.innerHTML=tianqi.weather.tomorrow_high_temperature+"°/";

	var tom_low_tem=document.getElementsByClassName("tom2")[0];
	tom_low_tem.innerHTML=tianqi.weather.dat_low_temperature+"°";
	// 今天的天气情况
	var tod_con=document.getElementsByClassName("tod3")[0];
	tod_con.innerHTML=tianqi.weather.current_condition;
	// 明天的天气情况
	var tom_con=document.getElementsByClassName("tom3")[0];
	tom_con.innerHTML=tianqi.weather.tomorrow_condition;

	//每小时天气预报
	var hourlyArr=tianqi.weather.hourly_forecast;
	var wrap=document.getElementsByClassName("wrap")[0];
	for(let i in hourlyArr){
		//创建box
		var box1=document.createElement("div");
	    box1.className="box";
	   
	    //创建time块
	    var time=document.createElement("div");
	    //添加类名
		time.className="time";
		//添加到父级元素上
		box1.appendChild(time);
		//添加内容
		time.innerHTML=hourlyArr[i].hour+":00";

		//添加图标块
		var icon=document.createElement("div");
		icon.className="icon";
		box1.appendChild(icon);
		//修改样式
		icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`

		//创建温度块
		var timeTem=document.createElement("div");
		timeTem.className="timeTem";
		box1.appendChild(timeTem);
		//修改样式
		timeTem.innerHTML=hourlyArr[i].temperature+"°";

		//添加到box
		wrap.appendChild(box1);
	}

	//未来15天天气情况
	var dayArr=tianqi.weather.forecast_list;
	var fourth=document.getElementsByClassName("fourth")[0];
	for(let i in dayArr){
		var box2=document.createElement("div");
		box2.className="box2";

		var date=document.createElement("div");
		date.className="date";
		box2.appendChild(date);
		date.innerHTML=dayArr[i].date;

		var con1=document.createElement("div");
		con1.className="con1";
		box2.appendChild(con1);
		con1.innerHTML=dayArr[i].condition;

		var con1Pic=document.createElement("div");
		con1Pic.className="con1Pic";
		box2.appendChild(con1Pic);
		con1Pic.style=`background-image:url("img/${dayArr[i].weather_icon_id}.png")`;

		var maxTem=document.createElement("div");
		maxTem.className="maxTem";
		box2.appendChild(maxTem);
		maxTem.innerHTML=dayArr[i].high_temperature+"°";

		var lowTem=document.createElement("div");
		lowTem.className="lowTem";
		box2.appendChild(lowTem);
		lowTem.innerHTML=dayArr[i].low_temperature+"°";

		var wind=document.createElement("div");
		wind.className="wind";
		box2.appendChild(wind);
		wind.innerHTML=dayArr[i].wind_direction;

		var windNum=document.createElement("div");
		windNum.className="windNum";
		box2.appendChild(windNum);
		windNum.innerHTML=dayArr[i].wind_level+"级";

		fourth.appendChild(box2);
	}
// 关于城市的信息
   var city1=document.getElementsByClassName("city")[0];
   for(let i in city){
   	var citys=document.createElement("div");
   	citys.className="citys";


   	var title=document.createElement("div");
   	title.className="title";
   	title.innerHTML=i;
   	citys.appendChild(title);

   	var con=document.createElement("div");
   	con.className="con";

   for(let j in city[i]){
   	var box=document.createElement("div");
   	box.className="box";
   	box.innerHTML=j;
   	con.appendChild(box);
   }
   citys.appendChild(con);
   city1.appendChild(citys);
	}
}
