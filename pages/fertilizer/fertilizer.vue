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
					<text class="font-md text-muted">土壤肥力</text>
				</view>
			</view>

			<view class="d-flex a-center j-sb text-muted border p-2 my-2">
				<view class="d-flex a-center">
					<image v-if="fertilizerData.state==1" src="../../static/images/current.png"
						style="width: 64rpx;height: 36rpx;" class="mr-2"></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 40rpx;"
						class="mr-2"></image>

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

			<view class="charts-box" v-if="fertilizerData.property && fertilizerData.state==1">
				<qiun-data-charts type="ring" :chartData="chartData"
					:opts="{dataLabel:false,legend:{position:'bottom',itemGap:50},title:{name:'土壤PH值'},subtitle:{name:fertilizerData.property.ph_value,color:'#303133',offsetY:'10'},extra:{ring:{ringWidth:35,customRadius:100}}}"
					background="none" />
				<view class="d-flex a-center j-sb px-10 font-md text-muted">
					<view class="position-relative" style="bottom:40rpx"><text
							class="font-weight">{{fertilizerData.property.n_element}}</text><text
							class="font">mg/kg</text></view>
					<view class="position-relative" style="bottom:40rpx;left:30rpx;"><text
							class="font-weight">{{fertilizerData.property.p_element}}</text><text
							class="font">mg/kg</text></view>
					<view class="position-relative" style="bottom:40rpx;left:50rpx;"><text
							class="font-weight">{{fertilizerData.property.k_element}}</text><text
							class="font">mg/kg</text></view>
				</view>
			</view>
			<view v-else class="d-flex a-center flex-column">
				<image src="../../static/images/unLine.png" mode="" class="mt-5 mb-2"
					style="width: 244rpx;height: 244rpx;"></image>
				<view class="text-light-muted font-md">当前设备离线，请选择其它在线设备</view>
			</view>

			<view class="">
				<view class="d-flex a-center j-sb font-md text-muted mt-5 mb-2">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text>土壤温度</text>
					</view>
					<view class="text-light-muted">近24小时</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,legend:{lineHeight:20},padding:[10,20,10,20]}" :chartData="chartDataSoilTemp" />
				</view>
			</view>
			
			<view class="">
				<view class="d-flex a-center j-sb font-md text-muted mt-5 mb-2">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text>土壤湿度</text>
					</view>
					<view class="text-light-muted">近24小时</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,legend:{lineHeight:20},padding:[10,20,10,20]}" :chartData="chartDataSoilHumidity" />
				</view>
			</view>
			
			<view class="">
				<view class="d-flex a-center j-sb font-md text-muted mt-5 mb-2">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text>氮元素含量</text>
					</view>
					<view class="text-light-muted">近24小时</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,legend:{lineHeight:20},padding:[10,20,10,20]}" :chartData="chartDataElmentN" />
				</view>
			</view>
			
			<view class="">
				<view class="d-flex a-center j-sb font-md text-muted mt-5 mb-2">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text>磷元素含量</text>
					</view>
					<view class="text-light-muted">近24小时</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,legend:{lineHeight:20},padding:[10,20,10,20]}" :chartData="chartDataElmentP" />
				</view>
			</view>
			
			<view class="">
				<view class="d-flex a-center j-sb font-md text-muted mt-5 mb-2">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text>钾元素含量</text>
					</view>
					<view class="text-light-muted">近24小时</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,legend:{lineHeight:20},padding:[10,20,10,20]}" :chartData="chartDataElmentK" />
				</view>
			</view>
			
			<view class="">
				<view class="d-flex a-center j-sb font-md text-muted mt-5 mb-2">
					<view class="d-flex a-center">
						<text class="myline mr-1"></text>
						<text>PH值</text>
					</view>
					<view class="text-light-muted">近24小时</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="line" :opts="{xAxis:{rotateLabel: false,calibration:true,labelCount:5},extra:{line:{type:'curve'}},dataLabel:false,dataPointShape:false,legend:{lineHeight:20},padding:[10,20,10,20]}" :chartData="chartDataPH" />
				</view>
			</view>
		</view>
		<view class="p-2 m-2 bg-white rounded8" v-if="fertilizerData.state==1">
			<view class="d-flex a-center">
				<image src="../../static/images/calc.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
				<view class="d-flex flex-1 a-center j-sb ml-2" @click="handleCalc">
					<text class="font-md font-weight">配肥计算器</text>
					<uni-icons type="forward" color="#B2B2B2"></uni-icons>
				</view>
			</view>
		</view>
		<view class="p-2 m-2 bg-white rounded8">
			<view class="d-flex a-center j-sb">
				<view class="d-flex a-center">
					<text class="myline mr-1"></text>
					<text class="font-md text-muted">施肥车监控</text>
				</view>
				<view class="d-flex a-center j-sb py-1 px-2 font-md text-primary" style="width:240rpx;">
					<view class="d-flex a-center" @click="handleControl">
						<image src="../../static/images/contrl.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-1">控制</text>
					</view>
					<view class="d-flex a-center" @click="handleStatistic">
						<image src="../../static/images/statistics.png" style="width: 30rpx;height: 30rpx;" mode="">
						</image>
						<text class="ml-1">统计</text>
					</view>
				</view>
			</view>

			<view class="d-flex a-center j-sb text-muted p-2 my-2 border">
				<view class="d-flex a-center">
					<image v-if="carArr[carIndex].status==1" src="../../static/images/current.png"
						style="width: 64rpx;height: 36rpx;" class="mr-2"></image>
					<image v-else src="../../static/images/uncurrent.png" style="width: 64rpx;height: 40rpx;"
						class="mr-2"></image>
				</view>
				<view class="flex-1">
					<picker :range-key="'deviceInfo'" :value="carIndex" :range="carArr" @change="changeCarValue">
						<view class="d-flex a-center j-sb">
							<view class="d-flex a-center">
								<text class="font-md mr-2">{{cutStatus(carArr[carIndex].deviceInfo)}}</text>
							</view>
							<text class="iconfont icon-jinru text-muted"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class="d-flex a-center j-sb mt-4" v-if="carArr[carIndex].status==1">
				<view class="d-flex flex-column">
					<text class="text-muted mb-1 font">施肥车速度</text>
					<view class="d-flex a-end">
						<text class="font-md mr">{{fertilizerCars.moving_speed}}</text>
						<text class="text-light-muted font-sm">m/s</text>
					</view>
				</view>
				<view class="d-flex flex-column">
					<text class="text-muted mb-1 font">肥料剩余</text>
					<view class="d-flex a-end">
						<text class="font-md mr">{{fertilizerCars.fertilize_remained}}</text>
						<text class="text-light-muted font-sm">kg</text>
					</view>
				</view>
				<view class="d-flex flex-column">
					<text class="text-muted mb-1 font">施肥口流量</text>
					<view class="d-flex a-end">
						<text class="font-md mr">{{fertilizerCars.flow_speed}}</text>
						<text class="text-light-muted font-sm">m³/h</text>
					</view>
				</view>
			</view>
			<view v-else class="d-flex a-center flex-column">
				<image src="../../static/images/unLine.png" mode="" class="mt-5 mb-2"
					style="width: 244rpx;height: 244rpx;"></image>
				<view class="text-light-muted font-md">当前设备离线，请选择其它在线设备</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onLine: '[在线]',
				offLine: '[离线]',
				id: null,
				startTime:0,
				endTime:new Date().getTime(),
				carId: null,
				nameIndex: 0,
				nameArr: [],
				index: 0,
				array: [{
					id: '',
					deviceId: '',
					deviceName: '',
					deviceInfo: ''
				}],
				carIndex: 0,
				carArr: [{
					id: '',
					deviceId: '',
					deviceName: '',
					deviceInfo: ''
				}],
				fertilizerCars: {},
				PH: '',
				fertilizerData: {},
				chartData: {
					categories: [],
					series: [{
						data: [{
								"name": "氮(N)",
								"color": "#2DA641",
								"value": 0
							},
							{
								"name": "磷(P)",
								"color": "#FF9F10",
								"value": 0
							},
							{
								"name": "钾(K)",
								"color": "#128DFF",
								"value": 0
							}
						]
					}]
				},
				chartDataSoilTemp: {
					categories: [],
					series: [{
							name: "土壤温度",
							data: []
						}
					]
				},
				chartDataSoilHumidity: {
					categories: [],
					series: [{
							name: "土壤湿度",
							data: []
						}
					]
				},
				chartDataElmentN: {
					categories: [],
					series: [{
							name: "氮元素含量",
							data: []
						}
					]
				},
				chartDataElmentP: {
					categories: [],
					series: [{
							name: "磷元素含量",
							data: []
						}
					]
				},
				chartDataElmentK: {
					categories: [],
					series: [{
							name: "钾元素含量",
							data: []
						}
					]
				},
				chartDataPH: {
					categories: [],
					series: [{
							name: "PH值",
							data: []
						}
					]
				},
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.switchTab({
					url: '../tabBar/workbench/workbench'
				})
			}
		},
		computed:{
			getCurrentFertilizerId() {
				return this.array[this.index].deviceId
			}
		},
		onLoad() {
			this.getTobaccoFieldInfo()
			this.getFertilizerList()
			this.getFertilizerCarList()
		},
		methods: {
			getDayTimes() {
				return this.endTime - 3600*1000*24
			},
			getFertilizerList() {
				this.$H.get('fertilize/fertilize/page', {
					page: 1,
					limit: 10
				}).then(res => {
					console.log(res)
					if (res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						if (res.data.list.length > 0) {
							const resData = res.data.list
							let tempArr = []
							for (let i = 0; i < resData.length; i++) {
								let tempObj = {
									id: resData[i].id,
									deviceId: resData[i].deviceId,
									deviceName: resData[i].deviceName,
									status: resData[i].state,
									deviceInfo: (resData[i].state == 1 ? this.onLine : this.offLine) + ' ' +
										resData[i].deviceName + ' ' + resData[i].deviceId
								}
								tempArr.push(tempObj)
							}
							this.array = tempArr
							console.log(this.array)
							this.id = this.array[this.index].id
							this.getSoilFeiLiInfo()
							this.getFertilizerDetailById()
						} else {
							this.$message.error('暂无数据')
						}
					}
				})
			},
			getFertilizerDetailById() {
				let id = this.id
				this.$H.get(`fertilize/fertilize/${id}`).then(res => {
					const resData = res.data
					if (res.code == 0) {
						this.fertilizerData = res.data
						this.chartData.series[0].data[0].value = res.data.property.n_element
						this.chartData.series[0].data[1].value = res.data.property.p_element
						this.chartData.series[0].data[2].value = res.data.property.k_element
					} else {
						return this.$message.error(res.msg)
					}
				})
			},
			handleCalc(obj) {
				uni.navigateTo({
					url: '../fertilizerCalc/fertilizerCalc?obj=' + JSON.stringify(this.fertilizerData)
				})
			},
			changeArea(e) {
				this.nameIndex = e.target.value
			},
			bindPickerChange(e) {
				this.index = e.target.value
				this.id = this.array[this.index].id
				this.getFertilizerDetailById()
				this.getSoilFeiLiInfo()
			},
			changeCarValue(e) {
				this.carIndex = e.target.value
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
				if (!value) return
				return value.substring(5)
			},
			getFertilizerCarList() {
				this.$H.get('fertilizecar/fertilizecar/page', {
					page: 1,
					limit: 10,
				}).then(res => {
					if (res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						const resData = res.data.list
						let tempArr = []
						for (let i = 0; i < resData.length; i++) {
							let tempObj = {
								id: resData[i].id,
								deviceId: resData[i].deviceId,
								deviceName: resData[i].deviceName,
								status: resData[i].state,
								deviceInfo: (resData[i].state == 1 ? this.onLine : this.offLine) + ' ' +
									resData[i].deviceName + ' ' + resData[i].deviceId
							}
							tempArr.push(tempObj)
						}
						this.carArr = tempArr
						console.log(this.carArr)
						this.carId = this.carArr[this.carIndex].id
						this.getFertilizerCarById()
					}
				})
			},
			getFertilizerCarById() {
				let id = this.carId
				this.$H.get(`fertilizecar/fertilizecar/${id}`).then(res => {
					if (res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.fertilizerCars = res.data.property
					}
				})
			},
			handleControl() {
				uni.navigateTo({
					url: '../fertilizerControl/fertilizerControl'
				})
			},
			handleStatistic() {
				uni.navigateTo({
					url: '../fertilizerStatistic/fertilizerStatistic'
				})
			},
			getSoilFeiLiInfo() {
				console.log(this.getCurrentFertilizerId)
				this.$H.get('fertilize/fertilize/deviceDataHistogram',{
					deviceId:this.getCurrentFertilizerId,
					startTime:this.getDayTimes(),
					endTime:this.endTime,
					interval:10
				}).then(res => {
					console.log(res)
					this.chartDataSoilTemp.categories = res.data.datetime.map(item => item.split(' ')[1].substring(0,5))
					this.chartDataSoilHumidity.categories = res.data.datetime.map(item => item.split(' ')[1].substring(0,5))
					this.chartDataElmentN.categories = res.data.datetime.map(item => item.split(' ')[1].substring(0,5))
					this.chartDataElmentP.categories = res.data.datetime.map(item => item.split(' ')[1].substring(0,5))
					this.chartDataElmentK.categories = res.data.datetime.map(item => item.split(' ')[1].substring(0,5))
					this.chartDataPH.categories = res.data.datetime.map(item => item.split(' ')[1].substring(0,5))
					
					this.chartDataSoilTemp.series[0].data = res.data.soil_temperature
					this.chartDataSoilHumidity.series[0].data = res.data.soil_humidity
					this.chartDataElmentN.series[0].data = res.data.n_element
					this.chartDataElmentP.series[0].data = res.data.p_element
					this.chartDataElmentK.series[0].data = res.data.k_element
					this.chartDataPH.series[0].data = res.data.ph_value
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F2F3F5;
	}

	.charts-box {
		width: 100%;
		height: 320px;
	}
</style>
