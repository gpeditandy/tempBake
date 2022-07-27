<template>
	<view class="font-md">
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
				autoWater:false,
				autoClean:false,
				powerSwitch:false,
				pestDeviceKillId:null,
				resKillData:{}
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
			if(e.index==1) {
				console.log(this.pestDeviceKillId)
				this.$H.post('kylinks/device/invokeFunction',{
					deviceId: this.pestDeviceKillId,
					functionId: "params_setting",
					functionName: "参数设置",
					functionParams: {
						auto_light: 1,
						auto_clean: this.autoClean?1:0,
						light_time: "22:00",
						auto_add_water: this.autoWater?1:0,
						light_duration: 6,
						auto_switch: this.powerSwitch?1:0
					}
				}).then(res => {
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
			console.log(e)
			if(e.deviceidKill) {
				this.pestDeviceKillId = e.deviceidKill
				console.log(e.deviceidKill)
				this.getKillPestInfoByDeviceId()
			}
		},
		methods: {
			getKillPestInfoByDeviceId() {
				this.$H.get('pestKiller/pestKiller/deviceFunctionList',{
					deviceId:this.pestDeviceKillId
				}).then(res => {
					if(res.data.length>0) {
						const tempRes = res.data
						let tempArr = tempRes.filter(item => item.deviceId==this.pestDeviceKillId)[0]
						this.resKillData = tempArr
						console.log(this.resKillData)
						this.autoWater = this.resKillData.functionParams.auto_add_water
						this.autoClean = this.resKillData.functionParams.auto_clean
						this.powerSwitch = this.resKillData.functionParams.auto_switch
					}
				})
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
