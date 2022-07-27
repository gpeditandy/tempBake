<template>
	<view class="container">
		<view class="headline">
			<view class="headline-t">{{initData.reqCompleteUser}}申请完成工单</view>
			<view class="headline-b">
				<view class="headline-b-l">
					<view class="headline-b-l-t">
						<image src="../../static/images/icon_3.png" mode=""></image>
						<text>{{initData.workorderTitle}}</text>
					</view>
					<view class="headline-b-l-r" v-if="initData.auditStatus == 0">等待我处理</view>
					<view class="headline-b-l-r" v-if="initData.auditStatus == 1">审核通过，该工单自动完成</view>
					<view class="headline-b-l-r" v-if="initData.auditStatus == 2">回复内容被驳回</view>
				</view>
				<view class="headline-b-r">
					<image v-if="initData.auditStatus == 0" src="../../static/images/icon_8.png" mode=""></image>
					<image v-if="initData.auditStatus == 1" src="../../static/images/icon_10.png" mode=""></image>
					<image v-if="initData.auditStatus == 2" src="../../static/images/icon_9.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="content">
			<view style="background:#FFFFFF">
				<view class="pl-padding">
					<view class="title">
						<image src="../../static/images/icon_5.png" mode=""></image>
						<text>工单回复内容</text>
					</view>
					<textarea v-model="content" placeholder='暂无内容' maxlength='-1' disabled auto-height />
					<view class="modify" v-if="imgurl.length != 0">
						<view class="modify-t" v-for="(item,index) in imgurl" :key="index">
							<image @click="toImage(item,index)" :src="item" mode="aspectFill" />
						</view>
					</view>
				</view>
			</view>
			<view class="file"><strong></strong>
				<view class="file-t">
					<image src="../../static/images/wenjian_1.png" mode=""></image>
					<text>附件</text>
				</view>
				<view class="file-b" v-if="false">
					<text>Video486133512.mp4</text>
					<text class="file-blue">下载</text>
				</view>
				<view class="file-b">暂无~</view>
			</view>
		</view>
		<view class="lssue_s" v-if="initData.auditStatus == 0">
			<view class="lssue_s-l" @click="toDeteil()">
				<image src="../../static/images/icon_4.png" mode=""></image>
				<text>原始工单内容 ></text>
			</view>
			<view class="lssue_s-r">
				<view class="lssue_s-r-l" @click="toChange(2)">驳回</view>
				<view class="lssue_s-r-r" @click="toChange(1)">同意</view>
			</view>
		</view>
		<view class="lssue" @click="toDeteil()" v-if="initData.auditStatus == 1">
			<image src="../../static/images/icon_4.png" mode=""></image>
			<text>原始工单内容 ></text>
		</view>
		<view class="lssue_s" v-if="initData.auditStatus == 2">
			<view class="lssue_s-l" @click="toDeteil()">
				<image src="../../static/images/icon_4.png" mode=""></image>
				<text>原始工单内容 ></text>
			</view>
			<view class="lssue_s-s">
				<view class="lssue_s-s-r" @click="toChange(3)">修改重新提交</view>
			</view>
		</view>

		<uni-popup ref="rejectPopup" type="bottom">
			<view class="popup" @touchmove.prevent.stop>
				<view class="popup-header">
					<text class="tit">驳回申请</text>
					<text class="bh" @click="closePopup()">确认驳回</text>
				</view>
				<view class="popup-cont">
					<textarea v-model="reason" @blur="textAreaBlur" placeholder='请输入驳回理由' maxlength='-1' />
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				workorderId: '', //工单id
				content: '我是备注备注备注备注备注', //输入框的值
				imgurl: [], //上传图片
				attachments: [], //附件
				realName: '', //发起人
				userType: '', //发起人--身份
				reason: '', //驳回理由
				remark: '', //驳回理由(传值)
				initData: '',
			}
		},
		onLoad(option) {
			this.workorderId = option.id
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				//登录用户信息   身份(userType) 1--分公司管理员 2--烟站站长 3--下乡员
				this.$H.get('sys/user/info', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.realName = res.data.realName
						if (res.data.userType == 1) {
							this.userType = '(分公司管理员)'
						} else if (res.data.userType == 2) {
							this.userType = '(烟站站长)'
						} else if (res.data.userType == 3) {
							this.userType = '(下乡员)'
						}
					}
				}).catch(err => {
					console.log(err)
				})
				this.$H.get('oa/app/workorder/' + this.workorderId + '/approval/info', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.initData = res.data
						this.imgurl = res.data.images
						this.content = res.data.replyContent
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toDeteil() {
				uni.navigateTo({
					url: '/pages/workOrder/launch_detail?id=' + this.initData.workorderId
				})
			},
			toChange(e) {
				let auditStatus = ''
				if (e == 1) { //通过
					auditStatus = 1
				} else if (e == 2) { //驳回
					auditStatus = 2
					this.$refs.rejectPopup.open();
					if (this.remark == '') {
						return;
					}
				} else if (e == 3) { //修改重新提交
					uni.navigateTo({
						url: '/pages/workOrder/reply_gd?id=' + this.initData.workorderId
					})
					return;
				}
				let data = {
					id: this.workorderId,
					remark: this.remark,
					auditStatus: auditStatus,
				}
				this.$H.post('oa/app/workorder/approval',
					data
				).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.$message.success('操作成功')
						uni.reLaunch({
							url: '/pages/tabBar/msg/msg'
						})
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			closePopup() {
				this.remark = this.reason
				if (this.remark == '') {
					uni.showToast({
						title: '请输入驳回内容',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				this.$refs.rejectPopup.close();
				this.toChange(2)
			},
			textAreaBlur(e) {
				this.reason = e.detail.value
			},
			toImage(e, i) {
				console.log(e, i);
				let imgs = this.imgurl.map(item => {
					return item
				})
				console.log(imgs);
				uni.previewImage({ //预览图片
					urls: imgs,
					current: i,
					longPressActions: {
						itemList: ['保存图片'],
						success: function(data) {
							plus.nativeUI.closePreviewImage(); //关闭预览图片
							if (data.tapIndex == 0) {
								uni.saveImageToPhotosAlbum({ //保存到相册
									filePath: imgs[data.index],
									success: () => {
										uni.showToast({
											title: "已存至系统相册",
											icon: "success",
										});
									},
									fail: (err) => {
										uni.showToast({
											title: "保存失败",
											icon: "error",
										});
									}
								});
							}
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F6F9;
		font-family: 'PingFang SC';
		box-sizing: border-box;
	}

	.container {
		.headline {
			padding: 24rpx 40rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;

			.headline-t {
				font-size: 32rpx;
				font-weight: bold;
				color: #303133;
				margin-bottom: 16rpx;
			}

			.headline-b {
				display: flex;
				justify-content: space-between;

				.headline-b-l {
					.headline-b-l-t {
						display: flex;
						align-items: center;
						margin-bottom: 16rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #909399;

						image {
							width: 28rpx;
							height: 28rpx;
							margin-right: 10rpx;
						}
					}

					.headline-b-l-r {
						font-size: 26rpx;
						font-weight: 400;
						color: #FF8E25;
					}

				}

				.headline-b-r {
					width: 148rpx;
					height: 148rpx;
					position: absolute;
					right: 40rpx;
					top: 60rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.content {
			margin: 20rpx;
			padding-bottom: 230rpx;
			box-sizing: border-box;

			.pl-padding {
				padding: 16rpx;
			}

			.title {
				margin-bottom: 24rpx;
				display: flex;
				align-items: center;

				image {
					width: 28rpx;
					height: 28rpx;
					margin-right: 20rpx;
				}

				text {
					font-size: 28rpx;
					font-weight: 400;
					color: #606266;
				}
			}

			textarea {
				width: 100%;
				height: 516rpx;
				margin-bottom: 40rpx;
				font-size: 28rpx;
				font-weight: 400;
			}

			.modify {
				margin-top: 20rpx;
				display: flex;
				overflow-x: auto;

				.modify-t {
					width: 218rpx;
					height: 250rpx;
					margin-right: 10rpx;
					padding-top: 20rpx;
					box-sizing: border-box;

					image {
						width: 218rpx;
						height: 218rpx;
					}
				}
			}

			.file {
				padding: 22rpx;
				box-sizing: border-box;
				margin: 20rpx 0;
				background: #FFFFFF;
				border-radius: 8rpx;

				.file-t {
					margin-bottom: 16rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #606266;
					display: flex;
					align-items: center;

					image {
						width: 28rpx;
						height: 28rpx;
						margin-right: 16rpx;
					}
				}

				.file-b {
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					font-weight: 400;
					color: #303133;
					margin-bottom: 30rpx;
				}

				.file-blue {
					color: #0977FF;
				}

				.file-b:last-child {
					margin-bottom: 0;
				}
			}
		}

		.lssue_s {
			width: 100%;
			padding: 16rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;

			.lssue_s-l {
				width: 50%;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 34rpx;
					height: 34rpx;
					margin-right: 10rpx;
				}

				text {
					font-size: 30rpx;
					font-weight: 500;
					color: #0977FF;
				}
			}

			.lssue_s-r {
				width: 50%;
				display: flex;
				justify-content: center;
				align-items: center;

				.lssue_s-r-l {
					width: 192rpx;
					height: 80rpx;
					border: 2rpx solid #0977FF;
					border-radius: 8rpx 0rpx 0rpx 8rpx;
					font-size: 30rpx;
					font-weight: 500;
					color: #0977FF;
					text-align: center;
					line-height: 80rpx;
				}

				.lssue_s-r-r {
					width: 192rpx;
					height: 84rpx;
					background: #0977FF;
					border-radius: 0rpx 8rpx 8rpx 0rpx;
					font-size: 30rpx;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
					line-height: 84rpx;
				}
			}

			.lssue_s-s {
				width: 50%;

				.lssue_s-s-r {
					width: 100%;
					height: 80rpx;
					background: #0977FF;
					border-radius: 8rpx;
					font-size: 30rpx;
					font-weight: 500;
					color: #ffffff;
					text-align: center;
					line-height: 80rpx;
				}
			}
		}

		.lssue {
			width: 100%;
			background: #FFFFFF;
			padding: 30rpx;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 34rpx;
				height: 34rpx;
				margin-right: 10rpx;
			}

			text {
				font-size: 30rpx;
				font-weight: 500;
				color: #0977FF;
			}
		}

		.popup {
			background: #F2F3F5;
			border-radius: 32rpx 32rpx 0 0;

			.popup-header {
				padding: 30rpx 30rpx 30rpx 35%;
				display: flex;
				justify-content: space-between;

				.til {
					font-size: 32rpx;
					font-weight: bold;
					color: #303133;
				}

				.bh {
					font-size: 30rpx;
					font-weight: 500;
					color: #0977FF;
				}
			}

			.popup-cont {
				height: 600rpx;
				padding: 20rpx 30rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #303133;

				textarea {
					width: 100%;
					height: 100%;
				}
			}
		}

	}
</style>
