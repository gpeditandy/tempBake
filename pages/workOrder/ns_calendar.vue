<template>
	<view class="container">
		<view class="content margin-b" v-for="(item,index) in initData" :key="index">
			<view class="content-t margin-b">
				<text class="content-t-b">{{index}}</text>
			</view>
			<view class="content-c" v-for="(itemP,indexP) in item" :key="indexP">
				<view class="content-c-t margin-b-s">范家育苗基地</view>
				<view class="">{{itemP.remark}}</view>
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
				initData: {},
			}
		},
		onLoad(option) {

		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.$H.get('oa/app/message/farmingtime/calendar', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.initData = res.data
						console.log(this.initData);
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
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
		padding: 20rpx 16rpx;
		box-sizing: border-box;

		.margin-b-s {
			margin-bottom: 10rpx;
		}

		.margin-b {
			margin-bottom: 20rpx;
		}

		.hidden {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.content {
			width: 100%;
			background: #FFFFFF;
			border-radius: 8rpx;
			padding: 34rpx 24rpx;
			box-sizing: border-box;

			.content-t {
				width: 100%;
				.content-t-b{
					background: rgba(45, 166, 65, 0.1);
					border-radius: 4rpx;
					font-size: 32rpx;
					font-weight: 400;
					color: #2DA641;
					padding: 6rpx 10rpx;
				}
			}

			.content-c {
				font-size: 32rpx;
				font-weight: bold;
				color: #303133;
				margin-bottom: 20rpx;

				.content-c-t {
					font-size: 30rpx;
					font-weight: 500;
					color: #606266;
				}
			}

			.content-c:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
