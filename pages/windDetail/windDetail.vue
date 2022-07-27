<template>
	<view>
		<view class="m-2 p-2 bg-white rounded8">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center flex-column mr p-2 bg-light w-50">
					<text class="text-secondary font mb-1">开启日期</text>
					<text class="font-md">{{(windObj.startTime).split(' ')[0]}}</text>
				</view>
				<view class="d-flex a-center flex-column p-2 bg-light w-50">
					<text class="text-secondary font mb-1">持续时长</text>
					<text class="font-md">{{windObj.duration}}小时</text>
				</view>
			</view>
			<view class="d-flex a-center j-sb py-4 px-5">
				<view class="d-flex flex-column a-center">
					<view class="text-success px-2 py-1 rounded30 font mb-2" style="background-color: rgba(40,167,69,.1);">风机开启</view>
					<view>{{(windObj.startTime).split(' ')[1]}}</view>
				</view>
				<view class="line mx-2 flex-1 lightmuted bg-light-secondary"></view>
				<view class="d-flex flex-column a-center">
					<view class="text-danger px-2 py-1 rounded30 font mb-2" style="background-color: rgba(220,53,69,.1);">风机停止</view>
					<view>{{(windObj.endTime).split(' ')[1]}}</view>
				</view>
			</view>
			<view class="d-flex a-center mt-2">
				<text class="myline mr-1"></text>
				<text class="font-md text-muted">棚内温湿度变化曲线</text>
			</view>
			<view class="charts-box">
				<qiun-data-charts type="area" :chartData="chartData" :opts="{legend:{position:'top',padding:'10',float:'right'},
				dataLabel:false,
				extra:{area:{type:'curve'}},
				xAxis:{rotateLabel: false,calibration:true,labelCount:5}
				}" background="none" />
			</view>
		</view>
	</view>
</template>

<script>
	import $T from '@/utils/formatTime.js'
	export default {
		data() {
			return {
				windObj:{},
				deviceList:[],
				isShow:true,
				chartData:{}
			}
		},
		onLoad(e) {
			if(e.item) {
				this.windObj = JSON.parse(e.item)
				this.deviceList = JSON.parse(e.deviceList)
				console.log(this.windObj)
				this.getChartsLine()
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.reLaunch({
					url: '../tabBar/workbench/workbench'
				})
			}
		},
		methods: {
			getChartsLine() {
				console.log(this.deviceList.join(','))
				console.log(this.windObj.startTime)
				console.log(this.windObj.endTime)
				this.$H.get('seedling/seedlingshed/_devicesDataECharts',{
					deviceIds:this.deviceList.join(','),
					startTime:$T.reverseFormat(this.windObj.startTime),
					endTime:$T.reverseFormat(this.windObj.endTime)
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						let resData = {
							categories: [],
							series: [{
									name: "棚内温度℃",
									legendShape: 'rect',
									data: []
								},
								{
									name: "棚内湿度%",
									legendShape: 'rect',
									data: []
								}
							]
						}
						resData.categories = res.data.datetime.map(item => item.split(' ')[1].substring(0,5))
						resData.series[0].data = res.data.air_temperature
						resData.series[1].data = res.data.air_humidity
						this.chartData = JSON.parse(JSON.stringify(resData))
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F2F3F5;
		/* background-color: #4ea980; */
	}
	.charts-box {
		width: 100%;
		height: 520rpx;
	}
	.line{height: 3rpx;}
</style>
