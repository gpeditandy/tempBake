<template>
	<view>
		<view class="d-flex a-center j-sb p-2 bg-white border-top">
			<view class="d-flex a-center">
				<image src="../../static/images/jidi.png" style="width: 32rpx;height: 32rpx;" mode="" class="mr-1">
				</image>
				<view class="font-md">{{nameArr[nameIndex]}}</view>
			</view>
			<picker mode="selector" :value="nameIndex" :range="nameArr" @change="changeArea">
				<image src="../../static/images/list.png" style="width: 36rpx;height: 36rpx;" mode=""
					class="border-left pl-3"></image>
			</picker>
		</view>
		<view class="p-2 m-2 bg-white rounded8">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center">
					<text class="myline mr-1"></text>
					<text class="font-md text-muted">注水监测</text>
				</view>
				<view class="d-flex a-center j-sb py-1 px-2 font-md text-primary" style="width:240rpx;">
					<view class="d-flex a-center" @click="handleControl">
						<image src="../../static/images/contrl.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-1">控制</text>
					</view>
					<view class="d-flex a-center" @click="handeleStatistics">
						<image src="../../static/images/statistics.png" style="width: 30rpx;height: 30rpx;" mode="">
						</image>
						<text class="ml-1">统计</text>
					</view>
				</view>
			</view>

			<view class="d-flex a-center j-sb text-muted p-2 my-2 border">
				<view class="d-flex a-center">
					<image v-if="resItem.state==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" class="mr-2"></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 40rpx;" class="mr-2"></image>
				</view>
				<view class="flex-1">
					<picker :range-key="'deviceInfo'" :value="index" :range="array" @change="bindPickerChange">
						<view class="d-flex a-center j-sb">
							<view class="d-flex a-center">
								<text class="font-md mr-2">{{cutStatus(array[index].deviceInfo)}}</text>
							</view>
							<text class="iconfont icon-jinru text-muted"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class="d-flex a-center j-sb mt-4" v-if="resItem.state==1">
				<view class="d-flex flex-column">
					<text class="text-muted mb-1 font">移栽车注水速度</text>
					<view class="d-flex a-end">
						<text class="font-md mr">{{propertyObj.moving_speed}}</text>
						<text class="text-light-muted font-sm">m/s</text>
					</view>
				</view>
				<view class="d-flex flex-column">
					<text class="text-muted mb-1 font">注水苗数</text>
					<view class="d-flex a-end">
						<text class="font-md mr">{{propertyObj.complete_amount}}</text>
						<text class="text-light-muted font-sm"></text>
					</view>
				</view>
				<view class="d-flex flex-column">
					<text class="text-muted mb-1 font">水箱剩余</text>
					<view class="d-flex a-end">
						<text class="font-md mr">{{propertyObj.water_remained}}</text>
						<text class="text-light-muted font-sm">L</text>
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
				id:null,
				nameIndex: 0,
				nameArr: [],
				index: 0,
				array: [{id:'',deviceId:'',deviceName:'',deviceInfo:''}],
				allId:'',
				propertyObj:{},
				resItem:{}
			}
		},
		onLoad() {
			this.getTobaccoFieldInfo()
			this.getFloodingList()
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
		},
		methods: {
			handleControl() {
				uni.navigateTo({
					url:'../waterControl/waterControl'
				})
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
					this.array = tempArr
					this.id = this.array[this.index].id
					this.getInjectionDetailById()
					this.allId = this.array.map(item => item.deviceId)
				}).catch(err => {
					console.log(err)
				})
			},
			getInjectionDetailById() {
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				let id = this.id
				this.$H.get(`flooding/flooding/${id}`).then(res => {
					uni.hideLoading()
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.resItem = res.data
						this.propertyObj = res.data.property
						
					}
				})
			},
			changeArea(e) {
				this.nameIndex = e.target.value
			},
			bindPickerChange(e) {
				this.index = e.target.value
				this.id = this.array[this.index].id
				this.getInjectionDetailById()
			},
			getTobaccoFieldInfo() {
				uni.showLoading({
					title:'数据加载中...',
					mask:true
				})
				this.$H.get('farmland/farmland/page', {
					limit: 10,
					page: 1,
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					this.nameArr = res.data.list.map(item => item.name)  
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			handeleStatistics() {
				uni.navigateTo({
					url:'../injectionRecords/injectionRecords?ids=' + this.allId
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
	page {
		background-color: #F2F3F5;
	}
</style>
