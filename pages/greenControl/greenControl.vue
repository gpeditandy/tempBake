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
					<text class="font-md text-muted">虫情监控仪</text>
				</view>
				<view class="d-flex a-center j-sb py-1 px-2 font-md text-primary" style="width:240rpx;">
					<view class="d-flex a-center" @click="handlePestSituation">
						<image src="../../static/images/contrl.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-1">控制</text>
					</view>
					<view class="d-flex a-center" @click="handlePestStatistics">
						<image src="../../static/images/statistics.png" style="width: 30rpx;height: 30rpx;" mode="">
						</image>
						<text class="ml-1">统计</text>
					</view>
				</view>
			</view>

			<view class="d-flex a-center j-sb text-muted bg-my p-2 my-2 border">
				<view class="d-flex a-center">
					<image v-if="resItemPest.state==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" class="mr-2"></image>
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
			
			<view class="d-flex a-center j-sb font-md py-2" v-if="resItemPest.state==1">
				<view class="d-flex flex-column">
					<view class="d-flex flex-column mb-4">
						<view class="d-flex a-center mb-1">
							<image src="../../static/images/control-icon02.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
							<text class="text-light-muted ml-1 font">拍摄时间</text>
						</view>
						<view class="text-muted" v-if="resPhotoData.snapshotDate">{{resPhotoData.snapshotDate}}</view>
						<view class="text-muted" v-else>暂时拍摄时间</view>
					</view>
					<view class="d-flex flex-column">
						<view class="d-flex a-center mb-1">
							<image src="../../static/images/control-icon01.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
							<text class="text-light-muted ml-1 font">病虫害预测算法分析</text>
						</view>
						<view class="text-muted">
							<text v-if="resPhotoData.pestsNum">新增成虫{{resPhotoData.pestsNum}}只</text>
							<text v-else>暂无新增</text>
							<text>(相较上一次拍摄)</text>
						</view>
					</view>
				</view>
				<view>
					<image v-if="resPhotoData.imageUrl" :src="resPhotoData.imageUrl" style="width: 240rpx;height: 240rpx;" mode=""></image>
					<image v-else src="../../static/images/empty01.png" style="width: 240rpx;height: 240rpx;" mode="aspectFill"></image>
				</view>
			</view>
			<view v-else class="d-flex a-center flex-column">
				<image src="../../static/images/unLine.png" mode="" class="mt-5 mb-2" style="width: 244rpx;height: 244rpx;"></image>
				<view class="text-light-muted font-md">当前设备离线，请选择其它在线设备</view>
			</view>
		</view>
		
		<view class="p-2 m-2 bg-white rounded8">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center">
					<text class="myline mr-1"></text>
					<text class="font-md text-muted">杀虫终端</text>
				</view>
				<view class="d-flex a-center j-end py-1 px-2 font-md text-primary" style="width:240rpx;">
					<view class="d-flex a-center" @click="handleKillPestControl">
						<image src="../../static/images/contrl.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-1">控制</text>
					</view>
				</view>
			</view>
		
			<view class="d-flex a-center j-sb text-muted bg-my p-2 my-2 border">
				<view class="d-flex a-center">
					<image v-if="resItemKillPest.state==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" class="mr-2"></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 40rpx;" class="mr-2"></image>
				</view>
				<view class="flex-1">
					<picker :range-key="'deviceInfo'" :value="insectIndex" :range="insectArray" @change="insectChange">
						<view class="d-flex a-center j-sb">
							<view class="d-flex a-center">
								<text class="font-md mr-2">{{cutStatus(insectArray[insectIndex].deviceInfo)}}</text>
							</view>
							<text class="iconfont icon-jinru text-muted"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class="d-flex a-center font-md" v-if="resItemKillPest.state==1">
				<view class="w-50 d-flex flex-column">
					<text class="text-light-muted mb-1">开灯时间</text>
					<view class="d-flex a-end">
						<text v-if="resKillData.functionParams">{{resKillData.functionParams.light_time}}</text>
						<text class="font text-light-muted ml-1">每日</text>
					</view>
				</view>
				<view class="w-50 d-flex flex-column">
					<text class="text-light-muted mb-1">持续工作</text>
					<view class="d-flex a-end">
						<text v-if="resKillData.functionParams">{{resKillData.functionParams.light_duration}}小时</text>
						<text class="font text-light-muted ml-1">每日</text>
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
				pestsId:null,
				pestKillId:null,
				nameIndex: 0,
				nameArr: [],
				index: 0,
				array: [{id:'',deviceId:'',deviceName:'',deviceInfo:''}],
				arrayIds:[],
				insectIndex:0,
				insectArray:[{id:'',deviceId:'',deviceName:'',deviceInfo:''}],
				resItemPest:{},
				resItemKillPest:{},
				pest_id:null,
				resPestsParams:{},
				dayTime:3600*1000*24,//一天的时间戳
				endTime:new Date().getTime(),
				resPhotoData:{},
				resKillData:{}
			}
		},
		onLoad() {
			this.getTobaccoFieldInfo()
			this.getPestsList()
			this.getPestKillerList()
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
		},
		computed:{
			getCurrentPestId() {
				return this.array[this.index].deviceId
			},
			getCurrentKillPestId() {
				return this.insectArray[this.insectIndex].deviceId
			}
		},
		methods: {
			getPestsList() {
				this.$H.get('pests/pests/page',{
					page:1,
					limit:10
				}).then(res => {
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
					console.log(this.array)
					this.pestsId = this.array[this.index].id
					this.arrayIds = this.array.map(item => item.deviceId)
					this.getPestsDetailById()
					this.getFunctionDetailByDeviceId()
					this.getPhotoDetailByDeviceId()
				})
			},
			getPestsDetailById() {
				let id = this.pestsId
				this.$H.get(`pests/pests/${id}`).then(res => {
					console.log(res)
					this.resItemPest = res.data
				})
			},
			getPestKillerList() {
				this.$H.get('pestKiller/pestKiller/page',{
					page:1,
					limit:10
				}).then(res => {
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
					this.insectArray = tempArr
					console.log(this.insectArray)
					this.pestKillId = this.insectArray[this.insectIndex].id
					this.getPestKillerDetailById()
					this.getKillPestInfoByDeviceId()
				})
			},
			getPestKillerDetailById() {
				let id = this.pestKillId
				this.$H.get(`pestKiller/pestKiller/${id}`).then(res => {
					console.log(res)
					this.resItemKillPest = res.data
				})
			},
			changeArea(e) {
				this.nameIndex = e.target.value
			},
			bindPickerChange(e) {
				this.index = e.target.value
				this.pestsId = this.array[this.index].id
				this.pest_id = this.array[this.index].deviceId
				this.getPestsDetailById()
				this.getFunctionDetailByDeviceId()
				this.getPhotoDetailByDeviceId()
			},
			insectChange(e) {
				this.insectIndex = e.target.value
				this.pestKillId = this.insectArray[this.insectIndex].id
				this.getPestKillerDetailById()
				this.getKillPestInfoByDeviceId()
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
			getFunctionDetailByDeviceId() {
				console.log(this.getCurrentPestId)
				this.$H.get('pests/pests/deviceFunctionList',{
					deviceId:this.getCurrentPestId,
				}).then(res => {
					console.log(res)
					this.resPestsParams = res.data.filter(item => item.deviceId==this.getCurrentPestId)
					console.log(this.resPestsParams)
				})
			},
			getPhotoDetailByDeviceId() {
				this.$H.get('pests/pests/imageLogs',{
					deviceId:this.getCurrentPestId,
					page:1,
					limit:10,
					startDateTime:this.dayTime*30,
					endDateTime:this.endTime
				}).then(res => {
					console.log(res)
					if(res.data.list.length>0) {
						this.resPhotoData = res.data.list[0]
						console.log(this.resPhotoData)
					} else {
						this.resPhotoData = {}
					}
				})
			},
			getKillPestInfoByDeviceId() {
				this.$H.get('pestKiller/pestKiller/deviceFunctionList',{
					deviceId:this.getCurrentKillPestId
				}).then(res => {
					console.log(res)
					if(res.data.length>0) {
						const tempRes = res.data
						let tempArr = tempRes.filter(item => item.deviceId==this.getCurrentKillPestId)
						this.resKillData = tempArr[0]
					}
				})
			},
			handlePestSituation() {
				uni.navigateTo({
					url:'../pestSituation/pestSituation?deviceid=' + this.getCurrentPestId
				})
			},
			handleKillPestControl() {
				uni.navigateTo({
					url:'../pestKill/pestKill?deviceidKill=' + this.getCurrentKillPestId
				})
			},
			handlePestStatistics() {
				uni.navigateTo({
					url:'../pestSituationStatistics/pestSituationStatistics?arrayIds=' + this.arrayIds
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
