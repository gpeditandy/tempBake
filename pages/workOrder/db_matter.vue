<template>
	<view class="container">
		<view class="content" v-for="(item,index) in initData">
			<view class="content-t">{{item.title}}</view>
			<block v-if="userTypeStatus == 3">
				<view class="content-b hidden">工单编号：{{item.id}}</view>
				<view class="content-b hidden">所属项目：{{item.type}}</view>
				<view class="content-b hidden">工单主题：{{item.topic}}</view>
				<view class="content-b hidden">优先级：{{item.priority}}</view>
			</block>
			<view class="content-c" @click="toReport(item)">
				{{userTypeStatus == 2 ? '去汇报' : '回复'}}
			</view>
		</view>
		<view class="d-flex a-center j-center flex-column position-absolute left-0 right-0 bottom-300"
			v-if="initData.length == 0">
			<image src="../../static/images/empty01.png" style="width: 324rpx;height: 230rpx;" mode=""></image>
			<text class="text-light-muted font-md">暂无数据</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				initData: '',
				userTypeStatus: '',
			}
		},
		onLoad(option) {
			// this.type = option.type
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
						this.userTypeStatus = res.data.userType
					}
				}).catch(err => {
					console.log(err)
				})
				//消息列表
				this.$H.get('oa/app/message/myTodo', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.initData = res.data
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toReport(e) {
				if(this.userTypeStatus == 2){
					uni.navigateTo({
						url: '/pages/workOrder/report?id=' + e.id + '&farmingTimeCategory=' + e.farmingTimeCategory
					})
				} else if(this.userTypeStatus == 3){
					uni.navigateTo({
						url: '/pages/workOrder/launch_detail?id=' + e.id + '&type=' + 'gdtz'
					})
				}
				
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F6F9;
		font-family: 'PingFang SC';
	}

	.container {
		padding: 20rpx 16rpx;
		box-sizing: border-box;

		.hidden {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.content {
			width: 100%;
			background: #FFFFFF;
			border-radius: 8rpx;
			padding: 28rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;

			.content-t {
				width: 100%;
				font-size: 30rpx;
				font-weight: 500;
				color: #303133;
				margin-bottom: 20rpx;
			}

			.content-b {
				width: 100%;
				font-size: 28rpx;
				font-weight: 400;
				color: #606266;
				margin-bottom: 20rpx;
			}

			.content-c {
				width: 258rpx;
				height: 64rpx;
				background: #0977FF;
				border-radius: 8rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #ffffff;
				text-align: center;
				line-height: 64rpx;
			}
		}
	}
</style>
