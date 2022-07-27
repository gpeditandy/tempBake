<template>
	<view>
		<view class="p-2 m-2 bg-white rounded">
			<view class="d-flex a-center j-sb font-md mb-2">
				<view class="d-flex a-center">
					<text class="myline mr-1"></text>
					<text>干球温度超限告警</text>
				</view>
			</view>
			<view class="bg-gray p-2">
				<view class="d-flex a-center j-sb font mb-1">
					<view class="font text-muted">告警名称</view>
					<view class="text-primary d-flex a-center">
						<image src="../../static/images/edit_bg.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						<text class="ml-1 font-md" @click="handleModify">修改</text>
					</view>
				</view>
				<view class="font-md mb-2">干球超限{{dry_temp}}度</view>
				<view class="font text-muted mb-1">告警条件</view>
				<view class="d-flex flex-column font-md warn-color mb-3">
					<text>干球温度<i>偏离</i>目标温度<i>±{{dry_temp}}℃</i></text>
					<text>并持续<i>{{dry_duration}}分钟</i>以上</text>
				</view>
				<view class="font-md">则向{{phone}}发送告警信息</view>
			</view>
		</view>
		<view class="p-2 m-2 bg-white rounded">
			<view class="d-flex a-center j-sb font-md mb-2">
				<view class="d-flex a-center">
					<text class="myline mr-1"></text>
					<text>湿球温度超限告警</text>
				</view>
			</view>
			<view class="bg-gray p-2">
				<view class="d-flex a-center j-sb font mb-1">
					<view class="font text-muted">告警名称</view>
					<view class="text-primary d-flex a-center">
						<image src="../../static/images/edit_bg.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						<text class="ml-1 font-md" @click="handleModify2">修改</text>
					</view>
				</view>
				<view class="font-md mb-2">湿球超限{{wet_temp}}度</view>
				<view class="font text-muted mb-1">告警条件</view>
				<view class="d-flex flex-column font-md warn-color mb-3">
					<text>湿球温度<i>偏离</i>目标温度<i>±{{wet_temp}}℃</i></text>
					<text>并持续<i>{{wet_duration}}分钟</i>以上</text>
				</view>
				<view class="font-md">则向{{phone}}发送告警信息</view>
			</view>
		</view>
		
		<view class="p-2 m-2 bg-white rounded font">
			<view class="d-flex a-center font-md mb-2">
				<text class="myline mr-1"></text>
				<text>其他告警</text>
			</view>
			<!-- <view class="d-flex a-center j-sb mb-2">
				<text class="font-md">温度计故障告警</text>
				<switch checked="true" style="transform:scale(0.8)" color="#00E065" @change="change1Switch" />
			</view> -->
			<!-- <view class="text-muted">
				当系统检测到干球温度计信号缺失（包括上棚干球和下棚干球）会自动发送报警短信，原因可能是干球温度计故障或者接头接触不良
			</view> -->
			<view class="mt-4 mb-2"></view>
			<view class="d-flex a-center j-sb mb-2">
				<text class="font-md">交流单相电压告警</text>
				<switch :checked="voltage" style="transform:scale(0.8)" color="#00E065" @change="change2Switch" />
			</view>
			<view class="text-muted">
				交流单相电压超出220V±20％时报警，超过270V或低于170V，并持续3min时对有关设备进行保护并报警。若电压恢复正常，10min后自动恢复
			</view>
			
			<!-- <view class="mt-4 mb-2"></view>
			<view class="d-flex a-center j-sb mb-2">
				<text class="font-md">电流告警</text>
				<switch checked="true" style="transform:scale(0.8)" color="#00E065" @change="change3Switch" />
			</view>
			<view class="text-muted">
				电流达到额定值的1.2倍，并持续3min对有关设备进行保护并报警。若电流恢复正常，10min后自动恢复
			</view>
			
			<view class="mt-4 mb-2"></view>
			<view class="d-flex a-center j-sb mb-2">
				<text class="font-md">电源缺相告警</text>
				<switch checked="true" style="transform:scale(0.8)" color="#00E065" @change="change4Switch" />
			</view>
			<view class="text-muted">
				电源缺相时声光报警，并停止循环风机运转，电源正常后人工恢复
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baking_times:'',
				deviceId:'',
				alarmData:[],
				wet_duration: '',
				dry_duration: '',
				wet_temp: '',
				dry_temp: '',
				phone:'',
				voltage: false
			}
		},
		onLoad(e) {
			this.baking_times = e.baking_times
			this.deviceId = e.deviceId
		},
		onShow() {
			this.getAlarmList()
		},
		methods: {
			handleModify() {
					uni.navigateTo({
						url:'../warningParamsResize/warningParamsResize?wet_duration=' + this.wet_duration + '&dry_duration=' + this.dry_duration + '&wet_temp=' + this.wet_temp + '&dry_temp=' + this.dry_temp + '&phone=' + this.phone
					})	
			},
			handleModify2() {
					uni.navigateTo({
						url:'../warningParamsResize2/warningParamsResize2?wet_duration=' + this.wet_duration + '&dry_duration=' + this.dry_duration + '&wet_temp=' + this.wet_temp + '&dry_temp=' + this.dry_temp + '&phone=' + this.phone
					})	
			},
			getAlarmList() {
				this.$H.get('baking/bakingroom/deviceFunctionList',{
					deviceId:this.deviceId
				}).then(res => {
					this.alarmData = res.data.filter(item => item.functionId=='alert_params_setting')
					console.log(this.alarmData)
					this.wet_duration = this.alarmData[0].functionParams.wet_duration
					this.dry_duration = this.alarmData[0].functionParams.dry_duration
					this.wet_temp = this.alarmData[0].functionParams.wet_temp
					this.dry_temp = this.alarmData[0].functionParams.dry_temp
					this.voltage = this.alarmData[0].functionParams.voltage
					this.phone = this.alarmData[0].functionParams.phone
				}).catch(err => {
					console.log(err)
				})
			},
			handleSave() {
				this.$H.post('kylinks/device/invokeFunction',{
					deviceId: "baking001",
					functionId: "alert_params_setting",
					functionName: "告警参数阈值设置",
					functionParams: {
					    wet_duration: this.wet_duration,
					    dry_duration: this.dry_duration,
					    wet_temp: this.wet_temp,
					    dry_temp: this.dry_temp,
						phone:this.phone,
					    voltage: true
					}
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						uni.showLoading({
							title:'数据加载中...',
							mask:true
						})
						setTimeout((res) => {
							uni.hideLoading()
						},500)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			navigate(path) {
				if(!path) return
				uni.navigateTo({
					url:`/pages/${path}/${path}`
				})
			},
			change1Switch(e) {
				console.log(e)
			},
			change2Switch(e) {
				this.voltage = e.target.value
				this.handleSave()
			},
			change3Switch(e) {
				console.log(e)
			},
			change4Switch(e) {
				console.log(e)
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
.bg-warn{background-color: #E7F2FF;}
.warn-color i{font-style: normal;color: #FE9849;}
</style>
