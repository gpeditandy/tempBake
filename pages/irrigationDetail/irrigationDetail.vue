<template>
	<view>
		<view class="m-2 p-2 bg-white rounded8">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center flex-column mr p-2 bg-light w-50">
					<text class="text-secondary font mb-1">滴灌时间</text>
					<text class="font-md">{{irrigationTime}}</text>
				</view>
				<view class="d-flex a-center flex-column p-2 bg-light w-50">
					<text class="text-secondary font mb-1">滴灌时长</text>
					<text class="font-md">{{getMinutes(irrigationDuration)}}小时</text>
				</view>
			</view>
			<view class="d-flex a-center mt-4">
				<text class="myline mr-1"></text>
				<text class="font-md text-muted">土壤温湿度变化曲线</text>
			</view>
			<view class="charts-box" v-if="chartData.categories.length!=0">
				<qiun-data-charts type="area" :chartData="chartData" :opts="{legend:{position:'top',padding:'10',float:'right'},
				dataLabel:false,
				extra:{area:{type:'curve'}},
				xAxis:{rotateLabel: false,calibration:true,labelCount:5}
				}" background="none" />
			</view>
			<view class="d-flex a-center j-center myloader" v-else>
				<view class="loader">Loading...</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:true,
				chartData: {
					categories: [],
					series: [{
							"name": "土壤温度℃",
							'legendShape': 'rect',
							"data": []
						},
						{
							"name": "土壤湿度%",
							'legendShape': 'rect',
							"data": []
						}
					],
				},
				irrigationNum:'',
				deviceId:'',
				irrigationTime:'',
				irrigationDuration:''
			}
		},
		onLoad(e) {
			let tempObj = JSON.parse(e.item)
			this.deviceId = tempObj.deviceId
			this.irrigationNum = tempObj.irrigationNum
			this.irrigationTime = tempObj.date
			this.irrigationDuration = tempObj.total_time
			this.getIrrigationData()
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.reLaunch({
					url: '../tabBar/workbench/workbench'
				})
			}
		},
		methods: {
			getMinutes(value) {
				if(!value) return
				return (value/60).toFixed(2)
			},
			getIrrigationData() {
				this.$H.get('irrigation/irrigation/irrigationDetail',{
					deviceId:this.deviceId,
					irrigationNum:this.irrigationNum
				}).then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.chartData.categories = res.data.datetime
						this.chartData.series[0].data = res.data.soil_temperature
						this.chartData.series[1].data = res.data.soil_humidity
					}
				}).catch(err => {
					console.log(err)
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
	.myloader{height:520rpx;}
	.loader {
		font-size: 20px;
		width: 1em;
		height: 1em;
		border-radius: 50%;
		position: relative;
		text-indent: -9999em;
		animation: load-effect 1s infinite linear;
	}
	/*
	-3em:左移3em
	 2em:下移2em
	 0:模糊距离0，即纯色
	 .5em:外扩.5em
	 #FFF:白色
	*/
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
</style>
