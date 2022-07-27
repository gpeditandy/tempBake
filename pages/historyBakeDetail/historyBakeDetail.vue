<template>
	<view>
		<view class="bg-white p-2 m-2 rounded">
			<view class="d-flex a-center j-sb mb-2">
				<text class="font-md pb-1 border-bottom-white" v-for="(item,index) in tabData" :key="index"
					@click="changeTab(index)" :class="tabIndex==index ? 'active':''">{{item.title}}</text>
			</view>
			<view class="tabitem" v-if="tabIndex==0">
				<view class="charts-box position-relative" style="width: 100%;height: 230px;">
					<echarts :option="option" style="width: 100%;height: 230px;"></echarts>
					<view class="position-absolute" style="width: 100%;height: 480rpx;left:0;top:0;z-index: 9999;background: rgba(25,32,223,.0);"></view>
				</view>
				<view class="mt-4">
					<view class="d-flex a-center j-sb py-2">
						<view class="d-flex flex-column a-center w-33">
							<text class="text-muted font mb-1">开始时间</text>
							<text class="font-md">{{getNewTime(startTime)}}</text>
						</view>
						<view class="d-flex flex-column a-center w-33">
							<text class="text-muted font mb-1">结束时间</text>
							<text class="font-md">{{getNewTime(endTime)}}</text>
						</view>
						<view class="d-flex flex-column a-center w-33">
							<text class="text-muted font mb-1">总时长</text>
							<text class="font-md">{{totalTime}}小时</text>
						</view>
					</view>
					<view class="d-flex a-center j-sb py-2">
						<view class="d-flex flex-column a-center w-33">
							<text class="text-muted font mb-1">变黄阶段</text>
							<text class="font-md">28小时</text>
						</view>
						<view class="d-flex flex-column a-center w-33">
							<text class="text-muted font mb-1">定色阶</text>
							<text class="font-md">77小时</text>
						</view>
						<view class="d-flex flex-column a-center w-33">
							<text class="text-muted font mb-1">干筯阶段</text>
							<text class="font-md">148小时</text>
						</view>
					</view>
				</view>
				<view class="myline"></view>
				<view class="d-flex flex-column mb-100">
					<view class="text-danger bg-danger-faint p-2">告警记录</view>
					<template v-if="optionsData.length>0">
						<uni-steps :options="optionsData" direction="column" :active="optionsData.length"
							active-color="#909399"></uni-steps>
					</template>
					<template v-else>
						<view class="d-flex a-center j-center font-md" style="min-height: 100rpx;">暂无告警记录</view>
					</template>
				</view>
				<view class="fixed-bottom bg-white d-flex a-center text-primary j-center text-center border-top py" style="height: 100rpx;" v-if="previous && next">
					<text class="w-50" v-if="previous" @click="handlePrev">
						< 前一烤次</text>
							<text class="text-light-muted" v-if="previous && next">|</text>
							<text class="w-50" v-if="next" @click="handleNext">后一烤次 ></text>
				</view>
			</view>
			<view class="tabitem" v-if="tabIndex==1">
				<template v-if="picsShow">
					<view class="d-flex a-center j-sb flex-wrap father">
						<view class="position-relative" v-for="(item,index) in picsData" :key="index"
							@click="handlePrevImage(index)">
							<image :src="item.imageUrl" style="width: 210rpx;height:280rpx;" class="mb-2 rounded"
								mode="aspectFill"></image>
							<text class="pictime text-center position-absolute font-sm">{{item.snapshotDate}}</text>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="d-flex flex-column a-center j-center">
						<image src="../../static/images/empty.png" style="width: 300rpx;height: 198rpx;"
							class="mt-4 mb-3" mode=""></image>
						<text class="text-light-muted font-md">暂无烤烟图像</text>
					</view>
				</template>
			</view>
			<view class="tabitem p-2 text-muted" v-if="tabIndex==2">
				<template v-if="tobaccoInfo">
					<view class="d-flex a-center mb-2 font-md">
						<text style="width: 260rpx;">烟叶品种</text>
						<text>{{tobaccoInfo.variety}}</text>
					</view>
					<view class="d-flex a-center my-2 font-md">
						<text style="width: 260rpx;">烟叶部位</text>
						<text>{{tobaccoInfo.position}}</text>
					</view>
					<view class="d-flex a-center my-2 font-md">
						<text style="width: 260rpx;">烟叶成熟度</text>
						<text>{{tobaccoInfo.maturity}}</text>
					</view>
					<view class="d-flex a-center my-2 font-md">
						<text style="width: 260rpx;">烟叶含水率</text>
						<text>{{tobaccoInfo.rateOfWater}}</text>
					</view>
					<view class="d-flex a-center my-2 font-md">
						<text style="width: 260rpx;">装烟大致重量</text>
						<text>{{tobaccoInfo.weight}}kg</text>
					</view>
					<button type="primary" @click="handleTobaccoInfo(tobaccoInfo,1)">修改</button>
				</template>
				<template v-else>
					<view class="d-flex flex-column a-center j-center text-center">
						<text class="font-md mb-2">尚未填写鲜叶信息</text>
						<text class="text-primary w-100"
							style="height: 80rpx;line-height: 80rpx;border:1px solid #007BFF;border-radius: 8rpx;"
							@click="handleTobaccoInfo('{}',2)">去填写</text>
					</view>
				</template>
			</view>
			<view class="tabitem" v-if="tabIndex==3">
				<view class="font-md d-flex a-center flex-column">
					<view class="d-flex flex-column a-center j-center my-2">
						<view class="mb-4 font-lg text-danger">{{scoreData.score}}</view>
						<uni-rate allowHalf v-model="scoreData.score" :max="10" margin="5" @change="onChange">
						</uni-rate>
					</view>
					<view class="w-100 d-flex a-center j-center text-center py-2 my-2">
						<text class="w-50" @click="handleCancel">取消</text>
						<text class="w-50 text-primary" @click="submitScore">确定</text>
					</view>
				</view>
			</view>
			<view class="tabitem" v-if="tabIndex==4">
				<view class="d-flex a-center j-center flex-column">
					<image src="../../static/images/empty.png" style="width: 300rpx;height: 198rpx;" class="mt-4 mb-3"
						mode=""></image>
					<text class="font-md text-light-muted font-md">暂无数据</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import echarts from '@/components/echarts/echarts.vue';
	import $T from '../../utils/formatTime.js'
	export default {
		components:{
			echarts
		},
		data() {
			return {
				id:null,
				scoreData: {
					id: null,
					deviceId: "",
					bakingTimes: "",
					sysScore: 8.7,
					score: 0,
				},
				picsShow: true,
				tobaccoInfo: {},
				deviceId: '',
				bakingTimes: '',
				startTime: '',
				endTime: '',
				totalTime: '',
				status: '运行',
				tabIndex: 0,
				tabData: [{
					title: '烘烤曲线'
				}, {
					title: '烤烟图像'
				}, {
					title: '鲜烟信息'
				}, {
					title: '烘烤评分'
				}, {
					title: '数据分析'
				}],
				dataIndex: 0,
				optionsData: [],
				picsData: [],
				page: 1,
				limit: 50,
				previous: '',
				next: '',
				option: {},
			}
		},
		computed: {
			imageList() {
				return this.picsData.map(item => item.imageUrl)
			}
		},
		onLoad(e) {
			this.id = e.id
			console.log(this.id)
			if (e.detail) {
				let tempObj = JSON.parse(e.detail)
				this.deviceId = tempObj.deviceId
				this.bakingTimes = tempObj.bakingTimes
				this.scoreData.deviceId = tempObj.deviceId
				this.scoreData.bakingTimes = tempObj.bakingTimes
				console.log(this.scoreData.deviceId)
				console.log(this.scoreData.bakingTimes)
				uni.setNavigationBarTitle({
					title: '第' + this.bakingTimes + '烤次详情'
				})
			}
			this.getBakingScoreById()
			this.getBakingCharts()
			this.getBakeImages()
			this.getAlarmRecord()
			this.getPrvOrNextBakingTimes()

		},
		onShow() {
			this.getTobaccoInfo()
		},
		methods: {
			getBakingCharts() {
				this.$H.get('baking/bakingroom/appBakingLogsDetailEChart', {
					deviceId: this.deviceId,
					bakingTimes: this.bakingTimes
				}).then(res => {
					if (res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						let chartDto = res.data
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
									console.log("params", params)
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
								show: true,
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
				})
			},
			onChange(e) {
				this.scoreData.score = e.value
			},
			getBakingScoreById() {
				this.$H.get('baking/bakingroom/bakingLogsScore', {
					deviceId: this.deviceId,
					bakingTimes: this.bakingTimes
				}).then(res => {
					if (res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						if (res.data != null) {
							this.scoreData = res.data
							console.log(this.scoreData)
						}
					}
				})
			},
			submitScore() {
				if (this.scoreData.id!=null) {
					this.$H.put('baking/bakingscore', {
						...this.scoreData
					}).then(res => {
						console.log(res)
						if (res.code != 0) {
							return this.$message.error(res.msg)
						} else {
							this.getBakingScoreById()
							this.$message.error('重新评分成功')
						}
					})
				} else {
					this.$H.post('baking/bakingscore', {
						...this.scoreData
					}).then(res => {
						console.log(res)
						if (res.code != 0) {
							return this.$message.error(res.msg)
						} else {
							this.getBakingScoreById()
							this.$message.error('评分成功')
						}
					})
				}
			},
			handleCancel() {
				this.tabIndex = 0
			},
			getAlarmRecord() {
				this.$H.get('baking/bakingroom/bakingLogsAlertList', {
					bakingTimes: this.bakingTimes,
					deviceId: this.deviceId,
				}).then(res => {
					// console.log(res)
					this.optionsData = res.data
					var keyMap = {
						"createDate": "title",
						"alertContent": "desc"
					}
					for (var i = 0; i < this.optionsData.length; i++) {
						var obj = this.optionsData[i];
						for (var key in obj) {
							var newKey = keyMap[key];
							if (newKey) {
								obj[newKey] = obj[key];
								delete obj[key];
							}
						}
					}
				}).catch(err => {
					console.log(res)
				})
			},
			getBakeImages() {
				this.$H.get('baking/bakingroom/bakingLogsImage', {
					bakingTimes: this.bakingTimes,
					bakingRoomId: this.id,
					limit: this.limit,
					page: this.page
				}).then(res => {
					console.log(res)
					if (res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						if (res.data.list.length > 0) {
							this.picsData = res.data.list
							this.picsShow = true
						} else {
							this.picsShow = false
						}
					}

				}).catch(err => {
					console.log(err)
				})
			},
			getNewTime(value) {
				return $T.shijiantime(value)
			},
			navigate(path) {
				if (!path) return
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				})
			},
			changeTab(index) {
				this.tabIndex = index
			},
			changeDataIndex(index) {
				this.dataIndex = index
			},
			handlePrevImage(index) {
				uni.previewImage({
					current: index,
					urls: this.imageList
				})
			},
			getTobaccoInfo() {
				this.$H.get('baking/bakingroom/bakingTobaccoInfo', {
					bakingTimes: this.bakingTimes,
					deviceId: this.deviceId,
				}).then(res => {
					// console.log(res)
					this.tobaccoInfo = res.data
				}).catch(err => {
					console.log(err)
				})
			},
			handleTobaccoInfo(item, type) {
				uni.navigateTo({
					url: '../tobaccoInfo/tobaccoInfo?tobaccoInfo=' + JSON.stringify(item) + '&type=' + type +
						'&deviceId=' + this.deviceId + '&bakingTimes=' + this.bakingTimes
				})
			},
			getPrvOrNextBakingTimes() {
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				this.$H.get('baking/bakingroom/bakingInfo', {
					bakingTimes: this.bakingTimes,
					deviceId: this.deviceId
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					this.previous = res.data.prev
					this.next = res.data.next
					this.startTime = res.data.start_time
					this.endTime = res.data.end_time
					this.totalTime = res.data.total_time
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			handlePrev() {
				this.bakingTimes = this.previous
				this.getBakingCharts()
				this.getPrvOrNextBakingTimes()
				this.getTobaccoInfo()
				this.getBakeImages()
				this.getAlarmRecord()
				uni.setNavigationBarTitle({
					title: '第' + this.bakingTimes + '烤次详情'
				})
			},
			handleNext() {
				this.bakingTimes = this.next
				this.getBakingCharts()
				this.getPrvOrNextBakingTimes()
				this.getTobaccoInfo()
				this.getBakeImages()
				this.getAlarmRecord()
				uni.setNavigationBarTitle({
					title: '第' + this.bakingTimes + '烤次详情'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F2F3F5;
	}

	.active {
		color: #007BFF;
		border-bottom: 1px solid #007BFF;
	}

	.myline {
		margin: 0rpx 0 20rpx;
		height: 1px;
		background-color: #EBEEF5;
	}

	.pictime {
		color: #fff;
		background-color: rgba(0, 0, 0, .4);
		padding: 8rpx 15rpx;
		right: 10rpx;
		bottom: 35rpx;
		border-radius: 50rpx;
	}

	.tabitem {
		min-height: 400rpx;
	}

	.father:after {
		content: '';
		width: 30%;
		border: 1px solid transparent;
	}
	.bg-danger-faint {
		background-color: rgba(220, 53, 69, .1);
	}

	.myscoreColor {
		border: 1px solid #007bff;
	}
</style>
