$(function() {
	/*获取url后面的参数*/
	var params = {};
	
	function parseQueryString(url) {
		var arr = url.split("?");
		var arr1 = arr[1].split("&");
		for(var i = 0; i < arr1.length; i++) {
			arr2 = arr1[i].split('=');
			if(!arr2[1]) {
				params[arr2[0]] = 'true';
			} else {
				if(params[arr2[0]]) {
					var arr3 = [params[arr2[0]]];
					arr3.push(arr2[1]);
					params[arr2[0]] = arr3;
				} else {
					params[arr2[0]] = decodeURI(arr2[1]);
				}
			}
		}
		return params;
	}

	function getJsonById(id, data) {
		for(var i = 0; i < data.length; i++) {
			if(data[i] == id) {
				return data[i];
			}
		};
	}
	var url = window.location.href;
	parseQueryString(url);
	/*将内容放到input里面*/
	function autoinputval() {
		$("input[name='sign']").val(params.sign);
		$("input[name='token']").val(params.token);
	}
	autoinputval();
	/**/
	function obtainqrcode() {
		var sendData = {
			type: params.type,
			sign: params.sign
		};
		$.ajax({
			type: 'GET',
			url: 'http://192.168.1.241:8004/cims/mapi/verify/getqrcode',
			async: true,
			data: sendData,
			dataType: 'json',
			success: function(res) {
				var src = "http://192.168.1.241:8004/cims/mapi/showloginqrcode/";
				var token = "0a9ffb3c8e4940bbb1b0a759107b6d93";
				var imgsrc = imgsrc + token;
				/*$(".otherways-login>.login-inputcode>img").attr({
					"src": imgsrc
				});*/
				var allauthtypes = res.authtypes.split(",");
				console.log(allauthtypes.length);
				var data1 = getJsonById(1, allauthtypes);
				if(data1 != undefined) {
					judgment(data1,allauthtypes);
				} 
			},
			error: function() {
			}

		});
	}
	obtainqrcode();

	function addactive(code,allauthtypes) {
		$(".loginways").find(".tabs-content" + code).addClass("active").siblings().removeClass("active");
		if(allauthtypes.length!= 0){
			$(".moreways").show();
		}
	}
	function judgment(data,allauthtypes) {
		switch(data) {
			case "0":
				addactive(data,allauthtypes); //一键登录
				break;
			case "1":
				addactive(data,allauthtypes); //动态口令
				break;
			case "2":
				addactive(data,allauthtypes); //临时授权码
				break;
			case "3":
				addactive(3); //语音验证码认证
				break;
			case "4":
				addactive(data); //短信验证
				break;
			case "5":
				addactive(data); //声纹验证
				break;
			case "6":
				addactive(data); //人脸验证
				break;
			case "7":
				addactive(data); //人脸验证
				break;
		}
	}

	function appkey() {
		var html = template('test', data);
		document.getElementById('').innerHTML = html;
	}

});