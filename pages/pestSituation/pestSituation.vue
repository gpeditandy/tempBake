<template>
	<view class="font-md">
		<view class="p-2 m-2 bg-white rounded">
			<view class="d-flex a-center j-sb mb-2">
				<text>自动开关灯</text>
				<switch style="transform:scale(0.8)" :checked="autoLight==1?true:false" color="#00E266" @change="switch1Change" />
			</view>
			<view class="bg-pest-situation p-2 rounded">
				<view class="d-flex a-center j-sb font border-bottom pb-2">
					<text>开灯时间</text>
					<text class="text-primary">每日{{lightTime}} ></text>
				</view>
				<view class="d-flex a-center j-sb font pt-2">
					<text>持续工作</text>
					<text class="text-primary">{{lightDuration}}小时 ></text>
				</view>
			</view>
		</view>
		
		<view class="p-2 m-2 bg-white rounded">
			<view class="d-flex a-center j-sb border-bottom pb-2">
				<text>自动加水</text>
				<switch style="transform:scale(0.8)" :checked="autoWater==1?true:false" color="#00E266" @change="switch2Change" />
			</view>
			<view class="d-flex a-center j-sb pt-2">
				<text>自动清洗</text>
				<switch style="transform:scale(0.8)" :checked="autoClean==1?true:false" color="#00E266" @change="switch3Change" />
			</view>
		</view>
		
		<view class="p-2 m-2 bg-white rounded">
			<view class="d-flex a-center j-sb">
				<text class="text-danger">电源开关</text>
				<switch style="transform:scale(0.8)" :checked="powerSwitch==1?true:false" color="#00E266" @change="switch4Change" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				autoLight:false,
				autoWater:false,
				autoClean:false,
				powerSwitch:false,
				lightTime:'',
				lightDuration:'',
				pestDeviceId:null,
				resPestsParams:{}
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
			if(e.index==1) {
				console.log(this.pestDeviceId)
				uni.showLoading({
					title:'数据加载中...',
					mask:true
				})
				this.$H.post('kylinks/device/invokeFunction',{
					deviceId: this.pestDeviceId,
					functionId: "params_setting",
					functionName: "参数设置",
					functionParams: {
						auto_light: this.autoLight?1:0,
						auto_clean: this.autoClean?1:0,
						light_time: this.lightTime,
						auto_add_water: this.autoWater?1:0,
						light_duration: this.lightDuration,
						auto_switch: this.powerSwitch?1:0
					}
				}).then(res => {
					uni.hideLoading()
					console.log(res)
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
		},
		onLoad(e) {
			if(e.deviceid) {
				this.pestDeviceId = e.deviceid
				console.log(this.pestDeviceId)
				this.getFunctionDetailByDeviceId()
			}
		},
		methods: {
			getFunctionDetailByDeviceId() {
				this.$H.get('pests/pests/deviceFunctionList',{
					deviceId:this.pestDeviceId,
				}).then(res => {
					const resData = res.data
					this.resPestsParams = resData.filter(item => item.deviceId==this.pestDeviceId)[0]
					console.log(this.resPestsParams)
					this.autoLight = this.resPestsParams.functionParams.auto_light
					this.autoWater = this.resPestsParams.functionParams.auto_add_water
					this.autoClean = this.resPestsParams.functionParams.auto_clean
					this.lightTime = this.resPestsParams.functionParams.light_time
					this.lightDuration = this.resPestsParams.functionParams.light_duration
					this.powerSwitch = this.resPestsParams.functionParams.auto_switch
				})
			},
			switch1Change(e) {
				this.autoLight = e.detail.value
			},
			switch2Change(e) {
				this.autoWater = e.detail.value
			},
			switch3Change(e) {
				this.autoClean = e.detail.value
			},
			switch4Change(e) {
				this.powerSwitch = e.detail.value
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
.bg-pest-situation{background-color: #F7F8FB;}
</style>
