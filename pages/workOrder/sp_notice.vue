<template>
	<view class="container">
		<view v-for="(item,index) in initData" :key="index">
			<view class="hour">
				<view class="time">{{item.receivedMsgTime}}</view>
			</view>
			<view class="content">
				<view class="content-t">
					<view class="content-t-l">
						<image src="../../static/images/bzns.png" mode=""></image>
						<text class="hidden">{{item.workorder}}</text>
					</view>
				</view>
				<view class="content-b" @click="toDetail(item.id)">
					<view class="content-b-c">
						<view class="content-b-c-l">审批结果</view>
						<view :class="[item.auditResult == 1? 'reject' : 'reject-b']">
							{{item.auditResult == 1 ? '审核通过' : '审核驳回'}}
						</view>
					</view>
					<view class="content-b-c">
						<view class="content-b-c-l">提交时间</view>
						<view class="content-b-c-r">{{item.replySubmitTime}}</view>
					</view>
					<view class="content-b-c">
						<view class="content-b-c-l">审核时间</view>
						<view class="content-b-c-r">{{item.approvalTime}}</view>
					</view>
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
					url: '/pages/workOrder/sp_notice_detail?id=' + id
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
		
		.hidden{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.hour {
			padding: 40rpx 0 24rpx 0;
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
				display: flex;
				justify-content: space-between;

				.content-t-l {
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

				.content-b-r {
					width: 60rpx;
					height: 34rpx;
					font-size: 24rpx;
					border-radius: 4rpx;
					font-weight: 400;
					text-align: center;
					line-height: 34rpx;
				}
			}


			.content-b {
				width: 100%;
				padding: 24rpx;
				background: #F5F6F9;
				box-sizing: border-box;
				border-radius: 8rpx;

				.content-b-c {
					font-size: 28rpx;
					font-weight: 400;
					display: flex;
					margin-bottom: 32rpx;

					.content-b-c-l {
						width: 172rpx;
						color: #606266;
					}

					.content-b-c-r {
						color: #303133;
					}

					.reject {
						color: #2DA641;
					}
					.reject-b {
						color: #EB4343;
					}
				}

				.content-b-c:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
