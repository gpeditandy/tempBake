<template>
	<view>
		<view>
			<image src="../../static/images/yumiao-banner.png" style="width: 718rpx;height: 188rpx;" class="mb-2 m-2" mode="" @click="navigate(netUrl)"></image>
		</view>
		<view class="p-2 mx-2 bg-white rounded">
			<view class="d-flex a-center mb-2">
				<text class="myline mr-1"></text>
				<text class="font-md text-muted">发起工单</text>
			</view>
			<view class="d-flex a-center text-white font-md" v-if="false">
				<view class="d-flex flex-column" @click="create(item.sort)" v-for="(item,index) in list" :key="index">
					<image v-if="item.sort == 0" style="width: 310rpx;height: 144rpx;"
						src="../../static/images/yumiao-left.png" mode=""></image>
					<image v-if="item.sort == 1" style="width: 310rpx;height: 144rpx;"
						src="../../static/images/yumiao-right.png" mode=""></image>
					<text class="position-relative pos-txt">{{item.name}}</text>
				</view>
			</view>
			<view class="d-flex flex-wrap">
				<view class="title" @click="create(item)" v-for="(item,index) in list" :key="index">
					{{item.name}}
				</view>
				<view class="none" v-if="list.length == 0">暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				parentName: '', //类型
				realName: '', //发起人
				userType: '', //登录人身份
				param: '',
				netUrl:''
			}
		},
		onBackPress(e) {
			uni.switchTab({
				url: '../tabBar/workbench/workbench',
			})
			return true
		},
		onLoad(option) {
			// this.param = JSON.parse(decodeURIComponent(option.param))
			if(option.param) {
				console.log(option.param)
			this.param = JSON.parse(option.param)
			switch(this.param.name) {
				case "育苗":
					uni.setNavigationBarTitle({
						title: '育苗管理'
					})
					this.netUrl = 'monitor'
				break;
				case "智能滴灌":
					uni.setNavigationBarTitle({
						title: '智能滴灌'
					})
					this.netUrl = 'irrigation'
				break;
				case "智能烘烤":
					uni.setNavigationBarTitle({
						title: '智能烘烤'
					})
					this.netUrl = 'bakeList'
				break;
				case "起垄配肥":
					uni.setNavigationBarTitle({
						title: '起垄配肥'
					})
					this.netUrl = 'fertilizer'
				break;
				case "移栽注水":
					uni.setNavigationBarTitle({
						title: '移栽注水'
					})
					this.netUrl = 'injection'
				break;
				case "绿色防控":
					uni.setNavigationBarTitle({
						title: '绿色防控'
					})
					this.netUrl = 'greenControl'
				break;
				case "智能采收":
					uni.setNavigationBarTitle({
						title: '智能采收'
					})
					this.netUrl = 'intellectCollect'
				break;
				case "其他":
					uni.setNavigationBarTitle({
						title: '长势监测'
					})
					this.netUrl = 'growthMonitoring'
				break;
			}
		   }
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				//登录用户信息 身份(userType) 1--分公司管理员 2--烟站站长 3--下乡员 4--烟农
				this.$H.get('sys/user/info', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.realName = res.data.realName
						this.realName_z = this.realName.substring(this.realName.length - 2, this.realName.length)
						this.userType = res.data.userType
					}
				}).catch(err => {
					console.log(err)
				})
				this.$H.get('oa/outputplan/category/listByPid', {
					pid: this.param.id
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.list = res.data.children
						this.parentName = res.data.parentName
					} else {
						return this.$message.error('暂无数据')
						// return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			navigate(path) {
				if (!path) return
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				})
			},
			handleLoading() {
				return this.$message.errorIcon('此功能暂未开放')
			},
			create(e) {
				if (this.userType == 2) {
					uni.navigateTo({
						url: '/pages/workOrder/create?param=' + encodeURIComponent(JSON.stringify(e)) +
							'&parentName=' + this.parentName
					})
				} else {
					this.$message.error('暂无权限')
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F6F9;
		font-family: 'PingFang SC';
	}

	.myline {
		width: 6rpx;
		height: 30rpx;
		background-color: #007AFF;
		display: inline-block;
	}

	.pos-txt {
		bottom: 100rpx;
		left: 30rpx;
	}

	.title {
		padding: 16rpx 48rpx;
		box-sizing: border-box;
		margin-right: 24rpx;
		margin-bottom: 20rpx;
		background: #FFFFFF;
		border: 2rpx solid #E4E7ED;
		border-radius: 4rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #303133;
	}

	.none {
		width: 100%;
		margin-top: 40rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #94989d;
		text-align: center;
	}
</style>