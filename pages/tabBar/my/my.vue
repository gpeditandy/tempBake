<template>
	<view>
		<view :style="'height:'+ statusBarHeight +'px'" style="background-color: #fff;"></view>
		<template v-if="isLogin">
			<view class="login px-2 py-4 d-flex a-center j-sb bg-white">
				<image src="/static/images/default.jpg" style="width: 180rpx;height: 180rpx;" mode=""
					class="rounded-circle mr-4"></image>
				<view class="d-flex flex-column flex-1">
					<text class="font-lg mb-2">{{realName}}-{{getUserIdentity(userType)}}</text>
					<text class="font-md text-muted">{{mobile}}</text>
				</view>
				<!-- <uni-icons type="forward" size="20" color="#C0C4CC"></uni-icons> -->
			</view>
		</template>
		<template v-else>
			<view class="login px-2 py-4 d-flex a-center j-sb bg-white">
				<image src="/static/images/unlogin.png" style="width: 180rpx;height: 180rpx;" mode=""
					class="rounded-circle mr-4"></image>
				<view class="d-flex flex-column flex-1">
					<text class="font-lg mb-2">未登录</text>
					<text class="font-md text-muted">登录查看个人信息</text>
				</view>
			</view>
		</template>
		<view class="my-2 bg-white rounded">
			<uni-list-item title="烟草种植问题咨询" showExtraIcon note="" showArrow clickable @click="navigate('feedBack')">
				<image slot="myicon" src="../../../static/images/myicon03.png"
					style="width: 40rpx;height: 40rpx;position: relative;top:5rpx;" mode=""></image>
				<view slot="rightIcon" class="text-muted mr-1">
					<uni-icons type="forward" color="#B2B2B2"></uni-icons>
				</view>
			</uni-list-item>
			<uni-list-item title="系统公告" showExtraIcon note="" showArrow clickable @click="navigate('announcement')">
				<image slot="myicon" src="../../../static/images/myicon02.png"
					style="width: 40rpx;height: 40rpx;position: relative;top:5rpx;" mode=""></image>
				<view slot="rightIcon" class="text-muted mr-1 d-flex a-center">
					<view v-if="unreadNum"
						class="rounded-circle bg-danger text-white d-flex a-center j-center font-sm mr-1"
						style="width: 40rpx;height: 40rpx;">{{unreadNum}}</view>
					<uni-icons type="forward" color="#B2B2B2"></uni-icons>
				</view>
			</uni-list-item>
			<uni-list-item title="知识库" showExtraIcon note="" showArrow clickable @click="navigate('knowledgeLib')">
				<image slot="myicon" src="../../../static/images/myicon01.png"
					style="width: 40rpx;height: 40rpx;position: relative;top:5rpx;" mode=""></image>
				<view slot="rightIcon" class="text-muted mr-1">
					<uni-icons type="forward" color="#B2B2B2"></uni-icons>
				</view>
			</uni-list-item>
			
			<uni-list-item title="关于智慧烟叶" showExtraIcon note="" showArrow clickable @click="navigate('aboutTobacco')">
				<image slot="myicon" src="../../../static/images/myicon04.png"
					style="width: 40rpx;height: 40rpx;position: relative;top:5rpx;" mode=""></image>
				<view slot="rightIcon" class="text-muted mr-1">
					<uni-icons type="forward" color="#B2B2B2"></uni-icons>
				</view>
			</uni-list-item>
			<uni-list-item title="检查更新" showExtraIcon note="" showArrow clickable @click="checkUpdate">
				<image slot="myicon" src="../../../static/images/myicon05.png"
					style="width: 40rpx;height: 40rpx;position: relative;top:5rpx;" mode=""></image>
				<view slot="rightIcon" class="text-muted mr-1">
					<text class="font mr-2">V{{version}}</text>
					<uni-icons type="forward" color="#B2B2B2"></uni-icons>
				</view>
			</uni-list-item>
			<uni-list-item title="退出" showExtraIcon note="" showArrow clickable @click="exit">
				<image slot="myicon" src="../../../static/images/exit.png"
					style="width: 40rpx;height: 40rpx;position: relative;top:5rpx;" mode=""></image>
				<view slot="rightIcon" class="text-muted mr-1">
					<uni-icons type="forward" color="#B2B2B2"></uni-icons>
				</view>
			</uni-list-item>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: null,
				statusBarHeight: 0,
				isLogin: false,
				mobile: '',
				realName: '',
				userType: null,
				unreadNum: 0
			}
		},
		onLoad() {
			let {
				statusBarHeight
			} = uni.getSystemInfoSync()
			this.statusBarHeight = statusBarHeight
			this.userInformation()
			plus.runtime.getProperty(plus.runtime.appid, (wgtInfo) => {
				this.version = wgtInfo.versionCode
				console.log(wgtInfo)
			})
		},
		onShow() {
			this.getUnreadNotice()
		},
		methods: {
			getUnreadNotice() {
				this.$H.get('sys/notice/mynotice/unread').then(res => {
					this.unreadNum = res.data
				}).catch(err => {
					console.log(err)
				})
			},
			userInformation() {
				//登录用户信息 身份(userType) 1--分公司管理员 2--烟站站长 3--下乡员 4--烟农
				this.$H.get('sys/user/info').then(res => {
					if (res.code == 401 || res.code != 0) {
						this.$message.error(res.msg)
						setTimeout((res) => {
							uni.redirectTo({
								url: '../../login/login'
							})
						}, 1000)
						return
					}
					this.isLogin = true
					this.mobile = res.data.mobile
					this.realName = res.data.realName
					this.userType = res.data.userType
				}).catch(err => {
					console.log(err)
				})
			},
			getUserIdentity(value) {
				switch (value) {
					case 1:
						return '公司管理员'
						break;
					case 2:
						return '站长'
						break;
					case 3:
						return '下乡员'
						break;
					case 4:
						return '烟农'
						break;	
					case 5:
						return '省级管理员'
						break;
				}
			},
			navigate(path) {
				if (!path) return
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				})
			},
			exit() {
				uni.showModal({
					title: '确定退出登录？',
					success(result) {
						if (result.confirm) {
							uni.removeStorageSync('token')
							uni.reLaunch({
								url: '../../login/login'
							})
						}
					}
				})
			},
			checkUpdate() {
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				this.$H.get('appupdate/getLatestVersion').then(res => {
					uni.hideLoading()
					if (res.code != 0) {
						return this.$message.error(res.msg)
					} else {
							if (res.data.version > this.version) {
								uni.showModal({
									title: '检测到新版本!',
									content: res.data.releaseNotes,
									success: res1 => {
										if (res1.confirm) {
											const downloadTask = plus.downloader.createDownload(
												res.data.url, {},
												function(d, status) {
													// 下载完成
													if (status == 200) {
														//下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
														var fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
														plus.runtime.openFile(d.filename); //选择软件打开文件
													} else {
														//下载失败
														plus.downloader.clear(); //清除下载任务
													}
												}
											);
											downloadTask.start();
											var progress = 0;
											var showLoading = plus.nativeUI.showWaiting('正在下载');
											downloadTask.addEventListener('statechanged', (task,
												status) => {
												{
													switch (task.state) {
														case 1:
															showLoading.setTitle("正在下载");
															break;
														case 2:
															showLoading.setTitle(
																"已连接到服务器");
															break;
														case 3:
															progress = parseInt((parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100);
															showLoading.setTitle('正在下载' + progress + '%');
															break;
														case 4:
															plus.nativeUI.closeWaiting();
															break;
													}
												}
											})
										} else {
											//此处用户点击取消，是否强更
											//plus.runtime.quit()
											return this.$message.error('你取消了更新')
										}
									}
								})
							} else {
								return this.$message.error('当前已是最高版本,无需更新!')
							}
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F2F3F5;
	}
</style>
