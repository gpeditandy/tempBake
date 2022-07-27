<template>
	<view class="font-md">
		<view class="d-flex a-center j-sb bg-white p-2 font-md">
			<view class="font-md d-flex a-center">
				<view class="d-flex a-center">
					<image v-if="deviceArr[deviceIndex].status==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" class="mr-2" mode=""></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 40rpx;" class="mr-2" mode=""></image>
				</view>
				<view class="d-flex a-center">
					<picker :range-key="'deviceInfo'" :index="deviceIndex" :range="deviceArr" @change="changeDevice">
						<view class="mx-2 text-primary">{{cutStatus(deviceArr[deviceIndex].deviceInfo)}}</view>
					</picker>
				</view>
			</view>
			<view @click="handleSelected">
				<text class="pl-2 border-left line-h mr-1 text-muted">选择</text>
				<text class="iconfont text-muted" :class="selectDateTime?'icon-jinru':'icon-xialazhankai'"></text>
			</view>
		</view>
		<view style="z-index: 10;" class="d-flex a-center flex-column bg-white animated fadeIn position-relative" v-show="selectDateTime">
			<view class="p-2">
				<uni-datetime-picker :clear-icon="false" v-model="datetimerange" type="datetimerange" rangeSeparator="至" />
			</view>
		</view>
		<template v-if="listData.length>0 && deviceArr[deviceIndex].status==1">
			<view class="bg-white m-2 p-2 rounded8 position-relative" style="z-index: 1;">
				<view class="d-flex a-center j-sb border-bottom-mycolor py-2 text-muted"
					v-for="(item, index) in listData" :key="index"
					@click="toDetailPage(item)">
					<view class="d-flex flex-column">
						<text class="mb-1">{{item.date}}</text>
						<text class="">滴灌耗时：{{getMinutes(item.total_time)}}小时</text>
					</view>
					<uni-icons type="arrowright" size="16" color="#909399"></uni-icons>
				</view>
			</view>
		</template>
		<template style="z-index: 1;" v-else-if="deviceArr[deviceIndex].status==0">
			<view class="d-flex a-center flex-column bg-white py-4 m-2">
				<image src="../../static/images/unLine.png" mode="" class="mt-5 mb-2" style="width: 244rpx;height: 244rpx;"></image>
				<view class="text-light-muted font-md">当前设备离线，请选择其它在线设备</view>
			</view>
		</template>
		<template v-else>
			<view class="p-2 my-2 d-flex flex-column a-center bg-white position-relative" style="z-index: 1;">
				<image src="../../static/images/empty.png" style="width: 235rpx;height: 155rpx;" class="my-4" mode=""></image>
				<text class="font-md text-light-muted">暂无滴灌记录</text>
			</view>
			
		</template>
	</view>
</template>

<script>
	import $T from '@/utils/formatTime.js'
	export default {
		data() {
			return {
				listData: [],
				dayTime:3600*24*1000,//一天的时间戳
				startTime:0,
				endTime:new Date().getTime(),
				deviceArr:[{id:'',deviceId:'',deviceName:'',deviceInfo:''}],
				deviceIndex:0,
				datetimerange: [],
				selectDateTime:false,
				// 分页变量
				page:1,
				pageSize:30,
				onLine:'[在线]',
				offLine:'[离线]',
			};
		},
		watch: {
			datetimerange(newval) {
				console.log('范围选:', this.datetimerange)
				this.getIrrigationLogs()
			}
		},
		onLoad(e) {
			this.datetimerange = this.getYMD()
			this.getIrrigationList()
		},
		computed:{
			getCurrentDeviceId() {
				return this.deviceArr[this.deviceIndex].deviceId
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.reLaunch({
					url:'../tabBar/workbench/workbench'
				})
			}
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
			getMinutes(value) {
				if(!value) return
				return (value/60).toFixed(2)
			},
			handleSelected() {
				this.selectDateTime = !this.selectDateTime
			},
			changeDevice(e) {
				this.deviceIndex = e.target.value
				this.getIrrigationLogs()
			},
			getIrrigationLogs() {
				console.log(this.getCurrentDeviceId)
				this.$H.get('irrigation/irrigation/irrigationLogs',{
					deviceId:this.getCurrentDeviceId,
					limit:this.pageSize,
					page:this.page,
					startTime:$T.reverseFormat(this.datetimerange[0]),
					endTime:$T.reverseFormat(this.datetimerange[1])
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						this.listData = res.data.list
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getIrrigationList() {
				this.$H.get('irrigation/irrigation/page',{
					page:1,
					limit:10
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						const resData = res.data.list
						let tempArr = []
						for(let i=0;i<resData.length;i++) {
							let obj = {
								id:resData[i].id,
								deviceId:resData[i].deviceId,
								deviceName:resData[i].deviceName,
								status:resData[i].state,
								deviceInfo:(resData[i].state == 1?this.onLine:this.offLine)  + ' ' + resData[i].deviceName + ' ' + resData[i].deviceId
							}
							tempArr.push(obj)
						}
						this.deviceArr = tempArr
						console.log(this.deviceArr)
						this.getIrrigationLogs()
					}
				}).catch(err => {
					console.log(err)
				})
			},
			cutStatus(value) {
				if(!value) return
				return value.substring(5)
			},
			toDetailPage(item) {
				let strItem = JSON.stringify(item)
				uni.navigateTo({
					url:'../irrigationDetail/irrigationDetail?item=' + strItem
				})
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
</style>
