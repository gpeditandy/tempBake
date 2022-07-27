<template>
	<view>
		<view class="d-flex a-center j-sb p-2 bg-white border-top">
			<view class="d-flex a-center">
				<image src="../../static/images/jidi.png" style="width: 32rpx;height: 32rpx;" mode="" class="mr-1"></image>
				<view class="font-md">{{nameArr[nameIndex]}}</view>
			</view>
			<picker mode="selector" :value="nameIndex" :range="nameArr" @change="changeArea">
				<image src="../../static/images/list.png" style="width: 36rpx;height: 36rpx;" mode="" class="border-left pl-3"></image>
			</picker>
		</view>
		<view class="p-2 m-2 bg-white rounded8">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center">
					<text class="myline mr-1"></text>
					<text class="font-md text-muted">滴灌监测</text>
				</view>
				<view class="d-flex a-center j-sb py-1 px-2 font-md text-primary" style="width:240rpx;">
					<view class="d-flex a-center" @click="handleDetail">
						<image src="../../static/images/contrl.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-1">控制</text>
					</view>
					<view class="d-flex a-center" @click="handeleStatistics">
						<image src="../../static/images/statistics.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-1">统计</text>
					</view>
				</view>
			</view>
			
			<view class="d-flex a-center text-muted border p-2 my-2">
				<view class="d-flex a-center">
					<image v-if="deviceArray[deviceIndex].status==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" class="mr-2" mode=""></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 40rpx;" class="mr-2" mode=""></image>
				</view>
				<view class="flex-1">
					<picker mode="selector" :value="deviceIndex" :range="deviceArray" :range-key="'deviceInfo'" @change="bindPickerChange">
						<view class="d-flex a-center j-sb">
							<view class="d-flex a-center">
								<text class="font-md mr-2">{{cutStatus(deviceArray[deviceIndex].deviceInfo)}}</text>
							</view>
							<text class="iconfont icon-jinru text-muted"></text>
						</view>
					</picker>
				</view>
			</view>
			
			<view v-if="deviceArray[deviceIndex].status==1">
				<view class="d-flex a-center j-sb">
					<view class="d-flex p-3 mb">
						<image src="../../static/images/icon03.png" class="mr-1 pt" style="width: 32rpx;height: 32rpx;" mode=""></image>
						<view class="d-flex flex-column">
							<text class="font-md text-light-muted mb-1">土壤湿度</text>
							<view>
								<text class="font-lg mr-1">{{deviceDetail.soil_humidity}}</text>
								<text class="font-sm">%</text>
							</view>
						</view>
					</view>
					<view class="d-flex p-3 mb">
						<image src="../../static/images/icon04.png" class="mr-1 pt" style="width: 32rpx;height: 32rpx;" mode=""></image>
						<view class="d-flex flex-column">
							<text class="font-md text-light-muted mb-1">土壤温度</text>
							<view>
								<text class="font-lg mr-1">{{deviceDetail.soil_temperature}}</text>
								<text class="font-sm">℃</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else class="d-flex a-center flex-column">
				<image src="../../static/images/unLine.png" mode="" class="mt-5 mb-2" style="width: 244rpx;height: 244rpx;"></image>
				<view class="text-light-muted font-md">当前设备离线，请选择其它在线设备</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onLine:'[在线]',
				offLine:'[离线]',
				nameIndex:0,
				nameArr:['宁安市烟叶种植数字化试验田'],
				deviceIndex:0,
				deviceArray:[{id:'',deviceId:'',deviceName:'',deviceInfo:''}],
				SelectId:null,
				deviceId:null,
				allId:'',
				deviceDetail:{}
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
		},
		onLoad() {
			this.getIrrigationList()
			this.getTobaccoFieldInfo()
		},
		computed:{
			getCurrentId() {
				return this.deviceArray[this.deviceIndex].deviceId
			}
		},
		methods: {
			changeArea(e) {
				this.nameIndex = e.target.value
			},
			bindPickerChange(e) {
				this.deviceIndex = e.target.value
				this.SelectId = this.deviceArray[this.deviceIndex].id
				this.deviceId = this.deviceArray[this.deviceIndex].deviceId
				console.log(this.SelectId)
				console.log(this.deviceId)
				this.getIrrigationDetailById()
			},
			getIrrigationList() {
				this.$H.get('irrigation/irrigation/page',{
					page:1,
					limit:10
				}).then(res => {
					console.log(res)
					if(res.data.list.length>0) {
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
						this.deviceArray = tempArr
						console.log(this.deviceArray)
						this.SelectId = this.deviceArray[this.deviceIndex].id
						console.log(this.SelectId)
						this.allId = this.deviceArray.map(item => item.deviceId)
						this.deviceId = this.deviceArray[this.deviceIndex].deviceId
						console.log(this.deviceId)
						console.log(this.allId)
						this.getIrrigationDetailById()
					} else {
						uni.showLoading({
							title:'数据加载中...',
							mask:true
						})
						setTimeout(() => {
							uni.hideLoading()
							this.$message.error('暂无数据')
							setTimeout(() => {
								uni.navigateBack({
									delta:1
								})
							},2000)
						},2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getIrrigationDetailById() {
				let id = this.SelectId
				this.$H.get(`irrigation/irrigation/${id}`).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						if(JSON.stringify(res.data.property) != "{}") {
							const resData = res.data.property
							this.deviceDetail = resData
						} else {
							return this.$message.error('暂无数据')
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			handleDetail() {
				uni.navigateTo({
					url:'../irrigationControl/irrigationControl?ids=' + this.allId
				})
			},
			handeleStatistics() {
				uni.navigateTo({
					url:'../irrigationRecords/irrigationRecords?ids=' + this.allId
				})
			},
			getTobaccoFieldInfo() {
				this.$H.get('farmland/farmland/page', {
					limit: 10,
					page: 1,
				}).then(res => {
					console.log(res)
					this.nameArr = res.data.list.map(item => item.name)  
				}).catch(err => {
					console.log(err)
				})
			},
			cutStatus(value) {
				if(!value) return
				return value.substring(5)
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
</style>
