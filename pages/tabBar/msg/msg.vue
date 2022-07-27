<template>
	<view>
		<view hover-class="bg-light" class="iconfont d-flex a-center j-center font-lg"
			style="width: 100rpx;height: 100rpx;" :style="'top:'+statusBarHeight+'px'" @click="handleBack"></view>
		<view class="d-flex a-center j-sb py-2">
			<view class="d-flex a-center mr-2 font-md">
				<view class="lefticon bg-primary text-white font-sm mr-2">{{realName_z}}</view>
				<view class="d-flex a-center">
					<view class="nrsp">{{realName}}</view>
					<view class="myline mx-2"></view>
					<view class="stationmaster">{{userType}}</view>
				</view>
			</view>
			<text v-if="false" class="iconfont icon-zengjia font-lg font-weight" style="color: #323232;"></text>
		</view>
		<view class="timebg font text-muted py-2 d-flex a-center a-center" style="">
			<view class="d-flex a-center j-center w-50" @click="toChange(0)">
				<image class="img" src="../../../static/images/n-time.png" mode=""></image>
				<text>农时日历</text>
			</view>
			<view class="d-flex a-center j-center w-50" @click="toChange(1)">
				<image class="img" src="../../../static/images/daiban.png" mode=""></image>
				<text>待办事项</text>
			</view>
		</view>
		<!-- 内容审批 -->
		<view class="d-flex a-center j-sb py-2" hover-class="bg-light-secondary" v-for="(item,index) in initData"
			:key="index" @click="jump(item.type,item.title)">
			<view class="d-flex">
				<image v-if="item.type==0" class="imgs" src="../../../static/images/nstx.png" mode=""></image>
				<image v-if="item.type==1" class="imgs" src="../../../static/images/fqgd.png" mode=""></image>
				<image v-if="item.type==2" class="imgs" src="../../../static/images/gdtz.png" mode=""></image>
				<image v-if="item.type==3" class="imgs" src="../../../static/images/nrsp.png" mode=""></image>
				<image v-if="item.type==4" class="imgs" src="../../../static/images/sptz.png" mode=""></image>
				<image v-if="item.type==5" class="imgs" src="../../../static/images/gzhb.png" mode=""></image>
				<image v-if="item.type==6" class="imgs" src="../../../static/images/yzhb.png" mode=""></image>
				<view class="d-flex flex-column">
					<text class="nrsp mb-1">{{item.title}}</text>
					<view class="cont" v-if="item.unreadCount > 0">{{item.content}}</view>
					<view class="cont" v-else>点击查看</view>
				</view>
			</view>
			<view class="d-flex flex-column a-end">
				<text class="mb-1 ns-time">{{item.createDateFormat}}</text>
				<text style="width:40rpx;height: 40rpx;">
					<text class="rounded-circle font-sm bg-danger text-white d-flex a-center j-center"
						style="width:40rpx;height: 40rpx;" v-if="item.unreadCount > 0">{{item.unreadCount}}</text>
				</text>
			</view>
		</view>
		<view class="examine" v-if="false">审核驳回：您的工单完成申请被驳回</view>
		<view class="d-flex a-center j-center flex-column position-absolute left-0 right-0 bottom-300"
			v-if="initData.length == 0">
			<image src="../../../static/images/empty01.png" style="width: 280rpx;height: 230rpx;" mode=""></image>
			<text class="text-light-muted font-md">暂无消息通知</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				realName: '', //发起人
				realName_z: '', //发起人--截取字段
				userType: '', //发起人--身份
				userTypeStatus: '', //发起人--身份--状态
				initData: '', //消息列表
			}
		},
		onLoad() {
			let {
				statusBarHeight
			} = uni.getSystemInfoSync()
			this.statusBarHeight = statusBarHeight
		},
		onShow() {
			this.init();
		},
		methods: {
			// 消息类型:
			//0：农时提醒、1：烟站站长发起工单、2：下乡员收到工单通知、
			// 3：工单内容审批、4：审批结果通知、5：烟站站长工作汇报(站长) 6:(分公司)烟站汇报
			init() {
				//登录用户信息 身份(userType) 1--分公司管理员 2--烟站站长 3--下乡员 4--烟农
				this.$H.get('sys/user/info', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.realName = res.data.realName
						this.realName_z = this.realName.substring(this.realName.length - 2, this.realName.length)
						this.userTypeStatus = res.data.userType
						if (res.data.userType == 1) {
							this.userType = '(分公司管理员)'
						} else if (res.data.userType == 2) {
							this.userType = '(烟站站长)'
						} else if (res.data.userType == 3) {
							this.userType = '(下乡员)'
						} else if(res.data.userType == 4) {
							this.userType = '(烟农)'
						}
					}
				}).catch(err => {
					console.log(err)
				})
				//消息列表
				this.$H.get('oa/app/message/index', {}).then(res => {
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
			handleBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			toChange(type){
				if(type == 0){
					uni.navigateTo({
						url: '/pages/workOrder/ns_calendar'
					})
				} else if(type == 1){
					uni.navigateTo({
						url: '/pages/workOrder/db_matter'
					})
					// if(this.userTypeStatus == 2 || this.userTypeStatus == 3) {
					// 	uni.navigateTo({
					// 		url: '/pages/workOrder/db_matter'
					// 	})
					// } else {
					// 	this.$message.error('暂无权限')
					// }
				}
			},
			jump(type,title) {
				switch (type) {
					case 0:
						uni.navigateTo({
							url: '/pages/workOrder/agriculture?type=' + type + '&title=' + title
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/workOrder/launch_gd?type=' + type + '&title=' + title
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/workOrder/gd_notice?type=' + type + '&title=' + title
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/workOrder/approval?type=' + type + '&title=' + title
						})
						break;
					case 4:
						uni.navigateTo({
							url: '/pages/workOrder/sp_notice?type=' + type + '&title=' + title
						})
						break;
					case 5:
						uni.navigateTo({
							url: '/pages/workOrder/reportList?type=' + type + '&title=' + title
						})
						break;
					case 6:
						uni.navigateTo({
							url: '/pages/workOrder/reportList?type=' + type + '&title=' + title
						})
						break;
					default:

				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		font-family: 'PingFang SC';
		padding: 28rpx;
		box-sizing: border-box;
	}

	.lefticon {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 8rpx;
	}

	.myline {
		width: 1rpx;
		height: 30rpx;
		background-color: #ccc;
	}

	.timebg {
		background-color: #F6F5F8;
	}

	.img {
		width: 28rpx;
		height: 28rpx;
		margin-right: 12rpx;
	}

	.imgs {
		width: 92rpx;
		height: 92rpx;
		margin-right: 24rpx;
	}

	.stationmaster {
		font-size: 26rpx;
		font-weight: 400;
		color: #606266;
	}

	.nrsp {
		font-size: 32rpx;
		font-weight: bold;
		color: #303133;
	}

	.cont {
		width: 404rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #909399;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ns-time {
		font-size: 24rpx;
		font-weight: 400;
		color: #C0C4CC;
	}

	.examine {
		width: 100%;
		height: 40rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #909399;
		text-align: center;
		line-height: 40rpx;
		margin-top: 40rpx;
	}
</style>
