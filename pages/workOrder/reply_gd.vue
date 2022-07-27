<template>
	<view class="container">
		<view class="content">
			<view style="background:#FFFFFF">
				<view class="pl-padding">
					<view class="title">
						<image src="../../static/images/icon_5.png" mode=""></image>
						<text>工单回复内容</text>
					</view>
					<textarea @blur="bindTextAreaBlur" v-model="content" placeholder='请输入' maxlength='-1' />
					<view class="modify" v-if="imgurl.length != 0">
						<view class="modify-t" v-for="item in imgurl">
							<image :src="item.toString()" mode="aspectFill" />
							<text class="iconfont icon-guanbi1 close" @click="close(item)"></text>
						</view>
					</view>
					<scroll-view class="bottomBox" scroll-x="true" v-if="false">
						<view class="file">
							<image src="../../static/images/bzns.png" mode=""></image>
							<text class="text">wx_camera10wx_camera10wx_camera10</text>
							<text class="iconfont icon-guanbi"></text>
						</view>
						<view class="file">
							<image src="../../static/images/bzns.png" mode=""></image>
							<text class="text">wx_camera10wx_camera10wx_camera10</text>
							<text class="iconfont icon-guanbi"></text>
						</view>
					</scroll-view>
				</view>
				<view class="content-b">
					<view class="content-b-l" @click="uploadImg(0)">
						<image src="../../static/images/tupian.png" mode=""></image>
						<text>图片</text>
					</view>
					<view class="content-b-l" @click="uploadImg(1)">
						<image src="../../static/images/wenjian.png" mode=""></image>
						<text>附件</text>
					</view>
				</view>
			</view>
		</view>
		<view class="lssue">
			<view class="lssue-t">
				<view class="lssue-t-l">
					<image src="../../static/images/bzns.png" mode=""></image>
					<text>无纸化单据，减少组织碳排放</text>
				</view>
			</view>
			<view class="button" @click="toReply()">确认回复</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				workorderId: '', //工单id
				echoId:'', //回显id
				content: '', //输入框的值
				imgurl: [], //上传图片
				attachments: [], //附件
			}
		},
		onLoad(option) {
			this.workorderId = option.id
			this.echoId = option.echoId
		},
		onShow(){
			this.init()
		},
		methods: {
			init(){
				//回显数据
				if(!this.echoId){
					return;
				}
				this.$H.get('oa/app/workorder/'+ this.echoId + '/reply/info', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.content = res.data.content
						this.attachments = res.data.attachments
						let array = []
						for(var i in res.data.images){
							array.push(res.data.images[i].split())
						}
						this.imgurl = array
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			bindTextAreaBlur(e) { //输入框的值
				this.content = e.detail.value
			},
			uploadImg(type) { //上传图片
				let header = {
					token: uni.getStorageSync('token') || '',
				}
				if (type == 0) {
					uni.chooseImage({
						success: (chooseImageRes) => {
							console.log('----', chooseImageRes)
							const tempFilePaths = chooseImageRes.tempFilePaths;
							for (var i in tempFilePaths) {
								uni.uploadFile({
									url: this.$config.baseURL + 'oa/app/workorder/reply/upload',
									filePath: tempFilePaths[i],
									name: 'file',
									header,
									formData: {},
									success: (res) => {
										console.log(res);
										var path_str = JSON.parse(res.data)
										console.log(path_str);
										if (path_str.code == 0) {
											this.newImg = path_str.data.src
											let array = []
											array.push(path_str.data.src)
											this.imgurl.push(array)
											console.log(this.imgurl);
										} else {
											uni.showToast({
												title: path_str.message,
												icon: 'none'
											})
										}
									}
								});
							}
						}
					})
				} else if (type == 1) {
					this.$message.success('敬请期待')
				}
			},
			close(e) { //删除图片
				console.log(e);
				for (var i in this.imgurl) {
					if (this.imgurl[i] == e) {
						this.imgurl.splice(i, 1);
					}
				}
			},
			toReply() { //确认回复
				if(this.content == ''){
					uni.showToast({
						title: '请输入内容',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				var images = []
				for(var i in this.imgurl){
					for(var j in this.imgurl[i]){
						images.push(this.imgurl[i][j])
					}
				}
				this.$H.post('oa/app/workorder/reply', {
					workorderId: this.workorderId,
					content: this.content,
					attachments: this.attachments || [],
					images: images || [],
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.$message.success('回复成功')
						uni.reLaunch({
							url: '/pages/tabBar/msg/msg'
						})
					} else {
						this.$message.error(res.msg)
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
		box-sizing: border-box;
	}

	.container {
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
			}

			.bottomBox {
				width: 100%;
				height: 100%;
				white-space: nowrap;
				margin-bottom: 14rpx;

				.commodity {
					width: 176rpx;
					height: 176rpx;
					display: inline-block;
					margin-right: 22rpx;

					image {
						width: 100%;
						height: 100%;
					}

					.close {
						position: absolute;
						top: 28rpx;
					}
				}

				.file {
					background: #F5F6F9;
					border-radius: 4rpx;
					display: inline-block;
					margin-right: 22rpx;
					padding: 14rpx;

					image {
						width: 20rpx;
						height: 18rpx;
						margin-right: 6rpx;
						margin-bottom: 4rpx;
					}

					.text {
						width: 262rpx;
						height: 100%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 26rpx;
						font-weight: 400;
						color: #606266;
						margin-right: 6rpx;
						display: inline-block;
					}

					.iconfont {
						font-size: 12rpx;
					}
				}
			}

			.modify {
				margin-top: 20rpx;
				display: flex;
				overflow-x: auto;

				.modify-t {
					width: 176rpx;
					height: 210rpx;
					margin-right: 14rpx;
					padding-top: 20rpx;
					box-sizing: border-box;

					image {
						width: 176rpx;
						height: 176rpx;
					}

					.close {
						font-size: 28rpx;
						position: relative;
						bottom: 210rpx;
						left: 160rpx;
					}
				}
			}

			.content-b {
				padding: 16rpx;
				display: flex;
				align-items: center;
				border-top: 2rpx solid rgb(228, 231, 237);

				.content-b-l {
					margin-right: 40rpx;
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}

					text {
						font-size: 30rpx;
						font-weight: 500;
						color: #0977FF;
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
