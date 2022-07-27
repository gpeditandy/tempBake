<template>
	<view class="container">
		<view class="headline">
			<view class="headline-t">{{initData.reportedBy}}的{{initData.farmingtime}}汇报</view>
			<view class="headline-b">
				<image src="../../static/images/icon_2.png" mode=""></image>
				<text>{{initData.deptName}}</text>
			</view>
		</view>
		<view class="content">
			<view class="content-b">
				<view class="content-b-c">
					<view class="content-b-c-l">汇报时间</view>
					<view class="content-b-c-r">{{initData.createDate}}</view>
				</view>
				<view class="content-b-c">
					<view class="content-b-c-l">确认农时</view>
					<view class="content-b-c-r">{{initData.farmingtimeConfirmedTime}}</view>
				</view>
				<view class="content-b-c">
					<view class="content-b-c-l">总用时</view>
					<view class="content-b-c-r">{{initData.totalTime}}</view>
				</view>
				<view class="content-b-c">
					<view class="content-b-c-l">关联工单</view>
					<view class="new-c">
						<view class="b-color" v-for="(item,index) in workorderMap" :key="index"  @click="toGD(item.workorderId)">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="content-b-c">
					<view class="content-b-c-l">工作总结</view>
					<view class="content-b-c-r">{{initData.remark}}</view>
				</view>
				<view class="content-b-c">
					<view class="content-b-c-l">站长对该农时生产流程及标准落实评分</view>
					<star-rating name='scoreNum' :score='initData.score'></star-rating>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import starRating from '@/components/star-rating/star-rating.vue'
	export default {
		components: {
			starRating
		},
		data() {
			return {
				id: '',
				realName: '', //发起人
				userStaus: '', //发起人--状态
				userType: '', //发起人--身份
				scoreNum: 2, //评分分
				initData: '',
				workorderMap: [],
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
				this.$H.get('sys/user/info', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.realName = res.data.realName
						this.userStaus = res.data.userType
						if (res.data.userType == 1) {
							this.userType = '(分公司管理员)'
						} else if (res.data.userType == 2) {
							this.userType = '(烟站站长)'
						} else if (res.data.userType == 3) {
							this.userType = '(下乡员)'
						} else if (res.data.userType == 4) {
							this.userType = '(烟农)'
						}
					}
				}).catch(err => {
					console.log(err)
				})
				//工作汇报详情
				this.$H.get('oa/app/workreport/' + this.id + '/info', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.initData = res.data
						this.workorderMap = res.data.workorderMap
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toGD(id){
				uni.navigateTo({
					url: '/pages/workOrder/launch_detail?id=' + id
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

		.headline {
			width: 100%;
			background: #FFFFFF;
			padding: 26rpx 40rpx;
			margin-bottom: 20rpx;
			box-sizing: border-box;

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
		}

		.content {
			padding: 16rpx;
			box-sizing: border-box;

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
						padding-right: 10rpx;
					}

					.content-b-c-r {
						width: 75%;
						color: #303133;
					}
					
					.new-c {
						width: 75%;
					}

					.b-color {
						width: 100%;
						color: #0977FF;
						margin-bottom: 20rpx;
					}
					
					.b-color:last-child{
						margin-bottom: 0;
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

						image {
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
		}
	}
</style>
