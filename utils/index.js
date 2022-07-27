import Config from '../config/index.js'

export default {
	data() {
		return {
			
		}
	},
	
	/**
	 * 图片路径转换
	 * @param {String} img_path 图片地址
	 * @param {Object} params 参数，针对商品、相册里面的图片区分大中小，size: big、mid、small
	 */
	img(img_path, params) {
		var path = "";
		if (img_path != undefined && img_path != "") {
			if (params && img_path != this.getDefaultImage().default_goods_img) {
				// 过滤默认图
				let arr = img_path.split(".");
				let suffix = arr[arr.length - 1];
				arr.pop();
				arr[arr.length - 1] = arr[arr.length - 1] + "_" + params.size;
				arr.push(suffix);
				img_path = arr.join(".");
			}
			if (img_path.indexOf("http://") == -1 && img_path.indexOf("https://") == -1) {
				path = Config.baseURL + "/" + img_path;
			} else {
				path = img_path;
			}
		}
		return path;
	},
	/**
	 * 获取默认图
	 * @param {Object} link
	 */
	getDefaultImage() {
		let defaultImg = uni.getStorageSync('default_img');
		if (defaultImg) {
			defaultImg = JSON.parse(defaultImg);
			defaultImg.default_goods_img = this.img(defaultImg.default_goods_img);
			defaultImg.default_headimg = this.img(defaultImg.default_headimg);
		  defaultImg.default_storeimg = this.img(defaultImg.default_storeimg);
			return defaultImg;
		} else {
			return {
				default_goods_img: '',
				default_headimg: '',
				default_storeimg: ''
			};
		}
	},
	// 监听网络
	onNetWork() {
		uni.getNetworkType({
			success: (res) => {
				console.log(res)
				if (res.networkType === 'none') {
					uni.showModal({
						title: '温馨提示',
						content: '当前处于断网状态，请先连接网络',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		});
		uni.onNetworkStatusChange((res) => {
			if (res.networkType === 'none') {
				uni.showModal({
					title: '温馨提示',
					content: '当前处于断网状态，请先连接网络',
					showCancel: false,
					cancelText: '',
					confirmText: '确定',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		})
	}
}