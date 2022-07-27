<template>
	<view>
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<text class="font-md">智能滴灌</text>
					<switch :checked="btnSubmit" style="transform:scale(0.8)" @change="changeSwitch01" />
				</view>
				<view class="font text-muted pb-2">自动开启滴灌控制器智能调节土壤环境湿度</view>
				<view v-if="btnSubmit">
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-top">
						<text>当土壤湿度 (%)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValue}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValue}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view style="width: 120rpx;" class="text-primary font-md pt-2" @click="modifySoilHumidity">修改 > </view>
				</view>
			</view>
			
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<text class="font-md">智能滴灌</text>
					<switch :checked="btnSubmit2" style="transform:scale(0.8)" @change="changeSwitch02" />
				</view>
				<view class="font text-muted pb-2">自动开启滴灌控制器智能调节土壤环境温度</view>
				<view v-if="btnSubmit2">
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-top">
						<text>当土壤温度 (℃)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValueTemp}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValueTemp}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view style="width: 120rpx;" class="text-primary font-md pt-2" @click="modifySoilTemperature">修改 > </view>
				</view>
			</view>
			<!-- 土壤湿度弹窗 -->
			<uni-popup ref="popup" type="bottom" :maskClick="false">
				<view class="pt-4 font-md" style="background-color: #F2F3F5;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;">
					<view class="d-flex a-center j-sb px-2 pb-2">
						<text class="text-primary" @click="handleReset">重置</text>
						<text class="font-weight">修改阈值</text>
						<text class="text-primary" @click="handleSubmit">完成</text>
					</view>
					<view class="bg-white p-2 rounded">
						<text>土壤湿度智能控制条件</text>
						<view class="d-flex a-center font-md text-muted pt-2 rounded border-bottom pb-2">
							<text>当土壤湿度 (%)</text>
							<view class="d-flex a-center bg-my">
								<text class="text-warning">≤{{startValue}}</text>
								<text class="px-1">或</text>
								<text class="text-warning">≥{{endValue}}</text>
							</view>
							<text>开始调节</text>
						</view>
						<view class="d-flex a-center j-center py-3">
							<view class="border rounded8">
								<uni-number-box :min="1" :max="endValue" :step="0.5" :value="startValue" @change="changeSoilHumidityLeft" />
							</view>
							<text class="mx-2">或</text>
							<view class="border rounded8">
								<uni-number-box :min="startValue" :step="0.5" :value="endValue" @change="changeSoilHumidityRight" />
							</view>
							
						</view>
					</view>
				</view>
			</uni-popup>
			<!-- 土壤温度弹窗 -->
			<uni-popup ref="popupTemp" type="bottom" :maskClick="false">
				<view class="pt-4 font-md" style="background-color: #F2F3F5;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;">
					<view class="d-flex a-center j-sb px-2 pb-2">
						<text class="text-primary" @click="handleResetTemp">重置</text>
						<text class="font-weight">修改阈值</text>
						<text class="text-primary" @click="handleSubmitTemp">完成</text>
					</view>
					<view class="bg-white p-2 rounded">
						<text>土壤温度智能控制条件</text>
						<view class="d-flex a-center font-md text-muted pt-2 rounded border-bottom pb-2">
							<text>当土壤温度 (℃)</text>
							<view class="d-flex a-center bg-my">
								<text class="text-warning">≤{{startValueTemp}}</text>
								<text class="px-1">或</text>
								<text class="text-warning">≥{{endValueTemp}}</text>
							</view>
							<text>开始调节</text>
						</view>
						<view class="d-flex a-center j-center py-3">
							<view class="border rounded8">
								<uni-number-box :min="1" :max="endValueTemp" :step="0.5" :value="startValueTemp" @change="changeSoilTempLeft" />
							</view>
							<text class="mx-2">或</text>
							<view class="border rounded8">
								<uni-number-box :min="startValueTemp" :step="0.5" :value="endValueTemp" @change="changeSoilTempRight" />
							</view>
							
						</view>
					</view>
				</view>
			</uni-popup>
			<uni-popup ref="popupRes" type="center" :maskClick="false">
				<view class="d-flex a-center j-center">
					<view class="p-2 bg-white" style="border-radius: 30rpx;width:80%">
						<view class="font-lg d-flex a-center j-center m-2">正在向设备发送指令</view>
						<view class="d-flex a-center j-center">
							<view class="d-flex a-center font-md text-muted mx-2">
								<text>成功</text>
								<text class="text-success ml-2">{{getSuccess}}</text>
							</view>
							<view class="d-flex a-center font-md text-muted mx-2">
								<text>失败</text>
								<text class="text-warning ml-2">{{getError}}</text>
							</view>
						</view>
						<view class="font my-2 mx-5 text-light-muted d-flex a-center j-center text-center">因网络原因或设备故障可能导致发送失败，建议重启设备后再次提交</view>
						<view class="itemlist my-1 d-flex a-center j-sb"
						v-for="(item,index) in resData"
						:key="index"
						>
							<view class="d-flex a-center flex-column">
								<text class="font-md mb-1 text-muted">{{item.deviceName}}</text>
								<text class="font text-light-muted">{{item.deviceId}}</text>
							</view>
							<view class="d-flex a-center" v-if="item.success">
								<image src="../../static/images/right.png" style="width: 32rpx;height: 32rpx;" mode=""></image>
								<text class="font-md text-muted ml-1">提交成功</text>
							</view>
							<view class="d-flex a-center" v-else>
								<image src="../../static/images/wrong.png" style="width: 32rpx;height: 32rpx;" mode=""></image>
								<text class="font-md text-muted ml-1">提交失败</text>
							</view>
						</view>
						<button type="primary" class="mt-5 mb-2" style="width:360rpx;" @click="handleConfirm">确定</button>
					</view>
				</view>
			</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnSubmit:false,
				btnSubmit2:true,
				startValue:0,
				endValue:0,
				startValueTemp:15.5,
				endValueTemp:18.5,
				initIrrigationData:{},
				allId:'',
				resData:[],
				suceessArr:[]
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.reLaunch({
					url:'../tabBar/workbench/workbench'
				})
			}
			if(e.index==1) {
				console.log("点击了提交")
				this.submitData()
			}
		},
		computed:{
			getSuccess() {
				return this.suceessArr.length
			},
			getError() {
				return (this.resData.length - this.suceessArr.length)
			}
		},
		onLoad(e) {
			this.allId = e.ids
			console.log(this.allId)
			this.getIrrigationParams()
		},
		methods: {
			changeSwitch01(e) {
				this.btnSubmit = e.target.value
			},
			handleReset() {
				this.startValue = 15.5
				this.endValue = 18.5
				this.$refs.popup.close()
			},
			handleSubmit() {
				this.$refs.popup.close()
			},
			changeSoilHumidityLeft(value) {
				this.startValue = value
			},
			changeSoilHumidityRight(value) {
				this.endValue = value
			},
			modifySoilHumidity() {
				this.$refs.popup.open()
			},
			getIrrigationParams() {
				uni.showLoading({
					title:'数据加载中...',
					mask:true
				})
				this.$H.get('irrigation/irrigation/irrigationDevicesParams').then(res => {
					console.log(res)
					uni.hideLoading()
					this.initIrrigationData = res.data.params
					this.startValue = this.initIrrigationData.start_humidity
					this.endValue = this.initIrrigationData.stop_humidity
					this.btnSubmit = this.initIrrigationData.auto_irrigation
				}).catch(err => {
					console.log(err)
					uni.hideLoading()
				})
			},
			submitData() {
				uni.showLoading({
					title:'数据加载中...',
					mask:true
				})
				this.$H.post('kylinks/device/batchInvokeFunction',{
					deviceId: this.allId,
					functionId: "params_setting",
					functionName: "参数设置",
					functionParams: {
						start_humidity:this.startValue,
						stop_humidity:this.endValue,
						auto_irrigation:this.btnSubmit
					}
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					this.resData = res.data
					this.suceessArr = this.resData.filter(item => item.success==true)
					this.$refs.popupRes.open()
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			handleConfirm() {
				this.$refs.popupRes.close()
			},
			changeSwitch02(e) {
				this.btnSubmit2 = e.target.value
			},
			handleResetTemp() {
				this.startValueTemp = 15.5
				this.endValueTemp = 18.5
				this.$refs.popupTemp.close()
			},
			handleSubmitTemp() {
				this.$refs.popupTemp.close()
			},
			changeSoilTempLeft(value) {
				this.startValueTemp = value
			},
			changeSoilTempRight(value) {
				this.endValueTemp = value
			},
			modifySoilTemperature() {
				this.$refs.popupTemp.open()
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
.border-bottom-my{border-bottom: 1px solid #fff;}
.active{color: #007AFF;border-bottom: 1px solid #007AFF;}
.bg-my{background-color: #F5F6F9;padding:5rpx 10rpx;margin:0 10rpx;}
.uni-popup .uni-popup__wrapper-box {width: 80% !important;}
</style>
