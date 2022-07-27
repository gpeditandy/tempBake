<template>
	<view class="font-md">
		<view class="d-flex a-center j-sb bg-white p-2 font-md">
			<view class="font-md d-flex a-center">
				<view class="d-flex a-center">
					<image v-if="deviceArr[deviceIndex].status==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" class="mr-2"></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 40rpx;" class="mr-2"></image>
				</view>
				<view class="d-flex a-center">
					<picker :range-key="'deviceInfo'" :index="deviceIndex" :range="deviceArr" @change="changeDevice">
						<view class="d-flex a-center j-sb">
							<view class="d-flex a-center">
								<text class="font-md mr-2">{{cutStatus(deviceArr[deviceIndex].deviceInfo)}}</text>
							</view>
						</view>
					</picker>
				</view>
			</view>
		</view>
		<view v-if="deviceArr[deviceIndex].status==1" class="m-2 bg-white p-2 d-flex flex-column rounded font-md">
			<view class="font-md mb-1">移栽注水量控制</view>
			<view class="font mb-1 border-bottom-mycolor text-muted pb-2">调节移栽过程中注水量的大小</view>
			<view class="font mb-2">
				<text class="text-muted mr-1">当前设备注水量</text>
				<text class="font-lg mr-1">{{startValue}}</text>
				<text class="text-muted">L/次</text>
			</view>
			<view class="font-md text-primary" @click="handleModify">修改 > </view>
		</view>
		<view v-else class="d-flex a-center flex-column position-relative bg-white m-2 p-2" style="z-index: 1;">
			<image src="../../static/images/unLine.png" mode="" class="mt-5 mb-2" style="width: 244rpx;height: 244rpx;"></image>
			<view class="text-light-muted font-md">当前设备离线，请选择其它在线设备</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="true">
			<view class="pt-4 font-md" style="background-color: #F2F3F5;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;">
				<view class="d-flex a-center j-sb px-2 pb-2">
					<text class="text-primary" @click="handleReset">重置</text>
					<text class="font-weight">修改阈值</text>
					<text class="text-primary" @click="handleSubmit">完成</text>
				</view>
				<view class="bg-white p-2 rounded">
					<text>移栽注水量控制</text>
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-bottom pb-2">
						<text class="mr-2">移栽注水量</text>
						<view class="d-flex a-center bg-my p-1">
							<text class="text-dark">{{startValue}} L/次</text>
						</view>
					</view>
					<view class="d-flex a-center py-3">
						<view class="border rounded8">
							<uni-number-box :min="1" :max="100" :step="0.5" :value="startValue" @change="changeWaterValue" />
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import $T from '@/utils/formatTime.js'
	export default {
		data() {
			return {
				dayTime:3600*24*1000,//一天的时间戳
				startTime:0,
				endTime:new Date().getTime(),
				deviceArr:[{id:'',deviceId:'',deviceName:'',deviceInfo:''}],
				deviceIndex:0,
				onLine:'[在线]',
				offLine:'[离线]',
				startValue:6,
				resFuncObj:{}
			};
		},
		onLoad(e) {
			this.getFloodingList()
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
			handleModify() {
				this.$refs.popup.open()
			},
			handleReset() {
				this.startValue = 2
				this.$refs.popup.close()
				this.modifyWaterParams()
			},
			handleSubmit() {
				this.$refs.popup.close()
				this.modifyWaterParams()
			},
			changeWaterValue(value) {
				this.startValue = value
			},
			getDayTimes() {
				return this.endTime - 3600*1000*24*7	//一个星期前的时间戳
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
			changeDevice(e) {
				this.deviceIndex = e.target.value
				this.getFloodingList()
			},
			cutStatus(value) {
				if(!value) return
				return value.substring(5)
			},
			getFloodingList() {
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				this.$H.get('flooding/flooding/page',{
					limit:10,
					page:1
				}).then(res => {
					uni.hideLoading()
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
					this.getWaterParamsById()
				}).catch(err => {
					console.log(err)
				})
			},
			getWaterParamsById() {
				this.$H.get('flooding/flooding/deviceFunctionList',{
					deviceId:this.getCurrentDeviceId
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						let tempObj = res.data.filter(item => item.functionId=='params_setting')[0]
						this.resFuncObj = tempObj
						this.startValue = this.resFuncObj.functionParams.water_amount
						console.log(this.startValue)
					}
				})
			},
			modifyWaterParams() {
				uni.showLoading({
					title:'数据加载中...',
					mask:true
				})
				this.$H.post('kylinks/device/invokeFunction',{
					deviceId: this.getCurrentDeviceId,
					functionId: "params_setting",
					functionName: "参数设置",
					functionParams: {
						water_amount: this.startValue,
					}
				}).then(res => {
					uni.hideLoading()
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						uni.navigateBack({
							delta:1
						})
						this.$message.successIcon('操作成功')
					}
				})
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
</style>
