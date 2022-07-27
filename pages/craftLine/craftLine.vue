<template>
	<view>
		<view class="p-2 m-2 bg-white">
			<echarts :option="option" style="width: 100%;height: 300px;background-color: #000000;"></echarts>
		</view>
		<view class="bg-danger text-white" style="width: 100%;height: 300px;margin-top:-320px;z-index: 100;position: relative;opacity: 0;"></view>
		<view class="fixed-bottom" @click="EditCraftLine">
			<button type="primary">编辑工艺曲线</button>
		</view>
	</view>
</template>

<script>
	import echarts from '@/components/echarts/echarts.vue';
	// import myjson from '../../common/demo.js'
	export default {
		components:{
			echarts
		},
		data() {
			return {
				deviceId:'',
				baking_times:'',
				option: {tooltip:{formatter:null}},
				// chartDto:myjson.data
				chartDto: {}
			}
		},
		onLoad(e) {
			this.deviceId = e.deviceId
			this.getAppBakingCurveEChart()
		},
		methods: {
			getAppBakingCurveEChart() {
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				this.$H.get('baking/bakingcurve/appBakingCurveEChart',{
					deviceId:this.deviceId,
					bakingTimes:0,
				}).then(res => {
					uni.hideLoading()
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						let chartDto = res.data
						// let chartDto = this.chartDto
						let xData = chartDto.xdata
						let yDescription = chartDto.ydescription
						this.option = {
							legend: chartDto.legend,
							dataZoom: [{
								type: 'inside'
							}],
							tooltip: {
								trigger: 'axis',
								formatter: function(params) {
									console.log("params",params)
									let htmlStr = ''
									for (var i = 0; i < params.length; i++) {
										let param = params[i]
										let xName = param.name // x轴的名称
										let seriesName = param.seriesName // 图例名称
										let value = param.value // y轴值
										if (undefined === value) {
											value = '-'
										}
										const color = param.color // 图例颜色
										if (i === 0) {
											let description = ""
											for (let i1 = 0; i1 < xData.length; i1++) { // 这里的i是代表数组的下标
												if (xName <= xData[i1]) {
													description = yDescription[i1] + '\n'
													break;
												}
											};
											htmlStr += description
										}
										let ni = '\n';
										if (i === params.length - 1) {
											ni = ''
										}
										if (seriesName.indexOf('干球') !== -1) {
											if (value !== '-') {
												value = Math.round((parseFloat(value) - parseFloat(50)) *
													100) / 100
											}
											htmlStr += seriesName + '：' + value + ni
										} else {
											htmlStr += seriesName + '：' + value + ni
										}
									}
									return htmlStr
								},
							},
							grid: {
								left: '-5%',
								right: '3%',
								bottom: '3%',
								containLabel: true
							},
							xAxis: {
								show:false,
								type: 'category',
								axisTick: {
									show: true
								},

								axisLine: {
									show: true
								},
								boundaryGap: true,
								data: chartDto.xaxis.data
							},
							yAxis: {
								type: 'value',
								show: false
							},
							series: chartDto.series
						}
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			EditCraftLine() {
				uni.navigateTo({
					url:`../craftLineEdite/index?deviceId=${this.deviceId}`
				})
			}
		}
	}
</script>
<style>
page{background-color: #F2F3F5;}
</style>
