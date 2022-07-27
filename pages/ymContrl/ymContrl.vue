<template>
	<view>
		<view class="d-flex a-center j-sb px-3 pt-3 pb-1 bg-white font-md">
			<text 
			class="border-bottom-my pb-1"
			v-for="(item,index) in tabConn" 
			@click="handleChange(index)"
			:class="tabIndex===index ? 'active':''"
			>{{item.name}}</text>
		</view>
		
		<view v-if="tabIndex==0">
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<text class="font-md">智能调节棚内空气温度</text>
					<switch :checked="btnSubmit" style="transform:scale(0.8)" @change="changeSwitch01" />
				</view>
				<view class="font text-muted pb-2">自动控制热风炉、冷风机调节棚内空气温度</view>
				<view v-if="btnSubmit">
					<view class="d-flex a-center font-md text-muted pt-2 rounded  pt-2  border-top">
						<text>当空气温度 (℃)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValue}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValue}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view style="width: 120rpx;" class="text-primary font-md pt-2" @click="handleModifyAirTemp">修改 > </view>
				</view>
			</view>
			
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<text class="font-md">智能调节棚内空气湿度</text>
					<switch :checked="btnSubmit2" style="transform:scale(0.8)" @change="changeSwitch02" />
				</view>
				<view class="font text-muted pb-2">自动控制热风炉、冷风机调节棚内空气湿度</view>
				<view v-if="btnSubmit2">
					<view class="d-flex a-center font-md text-muted pt-2 rounded  pt-2 border-top">
						<text>当空气湿度 (%)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValueHum}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValueHum}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view style="width: 120rpx;" class="text-primary font-md pt-2" @click="handleModifyAirHum">修改 > </view>
				</view>
			</view>
		</view>
		<view v-if="tabIndex==1">
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<text class="font-md">智能调节棚内土壤温度</text>
					<switch :checked="btnSubmit3" style="transform:scale(0.8)" @change="changeSwitch03" />
				</view>
				<view class="font text-muted pb-2">自动控制热风炉、冷风机调节棚内土壤温度</view>
				<view v-if="btnSubmit3">
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-top pt-2">
						<text>当土壤温度 (℃)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValueSoilTemp}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValueSoilTemp}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view style="width: 120rpx;" class="text-primary font-md pt-2" @click="handleModifySoilTemp">修改 > </view>
				</view>
			</view>
			
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<text class="font-md">智能调节棚内土壤湿度</text>
					<switch :checked="btnSubmit4" style="transform:scale(0.8)" @change="changeSwitch04" />
				</view>
				<view class="font text-muted pb-2">自动控制热风炉、冷风机调节棚内土壤湿度</view>
				<view v-if="btnSubmit4">
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-top pt-2">
						<text>当土壤湿度 (%)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValueSoilHum}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValueSoilHum}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view style="width: 120rpx;" class="text-primary font-md pt-2" @click="handleModifySoilTemp2">修改 > </view>
				</view>
			</view>
		</view>
		
		<view v-if="tabIndex==2">
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<text class="font-md">智能调节棚内CO2浓度</text>
					<switch :checked="btnSubmit5" style="transform:scale(0.8)" @change="changeSwitch05" />
				</view>
				<view class="font text-muted pb-2">自动控制热风炉、冷风机调节棚内CO2浓度</view>
				<view v-if="btnSubmit5">
					<view class="d-flex a-center font-md text-muted pt-2 rounded pt-2 border-top">
						<text>当CO2浓度 (ppm)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValueCO2}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValueCO2}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view style="width: 120rpx;" class="text-primary font-md pt-2" @click="handleModifyCO2">修改 > </view>
				</view>
			</view>
		</view>
		<view v-if="tabIndex==3">
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<text class="font-md">智能调节棚内光照度</text>
					<switch :checked="btnSubmit6" style="transform:scale(0.8)" @change="changeSwitch06" />
				</view>
				<view class="font text-muted pb-2">自动控制补光灯调节棚内光照度</view>
				<view v-if="btnSubmit6">
					<view class="d-flex a-center font-md text-muted pt-2 rounded pt-2 border-top">
						<text>当光照度 (KLux)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValueLight}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValueLight}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view style="width: 120rpx;" class="text-primary font-md pt-2" @click="handleModifyLight">修改 > </view>
				</view>
			</view>
		</view>
		<!-- 育苗棚空气温度智能控制条件 -->
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
							<text class="text-warning">≤{{startValue}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValue}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view class="d-flex a-center j-center py-3">
						<view class="border rounded8">
							<uni-number-box :min="1" :max="endValue" :step="0.5" :value="startValue" @change="changeNumAriTemp" />
						</view>
						<text class="mx-2">或</text>
						<view class="border rounded8">
							<uni-number-box :min="startValue" :step="0.5" :value="endValue" @change="changeNumAriTemp2" />
						</view>
						
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 育苗棚空气湿度智能控制条件 -->
		<uni-popup ref="popupHum" type="bottom" :maskClick="false">
			<view class="pt-4 font-md" style="background-color: #F2F3F5;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;">
				<view class="d-flex a-center j-sb px-2 pb-2">
					<text class="text-primary" @click="handleResetHum">重置</text>
					<text class="font-weight">修改阈值</text>
					<text class="text-primary" @click="handleSubmitHum">完成</text>
				</view>
				<view class="bg-white p-2 rounded">
					<text>育苗棚空气湿度智能控制条件</text>
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-bottom pb-2">
						<text>当空气湿度 (%)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValueHum}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValueHum}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view class="d-flex a-center j-center py-3">
						<view class="border rounded8">
							<uni-number-box :min="1" :max="endValueHum" :step="0.5" :value="startValueHum" @change="changeNumAriHum" />
						</view>
						<text class="mx-2">或</text>
						<view class="border rounded8">
							<uni-number-box :min="startValueHum" :step="0.5" :value="endValueHum" @change="changeNumAriHum2" />
						</view>
						
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 土壤温度 -->
		<uni-popup ref="popupSoilTemp" type="bottom" :maskClick="false">
			<view class="pt-4 font-md" style="background-color: #F2F3F5;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;">
				<view class="d-flex a-center j-sb px-2 pb-2">
					<text class="text-primary" @click="handleResetSoilTemp">重置</text>
					<text class="font-weight">修改阈值</text>
					<text class="text-primary" @click="handleSubmitSoilTemp">完成</text>
				</view>
				<view class="bg-white p-2 rounded">
					<text>育苗棚土壤温度智能控制条件</text>
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-bottom pb-2">
						<text>当土壤温度 (%)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValueSoilTemp}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValueSoilTemp}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view class="d-flex a-center j-center py-3">
						<view class="border rounded8">
							<uni-number-box :min="1" :max="endValueSoilTemp" :step="0.5" :value="startValueSoilTemp" @change="changeSoilTemp" />
						</view>
						<text class="mx-2">或</text>
						<view class="border rounded8">
							<uni-number-box :min="startValueSoilTemp" :step="0.5" :value="endValueSoilTemp" @change="changeSoilTemp2" />
						</view>
						
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 土壤湿度 -->
		<uni-popup ref="popupSoilHum" type="bottom" :maskClick="false">
			<view class="pt-4 font-md" style="background-color: #F2F3F5;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;">
				<view class="d-flex a-center j-sb px-2 pb-2">
					<text class="text-primary" @click="handleResetSoilHum">重置</text>
					<text class="font-weight">修改阈值</text>
					<text class="text-primary" @click="handleSubmitSoilHum">完成</text>
				</view>
				<view class="bg-white p-2 rounded">
					<text>育苗棚土壤湿度智能控制条件</text>
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-bottom pb-2">
						<text>当土壤湿度 (%)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValueSoilHum}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValueSoilHum}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view class="d-flex a-center j-center py-3">
						<view class="border rounded8">
							<uni-number-box :min="1" :max="endValueSoilHum" :step="0.5" :value="startValueSoilHum" @change="changeSoilHum" />
						</view>
						<text class="mx-2">或</text>
						<view class="border rounded8">
							<uni-number-box :min="startValueSoilHum" :step="0.5" :value="endValueSoilHum" @change="changeSoilHum2" />
						</view>
						
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- CO2浓度 -->
		<uni-popup ref="popupCO2" type="bottom" :maskClick="false">
			<view class="pt-4 font-md" style="background-color: #F2F3F5;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;">
				<view class="d-flex a-center j-sb px-2 pb-2">
					<text class="text-primary" @click="handleResetCO2">重置</text>
					<text class="font-weight">修改阈值</text>
					<text class="text-primary" @click="handleSubmitCO2">完成</text>
				</view>
				<view class="bg-white p-2 rounded">
					<text>育苗棚CO2浓度智能控制条件</text>
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-bottom pb-2">
						<text>当CO2浓度 (ppm)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValueCO2}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValueCO2}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view class="d-flex a-center j-center py-3">
						<view class="border rounded8">
							<uni-number-box :min="1" :max="endValueCO2" :step="0.5" :value="startValueCO2" @change="changeCO2" />
						</view>
						<text class="mx-2">或</text>
						<view class="border rounded8">
							<uni-number-box :min="startValueCO2" :step="0.5" :value="endValueCO2" @change="changeCO22" />
						</view>
						
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 光照度 -->
		<uni-popup ref="popupLight" type="bottom" :maskClick="false">
			<view class="pt-4 font-md" style="background-color: #F2F3F5;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;">
				<view class="d-flex a-center j-sb px-2 pb-2">
					<text class="text-primary" @click="handleResetLight">重置</text>
					<text class="font-weight">修改阈值</text>
					<text class="text-primary" @click="handleSubmitLight">完成</text>
				</view>
				<view class="bg-white p-2 rounded">
					<text>育苗棚光照度智能控制条件</text>
					<view class="d-flex a-center font-md text-muted pt-2 rounded border-bottom pb-2">
						<text>当光照度 (KLux)</text>
						<view class="d-flex a-center bg-my">
							<text class="text-warning">≤{{startValueLight}}</text>
							<text class="px-1">或</text>
							<text class="text-warning">≥{{endValueLight}}</text>
						</view>
						<text>开始调节</text>
					</view>
					<view class="d-flex a-center j-center py-3">
						<view class="border rounded8">
							<uni-number-box :min="1" :max="endValueLight" :step="0.5" :value="startValueLight" @change="changeLight" />
						</view>
						<text class="mx-2">或</text>
						<view class="border rounded8">
							<uni-number-box :min="startValueLight"  :step="0.5" :value="endValueLight" @change="changeLight2" />
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
				tempDeviceIds:'',
				deviceIdStr:'',
				resData:[],
				suceessArr:[],
				errorArr:[],
				startValue:15.5,
				endValue:18.5,
				startValueHum:15.5,
				endValueHum:18.5,
				startValueSoilTemp:15.5,
				endValueSoilTemp:18.5,
				startValueSoilHum:15.5,
				endValueSoilHum:18.5,
				startValueCO2:15.5,
				endValueCO2:18.5,
				startValueLight:15.5,
				endValueLight:18.5,
				tabIndex:0,
				tabConn:[{name:'空气温湿度'},{name:'土壤温湿度'},{name:'CO2浓度'},{name:'光照强度'}],
				seedingId:'',
				initSeedingData:{},
				btnSubmit:true,
				btnSubmit2:true,
				btnSubmit3:true,
				btnSubmit4:true,
				btnSubmit5:true,
				btnSubmit6:true,
				
			}
		},
		onLoad(e) {
			let str = e.deviceid
			let temp = JSON.parse(str)
			this.tempDeviceIds = temp
			this.getDeviceIds()
			this.seedingId = e.seedingid
			uni.showLoading({
				title:'数据加载中...',
				mask:true
			})
			this.getInitData()
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
			if(e.index==1) {
				if(!this.btnSubmit) {
					return this.$message.errorIcon('提交失败')
				}
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
		methods: {
			getDeviceIds() {
				let deviceIds = []
				deviceIds = this.tempDeviceIds.map(item => item.deviceId)
				this.deviceIdStr = deviceIds
			},
			getInitData() {
				this.$H.get('seedling/seedlingshed/seedlingDeviceParams',{
					seedlingShedId:this.seedingId,
				}).then(res => {
					uni.hideLoading()
					console.log(res)
						this.initSeedingData = res.data.params
						this.startValue = this.initSeedingData.air_temperature_min
						this.endValue = this.initSeedingData.air_temperature_max
						this.startValueHum = this.initSeedingData.air_humidity_min
						this.endValueHum = this.initSeedingData.air_humidity_max
						this.startValueSoilTemp = this.initSeedingData.soil_temperature_min
						this.endValueSoilTemp = this.initSeedingData.soil_temperature_max
						this.startValueSoilHum = this.initSeedingData.soil_humidity_min
						this.endValueSoilHum = this.initSeedingData.soil_humidity_max
						this.startValueCO2 = this.initSeedingData.co2_min
						this.endValueCO2 = this.initSeedingData.co2_max
						this.startValueLight = this.initSeedingData.illumination_min
						this.endValueLight = this.initSeedingData.illumination_max
					
				})
			},
			submitData() {
				uni.showLoading({
					title:'数据加载中...',
					mask:true
				})
				this.$H.post('kylinks/device/batchInvokeFunction',{
					deviceId:this.deviceIdStr.join(','),
					functionId:'params_setting',
					functionName:'参数设置',
					functionParams:{
						air_temperature_min:this.startValue,
						air_temperature_max:this.endValue,
						air_humidity_min:this.startValueHum,
						air_humidity_max:this.endValueHum,
						soil_temperature_min:this.startValueSoilTemp,
						soil_temperature_max:this.endValueSoilTemp,
						soil_humidity_min:this.startValueSoilHum,
						soil_humidity_max:this.endValueSoilHum,
						co2_min:this.startValueCO2,
						co2_max:this.endValueCO2,
						illumination_min:this.startValueLight,
						illumination_max:this.endValueLight
					}
				}).then(res => {
					uni.hideLoading()
						console.log(res)
						this.resData = res.data
						this.suceessArr = this.resData.filter(item => item.success==true)
						this.$refs.popupRes.open()
				}).catch(err => {
					console.log(err)
					uni.hideLoading()
				})
			},
			handleConfirm() {
				this.$refs.popupRes.close()
			},
			handleChange(index) {
				this.tabIndex = index
			},
			handleReset() {
				this.startValue = 15.5
				this.endValue = 18.5
				this.$refs.popup.close()
			},
			handleResetHum() {
				this.startValueHum = 15.5
				this.endValueHum = 18.5
				this.$refs.popupHum.close()
			},
			handleSubmit() {
				this.$refs.popup.close()
			},
			handleOpen() {
				this.$refs.popup.open()
			},
			handleSubmitHum() {
				this.$refs.popupHum.close()
			},
			handleOpenHum() {
				this.$refs.popupHum.open()
			},
			changeSwitch01(e) {
				this.btnSubmit = e.target.value
				console.log(this.btnSubmit)
			},
			changeSwitch02(e) {
				this.btnSubmit2 = e.target.value
			},
			changeSwitch03(e) {
				this.btnSubmit3 = e.target.value
				console.log(this.btnSubmit3)
			},
			changeSwitch04(e) {
				this.btnSubmit4 = e.target.value
			},
			changeSwitch05(e) {
				this.btnSubmit5 = e.target.value
			},
			changeSwitch06(e) {
				this.btnSubmit6 = e.target.value
			},
			handleModifyAirTemp() {
				this.$refs.popup.open()
			},
			handleModifyAirHum() {
				this.$refs.popupHum.open()
			},
			changeNumAriTemp(value) {
				this.startValue = value
			},
			changeNumAriTemp2(value) {
				this.endValue = value
			},
			changeNumAriHum(value) {
				this.startValueHum = value
			},
			changeNumAriHum2(value) {
				this.endValueHum = value
			},
			changeSoilTemp(value) {
				this.startValueSoilTemp = value
			},
			changeSoilTemp2(value) {
				this.endValueSoilTemp = value
			},
			changeSoilHum(value) {
				this.startValueSoilHum = value
			},
			changeSoilHum2(value) {
				this.endValueSoilHum = value
			},
			changeCO2(value) {
				this.startValueCO2 = value
			},
			changeCO22(value) {
				this.endValueCO2 = value
			},
			changeLight(value) {
				this.startValueLight = value
			},
			changeLight2(value) {
				this.endValueLight = value
			},
			handleModifySoilTemp() {
				this.$refs.popupSoilTemp.open()
			},
			handleModifySoilTemp2() {
				this.$refs.popupSoilHum.open()
			},
			handleModifyCO2() {
				this.$refs.popupCO2.open()
			},
			handleModifyLight() {
				this.$refs.popupLight.open()
			},
			handleResetSoilTemp() {
				this.startValueSoilTemp = 15.5
				this.endValueSoilTemp = 18.5
				this.$refs.popupSoilTemp.close()
			},
			handleResetSoilHum() {
				this.startValueSoilHum = 15.5
				this.endValueSoilHum = 18.5
				this.$refs.popupSoilHum.close()
			},
			handleResetCO2() {
				this.startValueCO2 = 15.5
				this.endValueCO2 = 18.5
				this.$refs.popupCO2.close()
			},
			handleResetLight() {
				this.startValueLight = 15.5
				this.endValueLight = 18.5
				this.$refs.popupLight.close()
			},
			handleSubmitSoilTemp() {
				this.$refs.popupSoilTemp.close()
			},
			handleSubmitSoilHum() {
				this.$refs.popupSoilHum.close()
			},
			handleSubmitCO2() {
				this.$refs.popupCO2.close()
			},
			handleSubmitLight() {
				this.$refs.popupLight.close()
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
