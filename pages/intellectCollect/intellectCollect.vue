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
					<text class="font-md text-muted">图像采集器</text>
				</view>
				<view class="d-flex a-center j-sb py-1 px-2 font-md text-primary" style="width:240rpx;">
					<view class="d-flex a-center" @click="handleControl">
						<image src="../../static/images/contrl.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-1">控制</text>
					</view>
					<view class="d-flex a-center" @click="handleStatistics">
						<image src="../../static/images/statistics.png" style="width: 30rpx;height: 30rpx;" mode="">
						</image>
						<text class="ml-1">统计</text>
					</view>
				</view>
			</view>

			<view class="d-flex a-center j-sb text-muted border p-2 my-2">
				<view class="d-flex a-center">
					<image v-if="resItem.status==1" src="../../static/images/current.png" style="width: 64rpx;height: 36rpx;" class="mr-2"></image>
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
			<view class="d-flex a-center j-sb font-md mb-2" @click="handleTimeView">
				<text class="text-light-muted">近日采集图像</text>
				<view class="d-flex a-center bg-slight-my rounded30 px-2 py-1">
					<image class="mr-2" src="../../static/images/play-img.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
					<text class="text-slight-my">实时观看</text>
				</view>
			</view>
			<template v-if="imgList.length>0">
				<view class="d-flex a-center j-sb flex-wrap father">
					<view class="position-relative w-30 mb-2"
					v-for="(item,index) in imgList"
					:key="index"
					@click="handlePreview(index)"
					>
						<image :src="item.imageUrl" style="width: 210rpx;height: 148rpx;" mode=""></image>
						<view class="rounded30 text-white bg-dark px-1 py position-absolute font-sm left-10 bottom-10">{{getHourMinutes(item.snapshotDate)}}</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="d-flex flex-column a-center my-4">
					<image src="../../static/images/empty.png" style="width: 300rpx;height: 198rpx;" mode=""></image>
					<text class="text-muted font-md">暂无图像</text>
				</view>
			</template>
		</view>
		<view class="p-2 m-2 bg-white rounded8">
			<view class="d-flex a-center" @click="handleSuggest">
				<image src="../../static/images/cellection-icon01.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
				<view class="d-flex flex-1 a-center j-sb ml-2">
					<text class="font-md font-weight">采收建议</text>
					<uni-icons type="forward" color="#B2B2B2"></uni-icons>
				</view>
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
				cameraId:null,
				nameIndex: 0,
				nameArr: [],
				index: 0,
				array: [{id:'',cameraId:'',cameraName:'',deviceInfo:''}],
				imgList:[
					{url:'/static/images/img01.png',time:'22:00'},
					{url:'/static/images/img01.png',time:'13:00'},
					{url:'/static/images/img01.png',time:'15:00'}
				],
				resItem:{},
				endTime:new Date().getTime(),
				status:null,
				deviceIds:[]
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
			this.getTobaccoFieldInfo()
			this.getCaiShouList()
		},
		computed:{
			getCurrentCaiShouId() {
				return this.array[this.index].cameraId
			},
			getImagesUrl() {
				return this.imgList.map(item => item.imageUrl)
			}
		},
		methods: {
			getHourMinutes(time) {
				if(!time) return
				let str1 = time.split(' ')[0]
				let str2 = time.split(' ')[1]
				return str2.substring(0,5)
			},
			handlePreview(index) {
				uni.previewImage({
					current:index,
					urls:this.getImagesUrl
				})
			},
			getDayTimes() {
				return this.endTime - 3600*1000*24*7
			},
			changeArea(e) {
				this.nameIndex = e.target.value
			},
			bindPickerChange(e) {
				this.index = e.target.value
				this.cameraId = this.array[this.index].cameraId
				this.getCaiShouDetailById()
			},
			getCaiShouList() {
				this.$H.get('caishou/caishou/page',{
					page:1,
					limit:10
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						if(res.data.list.length>0) {
							console.log(res)
							const resData = res.data.list
							let tempArr = []
							for(let i=0;i<resData.length;i++) {
								let tempObj = {
									id:resData[i].id,
									cameraId:resData[i].cameraId,
									cameraName:resData[i].cameraName,
									status:resData[i].status,
									deviceInfo:(resData[i].status == 1?this.onLine:this.offLine)  + ' ' + resData[i].cameraName + ' ' + resData[i].cameraId
								}
								tempArr.push(tempObj)
							}
							this.array = tempArr
							console.log(this.array)
							this.deviceIds = this.array.map(item => item.cameraId)
							console.log(this.deviceIds)
							this.id = this.array[this.index].id
							this.getCaiShouDetailById()
							console.log(this.array)
						} else {
							return this.$message.error('暂无数据')
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getCaiShouDetailById() {
				this.$H.get('caishou/caishou/cameraInfo',{
					cameraId:this.getCurrentCaiShouId
				}).then(res => {
					console.log(res)
					this.resItem = res.data
					this.status = res.data.status
					this.getImages()
				})
			},
			getImages() {
				this.$H.get('caishou/caishou/imageLogs',{
					page:1,
					limit:100,
					deviceId:this.getCurrentCaiShouId,
					beginDate:this.getDayTimes(),
					endDate:this.endTime
				}).then(res => {
					console.log(res)
					this.imgList = res.data.list
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
			handleSuggest() {
				uni.navigateTo({
					url:'../collectionSuggest/collectionSuggest'
				})
			},
			handleTimeView() {
				if(this.status==0) {
					return this.$message.error('当前设备不在线，不无实时观看')
				}
				uni.navigateTo({
					url:'../time-view/time-view?cameraIdCollect=' + this.getCurrentCaiShouId
				})
			},
			handleControl() {
				uni.navigateTo({
					url:'../collectContrl/collectContrl?cameraId=' + this.getCurrentCaiShouId
				})
			},
			handleStatistics() {
				uni.navigateTo({
					url:'../collectStatistics/collectStatistics?deviceIds=' + JSON.stringify(this.deviceIds)
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
	.bg-slight-my{background-color: rgba(9, 119, 255, .1);}
	.text-slight-my{color: rgba(9, 119, 255, 1);}
	.father::after{content:'';width:30%;border:1px solid transparent;}
</style>
