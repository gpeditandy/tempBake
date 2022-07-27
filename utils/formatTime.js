const add0 = m => m < 10 ? '0' + m : m
export default {
	reverseFormat(times) {
		return new Date(times).getTime()
	},
	format(shijianchuo,type) {
		//shijianchuo是整数，否则要parseInt转换
		var time = new Date(shijianchuo);
		var y = time.getFullYear();
		var m = time.getMonth() + 1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		var s = time.getSeconds();
		if(type==1) {
			return add0(y) + '-' + add0(m) + '-' + add0(d);
		} else {
			return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
		}
		
	},
	shijiantime(times) {
	      if(times) {
	        var timearr = times.split(" ")
	        var targetDate = timearr[0].substring(5).split("-").join("/")
	        return targetDate
	      }
	},
	isPhone(value) {
		if (!/^1(3|4|5|6|7|8)\d{9}$/.test(value)) {
			return false
		} else {
			return true
		}
	},
	//数组去重方法
	uniq(array){
	    var temp = []; //一个新的临时数组
	    for(var i = 0; i < array.length; i++){
	        if(temp.indexOf(array[i]) == -1){
	            temp.push(array[i]);
	        }
	    }
	    return temp;
	},
	delHtmlTag(str) {
	      var reg = getRegExp("<[^>]+>", "g");
	      var result = str.replace(reg, '');
	      return result;
	}
}
