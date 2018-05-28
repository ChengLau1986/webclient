export default{
	install(Vue, options) {
		Vue.ApiList = new Array("http://localhost:8081/", "http://localhost:8081/FileAPI/", "http://192.168.20.239:8090/DocApi/", "http://192.168.20.239:8090/workflowapi/api/", "http://localhost:8091/WebReport/", "http://61.183.73.186");
		Vue.prototype.$YwUrl = "http://192.168.20.248:8091/Index.aspx";

		function GetURLParm(obj) {
			if (typeof obj == "object" && obj != null) {
				var paramStr = "?";
				for (var key in obj) {
					if (paramStr.length > 1) {
						paramStr += "&";
					}
					paramStr += key + "=" + encodeURIComponent(obj[key]);
				}
				return paramStr;
			}
			return obj;
		}

		function Ajax(route, typeName, action, parameter, callback, addrIndex) {
			let xhr = new XMLHttpRequest();
			xhr.onload = function() {
				let ret = JSON.parse(xhr.responseText);
				if (ret.code === "-1") {
					route.router.go({
						path: '/login'
					});
				} else {
					if (typeName == "POST" && ret.tocket && ret.tocket != "") {
						window.localStorage.setItem("BASIC", ret.tocket);
					}
					callback(ret);
				}
			};
			xhr.onerror = function() {
				window.alert("调用失败");
			};
			if (typeName == "POST" || typeName == "PUT") {
				xhr.open(typeName, Vue.ApiList[addrIndex] + action, true);
				xhr.setRequestHeader("Content-type", "application/json");
				xhr.setRequestHeader("Authorization", window.localStorage.getItem("BASIC"));
				xhr.send(JSON.stringify(parameter));
			} else {
				var random = "?" + Math.random();
				if ((typeof parameter == "object" && parameter != null) || (action.indexOf('?') >= 0))
					random = "&" + Math.random();
				xhr.open(typeName, Vue.ApiList[addrIndex] + action + GetURLParm(parameter) + random, true);
				xhr.setRequestHeader("Authorization", window.localStorage.getItem("BASIC"));
				xhr.send();
			}
		}

		Vue.prototype.$AjaxPost = function(action, parameter, callback, type = 0) {
			Ajax(this.$route, "POST", action, parameter, callback, type);
		};
		Vue.prototype.$AjaxGet = function(action, data, callback, type = 0) {
			Ajax(this.$route, "GET", action, data, callback, type);
		};
		Vue.prototype.$AjaxPut = function(action, parameter, callback, type = 0) {
			Ajax(this.$route, "PUT", action, parameter, callback, type);
		};
		Vue.prototype.$AjaxDelete = function(action, parameter, callback, type = 0) {
			Ajax(this.$route, "DELETE", action, parameter, callback, type);
		};
	}
};