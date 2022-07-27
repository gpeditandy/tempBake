<template>
	<view>
		<view class="d-flex a-center j-sb p-2 bg-white border-top">
			<view class="d-flex a-center">
				<image src="../../static/images/jidi.png" style="width: 32rpx;height: 32rpx;" mode="" class="mr-1"></image>
				<view class="font-md">{{nameArr[nameIndex]}}</view>
			</view>
			<picker :value="nameIndex" :range="nameArr" @change="changeArea">
				<image src="../../static/images/list.png" style="width: 36rpx;height: 36rpx;" mode="" class="border-left pl-3"></image>
			</picker>
		</view>
		<view class="p-2 m-2 bg-white">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center">
					<text class="myline mr-1"></text>
					<text class="font-md text-muted">育苗棚环境</text>
				</view>
				<view class="d-flex a-center j-sb py-1 px-2 font-md text-primary" style="width:240rpx;">
					<view class="d-flex a-center" @click="handleDetail">
						<image src="../../static/images/contrl.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-1">控制</text>
					</view>
					<view class="d-flex a-center" @click="handleChartsDetail">
						<image src="../../static/images/statistics.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-1">统计</text>
					</view>
				</view>
			</view>
			<view class="d-flex a-center j-sb text-muted bg-my p-2 my-2 border">
				<view class="d-flex a-center">
					<image v-if="array[index].status==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" class="mr-2" mode=""></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 40rpx;" class="mr-2" mode=""></image>
				</view>
				<view class="flex-1">
					<picker :range-key="'deviceInfo'" :value="index" :range="array" @change="bindPickerChange">
						<view class="d-flex a-center j-sb">
							<view class="d-flex a-center">
								<view class="font-md mr-2">{{cutStatus(array[index].deviceInfo)}}</view>
							</view>
							<text class="iconfont icon-jinru text-muted"></text>
						</view>
					</picker>
				</view>
			</view>
			<view v-if="array[index].status==1">
				<view class="d-flex a-center j-sb">
					<view class="d-flex p-2 mb-1 w-33">
						<image src="../../static/images/icon01.png" class="mr-1" style="width: 32rpx;height: 32rpx;padding-top: 4rpx;" mode=""></image>
						<view class="d-flex flex-column">
							<text class="font text-light-muted mb-1">空气温度</text>
							<view>
								<text v-if="result && result.property" class="font-lg mr-1">{{result.property.air_temperature}}</text>
								<text v-else class="font mr-1">暂无</text>
								<text class="font-sm">℃</text>
							</view>
						</view>
					</view>
					<view class="d-flex p-2 mb-1 w-33">
						<image src="../../static/images/icon02.png" class="mr-1" style="width: 32rpx;height: 32rpx;padding-top: 4rpx;" mode=""></image>
						<view class="d-flex flex-column">
							<text class="font text-light-muted mb-1">空气湿度</text>
							<view>
								<text v-if="result && result.property" class="font-lg mr-1">{{result.property.air_humidity}}</text>
								<text v-else class="font mr-1">暂无</text>
								<text class="font-sm">%</text>
							</view>
						</view>
					</view>
					<view class="d-flex p-2 mb-1 w-33">
						<image src="../../static/images/icon05.png" class="mr-1" style="width: 32rpx;height: 32rpx;padding-top: 4rpx;" mode=""></image>
						<view class="d-flex flex-column">
							<text class="font text-light-muted mb-1">CO2浓度</text>
							<view>
								<text v-if="result && result.property" class="font-lg mr-1">{{result.property.co2}}</text>
								<text v-else class="font mr-1">暂无</text>
								<text class="font-sm">ppm</text>
							</view>
						</view>
					</view>
				</view>
				<view class="d-flex a-center j-sb">
					<view class="d-flex p-2 mb-1 w-33">
						<image src="../../static/images/icon04.png" class="mr-1" style="width: 32rpx;height: 32rpx;padding-top: 4rpx;" mode=""></image>
						<view class="d-flex flex-column">
							<text class="font text-light-muted mb-1">苗床温度</text>
							<view>
								<text v-if="result && result.property" class="font-lg mr-1">{{result.property.soil_temperature}}</text>
								<text v-else class="font mr-1">暂无</text>
								<text class="font-sm">℃</text>
							</view>
						</view>
					</view>
					<view class="d-flex p-2 mb-1 w-33">
						<image src="../../static/images/icon-ec.png" class="mr-1" style="width: 32rpx;height: 32rpx;padding-top: 4rpx;" mode=""></image>
						<view class="d-flex flex-column">
							<text class="font text-light-muted mb-1">可溶性盐浓度</text>
							<view>
								<text v-if="result && result.property" class="font-lg mr-1">{{result.property.ec_value}}</text>
								<text v-else class="font mr-1">暂无</text>
								<text class="font-sm">mS/cm</text>
							</view>
						</view>
					</view>
					<view class="d-flex p-2 mb-1 w-33">
						<image src="../../static/images/icon06.png" class="mr-1" style="width: 32rpx;height: 32rpx;padding-top: 4rpx;" mode=""></image>
						<view class="d-flex flex-column">
							<text class="font text-light-muted mb-1">光照度</text>
							<view>
								<text v-if="result && result.property" class="font-lg mr-1">{{result.property.illumination}}</text>
								<text v-else class="font mr-1">暂无</text>
								<text class="font-sm">KLux</text>
							</view>
						</view>
					</view>
				</view>
				<view class="bg-element p-2 rounded8 d-flex">
					<view class="font-md d-flex flex-column ml-2" style="width: 300rpx;">
						<view class="text-muted mt-1 mb-2">苗床肥力模型</view>
						<view class="font-md" v-if="result.property">
							<view class="d-flex a-center mb-3">
								<text class="point rounded16"></text>
								<text class="text-muted ml-2 mr-2">氮(N)</text>
								<view class="d-flex a-end">
									<text class="font-weight font-md mr">{{result.property.n_element}}</text>
									<text class="font-sm text-muted">mg/kg</text>
								</view>
							</view>
							<view class="d-flex a-center mb-3">
								<text class="point pointP rounded16"></text>
								<text class="text-muted ml-2 mr-2">磷(P)</text>
								<view class="d-flex a-end">
									<text class="font-weight font-md mr">{{result.property.p_element}}</text>
									<text class="font-sm text-muted">mg/kg</text>
								</view>
							</view>
							<view class="d-flex a-center mb">
								<text class="point pointK rounded16"></text>
								<text class="text-muted ml-2 mr-2">钾(K)</text>
								<view class="d-flex a-end">
									<text class="font-weight font-md mr">{{result.property.k_element}}</text>
									<text class="font-sm text-muted">mg/kg</text>
								</view>
							</view>
						</view>
					</view>
					<view class="charts-box">
						<qiun-data-charts type="ring" :chartData="chartData" :opts="{dataLabel:false,legend:{show:false,position:'left',itemGap:50,lineHeight:50},title:{name:'苗床pH值',fontSize:13},subtitle:{name:PH,fontSize:12,color:'#303133',offsetY:'1',fontSize:20},extra:{ring:{ringWidth:20,customRadius:60,centerColor:'#F5F6F9'}}}" background="none" />
					</view>
				</view>
			</view>
			<view v-else class="d-flex a-center flex-column">
				<image src="../../static/images/unLine.png" mode="" class="mt-5 mb-2" style="width: 244rpx;height: 244rpx;"></image>
				<view class="text-light-muted font-md">当前设备离线，请选择其它在线设备</view>
			</view>
		</view>
		<view class="bg-white rounded m-2 p-2">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center">
					<text class="myline mr-1"></text>
					<text class="font-md text-muted">育苗棚风机控制</text>
				</view>
				<view class="d-flex a-center j-sb py-1 px-2 font-md text-primary" style="width:240rpx;">
					<view class="d-flex a-center" @click="handleContrlWind">
						<image src="../../static/images/contrl.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-1 text-primary">控制</text>
					</view>
					<view class="d-flex a-center" @click="handleStatisticWind">
						<image src="../../static/images/statistics.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-1">统计</text>
					</view>
				</view>
			</view>
			
			<view class="d-flex a-center j-sb text-muted bg-my p-2 my-2 border">
				<view class="d-flex a-center">
					<image v-if="windArr[windIndex].status==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" class="mr-2" mode=""></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 40rpx;" class="mr-2" mode=""></image>
				</view>
				<view class="flex-1">
					<picker :range-key="'deviceInfo'" :value="windIndex" :range="windArr" @change="changeWindflow">
						<view class="d-flex a-center j-sb">
							<view class="d-flex a-center">
								<view class="font-md mr-2">{{cutStatus(windArr[windIndex].deviceInfo)}}</view>
							</view>
							<text class="iconfont icon-jinru text-muted"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class="d-flex a-center j-sb font-md py-2" v-if="windArr[windIndex].deviceProperty">
				<view>
					<text class="text-muted">空气温度监测</text>
					<view class="mt-1">
						<text class="font-weight mr">{{windArr[windIndex].deviceProperty.temperature}}</text>
						<text class="font-sm text-muted">℃</text>
					</view>
				</view>
				<view>
					<text class="text-muted">设备状态</text>
					<view class="mt-1">
						<text class="font-weight">{{windArr[windIndex].deviceProperty.status==0?'关闭':'开启'}}</text>
					</view>
				</view>
				<view>
					<text class="text-muted">模式</text>
					<view class="mt-1">
						<text class="font-weight">{{windArr[windIndex].deviceProperty.mode==0?'远程手动':'智能模式'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white rounded m-2 p-2">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center">
					<text class="myline mr-1"></text>
					<text class="font-md text-muted">摄像头</text>
				</view>
				<view class="d-flex a-center">
					<text>{{this.current+1}}/</text>
					<text>{{getSwiper}}</text>
				</view>
			</view>
			<template v-if="cameraImgList.length>0">
				<view>
					<swiper :current="current" :circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiperimg" @change="durationChange" >
						<swiper-item v-for="(item,index) in cameraList" :key="index" @click="handleTimeView">
							<view class="swiper-item rounded">
								<image class="play" src="../../static/images/play-img.png" mode=""></image>
								<image class="swiperimg" v-if="item.recentImage" :src="item.recentImage" mode=""></image>
								<image class="swiperimg" v-else src="../../static/images/empty01.png" mode=""></image>
								<text class="mycamera">{{item.cameraId}}</text>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</template>
			<template v-else>
				<view class="d-flex a-center flex-column font-md" @click="handleTimeView">
					<image src="../../static/images/empty.png" style="width: 500rpx;height: 330rpx;" mode=""></image>
					<text class="text-muted">暂无抓拍图片</text>
				</view>
			</template>
		</view>
		<view class="bg-white rounded m-2 p-2">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center">
					<text class="myline mr-1"></text>
					<text class="font-md text-muted">图像采集</text>
				</view>
				<view class="d-flex a-center" @click="handleMore">
					<text class="font">更多</text>
				</view>
			</view>
			<view class="d-flex a-center j-sb text-muted bg-my p-2 my-2 border">
				<view class="d-flex a-center">
					<image v-if="cameraArray[cameraIndex].status==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" class="mr-2" mode=""></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 40rpx;" class="mr-2" mode=""></image>
				</view>
				<view class="flex-1">
					<picker :range-key="'deviceInfo'" :value="cameraIndex" :range="cameraArray" @change="bindCameraChange">
						<view class="d-flex a-center j-sb">
							<view class="d-flex a-center">
								<view class="font-md mr-2">{{cutStatus(cameraArray[cameraIndex].deviceInfo)}}</view>
							</view>
							<text class="iconfont icon-jinru text-muted"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class="d-flex a-center j-sb flex-wrap p-2 j-center">
				<view class="w-30 mb-3 d-flex a-center j-center"
				v-for="(item,index) in getAnyOfImages"
				:key="index"
				@click="handlePrevImage(index)"
				>
					<image :src="item" lazy-load style="width: 210rpx;height: 148rpx;" class="rounded border" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let deviceStr = null
	export default {
		data() {
			return {
				windflowArr:[],
				windArr:[{deviceId:'',deviceName:'',deviceInfo:''}],
				windIndex:0,
				onLine:'[在线]',
				offLine:'[离线]',
				cameraList:[],
				PH:1,
				deviceId:'',
				index:0,
				array:[{deviceId:'',deviceName:'',deviceInfo:''}],
				cameraIndex:0,
				cameraArray:[{cameraId:'',cameraName:'',deviceInfo:''}],
				cameraImages:[],
				current:0,
				seedingData:[],
				nameIndex:0,
				nameArr:[],
				deviceList:[],
				result:{},
				cameraIds:[],
				cameraId:'',
				days:30,
				dayTime:3600*24*1000,//一天的时间戳
				startTime:0,
				endTime:new Date().getTime(),
				seedingObj:{},
				seedingId:'',
				cameraImgList:[],
				chartData: {
					categories: [],
					series: [{
						data: [{
								"name": "氮(N)",
								"color":"#EB4343",
								"value": 0
							},
							{
								"name": "磷(P)",
								"color":"#FF8E25",
								"value": 0
							},
							{
								"name": "钾(K)",
								"color":"#0977FF",
								"value": 0
							}
						]
					}]
				},
			}
		},
		computed:{
			getSwiper() {
				return this.cameraImgList.length
			},
			getCurrentCameraId() {
				return this.cameraArray[this.cameraIndex].cameraId
			},
			getAnyOfImages() {
				if(this.cameraImages.length > 9) {
					return this.cameraImages.slice(0,9)
				} else {
					return this.cameraImages
				}
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
			this.getSeedingList()
		},
		methods: {
			handlePrevImage(index) {
				uni.previewImage({
					current:index,
					urls:this.getAnyOfImages
				})
			},
			getRandomdImg() {
				this.$H.get('seedling/seedlingshed/imageLogs',{
					startDateTime:this.getDayTimes(),
					endDateTime:this.endTime,
					deviceId:this.getCurrentCameraId,
					limit:10,
					page:1
				}).then(res => {
					const resData = res.data.list.map(item => item.imageUrl)
					this.cameraImages = resData
					console.log(this.cameraImages)
				}).catch(err => {
					console.log(err)
				})
			},
			handleMore() {
				uni.navigateTo({
					url:'../cameraImageList/cameraImageList?cameraIds=' + this.cameraIds
				})
			},
			durationChange(e) {
				this.current = e.detail.current
			},
			getDayTimes() {
				return this.endTime - 3600*1000*24*30
			},
			getSeedingName() {
				return this.nameArr[this.nameIndex]
			},
			changeArea(e) {
				this.nameIndex = e.target.value
				console.log(this.nameIndex)
			},
			getSeedingList() {
				this.$H.get('seedling/seedlingshed/page',{
					limit:10,
					page:1
				}).then(res => {
					console.log(res)
					if(res.code !=0) {
						return this.$message.error(res.msg)
					} else {
						this.seedingData = res.data.list
						this.nameArr = res.data.list.map(item => item.name)
						this.seedingObj = res.data.list.filter(item => item.name == this.getSeedingName())
						this.seedingId = this.seedingObj.map(item => item.id)
						let tempArr = res.data.list.filter(item => item.name==this.getSeedingName())
						console.log(tempArr)
						this.deviceList = tempArr[0].deviceId
						this.cameraIds = tempArr[0].cameraId
						this.windflowArr = tempArr[0].windflowId
						this.getCameraUrl()
						this.getDeviceNameByDevcieId()
						this.getWindflowByDevcieId()
					}
				})
			},
			getWindflowByDevcieId() {
				this.$H.get('/seedling/seedlingshed/getDeviceList',{
					page:1,
					limit:10,
					deviceIds:this.windflowArr
				}).then(res => {
					console.log(res)
					const resData = res.data.list
					let tempArr = []
					for(let i=0;i<resData.length;i++) {
						let tempObj = {
							deviceId:resData[i].deviceId,
							deviceName:resData[i].deviceName,
							status:resData[i].state,
							deviceInfo:(resData[i].state == 1?this.onLine:this.offLine)  + ' ' + resData[i].deviceName + ' ' + resData[i].deviceId,
							deviceProperty:resData[i].property
						}
						tempArr.push(tempObj)
					}
					this.windArr = tempArr
					console.log(this.windArr)
				})
			},
			getDeviceNameByDevcieId() {
				this.$H.get('/seedling/seedlingshed/getDeviceList',{
					page:1,
					limit:10,
					deviceIds:this.deviceList
				}).then(res => {
					console.log(res)
					const resData = res.data.list
					let tempArr = []
					for(let i=0;i<resData.length;i++) {
						let tempObj = {
							deviceId:resData[i].deviceId,
							deviceName:resData[i].deviceName,
							status:resData[i].state,
							deviceInfo:(resData[i].state == 1?this.onLine:this.offLine)  + ' ' + resData[i].deviceName + ' ' + resData[i].deviceId
						}
						tempArr.push(tempObj)
					}
					this.array = tempArr
					console.log(this.array)
					this.deviceId = this.array[this.index].deviceId
					this.getDeviceDetailByDeviceId()
				})
			},
			getDeviceDetailByDeviceId() {
				this.$H.get('seedling/seedlingshed/deviceInfo',{
					deviceId:this.deviceId
				}).then(res => {
					console.log(res)
					const resData = res.data
					this.result = resData
					this.chartData.series[0].data[0].value = res.data.property.n_element
					this.chartData.series[0].data[1].value = res.data.property.p_element
					this.chartData.series[0].data[2].value = res.data.property.k_element
					this.PH = res.data.property.ph_value
				})
			},
			bindPickerChange(e) {
				this.index = e.target.value
				this.deviceId = this.array[this.index].deviceId
				this.getDeviceDetailByDeviceId()
			},
			bindCameraChange(e) {
				this.cameraIndex = e.target.value
				this.getRandomdImg()
			},
			changeWindflow(e) {
				this.windIndex = e.target.value
				this.deviceId = this.windArr[this.windIndex].deviceId
				this.getWindflowByDevcieId()
			},
			handleDetail() {
				uni.navigateTo({
					url:'../ymContrl/ymContrl?deviceid=' + JSON.stringify(this.array) + '&seedingid=' + this.seedingId
				})
			},
			handleChartsDetail() {
				uni.navigateTo({
					url:'../statistics/statistics?deviceid=' + JSON.stringify(this.deviceList)
				})
			},
			handleTimeView() {
				uni.navigateTo({
					url:'../time-view/time-view?cameraIds=' + JSON.stringify(this.cameraIds) +'&currentCameraId=' + this.cameraId
				})
			},
			navigate(path) {
				if(!path) return
				uni.navigateTo({
					url:`/pages/${path}/${path}`
				})
			},
			getCameraUrl() {
				console.log(this.cameraIds)
				this.$H.get('seedling/seedlingshed/getCameraList',{
					page:1,
					limit:10,
					cameraIds:this.cameraIds
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						this.cameraList = res.data.list
						console.log(this.cameraList)
						let tempArr = res.data.list.filter(item => item.status==1)
						this.cameraId = tempArr[0].cameraId
						this.cameraImgList = res.data.list.map(item => item.recentImage)
						console.log(this.cameraImgList)
						// 开始
						const resData = res.data.list
						let arr = []
						for(let i=0;i<resData.length;i++) {
							let obj = {
								cameraId:resData[i].cameraId,
								cameraName:resData[i].cameraName,
								status:resData[i].status,
								deviceInfo:(resData[i].status == 1?this.onLine:this.offLine)  + ' ' + resData[i].cameraName + ' ' + resData[i].cameraId
							}
							arr.push(obj)
						}
						this.cameraArray = arr
						console.log(this.cameraArray)
						// 结束
						this.getRandomdImg()
					}
				}).catch(err => {
					console.log(err)
				})
			},
			cutStatus(value) {
				if(!value) return
				return value.substring(5)
			},
			handleContrlWind() {
				uni.navigateTo({
					url:'../windControl/windControl?deviceId=' + this.windflowArr
				})
			},
			handleStatisticWind() {
				uni.navigateTo({
					url:'../windStatistics/windStatistics?deviceList=' + JSON.stringify(this.deviceList)
				})
			}
		}
	}
</script>

<style>
page{background-color: #f2f3f5;}
.location{border-top-left-radius: 10rpx;border-bottom-left-radius: 10rpx;border-bottom-right-radius: 10rpx;}
.myline{width:8rpx;height: 30rpx;background-color: #007AFF;display: inline-block;}
.bg-my{background-color: #F5F6F9;}
.d-flex .mr-1{color: #303133;}
.d-flex .font-sm{color: #606266;}
.d-flex .text-light-muted{color:#909399 !important;}
image{will-change: transform}
.swiper-item{margin:20rpx 0;position: relative;height: 300rpx;}
.swiper-item .swiperimg{width: 750rpx;height: 300rpx;}
.play{width: 92rpx;height: 92rpx;position: absolute;left:calc(50% - 23px);top:100rpx;z-index: 2;}
.mycamera{color: white;left:20rpx;bottom: 20rpx;position: absolute;opacity: 1;}
.bg-element{background-color: #F5F6F9;}

.charts-box {width: 320rpx;height: 140px;}
.myloader{height:140px;}
.loader {
	font-size: 20px;
	width: 1em;
	height: 1em;
	border-radius: 50%;
	position: relative;
	text-indent: -9999em;
	animation: load-effect 1s infinite linear;
}
@keyframes load-effect {
	0% {
		box-shadow: -3em 2em 0 .5em #f60, 0 2em 0 0 #007bff, 3em 2em 0 -.5em pink;
	}
	25% {
		box-shadow: -3em 2em 0 0 #f60, 0 2em 0 -.5em #007bff, 3em 2em 0 0 pink;
	}
	50% {
		box-shadow: -3em 2em 0 -0.5em #f60, 0 2em 0 0 #007bff, 3em 2em 0 .5em pink;
	}
	75% {
		box-shadow: -3em 2em 0 0 #f60, 0 2em 0 .5em #007bff, 3em 2em 0 0 pink;
	}
	100% {
		box-shadow: -3em 2em 0 .5em #f60, 0 2em 0 0 #007bff, 3em 2em 0 -.5em pink;
	}
}
.point{width:18rpx;height:12rpx;background:#EB4343;}
.pointP{background:#FF8E25;}
.pointK{background:#0977FF;}
</style>
