<template>
	<view class="container">
		<view class="content">
			<view class="warp" v-for="(item,index) in initData" :key="index">
				<block v-for="(itemP,indexP) in item" :key="indexP">
					<view class="warp-t">
						<view class="warp-t-l">{{indexP}}</view>
						<view class="warp-t-r" v-if="index == 0">
							<text @click="toClick(index)">{{openStatus ? '收起' : '展开'}}</text>
							<image v-if="openStatus" src="../../static/images/arrow-up.png" mode=""></image>
							<image v-else src="../../static/images/arrow-down.png" mode=""></image>
						</view>
						<view class="warp-t-r" v-if="index == 1">
							<text @click="toClick(index)">{{openStatus1? '收起' : '展开'}}</text>
							<image v-if="openStatus1" src="../../static/images/arrow-up.png" mode=""></image>
							<image v-else src="../../static/images/arrow-down.png" mode=""></image>
						</view>
						<view class="warp-t-r" v-if="index == 2">
							<text @click="toClick(index)">{{openStatus2? '收起' : '展开'}}</text>
							<image v-if="openStatus2" src="../../static/images/arrow-up.png" mode=""></image>
							<image v-else src="../../static/images/arrow-down.png" mode=""></image>
						</view>
					</view>
					<block v-for="(itemS,indexS) in itemP" :key="indexS">
						<block v-if="index == 0">
							<view class="warp-c" :class="[itemS.status==0?'wrap-c-w':'wrap-c-y']" v-if="openStatus">
								<view class="warp-c-l">{{itemS.name}}</view>
								<view class="warp-c-r">
									<text class="warp-c-r-text">{{itemS.date}}</text>
									<view class="warp-c-r-sure" :class="[itemS.status==0?'w-color':'y-color']">
										{{itemS.status == 0 ? '未确认' : '已确认'}}
									</view>
								</view>
							</view>
						</block>
						<block v-if="index == 1">
							<view class="warp-c" :class="[itemS.status==1?'wrap-c-y':'wrap-c-w']" v-if="openStatus1">
								<view class="warp-c-l">{{itemS.name}}</view>
								<view class="warp-c-r">
									<text class="warp-c-r-text">{{itemS.date}}</text>
									<view class="warp-c-r-sure" :class="[itemS.status==1?'y-color':'w-color']">
										{{itemS.status == 1 ? '已回复' : '未回复'}}
									</view>
									<view class="warp-c-r-sure c-color" @click="seeReply(itemS.id)"
										v-if="itemS.status == 1">查看回复</view>
								</view>
							</view>
						</block>
						<block v-if="index == 2">
							<view class="warp-c"
								:class="[itemS.status==0?'wrap-c-w':itemS.status==1?'wrap-c-y':'wrap-c-b']"
								v-if="openStatus2">
								<view class="warp-c-l">{{itemS.name}}</view>
								<view class="warp-c-r">
									<text class="warp-c-r-text">{{itemS.date}}</text>
									<view class="warp-c-r-sure"
										:class="[itemS.status==0?'w-color':itemS.status==1?'y-color':'b-color']">
										{{itemS.status == 0 ? '未完成' : itemS.status == 1 ? '审核通过' : '审核驳回'}}
									</view>
								</view>
							</view>
						</block>
					</block>
				</block>
			</view>

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
				initData: [],
				openStatus: false,
				openStatus1: false,
				openStatus2: false,
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
				this.$H.get("oa/app/workorder/" + this.id + '/progress/details', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.initData = res.data
						console.log('-----',this.initData);
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toClick(e) {
				if (e == 0) {
					this.openStatus = !this.openStatus
				} else if (e == 1) {
					this.openStatus1 = !this.openStatus1
				} else if (e == 2) {
					this.openStatus2 = !this.openStatus2
				}
			},
			seeReply(id) {
				uni.navigateTo({
					url: '/pages/workOrder/approval_detail?id=' + id
				})
			}
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

		.content {
			// min-height: 800rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			padding: 24rpx;

			.warp {
				.warp-t {
					padding: 18rpx;
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
							height: 34rpx;
							border-radius: 4rpx;
							font-size: 24rpx;
							font-weight: 400;
							padding: 4rpx 8rpx;
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

						.b-color {
							//驳回样式
							background: rgba(235, 67, 67, 0.1);
							color: #EB4343;
						}

						.c-color {
							margin-left: 10rpx;
							color: #0977FF;
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

				.wrap-c-b {
					//未确认样式
					border-left: 4rpx solid #EB4343;
				}
			}

		}
	}
</style>
