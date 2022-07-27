<template>
	<view>
		<view hover-class="bg-light" class="iconfont d-flex a-center j-center font-lg"
			style="width: 100%;height: 50rpx;background-color: #fff;" :style="'top:'+statusBarHeight+'px'"
			@click="handleBack"></view>
		<view class="font-weight text-muted bg-white p-2">
			<!-- #ifdef APP-PLUS -->
			<view class="d-flex j-sb mb-2">
				<view class="text-white">1</view>
				<view class="d-flex a-center font" v-if="cityData">
					<view class="font-big font-weight mr-1">{{cityData.temp}}</view>
					<view class="d-flex flex-column">
						<view class="text-muted mb">
							<text>℃</text>
							<text class="mx-1">{{cityData.cityname}}</text>
							<text>{{cityData.weather}}</text>
						</view>
						<view class="text-muted text-right">
							<text>{{cityData.lowTemp}}℃~{{cityData.highTemp}}℃</text>
						</view>
					</view>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<image src="../../../static/images/sun.png" style="width: 70rpx;height: 70rpx;" mode=""></image>
			<!-- #endif -->
			<view class="d-flex a-center j-sb font-md">
				<view class="d-flex a-center">
					<view>{{areaArray[areaIndex]}}</view>
					<picker @change="bindPickerChange" :value="areaIndex" :range="areaArray">
						<text class="iconfont icon-dizhi ml"></text>
					</picker>
				</view>
				<view>{{userType}}工作台</view>
			</view>
		</view>
		<view class="p-2">
			<view v-if="user_status == 2" class="index-bg rounded d-flex flex-column text-white pl-5 pt-3">
				<view class="font">截至今日</view>
				<view class="mt-2 mb-2 font-lg2">共发布工单</view>
				<view class="d-flex a-end" v-if="workbenchNum">
					<text class="font-big">{{workbenchNum}}</text>
					<text class="font-sm num">单</text>
				</view>
				<view class="font-sm num" v-else>暂无数据</view>
			</view>
			<view v-if="user_status == 1" class="index-bg rounded d-flex flex-column text-white pl-5 pt-3">
				<view class="font">截至今日</view>
				<view class="mt-2 mb-2 font-lg2">共收到农时汇报</view>
				<view class="d-flex a-end" v-if="workbenchNum">
					<text class="font-big">{{workbenchNum}}</text>
					<text class="font-sm num">单</text>
				</view>
				<view class="font-sm num" v-else>暂无数据</view>
			</view>
			<view v-if="user_status == 3" class="index-bg rounded d-flex flex-column text-white pl-5 pt-3">
				<view class="font">截至今日</view>
				<view class="mt-2 mb-2 font-lg2">共收到工单数量</view>
				<view class="d-flex a-end" v-if="workbenchNum">
					<text class="font-big">{{workbenchNum}}</text>
					<text class="font-sm num">单</text>
				</view>
				<view class="font-sm num" v-else>暂无数据</view>
			</view>
			<template v-if="user_status != 4">
				<view class="d-flex a-center j-sb p-2 bg-white" @click="toLaunch()">
					<view class="d-flex a-center">
						<image src="../../../static/images/dan_icon01.png" style="width: 42rpx;height: 42rpx;" mode=""
							class="rounded"></image>
						<text class="ml-2 font-md">
							{{user_status==1?'我收到的汇报':user_status==2?'我发起的工单':user_status==3?'我收到的工单':''}}
						</text>
					</view>
					<text class="iconfont icon-jinru text-muted"></text>
				</view>
			</template>
		</view>
		<view class="d-flex flex-column bg-white p-2 mx-2">
			<text class="font-md mb-2 font-weight">常用</text>
			<view class="big-icon d-flex a-center j-sb">
				<view v-for="(item,index) in often" :key="index">
					<image v-if="item.name=='育苗'" src="../../../static/images/yumiao.png" @click="navigate(item)"
						mode=""></image>
					<image v-if="item.name=='智能滴灌'" src="../../../static/images/diguan.png" mode=""
						@click="navigate(item)"></image>
					<image v-if="item.name=='智能烘烤'" src="../../../static/images/bake.png" mode=""
						@click="navigate(item)"></image>
				</view>
			</view>
		</view>
		<view class="d-flex flex-column bg-white p-2 m-2">
			<text class="font-md mb-2 font-weight">更多</text>
			<view class="more d-flex a-center j-sb font text-muted">
				<view v-for="(item,index) in children" :key="index">
					<view class="d-flex flex-column a-center" v-if="item.name=='起垄配肥'" @click="navigate(item)">
						<image src="../../../static/images/more_01.png" mode=""></image>
						<text class="mt-2">起垄配肥</text>
					</view>
					<view class="d-flex flex-column a-center" v-if="item.name=='移栽注水'" @click="navigate(item)">
						<image src="../../../static/images/more_02.png" mode=""></image>
						<text class="mt-2">移栽注水</text>
					</view>
					<view class="d-flex flex-column a-center" v-if="item.name=='绿色防控'" @click="navigate(item)">
						<image src="../../../static/images/more_03.png" mode=""></image>
						<text class="mt-2">绿色防控</text>
					</view>
					<view class="d-flex flex-column a-center" v-if="item.name=='智能采收'" @click="navigate(item)">
						<image src="../../../static/images/more_05.png" mode=""></image>
						<text class="mt-2">智能采收</text>
					</view>
					<view class="d-flex flex-column a-center" v-if="item.name=='其他'" @click="navigate(item)">
						<image src="../../../static/images/more_04.png" mode=""></image>
						<text class="mt-2">长势监测</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import {mapState} from 'vuex'
	export default {
		data() {
			return {
				cityData: {},
				statusBarHeight: 0,
				areaIndex: 0,
				areaArray: [],
				workbenchNum: '', //工单/农时--数量
				realName: '', //发起人
				realName_z: '', //发起人--截取字段
				user_status: '', //发起人--身份
				userType: '', //发起人--身份(文字)
				initData: [],
				often: [], //常用三个
				children: [], //更多五个
				addressList:[],
				cityName:''
			}
		},
		// computed:{
		// 	...mapState({
		// 		loginStatus:state=>state.user.loginStatus,
		// 		userInfo:state=>state.user.userInfo
		// 	})
		// },
		onLoad(option) {
			this.getAddr()
			// this.param = JSON.parse(decodeURIComponent(option.param))
			this.isLogin()
			let {
				statusBarHeight
			} = uni.getSystemInfoSync()
			this.statusBarHeight = statusBarHeight
		},
		onShow() {
			this.getTobaccoFieldInfo()
			this.userInformation()
			this.getWorkbenchNum()
			this.init()
		},
		methods: {
			getAddr() {
				var _this = this
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						var point = new plus.maps.Point(res.longitude, res.latitude);
						plus.maps.Map.reverseGeocode(
							point, {},
							function(event) {
								var address = event.address; // 转换后的地理位置
								var point = event.coord; // 转换后的坐标信息
								var coordType = event.coordType; // 转换后的坐标系类型
								console.log(address, 'address');
								var reg = /.+?(省|市|自治区|自治州|县|区|镇)/g;
								console.log(address.match(reg));
								_this.addressList = address.match(reg).toString().split(",");
								console.log(_this.addressList[0]);
								console.log(_this.addressList[1]);
								console.log(_this.addressList[2]);
								_this.cityName = _this.addressList[2]
								console.log(_this.cityName)
								_this.getCityInfo()
							},
							function(e) {}
						)
					}
				})
			},
			getCityInfo() {
				this.$H.get('screen/weather',{
					cityName:this.cityName
				}).then(res => {
					if (res.code != 0) {
						// return this.$message.error(res.msg)
					} else {
						if (res.data) {
							this.cityData = res.data
							console.log(this.cityData)
						} else {
							this.$message.error('返回数据为NULL')
						}
					}
				})
			},
			userInformation() {
				//登录用户信息 身份(userType) 1--分公司管理员 2--烟站站长 3--下乡员 4--烟农
				this.$H.get('sys/user/info', {}).then(res => {
					console.log(res)
					if (res.code == 401) {
						// this.$message.error(res.msg)
						setTimeout((res) => {
							uni.redirectTo({
								url: '../../login/login'
							})
						}, 1000)
						return
					}
					if (res.code == 0) {
						this.realName = res.data.realName
						this.realName_z = this.realName.substring(this.realName.length - 2, this.realName.length)
						this.user_status = res.data.userType
						if (res.data.userType == 1) {
							this.userType = '分公司管理员'
						} else if (res.data.userType == 2) {
							this.userType = '烟站站长'
						} else if (res.data.userType == 3) {
							this.userType = '下乡员'
						} else if (res.data.userType == 4) {
							this.userType = '烟农'
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			init() {
				this.$H.get('oa/outputplan/category/listByPid', {
					pid: '0'
				}).then(res => {
					console.log(res)
					if (res.code == 401) {
						// this.$message.error(res.msg)
						setTimeout((res) => {
							uni.redirectTo({
								url: '../../login/login'
							})
						}, 1000)
						return
					}
					if (res.code == 0) {
						this.initData = res.data.children
						let children = res.data.children
						let often = []
						for (var i in children) {
							if (children[i].name == '育苗') {
								often.push(children[i])
								children.splice(i, 1)
							}
							if (children[i].name == '智能滴灌') {
								often.push(children[i])
								children.splice(i, 1)
							}
							if (children[i].name == '智能烘烤') {
								often.push(children[i])
								children.splice(i, 1)
							}
						}
						this.often = often
						this.children = children
						console.log(this.children)
					} else {
						return this.$message.error('暂无数据')
						// return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getWorkbenchNum() {
				this.$H.get('oa/app/workbench/index', {}).then(res => {
					console.log(res)
					if (res.code == 401) {
						// this.$message.error(res.msg)
						setTimeout((res) => {
							uni.redirectTo({
								url: '../../login/login'
							})
						}, 1000)
						return
					}
					if (res.code == 0) {
						this.workbenchNum = res.data.num
					}
				})
			},
			getTobaccoFieldInfo() {
				uni.showLoading({
					title: '数据加载中...',
					mask: true
				})
				this.$H.get('farmland/farmland/page', {
					limit: 10,
					page: 1,
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.code == 401) {
						// this.$message.error(res.msg)
						setTimeout((res) => {
							uni.redirectTo({
								url: '../../login/login'
							})
						}, 1000)
					} else {
						if (res.code != 0) {
							// return this.$message.error(res.msg)
						} else {
							this.areaArray = res.data.list.map(item => item.name)
						}
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			isLogin() {
				let token = uni.getStorageSync('token')
				console.log(token)
				if (!token) {
					// this.$message.error('尚未登录')
					uni.reLaunch({
						url: '../../login/login'
					})
				}
			},
			handleBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			bindPickerChange(e) {
				this.areaIndex = e.target.value
			},
			navigate(e) {
				// if (!path) return
				// uni.navigateTo({
				// 	url: `/pages/${path}/${path}`
				// })
				if(this.user_status == 2) {
					uni.navigateTo({
						url: '/pages/yumiao/yumiao?param=' + encodeURIComponent(JSON.stringify(e))
					})
				} else {
					if(e.name == '育苗') {
						uni.navigateTo({
							url: '/pages/monitor/monitor'
						})
					} else if(e.name == '智能滴灌') {
						uni.navigateTo({
							url: '/pages/irrigation/irrigation'
						})
					} else if(e.name == '智能烘烤') {
						uni.navigateTo({
							url: '/pages/bakeList/bakeList'
						})
					} else if(e.name == '起垄配肥') {
						uni.navigateTo({
							url: '/pages/fertilizer/fertilizer'
						})
					} else if(e.name == '移栽注水') {
						uni.navigateTo({
							url: '/pages/injection/injection'
						})
					} else if(e.name == '绿色防控') {
						uni.navigateTo({
							url: '/pages/greenControl/greenControl'
						})
					} else if(e.name == '智能采收') {
						uni.navigateTo({
							url: '/pages/intellectCollect/intellectCollect'
						})
					} else if(e.name == '其他') {
						uni.navigateTo({
							url: '/pages/growthMonitoring/growthMonitoring'
						})
					}
				}
			},
			handleLoading() {
				return this.$message.errorIcon('此功能暂未开放')
			},
			toLaunch() { //我发起的工单--跳转
				uni.navigateTo({
					url: '/pages/workOrder/sponsor_gd'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F2F3F5;
	}

	.index-bg {
		width: 710rpx;
		height: 260rpx;
		background: url(../../../static/images/index_bg.png) no-repeat center;
		background-size: cover;
		box-sizing: border-box;
	}

	.num {
		position: relative;
		bottom: 10rpx;
	}

	.big-icon image {
		width: 208rpx;
		height: 176rpx;
	}

	.more image {
		width: 80rpx;
		height: 80rpx;
	}

	.hidden {
		white-space: normal;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
