<template>
	<view class="container">
		<view style="padding: 20rpx 16rpx 230rpx 16rpx">
			<view class="content">
				<view class="content-t">
					<view class="content-t-b">{{initData.remark}}</view>
				</view>
				<view class="warp" v-if="userTypeStatus== 1 || userTypeStatus == 2">
					<view class="warp-t">
						<view class="warp-t-l">
							{{userTypeStatus==1?'站长':'下乡员'}}确认消息<text>({{initData.obj.confirmedNum}}/{{initData.obj.subNum}})</text>
						</view>
						<view class="warp-t-r">
							<text @click="toClick()">{{openStatus?'收起':'展开'}}</text>
							<image v-if="openStatus" src="../../static/images/arrow-up.png" mode=""></image>
							<image v-else src="../../static/images/arrow-down.png" mode=""></image>
						</view>
					</view>
					<block v-if="openStatus">
						<view class="warp-c" :class="[item.status==0?'wrap-c-w':'wrap-c-y']"
							v-for="(item,index) in initData.obj.list">
							<view class="warp-c-l">{{item.name}}</view>
							<view class="warp-c-r">
								<text class="warp-c-r-text">{{item.date}}</text>
								<view class="warp-c-r-sure" :class="[item.status==0?'w-color':'y-color']">
									{{item.status==0?'未确认':'已确认'}}
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="lssue" v-if="userTypeStatus == 2 && !initData.isReported">
			<view class="lssue-t">
				<view class="lssue-t-l">
					<image src="../../static/images/bzns.png" mode=""></image>
					<text>无纸化单据，减少组织碳排放</text>
				</view>
			</view>
			<view class="button" @click="toHB()">向分公司进行工作汇报</view>
		</view>
		<!-- <mwg-logistics :info="info.data"></mwg-logistics> -->
	</view>
</template>

<script>
	import mwgLogistics from '@/components/mwg-logistics/mwg-logistics.vue'
	export default {
		components: {
			mwgLogistics
		},
		data() {
			return {
				info: {
					"success": true,
					"message": "查询成功",
					"data": {
						"com": "shunfeng",
						"ischeck": "1",
						"condition": "F00",
						"nu": "SF1343865432107",
						"state": "3",
						"message": "ok",
						"status": "200",
						"data": [{
							"ftime": "2022-01-08 16:31:37",
							"context": "智慧烟叶平台发起农时提醒"
						}, {
							"ftime": "2022-01-06 18:48:47",
							"context": "站长确认消息"
						}],
					},
					"timestamp": 1641965811379
				},
				id: '',
				realName: '',
				userType: '', //身份
				userTypeStatus: '', //发起人--身份--状态
				initData: '',
				openStatus: false,
			}
		},
		onLoad(option) {
			this.id = option.id
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				//登录用户信息
				// 身份(userType) 1--分公司管理员 2--烟站站长 3--下乡员 4--烟农
				this.$H.get('sys/user/info', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.realName = res.data.realName
						this.userTypeStatus = res.data.userType
						if (res.data.userType == 1) {
							this.userType = '分公司管理员'
						} else if (res.data.userType == 2) {
							this.userType = '烟站站长'
						} else if (res.data.userType == 3) {
							this.userType = '下乡员'
						}
					}
				}).catch(err => {
					console.log(err)
				})
				this.$H.get('oa/app/farmingtime/' + this.id, {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.initData = res.data
						uni.setNavigationBarTitle({
							title: res.data.type + '生产进度'
						})
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toClick() {
				this.openStatus = !this.openStatus
			},
			toHB() {
				uni.navigateTo({
					url: '/pages/workOrder/report?farmingTimeCategory=' + this.initData.type + '&id=' + this.id
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
		// padding: 20rpx 16rpx;

		.content {
			background: #FFFFFF;
			border-radius: 8rpx;
			box-sizing: border-box;
			padding: 24rpx;


			.content-t {
				width: 100%;
				height: 240rpx;
				background-image: url('../../static/images/bz-time.png');
				background-size: 100% 100%;
				font-size: 30rpx;
				font-weight: 400;
				color: #FFFFFF;
				padding: 70rpx 300rpx 40rpx 32rpx;
				box-sizing: border-box;

				.content-t-b {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
			}

			.warp {
				.warp-t {
					padding: 18rpx;
					margin-top: 44rpx;
					margin-bottom: 32rpx;
					box-sizing: border-box;
					background: #F5F6F9;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.warp-t-l {
						color: #303133;
						font-size: 30rpx;
						font-weight: 500;

						text {
							font-size: 28rpx;
							color: #606266;
							font-weight: 400;
							margin-left: 10rpx;
						}
					}

					.warp-t-r {
						font-size: 24rpx;
						font-weight: 400;
						color: #0977FF;
						display: flex;
						align-items: center;

						image {
							width: 12rpx;
							height: 8rpx;
							margin-left: 8rpx;
						}
					}
				}

				.warp-c {
					margin-bottom: 32rpx;
					display: flex;
					justify-content: space-between;
					// padding: 10rpx 0 10rpx 20rpx;
					padding-left: 20rpx;

					.warp-c-l {
						font-size: 28rpx;
						font-weight: 400;
						color: #303133;
					}

					.warp-c-r {
						display: flex;
						align-items: center;

						.warp-c-r-text {
							font-size: 24rpx;
							font-weight: 400;
							color: #606266;
							margin-right: 10rpx;
						}

						.warp-c-r-sure {
							width: 88rpx;
							height: 34rpx;
							border-radius: 4rpx;
							font-size: 24rpx;
							font-weight: 400;
							padding: 4rpx;
							text-align: center;
						}

						.y-color {
							//已确认样式
							background: rgba(45, 166, 65, 0.1);
							color: #2DA641;
						}

						.w-color {
							//未确认样式
							background: rgba(255, 142, 37, 0.1);
							color: #FF8E25;
						}
					}
				}

				.wrap-c-y {
					//已确认样式
					border-left: 4rpx solid #2DA641;
				}

				.wrap-c-w {
					//未确认样式
					border-left: 4rpx solid #FF8E25;
				}
			}

		}

		.lssue {
			width: 100%;
			background: #FFFFFF;
			padding: 20rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: fixed;
			bottom: 0;

			.lssue-t {
				margin-bottom: 12rpx;

				.lssue-t-l {
					display: flex;
					justify-content: center;

					image {
						width: 34rpx;
						height: 34rpx;
						margin-right: 10rpx;
					}

					text {
						font-size: 24rpx;
						font-weight: 400;
						color: #606266;
					}
				}
			}

			.button {
				width: 100%;
				height: 80rpx;
				background: #0977FF;
				color: #FFFFFF;
				font-size: 30rpx;
				border-radius: 8rpx;
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
</style>
