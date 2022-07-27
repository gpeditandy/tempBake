import $C from '../config/index.js'

export default {
	
	request(options = {}) {
		options.url = $C.baseURL + options.url
		options.method = options.method || 'GET'
		options.header = Object.assign({}, options.header, {
			"content-type":"application/json",
			"token":uni.getStorageSync('token')||''
		})
		
		// return uni.request(options)
		return new Promise((resolve,reject) => {
			uni.request({
				...options,
				success:(res) => {
					//失败
					if(res.statusCode !=200) {
						uni.showToast({
							title:res.data.msg || '请求失败',
							icon:'none'							
						})
						return reject(res.data)
					}
					//成功
					resolve(res.data)
				},
				fail:(err) => {
					uni.showToast({
						title:err.errMsg || '网络异常',
						icon:'none'
					})
					return reject()
				}
			})
		})
	},
	get(url,data = {},options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url,data = {},options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url,data = {},options = {}) {
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url,data = {},options = {}) {
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	},
}
