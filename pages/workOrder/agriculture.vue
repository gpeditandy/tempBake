<template>
	<view class="container">
		<view class="" v-for="(item,index) in initData" :key="index">
			<view class="hour">
				<view class="time">{{item.receivedMsgTime}}</view>
			</view>
			<view class="content">
				<view class="content-t">
					<image src="../../static/images/icon_6.png" mode=""></image>
					<text>{{item.categoryName}}提醒</text>
				</view>
				<view class="content-b" @click="toDetail(item.id)">
					<view class="content-b-t">{{item.remark}}</view>
				</view>
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
				title: '',
				initData: '',
			}
		},
		onLoad(option) {
			this.type = option.type
			this.title = option.title
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				//消息列表
				this.$H.get('oa/app/message/list', {
					title: this.title,
					type: this.type
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.initData = res.data
					} else {
						return this.$message.error('暂无数据')
						// return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/workOrder/progress?id=' + id
				})
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
		padding: 0 16rpx;
		box-sizing: border-box;

		.hour {
			padding: 40rpx 0;
			display: flex;
			justify-content: center;

			.time {
				padding: 1rpx 16rpx;
				height: 42rpx;
				background: #FFFFFF;
				border-radius: 4rpx;
				text-align: center;
				line-height: 42rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #606266;
			}
		}

		.content {
			background: #FFFFFF;
			border-radius: 8rpx;
			padding: 24rpx;

			.content-t {
				margin-bottom: 16rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 8rpx;
				}

				text {
					font-size: 32rpx;
					font-weight: bold;
					color: #303133;
				}
			}

			.content-b {
				width: 100%;
				height: 240rpx;
				background-image: url('../../static/images/bz-time.png');
				background-size: 100% 100%;
				font-size: 30rpx;
				font-weight: 400;
				color: #FFFFFF;
				padding: 70rpx 300rpx 40rpx 32rpx;
				box-sizing: border-box;
				
				.content-b-t{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
</style>
