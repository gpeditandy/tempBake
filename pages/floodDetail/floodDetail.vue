<template>
	<view>
		<view class="m-2 p-2 bg-white rounded8">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center flex-column mr p-2 bg-light w-50">
					<text class="text-secondary font mb-1">移栽日期</text>
					<text class="font-md">{{floodTime}}</text>
				</view>
				<view class="d-flex a-center flex-column p-2 bg-light w-50">
					<text class="text-secondary font mb-1">注水苗数</text>
					<text class="font-md">{{sum_amount}}</text>
				</view>
			</view>
			<view class="d-flex a-center mt-4">
				<text class="myline mr-1"></text>
				<text class="font-md text-muted">注水路径图</text>
			</view>
			<view class="d-flex a-center">
				<!-- #ifdef APP-PLUS -->
				<map
					id="map"
					class="map"
					style="width: 100%;height: 300px;"
					:latitude="latitude"
					:longitude="longitude"
					:polyline="polyline"
					:scale="scale"
					>
				</map>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<text class="my-2 font-md" style="margin-left: auto;margin-right: auto;">请在APP端观看</text>
				<!-- #endif -->
			</view>

			<view class="d-flex a-center mt-4">
				<text class="myline mr-1"></text>
				<text class="font-md text-muted">详细信息</text>
			</view>
			<view class="my-4">
				<uni-table border stripe emptyText="暂无更多数据">
					<uni-tr class="bg-light-secondary">
						<uni-th align="left">时间</uni-th>
						<uni-th align="left">经度</uni-th>
						<uni-th align="left">纬度</uni-th>
						<uni-th align="left">注水状态</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in resList" :key="index">
						<uni-td>{{format(parseInt(item.timestamp))}}</uni-td>
						<uni-td>{{item.longitude}}</uni-td>
						<uni-td>{{item.latitude}}</uni-td>
						<uni-td :class="item.status=='0' ? 'stopBg':''">{{item.status==1?'正常':'停止'}}</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scale: 16,
				latitude:null,
				longitude:null,
				polyline: [{
					points: [
						{
							latitude:null,
							longitude:null,
						}],
					color: '#0195ff',
					width: 10
				}],
				
				
				isShow: true,
				sum_amount:'',
				floodNum: '',
				deviceId: '',
				floodTime: '',
				floodDuration: '',
				detailData: {},
				resList: [],
				posData:[]
			}
		},
		onLoad(e) {
			let tempObj = JSON.parse(e.item)
			console.log(tempObj)
			this.deviceId = tempObj.deviceId
			this.floodTime = tempObj.date
			this.floodDuration = tempObj.floodingTimes
			this.sum_amount = tempObj.sum_amount
			this.getFloodingDetail()
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.reLaunch({
					url: '../tabBar/workbench/workbench'
				})
			}
		},
		methods: {
			add0(m) {
				return m = m<10 ? '0'+m : m
			},
			format(shijianchuo) {
				var time = new Date(shijianchuo)
				var y = time.getFullYear()
				var m = time.getMonth() + 1
				var d = time.getDate()
				var h = time.getHours()
				var mm = time.getMinutes()
				var s = time.getSeconds()
				return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
			},
			getFloodingDetail() {
				this.$H.get('flooding/flooding/floodingDetail', {
					deviceId: this.deviceId,
					floodingTimes: this.floodDuration,
					page: 1,
					limit: 10
				}).then(res => {
					console.log(res)
					if (res.code !== 0) {
						return this.$message.error(res.msg);
					} else {
						this.detailData = res.data
						const resData = res.data.list
						this.resList = resData
						let myArr = []
						for(let i=0;i<resData.length;i++) {
							let obj = {
								longitude:resData[i].longitude,
								latitude:resData[i].latitude
							}
							myArr.push(obj)
						}
						console.log(myArr)
						this.polyline[0].points = myArr
						this.longitude = this.polyline[0].points[0].longitude
						this.latitude = this.polyline[0].points[0].latitude
						console.log(this.polyline[0].points)
						var lngMin = Math.min.apply(0, (res.data.list).map((item) => item.longitude))
						var latMin = Math.min.apply(0,(res.data.list).map((item) => item.latitude))
						this.posData = (res.data.list).map(function(item) {
							var array = []
							array.push((item.longitude - lngMin) * 94786 + 50)
							array.push((item.latitude - latMin) * 94786 + 50)
							return array
						})
						console.log(this.posData)
					}
				})
			},
			getMinutes(value) {
				if (!value) return
				return (value / 60).toFixed(2)
			},
			getHms(value) {
				if(!value) return
				return value.split(' ')[1]
			}
		}
	}
</script>
<style>
	page {
		background-color: #F2F3F5;
	}

	.stopBg {
		color: #FF4A28 !important;
	}
</style>
