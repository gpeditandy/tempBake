<template>
	<view>
		<view class="p-2 m-2 bg-white rounded">
			<view class="d-flex a-center j-sb">
				<text class="font-md">智能模式</text>
				<switch :checked="btnSubmit" style="transform:scale(0.8)" @change="changeSwitch01" />
			</view>
			<view class="font text-muted pb-2">冷风机感应棚内空气温度智能开启和关闭</view>
			<view v-if="btnSubmit">
				<view class="d-flex a-center font-md text-muted pt-2 rounded  pt-2  border-top">
					<text>当空气温度 (℃)</text>
					<view class="d-flex a-center bg-my">
						<text class="text-warning">≥{{endValue}}</text>
					</view>
					<text>开始调节</text>
				</view>
				<view style="width: 120rpx;" class="text-primary font-md pt-2" @click="handleModifyAirTemp">修改 > </view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="pt-4 font-md" style="background-color: #F2F3F5;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;">
				<view class="d-flex a-center j-sb px-2 pb-2">
					<text class="text-primary" @click="handleReset">重置</text>
					<text class="font-weight">修改阈值</text>
					<text class="text-primary" @click="handleSubmit">完成</text>
				</view>
				<view class="bg-white p-2 rounded">
					<text>育苗棚空气温度智能控制条件</text>
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-bottom pb-2">
						<text>当空气温度 (℃)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≥{{endValue}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view class="d-flex a-center j-center py-3">
						<view class="border rounded8">
							<uni-number-box :min="1" :max="100" :step="0.5" :value="endValue" @change="changeAriTemp" />
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<view class="p-2 m-2 bg-white rounded">
			<view class="d-flex a-center j-sb">
				<text class="font-md">智能模式</text>
				<switch :checked="btnSubmit2" style="transform:scale(0.8)" @change="changeSwitch02" />
			</view>
			<view class="font text-muted pb-2">自动控制冷风机调节棚内空气温度</view>
			<view class="font">
				<view>
					<text class="text-warning bg-light-secondary px-1 py">智能模式已{{btnSubmit2?'开启':'关闭'}}</text>
					<text class="ml-1">请进行远程手动控制</text>
				</view>
			</view>
			<view class="text-primary font-md pt-2" @click="handleModifyByhand">远程手动调节 > </view>
		</view>
		
		<view class="p-2 m-2 bg-white rounded">
			<view class="d-flex a-center j-sb">
				<text class="font-md">智能调节棚内空气湿度</text>
				<switch :checked="btnSubmit3" style="transform:scale(0.8)" @change="changeSwitch03" />
			</view>
			<view class="font text-muted pb-2">自动控制加湿器调节棚内空气湿度</view>
			<view v-if="btnSubmit3">
				<view class="d-flex a-center font-md text-muted pt-2 rounded  pt-2  border-top">
					<text>当空气湿度 (℃)</text>
					<view class="d-flex a-center bg-my">
						<text class="text-warning">≤{{tempHumilityStart}}</text>
						<text class="px-1">或</text>
						<text class="text-warning">≥{{tempHumilityEnd}}</text>
					</view>
					<text>开始调节</text>
				</view>
				<view style="width: 120rpx;" class="text-primary font-md pt-2" @click="handleModifyTempHumidity">修改 > </view>
			</view>
		</view>
		<uni-popup ref="popupHumility" type="bottom" :maskClick="false">
			<view class="pt-4 font-md" style="background-color: #F2F3F5;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;">
				<view class="d-flex a-center j-sb px-2 pb-2">
					<text class="text-primary" @click="handleReset3">重置</text>
					<text class="font-weight">修改阈值</text>
					<text class="text-primary" @click="handleSubmit3">完成</text>
				</view>
				<view class="bg-white p-2 rounded">
					<text>育苗棚空气湿度智能控制条件</text>
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-bottom pb-2">
						<text>当空气湿度 (℃)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{tempHumilityStart}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{tempHumilityEnd}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view class="d-flex a-center j-center py-3">
						<view class="border rounded8">
							<uni-number-box :min="1" :max="tempHumilityEnd" :step="0.5" :value="tempHumilityStart" @change="changetempHumilityStart" />
						</view>
						<text class="mx-2">或</text>
						<view class="border rounded8">
							<uni-number-box :min="tempHumilityStart" :step="0.5" :value="tempHumilityEnd" @change="changetempHumilityEnd" />
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
					<scroll-view scroll-y style="max-height: 500rpx;">
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
					</scroll-view>
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
				btnSubmit:true,
				endValue:20,
				btnSubmit2:false,
				btnSubmit3:true,
				tempHumilityStart:15.5,
				tempHumilityEnd:18.5,
				deviceId:null,
				resData:[],
				suceessArr:[],
				errorArr:[],
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
			this.deviceId = e.deviceId
			console.log(this.deviceId)
			this.getData()
		},
		methods: {
			getData() {
				this.$H.get('seedling/seedlingshed/deviceFunctionList',{
					deviceId:this.deviceId
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						let tempObj = res.data.filter(item => item.functionId=='params_setting')[0]
						this.btnSubmit2 = tempObj.functionParams.mode==1 ? true:false
						this.endValue = tempObj.functionParams.air_temperature_max
						this.tempHumilityStart = tempObj.functionParams.air_humidity_min
						this.tempHumilityEnd = tempObj.functionParams.air_humidity_max
					}
				})
			},
			submitData() {
				uni.showLoading({
					title:'数据提交中...'
				})
				this.$H.post('kylinks/device/batchInvokeFunction',{
					deviceId: this.deviceId,
					functionId: "params_setting",
					functionName: "参数设置",
					functionParams: {
						air_humidity_max: this.tempHumilityEnd,
						air_humidity_min: this.tempHumilityStart,
						air_temperature_max: this.endValue,
						air_temperature_min: 20,
						mode: this.btnSubmit2?1:0,
						soil_temperature_max: 24,
						soil_temperature_min: 22
					}
				}).then(res => {
					uni.hideLoading()
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						this.resData = res.data
						this.suceessArr = this.resData.filter(item => item.success==true)
						this.$refs.popupRes.open()
					}
				})
			},
			handleConfirm() {
				this.$refs.popupRes.close()
			},
			changeSwitch01(e) {
				this.btnSubmit = e.target.value
			},
			changeSwitch02(e) {
				this.btnSubmit2 = e.detail.value
			},
			changeSwitch03(e) {
				this.btnSubmit3 =e.target.value
			},
			handleModifyAirTemp() {
				this.$refs.popup.open()
			},
			handleReset() {
				this.endValue = 18.5
			},
			handleSubmit() {
				this.$refs.popup.close()
			},
			changeAriTemp(e) {
				console.log(e)
				this.endValue = e
			},
			handleModifyByhand() {
				
			},
			handleModifyTempHumidity() {
				this.$refs.popupHumility.open()
			},
			changetempHumilityStart(e) {
				this.tempHumilityStart = e
			},
			changetempHumilityEnd(e) {
				this.tempHumilityEnd = e
			},
			handleReset3() {
				this.tempHumilityStart = 15.5
				this.tempHumilityEnd = 18.5
			},
			handleSubmit3() {
				this.$refs.popupHumility.close()
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
			if(e.index==1) {
				this.submitData()
			}
		},
	}
</script>

<style>
page{background-color: #f2f3f5;}
</style>
