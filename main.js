import Vue from 'vue'
import App from './App'
import Config from './config/index.js'
import Util from './utils/index.js'
// import store from "./store"
// Vue.prototype.$store = store
// 引入video.js
// import videojs from 'video.js'
// import 'video.js/dist/video-js.css' 
// Vue.prototype.$video = videojs //使用video.js时用$video

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$config = Config;
Vue.prototype.$util = Util;


//引入配置文件
import $C from './config/index.js';
Vue.prototype.$C = $C

//引入请求库
import $H from './utils/request.js'
Vue.prototype.$H = $H

Vue.prototype.$message = {
	error(title) {
		uni.showToast({
			icon: 'none',
			duration:2000,
			title
		})
	},
	errorIcon(title) {
		uni.showToast({
			icon: 'error',
			duration:2000,
			title
		})
	},
	success(title) {
		uni.showToast({
			icon: 'none',
			duration:2000,
			title
		})
	},
	successIcon(title) {
		uni.showToast({
			icon: 'success',
			duration:2000,
			title
		})
	}
	
}

const app = new Vue({
	// store,
	...App
})
app.$mount()
