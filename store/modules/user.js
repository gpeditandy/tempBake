export default {
	state:{
		loginStatus:false,
		token:null,
		userInfo:{}
	},
	mutations:{
		login(state,userinfo) {
			state.userInfo = userinfo
			state.loginStatus = true
			state.token = userinfo
		}
	}
}