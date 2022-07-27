<template>
	<view>
		<view class="p-2">
			<view class="d-flex a-center j-center">
				<video class="w-100" 
				style="height: 500rpx;" 
				id="myVideo"
				:src="videoSrc"
				autoplay="true" loop="true" controls="true"></video>
			</view>
			<view class="d-flex a-center j-center mt-2 flex-column">
				<view class="control-bg position-relative">
					<image @click="handleUp" src="../../static/images/control-up.png" class="position-absolute" style="width: 334rpx;height: 190rpx;left:93rpx;top:20rpx;" mode=""></image>
					<image @click="handleRight" src="../../static/images/control-right.png" class="position-absolute" style="width: 190rpx;height: 334rpx;top:93rpx;right:20rpx;" mode=""></image>
					<image @click="handleBottom" src="../../static/images/control-down.png" class="position-absolute" style="width: 334rpx;height: 190rpx;left:93rpx;bottom:30rpx;" mode=""></image>
					<image @click="handleLeft" src="../../static/images/control-left.png" class="position-absolute" style="width: 190rpx;height: 334rpx;top:93rpx;left:20rpx;" mode=""></image>
				</view>
				<view class="d-flex a-center j-sb mt-4">
					<view class="mynear border rounded16 mr-1 bg-white d-flex a-center j-center px-5 py-3 font-md box-shadower"
						style="width: 200rpx;" @click="handleNear">
						<image style="width:40rpx;height: 40rpx;" src="../../static/images/control-big.png" mode=""></image>
						<text class="text-primary ml-1 font-weight">放大/拉近</text>
					</view>
					<view class="myfar border rounded16 ml-1 bg-white d-flex a-center j-center px-5 py-3 font-md box-shadower"
						style="width: 200rpx;" @click="handleFar">
						<image style="width:40rpx;height: 40rpx;" src="../../static/images/control-small.png" mode=""></image>
						<text class="text-primary ml-1 font-weight">缩小/拉远</text>
					</view>
				</view>
			</view>
			<!-- <view class="d-flex a-center j-center flex-column  m-1">
				<view class="arrow-box">
					<view class="up-arrow" @click="handleUp"></view>
					<view class="right-arrow" @click="handleRight"></view>
					<view class="bottom-arrow" @click="handleBottom"></view>
					<view class="left-arrow" @click="handleLeft"></view>
				</view>
				<view class="d-flex a-center j-sb my-4">
					<view class="mynear border rounded16 mr-3 bg-white d-flex a-center j-center px-5 py-3 font-md"
						style="width: 200rpx;" @click="handleNear">
						<image style="width:44rpx;height: 40rpx;" src="../../static/images/plus.png" mode=""></image>
						<text class="text-primary ml-1">放大/拉近</text>
					</view>
					<view class="myfar border rounded16 ml-3 bg-white d-flex a-center j-center px-5 py-3 font-md"
						style="width: 200rpx;" @click="handleFar">
						<image style="width:44rpx;height: 40rpx;" src="../../static/images/reduce.png" mode=""></image>
						<text class="text-primary ml-1">缩小/拉远</text>
					</view>
				</view>
			</view> -->
		</view>
		<uni-popup ref="popup" type="bottom">
			<view style="max-height: 500rpx;min-height: 200rpx;overflow: auto;" class="bg-white p-2">
				<view class="d-flex a-center j-sb p-2 border-bottom-mycolor" v-for="(item, index) in camerasList" :key="index" @click="itemHandle(item, index)">
					<image v-if="item.status==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" mode=""></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 36rpx;" mode=""></image>
					<text class="font-md flex-1 ml-2 position-relative" :class="{primary: activedIndex === index}" style="height: 50rpx;top:4rpx;">{{item.cameraName}}</text>
					<text class="font-md mr-2">{{item.cameraId}}</text>
					<icon v-if="activedIndex === index" type="success_no_circle" size="24" color="#0195ff" />
					<icon v-else type="success_no_circle" size="24" color="#fff" />
				</view>
				<!-- <view class="d-flex a-center j-sb text-center">
					<text class="w-50 py-2">取消</text>
					<text class="text-white w-50 bg-primary rounded8 py-2">确定</text>
				</view> -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cameraIds:[],
				cameraId:'',
				cameraIdGroth:'',
				cameraIdCollect:'',
				camerasList:[],
				videoSrc:'',
				tempSrc:'',
				myPlayer: null,
				activedIndex: -1,
				vedioArr:[],
				vedioIndex:0,
				dirForm: {
					channelId: "0", //通道号 默认0
					deviceId: "", //设备编号
					duration: 500, //移动持续时间，单位毫秒
				},
				operation: null //操作行为：0-上，1-下，2-左，3-右，4-左上，5-左下，6-右上，7-右下，8-放大，9-缩小，10-停止
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
			if (e.index == 1) {
				this.$refs.popup.open()
			}
		},
		onLoad(e) {
			// 来自育苗棚
			if(JSON.stringify(e.cameraIds)!='{}' && JSON.stringify(e.currentCameraId)) {
				this.cameraIds =JSON.parse(e.cameraIds)
				this.dirForm.deviceId = e.currentCameraId
				console.log(e.currentCameraId)
				this.getCamerasListDetail()
			}
			// 来自长势监测
			if(e.cameraIdGroth) {
				this.cameraIdGroth = e.cameraIdGroth
				this.dirForm.deviceId = e.cameraIdGroth
				this.getCameraDetailFromGrouth()
			}
			// 来自智能采收
			if(e.cameraIdCollect) {
				this.cameraIdCollect = e.cameraIdCollect
				this.dirForm.deviceId = e.cameraIdCollect
				this.getCameraDetailFromCollect()
			}
		},
		methods: {
			itemHandle(value, index) {
				this.activedIndex = index
				this.cameraId = value.cameraId
				this.dirForm.deviceId = value.cameraId
				this.$refs.popup.close()
				this.getCameraDetailByCameraId()
			},
			handleUp() {
				console.log("上移")
				uni.showLoading({
					title: '数据加载中...',
					mask: true
				})
				this.operation = 0
				this.$H.post('imoucloud/controlMovePTZ', {
					...this.dirForm,
					operation: this.operation
				}).then(res => {
					uni.hideLoading()
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
					}
					
				})
			},
			handleRight() {
				console.log("右移")
				uni.showLoading({
					title: '数据加载中...',
					mask: true
				})
				this.operation = 3
				this.$H.post('imoucloud/controlMovePTZ', {
					...this.dirForm,
					operation: this.operation
				}).then(res => {
					uni.hideLoading()
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
					}
				})
			},
			handleBottom() {
				console.log("下移")
				uni.showLoading({
					title: '数据加载中...',
					mask: true
				})
				this.operation = 1
				this.$H.post('imoucloud/controlMovePTZ', {
					...this.dirForm,
					operation: this.operation
				}).then(res => {
					uni.hideLoading()
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
					}
				})
			},
			handleLeft() {
				console.log("左移")
				uni.showLoading({
					title: '数据加载中...',
					mask: true
				})
				this.operation = 2
				this.$H.post('imoucloud/controlMovePTZ', {
					...this.dirForm,
					operation: this.operation
				}).then(res => {
					uni.hideLoading()
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
					}
				})
			},
			handleNear() {
				console.log("拉近")
				uni.showLoading({
					title: '数据加载中...',
					mask: true
				})
				this.operation = 8
				this.$H.post('imoucloud/controlMovePTZ', {
					...this.dirForm,
					operation: this.operation
				}).then(res => {
					uni.hideLoading()
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
					}
				})
			},
			handleFar() {
				console.log("拉远")
				uni.showLoading({
					title: '数据加载中...',
					mask: true
				})
				this.operation = 9
				this.$H.post('imoucloud/controlMovePTZ', {
					...this.dirForm,
					operation: this.operation
				}).then(res => {
					uni.hideLoading()
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
					}
				})
			},
			// 育苗棚摄像头列表
			getCamerasListDetail() {
				this.$H.get('seedling/seedlingshed/getCameraList',{
					page:1,
					limit:20,
					cameraIds:this.cameraIds
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						if(res.data.list.length>0) {
							this.camerasList = res.data.list
							console.log(this.camerasList)
							let tempLiveUrl = res.data.list.filter(item => item.cameraId== this.dirForm.deviceId)
							this.videoSrc = tempLiveUrl[0].liveUrl
						}
					}
				})
			},
			// 长势监测摄像头列表
			getCameraDetailFromGrouth() {
				this.$H.get('zhangshi/zhangshi/page',{
					page:1,
					limit:10
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						if(res.data.list.length>0) {
							this.camerasList = res.data.list
							let tempLiveUrl = this.camerasList.filter(item => item.cameraId == this.cameraIdGroth)
							this.videoSrc = tempLiveUrl[0].liveUrl
						}
					}
				})
			},
			// 智能采收摄像头列表
			getCameraDetailFromCollect() {
				this.$H.get('caishou/caishou/page',{
					page:1,
					limit:10
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						if(res.data.list.length>0) {
							this.camerasList = res.data.list
							let tempLiveUrl = this.camerasList.filter(item => item.cameraId == this.cameraIdCollect)
							this.videoSrc = tempLiveUrl[0].liveUrl
						}
					}
				})
			},
			getCameraDetailByCameraId() {
				this.$H.get('seedling/seedlingshed/cameraInfo',{
					cameraId:this.cameraId
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						this.videoSrc = res.data.liveUrl 
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.mynear:active {
		background-color: #F5F4F4 !important;
	}

	.myfar:active {
		background-color: #F5F4F4 !important;
	}

	.arrow-box {
		width: 370rpx;
		height: 370rpx;
		margin: 10rpx auto;
		background: url(../../static/images/controlArrow.png);
		background-size: 100% 100%;
		position: relative;
	}

	.up-arrow {
		width: 0;
		height: 0;
		border-left: 30rpx solid transparent;
		border-right: 30rpx solid transparent;
		border-bottom: 60rpx solid #0977FF;
		position: absolute;
		left: calc(50% - 14px);
		top: 40rpx;
	}

	.up-arrow:active {
		width: 0;
		height: 0;
		border-left: 30rpx solid transparent;
		border-right: 30rpx solid transparent;
		border-bottom: 60rpx solid #80B6F8;
	}

	.right-arrow {
		width: 0;
		height: 0;
		border-top: 30rpx solid transparent;
		border-left: 60rpx solid #0977FF;
		border-bottom: 30rpx solid transparent;
		position: absolute;
		right: 36rpx;
		top: calc(50% - 14px);
	}

	.right-arrow:active {
		width: 0;
		height: 0;
		border-top: 30rpx solid transparent;
		border-left: 60rpx solid #80B6F8;
		border-bottom: 30rpx solid transparent;
	}

	.bottom-arrow {
		width: 0;
		height: 0;
		border-left: 30rpx solid transparent;
		border-right: 30rpx solid transparent;
		border-top: 60rpx solid #0977FF;
		position: absolute;
		left: calc(50% - 14px);
		bottom: 36rpx;
	}

	.bottom-arrow:active {
		width: 0;
		height: 0;
		border-right: 30rpx solid transparent;
		border-left: 30rpx solid transparent;
		border-top: 60rpx solid #80B6F8;
	}

	.left-arrow {
		width: 0;
		height: 0;
		border-top: 30rpx solid transparent;
		border-right: 60rpx solid #0977FF;
		border-bottom: 30rpx solid transparent;
		position: absolute;
		left: 40rpx;
		top: calc(50% - 14px);
	}

	.left-arrow:active {
		width: 0;
		height: 0;
		border-right: 60rpx solid #80B6F8;
		border-bottom: 30rpx solid transparent;
		border-top: 30rpx solid transparent;
	}
	/* 修改控制器样式 */
	.control-bg{width: 520rpx;height: 520rpx;background:url(../../static/images/control-bg.png);background-size: 100% 100%;}
	.box-shadower{box-shadow: 0px 2px 6px rgba(48, 49, 51, 0.1);}
	.position-absolute:active{opacity: .5;}
</style>
