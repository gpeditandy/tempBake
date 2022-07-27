<template>
	<view class="container">
		<view :class="[type == 'gdtz'?'warp':'']">
			<view class="headline">
				<view class="headline-t">{{initData.organizer}}站长发起的工单</view>
				<view class="headline-b">
					<image src="../../static/images/icon_2.png" mode=""></image>
					<text>{{initData.deptName}}</text>
				</view>
				<block v-if="type == 'gdtz'">
					<view class="restore" v-if="replyInfo == ''">等待我回复</view>
					<view class="restore" v-if="replyInfo.status == 0">已回复，等待审核</view>
					<view class="restore-d" v-if="replyInfo.status == 1">
						<view class="restore-d-l finish">审核通过，该工单自动完成</view>
						<view class="restore-d-r" @click="statusDetail(replyInfo.id)">
							<text>查看详情 ></text>
						</view>
					</view>
					<view class="restore-d" v-if="replyInfo.status == 2">
						<view class="restore-d-l bh">回复内容被驳回</view>
						<view class="restore-d-r" @click="statusDetail(replyInfo.id)">
							<text>查看详情 ></text>
						</view>
					</view>
				</block>
			</view>
			<view class="content">
				<view class="content-t">{{initData.startTime}}开始 - {{initData.endTime}}结束</view>
				<view class="content-b">
					<view class="content-b-c">
						<view class="content-b-c-l">受理人</view>
						<view class="content-b-c-r">{{initData.assignee}}</view>
					</view>
					<view class="content-b-c">
						<view class="content-b-c-l">优先级</view>
						<view class="content-b-c-r">{{initData.priority}}</view>
					</view>
					<view class="content-b-c">
						<view class="content-b-c-l">工单备注</view>
						<view class="content-b-c-r">{{initData.remark?initData.remark:'暂无'}}</view>
					</view>
					<view class="content-b-l">
						<view class="standard">
							<image src="../../static/images/icon_5.png" mode=""></image>
							<text>生产标准</text>
						</view>
						<view class="standard-t" v-for="(item,index) in initData.outputPlanList" :key="index">{{item}}</view>
					</view>
				</view>
				<view class="content-b">
					<view class="content-b-c">
						<view class="content-b-c-l">工单编号</view>
						<view class="content-b-c-r">{{initData.id}}</view>
					</view>
					<view class="content-b-c">
						<view class="content-b-c-l">所属项目</view>
						<view class="content-b-c-r">{{initData.type}}</view>
					</view>
					<view class="content-b-c">
						<view class="content-b-c-l">工单主题</view>
						<view class="content-b-c-r">{{initData.topic}}</view>
					</view>
					<view class="content-b-c">
						<view class="content-b-c-l">发起人</view>
						<view class="content-b-c-r">{{initData.organizer}}</view>
					</view>
				</view>
				<block v-if="userStaus == 1 || userStaus == 2">
					<view class="content-s" v-if="type!='gdtz'">
						<view class="content-s-t">
							<view class="content-s-t-l">进度</view>
							<view class="content-s-t-r" @click="toDetail()">
								<image src="../../static/images/icon_1.png" mode=""></image>
								<text>明细</text>
							</view>
						</view>
						<!-- <mwg-logistics :info="info.data"></mwg-logistics> -->
						<view class="msg_z" v-for="(item,index) in progressInfo" :key="index">
							<view class="msg_z-t">{{item.label}}</view>
							<text>({{item.completedNum}}/{{item.subTotalNum}})</text>
						</view>
					</view>
				</block>
		</view>
			<block v-if="replyInfo == '' && type == 'gdtz'">
				<view class="lssue">
					<view class="lssue-t">
						<view class="lssue-t-l">
							<image src="../../static/images/bzns.png" mode=""></image>
							<text>无纸化单据，减少组织碳排放</text>
						</view>
					</view>
					<view class="button" @click="toReply()">回复并申请完成工单</view>
				</view>
			</block>
		</view>
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
					"data": {
						"data": [{
							"ftime": "2022-01-08 16:31:37",
							"context": "智慧烟叶平台发起农时提醒"
						}, {
							"ftime": "2022-01-06 18:48:47",
							"context": "站长确认消息"
						}],
					},
				},
				initData: '',
				replyInfo: '', //回复状态
				progressInfo: [], //进度
				userStaus: '', //发起人--身份状态
				type: '',
				id: '',
			}
		},
		onLoad(option){
			this.type = option.type
			this.id = option.id
		},
		onShow(){
			this.init();
		},
		methods: {
			init() {
				//详情数据
				this.$H.get("oa/app/workorder/" + this.id + '/info',
					{ }
				).then(res => {
					console.log(res)
					if(res.code == 0) {
						this.initData = res.data.workorderInfo
						this.replyInfo = res.data.workorderReplyInfo || []
						this.progressInfo = res.data.workorderProgressInfo
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
				//登录用户信息
				this.$H.get('sys/user/info',
					{}
				).then(res => {
					console.log(res)
					if(res.code == 0) {
						this.userStaus = res.data.userType
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toDetail() {
				uni.navigateTo({
					url: '/pages/workOrder/speed_detail?id=' + this.id
				})
			},
			statusDetail(id) {
				uni.navigateTo({
					url: '/pages/workOrder/sp_notice_detail?id=' + id
				})
			},
			toReply() {
				uni.navigateTo({
					url: '/pages/workOrder/reply_gd?id=' + this.id
				})
				return;
				// this.$H.post('oa/app/workorder/reply',{
				// 	workorderId: this.initData.id,
				// 	content: this.initData.remark
				// }).then(res => {
				// 	console.log(res)
				// 	if(res.code == 0) {
				// 		uni.navigateTo({
				// 			url: '/pages/workOrder/reply_gd?id=' + this.id
				// 		})
				// 	} else {
				// 		return this.$message.error(res.msg)
				// 	}
				// }).catch(err => {
				// 	console.log(err)
				// })
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

		view {
			box-sizing: border-box;
		}
		.warp{
			padding-bottom: 230rpx;
		}

		.headline {
			width: 100%;
			background: #FFFFFF;
			padding: 26rpx 40rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;

			.headline-t {
				font-size: 32rpx;
				font-weight: bold;
				color: #303133;
				margin-bottom: 16rpx;
			}

			.headline-b {
				font-size: 24rpx;
				font-weight: 400;
				color: #909399;
				display: flex;
				align-items: center;

				image {
					width: 28rpx;
					height: 28rpx;
					margin-right: 8rpx;
				}
			}
			.restore{
				font-size: 26rpx;
				font-weight: 400;
				color: #FF8E25;
				margin-top: 16rpx;
			}
			.restore-d{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 16rpx;
				.restore-d-l{
					font-size: 26rpx;
					font-weight: 400;
				}
				.bh{
					color: #EB4343;
				}
				.finish{
					color: #2DA641;
				}
				.restore-d-r{
					font-size: 26rpx;
					font-weight: 400;
					color: #0977FF;
				}
			}
		}

		.content {
			padding: 16rpx;

			.content-t {
				height: 80rpx;
				background: rgba(9, 119, 255, 0.08);
				border-radius: 8rpx 8rpx 0 0;
				font-size: 28rpx;
				font-weight: 400;
				color: #0977FF;
				text-align: center;
				line-height: 80rpx;
			}

			.content-b {
				width: 100%;
				box-sizing: border-box;
				margin-bottom: 28rpx;
				padding: 24rpx;
				background: #FFFFFF;
				border-radius: 8rpx;

				.content-b-c {
					font-size: 28rpx;
					font-weight: 400;
					display: flex;
					margin-bottom: 32rpx;

					.content-b-c-l {
						width: 25%;
						color: #606266;
					}

					.content-b-c-r {
						width: 75%;
						color: #303133;
					}
				}

				.content-b-c:last-child {
					margin-bottom: 0;
				}

				.content-b-l {
					width: 100%;
					padding: 16rpx;
					box-sizing: border-box;
					background: rgba(9, 119, 255, 0.08);
					font-size: 28rpx;
					font-weight: 400;

					.standard {
						color: #606266;
						font-weight: 400;
						margin-bottom: 20rpx;
						display: flex;
						align-items: center;
						image{
							width: 30rpx;
							height: 30rpx;
							margin-right: 16rpx;
						}
					}

					.standard-t {
						line-height: 46rpx;
						color: #303133;
					}
				}
			}

			.content-s {
				width: 100%;
				background: #FFFFFF;
				border-radius: 8rpx;
				padding: 20rpx;

				.content-s-t {
					display: flex;
					justify-content: space-between;
					margin-bottom: 44rpx;

					.content-s-t-l {
						height: 24rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #303133;
						padding-left: 8rpx;
						border-left: 6rpx solid #0977FF;
						line-height: 24rpx;
					}

					.content-s-t-r {
						display: flex;
						align-items: center;

						image {
							width: 24rpx;
							height: 24rpx;
							margin-right: 8rpx;
						}

						text {
							font-size: 24rpx;
							font-weight: 400;
							color: #0977FF;
						}
					}
				}
				.msg_z{
					padding: 18rpx;
					margin-bottom: 32rpx;
					box-sizing: border-box;
					background: #F5F6F9;
					display: flex;
					align-items: center;
					
					.msg_z-t{
						color: #303133;
						font-size: 30rpx;
						font-weight: 500;
					}
					
					text {
						font-size: 28rpx;
						color: #606266;
						font-weight: 400;
						margin-left: 10rpx;
					}
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
