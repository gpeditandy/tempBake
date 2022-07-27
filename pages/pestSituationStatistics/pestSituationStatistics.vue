<template>
	<view class="font-md">
		<view class="d-flex a-center j-sb bg-white p-2 font-md">
			<view class="font-md d-flex a-center">
				<view class="d-flex a-center">
					<image v-if="deviceArr[deviceIndex].status==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" class="mr-2" mode=""></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 40rpx;" class="mr-2" mode=""></image>
				</view>
				<view class="d-flex a-center">
					<picker :range-key="'deviceInfo'" :value="deviceIndex" :range="deviceArr" @change="changeDevice">
						<view class="">{{cutStatus(deviceArr[deviceIndex].deviceInfo)}}</view>
					</picker>
				</view>
			</view>
			<view @click="handleSelected">
				<text class="pl-2 border-left line-h mr-1 text-muted">选择</text>
				<text class="iconfont text-muted" :class="selectDateTime?'icon-jinru':'icon-xialazhankai'"></text>
			</view>
		</view>
		<view class="d-flex a-center flex-column bg-white animated fadeIn" v-show="selectDateTime" style="position: relative;z-index: 10;">
			<view class="p-2">
				<uni-datetime-picker :clear-icon="false" v-model="datetimerange" type="datetimerange" rangeSeparator="至" />
			</view>
		</view>
		<template v-if="resPhotoData.length>0 && deviceArr[deviceIndex].status==1">
			<view class="d-flex a-center j-sb flex-wrap father my-2 mx-2" style="position: relative;z-index: 1;">
				<view class="position-relative" v-for="(item,index) in resPhotoData" :key="index"
					@click="handlePrevImage(index)">
					<image :src="item.imageUrl" style="width: 220rpx;height: 150rpx;" class="mb-2 rounded"
						mode="aspectFill"></image>
					<text class="pictime text-center position-absolute font-sm">{{getHourMinutes(item.createDate)}}</text>
				</view>
			</view>
		</template>
		<template v-else-if="deviceArr[deviceIndex].status==0">
			<view class="d-flex a-center flex-column bg-white py-4 m-2">
				<image src="../../static/images/unLine.png" mode="" class="mt-5 mb-2" style="width: 244rpx;height: 244rpx;"></image>
				<view class="text-light-muted font-md">当前设备离线，请选择其它在线设备</view>
			</view>
		</template>
		<template v-else>
			<view class="p-2 my-2 d-flex flex-column a-center bg-white" style="position: relative;z-index: 1;">
				<image src="../../static/images/empty.png" style="width: 235rpx;height: 155rpx;" class="my-4" mode=""></image>
				<text class="font-md text-light-muted">暂无图片</text>
			</view>
			
		</template>
	</view>
</template>

<script>
	import $T from '@/utils/formatTime.js'
	export default {
		data() {
			return {
				deviceArr:[{id:'',deviceId:'',deviceName:'',deviceInfo:''}],
				deviceIndex:0,
				selectDateTime:false,
				datetimerange: [],
				dayTime:3600*1000*24,//一天的时间戳
				endTime:new Date().getTime(),
				resPhotoData:[],
				onLine:'[在线]',
				offLine:'[离线]',
				deviceId:null
			}
		},
		watch: {
			datetimerange() {
				console.log('范围选:', this.datetimerange)
				this.getPhotoDetailByDeviceId()
			}
		},
		computed:{
			getCurrentDeviceId() {
				return this.deviceArr[this.deviceIndex].deviceId
			},
			imageList() {
				return this.resPhotoData.map(item => item.imageUrl)
			}
		},
		onLoad(e) {
			this.datetimerange = this.getYMD()
			// if(e.arrayIds) {
			// 	this.deviceArr = (e.arrayIds).split(',')
			// 	this.getPhotoDetailByDeviceId()
			// }
			this.getPestsList()
		},
		methods: {
			getDayTimes() {
				return this.endTime - 3600*1000*24*7
			},
			getYMD(t1,t2) {
				var time = new Date();
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				if(m<=9) {
					m = '0' + m
				}
				if(d<=9) {
					d = '0' + d
				}
				var todayTime = y + '-' + m + '-' + d
				t1 = this.getDayTimes()
				t2 = this.endTime
				var arr = [t1,t2]
				return arr
			},
			handlePrevImage(index) {
				uni.previewImage({
					current:index,
					urls:this.imageList
				})
			},
			getHourMinutes(time) {
				if(!time) return
				let str1 = time.split(' ')[0]
				let str2 = time.split(' ')[1]
				return str2.substring(0,5)
			},
			changeDevice(e) {
				this.deviceIndex = e.target.value
				this.getPhotoDetailByDeviceId()
			},
			handleSelected() {
				this.selectDateTime = !this.selectDateTime
			},
			getPhotoDetailByDeviceId() {
				console.log(this.getCurrentDeviceId)
				console.log($T.reverseFormat(this.datetimerange[0]))
				console.log($T.reverseFormat(this.datetimerange[1]))
				this.$H.get('pests/pests/imageLogs',{
					deviceId:this.getCurrentDeviceId,
					page:1,
					limit:20,
					startDateTime:$T.reverseFormat(this.datetimerange[0]),
					endDateTime:$T.reverseFormat(this.datetimerange[1])
				}).then(res => {
					console.log(res)
					this.resPhotoData = res.data.list
				})
			},
			getPestsList() {
				this.$H.get('pests/pests/page',{
					page:1,
					limit:10
				}).then(res => {
					console.log(res)
					const resData = res.data.list
					let tempArr = []
					for(let i=0;i<resData.length;i++) {
						let tempObj = {
							id:resData[i].id,
							deviceId:resData[i].deviceId,
							deviceName:resData[i].deviceName,
							status:resData[i].state,
							deviceInfo:(resData[i].state == 1?this.onLine:this.offLine)  + ' ' + resData[i].deviceName + ' ' + resData[i].deviceId
						}
						tempArr.push(tempObj)
					}
					this.deviceArr = tempArr
					console.log(this.deviceArr)
					this.deviceId = this.deviceArr[this.deviceIndex].deviceId
					this.getPhotoDetailByDeviceId()
				})
			},
			cutStatus(value) {
				if(!value) return
				return value.substring(5)
			},
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
		}
	}
</script>

<style>
page {
		background-color: #F2F3F5;
	}
	.father:after{content: '';width: 30%;border:1px solid transparent;}
	.pictime{color: #fff;background-color: rgba(0,0,0,.4);padding:8rpx 15rpx;right:10rpx;bottom:35rpx;border-radius: 50rpx;}
</style>
