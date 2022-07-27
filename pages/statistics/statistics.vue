<template>
	<view>
		<view class="d-flex a-center j-sb px-3 pt-3 pb-1 bg-white font-md">
			<text 
			class="border-bottom-my pb-1"
			v-for="(item,index) in tabConn" 
			@click="handleChange(index)"
			:class="tabIndex===index ? 'active':''"
			>{{item.name}}</text>
		</view>
		<view v-if="tabIndex==0">
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text class="font-md text-muted">温度统计</text>
					</view>
					<text class="font-md text-light-muted">近24小时</text>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :chartData="chartData" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,rotateLabel:true,legend:{lineHeight:20},padding:[10,20,10,20]}" :loadingType="4"
						background="none" />
				</view>
			</view>
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text class="font-md text-muted">湿度统计</text>
					</view>
					<text class="font-md text-light-muted">近24小时</text>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :chartData="chartData2" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,legend:{lineHeight:20},padding:[10,20,10,20]}" :loadingType="4"
						background="none" />
				</view>
			</view>
		</view>
		<view v-if="tabIndex==1">
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text class="font-md text-muted">土壤湿度统计</text>
					</view>
					<text class="font-md text-light-muted">近24小时</text>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :chartData="chartData4" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,legend:{lineHeight:20},padding:[10,20,10,20]}" background="none" />
				</view>
			</view>
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text class="font-md text-muted">土壤温度统计</text>
					</view>
					<text class="font-md text-light-muted">近24小时</text>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :chartData="chartData3" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,legend:{lineHeight:20},padding:[10,20,10,20]}"
						background="none" />
				</view>
			</view>
		</view>
		<view v-if="tabIndex==2">
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text class="font-md text-muted">CO2浓度统计</text>
					</view>
					<text class="font-md text-light-muted">近24小时</text>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :chartData="chartData5" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,legend:{lineHeight:20},padding:[10,20,10,20]}"
						background="none" />
				</view>
			</view>
		</view>
		<view v-if="tabIndex==3">
			<view class="p-2 m-2 bg-white rounded">
				<view class="d-flex a-center j-sb">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text class="font-md text-muted">光照度统计</text>
					</view>
					<text class="font-md text-light-muted">近24小时</text>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :chartData="chartData6" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,legend:{lineHeight:20},padding:[10,20,10,20]}"
						background="none" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deviceId:'',
				tabIndex:0,
				tabConn:[{name:'空气温湿度'},{name:'土壤温湿度'},{name:'CO2浓度'},{name:'光照强度'}],
				days:30,
				dayTime:3600*24*1000,//一天的时间戳
				startTime:0,
				endTime:new Date().getTime(),
				myChartData:true,
				soil_temperature:[],
				soil_humidity:[],
				air_temperature:[],
				air_humidity:[],
				co2:[],
				illumination:[],
				chartData: {
					categories: [],
					series: []
				},
				chartData2: {
					categories: [],
					series: []
				},
				chartData3: {
					categories: [],
					series: []
				},
				chartData4: {
					categories: [],
					series: []
				},
				chartData5: {
					categories: [],
					series: []
				},
				chartData6: {
					categories: [],
					series: []
				}
				// chartData6: {
				// 	categories: [],
				// 	series: [{
				// 			name: "",
				// 			data: []
				// 		}]
				// }
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
		},
		onLoad(e) {
			let str = e.deviceid
			console.log(str)
			let temp = JSON.parse(str)
			this.deviceId = temp.toString()
			console.log(this.deviceId)
			this.getChartsData()
		},
		methods: {
			handleChange(index) {
				this.tabIndex = index
			},
			getDayTimes() {
				// return this.endTime - this.dayTime*30
				// return this.endTime - 3600*1000*24*30
				return this.endTime - 3600*1000*24
			},
			getChartsData() {
				console.log(typeof this.deviceId)
				// uni.showLoading({
				// 	title:'数据加载中...',
				// 	mask:true
				// })
				console.log(this.getDayTimes())
				console.log(this.endTime)
				this.$H.get('seedling/seedlingshed/devicesDataECharts',{
					deviceIds:this.deviceId,
					startTime:this.getDayTimes(),
					endTime:this.endTime
				}).then(res => {
					console.log(res)
					// uni.hideLoading()
					this.chartData.categories = res.data.xAxis.map(item => item.split(' ')[1].substring(0,5))
					this.chartData2.categories = res.data.xAxis.map(item => item.split(' ')[1].substring(0,5))
					this.chartData3.categories = res.data.xAxis.map(item => item.split(' ')[1].substring(0,5))
					this.chartData4.categories = res.data.xAxis.map(item => item.split(' ')[1].substring(0,5))
					this.chartData5.categories = res.data.xAxis.map(item => item.split(' ')[1].substring(0,5))
					this.chartData6.categories = res.data.xAxis.map(item => item.split(' ')[1].substring(0,5))
					let resDataList = res.data.series
					var arr_air_temperature = []
					var arr_air_humidity = []
					var arr_soil_temperature = []
					var arr_soil_humidity = []
					var arr_co2 = []
					var arr_illumination = []
					for(let i=0;i<resDataList.length;i++) {
						let obj_air_temperature = {
							name:resDataList[i].name,
							data:resDataList[i].data.air_temperature,
							connectNulls:true
						}
						let obj_air_humidity = {
							name:resDataList[i].name,
							data:resDataList[i].data.air_humidity,
							connectNulls:true
						}
						let obj_soil_temperature = {
							name:resDataList[i].name,
							data:resDataList[i].data.soil_temperature,
							connectNulls:true
						}
						let obj_soil_humidity = {
							name:resDataList[i].name,
							data:resDataList[i].data.soil_humidity,
							connectNulls:true
						}
						let obj_co2 = {
							name:resDataList[i].name,
							data:resDataList[i].data.co2,
							connectNulls:true
						}
						let obj_illumination = {
							name:resDataList[i].name,
							data:resDataList[i].data.illumination,
							connectNulls:true
						}
						arr_air_temperature.push(obj_air_temperature)
						arr_air_humidity.push(obj_air_humidity)
						arr_soil_temperature.push(obj_soil_temperature)
						arr_soil_humidity.push(obj_soil_humidity)
						arr_co2.push(obj_co2)
						arr_illumination.push(obj_illumination)
					} 
					this.chartData.series = arr_air_temperature
					this.chartData2.series = arr_air_humidity
					this.chartData3.series = arr_soil_temperature
					this.chartData4.series = arr_soil_humidity
					this.chartData5.series = arr_co2
					this.chartData6.series = arr_illumination
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
.border-bottom-my{border-bottom: 1px solid #fff;}
.active{color: #007AFF;border-bottom: 1px solid #007AFF;}
.bg-my{background-color: #F5F6F9;padding:5rpx 10rpx;margin:0 10rpx;}
.myline{width:8rpx;height: 30rpx;background-color: #007AFF;display: inline-block;}
/* 请根据需求修改图表容器尺寸，如果父容器没有高度图表则会显示异常 */
.charts-box{
  width: 100%;
  height:300px;
}
</style>
