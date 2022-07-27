<script>
	export default {
		data() {
			return {
				version: null
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			this.$util.onNetWork()
			plus.runtime.getProperty(plus.runtime.appid, (wgtInfo) => {
				this.version = wgtInfo.versionCode
			})
			this.checkUpdate()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			checkUpdate() {
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				this.$H.get('appupdate/getLatestVersion').then(res => {
					console.log(res)
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
								// return this.$message.error('当前已是最高版本,无需更新!')
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
	/*每个页面公共css */
	/*官方CSS库*/
	@import './common/uni.css';
	/*自定义图标库*/
	@import './common/icon.css';
	/*引入animate.css动画库*/
	@import './common/animate.css';
	/*自定义样式库*/
	@import './common/zcm-main.css';
	/*全局样式库*/
	@import './common/common.css';
	.myfeedback .uni-collapse-item__wrap{padding:0 30rpx;}
</style>
