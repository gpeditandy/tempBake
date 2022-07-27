<template>
	<view>
		<view class="d-flex a-center j-sb px-4 py-2 bg-white font-md">
			<text>{{houseName}}</text>
			<text :class="status=='1' ? 'is-run':'is-stop'">{{status==1?'运行':'停运'}}</text>
		</view>
		<view class="bg-white p-2 m-2 rounded">
			<view class="d-flex a-center j-sb mb-1">
				<text class="font-md border-bottom-white pb-1" v-for="(item,index) in tabData" :key="index"
					@click="changeTab(index)" :class="tabIndex==index ? 'active':''">{{item.title}}</text>
			</view>
			<view class="tabitem" v-if="tabIndex==0">
				<view class="charts-box position-relative" style="width: 100%;height: 230px;">
					<echarts :option="option" style="width: 100%;height: 230px;"></echarts>
					<view class="position-absolute" style="width: 100%;height: 480rpx;left:0;top:0;z-index: 9999;background: rgba(25,32,223,.0);"></view>
				</view>
				<view class="current-status">
					<text class="title-status font-md"
						v-if="bakeData.deviceProperty">当前烘烤状态({{bakeData.deviceProperty.current_shed==0 ? '上棚':'下棚'}})</text>
				</view>
				<view class="steps">
					<text class="steps-title">烘烤阶段</text>
					<text class="steps-desc"
						v-if="bakeData.deviceProperty">第{{bakeData.deviceProperty.baking_part_num}}段</text>
				</view>
				<view class="steps">
					<text class="steps-title">该阶段时长</text>
					<text class="steps-desc"
						v-if="bakeData.deviceProperty">{{getPartDuration(bakeData.deviceProperty.baking_curve,bakeData.deviceProperty.baking_part_num)}}h</text>
				</view>
				<view class="data-top">
					<view class="data-center">
						<view class="dataitem">
							<text class="datalist" :class="dataIndex==0 ?'currentIndex':''"
								@click="changeDataIndex(0)">上棚数据</text>
							<text class="datalist" :class="dataIndex==1 ?'currentIndex':''"
								@click="changeDataIndex(1)">下棚数据</text>
						</view>
						<view class="dataitem" @click="handleRefresh">
							<uni-icons type="loop" size="20" color="#007AFF"></uni-icons>
							<text class="freshdata">刷新</text>
						</view>
					</view>
					<view class="data-detail" v-if="dataIndex==0">
						<view class="up-data">
							<text class="up-data-title">干球温度℃</text>
							<text class="up-data-desc"
								v-if="bakeData.deviceProperty">{{bakeData.deviceProperty.up_real_temp_dry}}</text>
						</view>
						<view class="up-data">
							<text class="up-data-title">湿球温度℃</text>
							<text class="up-data-desc"
								v-if="bakeData.deviceProperty">{{bakeData.deviceProperty.up_real_temp_wet}}</text>
						</view>
						<view class="up-data">
							<text class="up-data-title">阶段运行时间</text>
							<text class="up-data-desc"
								v-if="bakeData.deviceProperty">{{bakeData.deviceProperty.baking_part_duration}}</text>
						</view>
						<view class="up-data">
							<text class="up-data-title">总时间</text>
							<text class="up-data-desc"
								v-if="bakeData.deviceProperty">{{bakeData.deviceProperty.total_duration}}</text>
						</view>
					</view>
					<view class="data-detail" v-if="dataIndex==1">
						<view class="up-data">
							<text class="up-data-title">干球温度℃</text>
							<text class="up-data-desc"
								v-if="bakeData.deviceProperty">{{bakeData.deviceProperty.down_real_temp_dry}}</text>
						</view>
						<view class="up-data">
							<text class="up-data-title">湿球温度℃</text>
							<text class="up-data-desc"
								v-if="bakeData.deviceProperty">{{bakeData.deviceProperty.down_real_temp_wet}}</text>
						</view>
						<view class="up-data">
							<text class="up-data-title">阶段时间</text>
							<text class="up-data-desc"
								v-if="bakeData.deviceProperty">{{getPartDuration(bakeData.deviceProperty.baking_curve,bakeData.deviceProperty.baking_part_num)}}</text>
						</view>
						<view class="up-data">
							<text class="up-data-title">总时间</text>
							<text class="up-data-desc"
								v-if="bakeData.deviceProperty">{{bakeData.deviceProperty.total_duration}}</text>
						</view>
					</view>
					<view class="myline"></view>
					<view class="const-temp">
						<text class="const-title">恒温目标℃:</text>
						<text class="const-dry"
							v-if="bakeData.deviceProperty">干球{{bakeData.deviceProperty.target_temp_dry}}</text>
						<text class="const-wet"
							v-if="bakeData.deviceProperty">湿球{{bakeData.deviceProperty.target_temp_wet}}</text>
					</view>
				</view>
				<view class="last-param">
					<view class="param-list">
						<text class="list-left">电压</text>
						<text class="list-right"
							v-if="bakeData.deviceProperty">{{bakeData.deviceProperty.voltage}}V</text>
					</view>
					<view class="param-list">
						<text class="list-left">循环风速</text>
						<text class="list-right"
							v-if="bakeData.deviceProperty">{{bakeData.deviceProperty.xunhuanfj}}</text>
					</view>
				</view>
				<view class="myline"></view>
				<view>
					<view class="text-danger bg-danger-faint p-2">告警记录</view>
					<template v-if="optionsData.length>0">
						<uni-steps :options="optionsData" direction="column" :active="optionsData.length"
							active-color="#909399"></uni-steps>
					</template>
					<template v-else>
						<view class="d-flex a-center j-center font-md" style="min-height: 100rpx;">暂无告警记录</view>
					</template>
				</view>
			</view>
			<view class="tabitem" v-if="tabIndex==1">
				<view class="d-flex a-center j-sb flex-wrap father">
					<template v-if="picsShow">
						<view class="position-relative" v-for="(item,index) in picsData" :key="index"
							@click="handlePrevImage(index)">
							<image :src="item.imageUrl" style="width: 210rpx;height:280rpx;" class="mb-2 rounded"
								mode="aspectFill"></image>
							<text class="pictime text-center position-absolute font-sm">{{item.snapshotDate}}</text>
						</view>
						<view v-show="isLoadMore" class="text-center w-100">
							<uni-load-more :status="loadStatus"></uni-load-more>
						</view>
					</template>
					<template v-else>
						<view class="d-flex flex-column a-center j-center w-100">
							<image src="../../static/images/empty.png" style="width: 300rpx;height: 198rpx;"
								class="mt-4 mb-3" mode=""></image>
							<text class="text-light-muted font-md">暂无烤房图像</text>
						</view>
					</template>
				</view>
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
					<text class="font-md text-light-muted">暂无数据</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import echarts from '@/components/echarts/echarts.vue';
	export default {
		components:{
			echarts
		},
		data() {
			return {
				flag: false,
				scoreData: {},
				rateValue: 8.7,
				picsShow: true,
				id: '',
				bakeData: {},
				tobaccoInfo: {},
				houseName: '',
				deviceId: '',
				bakingTimes: '',
				status: '',
				tabIndex: 0,
				tabData: [{
					title: '烘烤曲线'
				}, {
					title: '烤房图像'
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
				limit: 21,
				loadStatus: 'loading',
				isLoadMore: false,
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
			this.getDetailById()
		},
		onShow() {
			if (this.bakeData.deviceProperty && this.bakeData) {
				this.getTobaccoInfo()
			}
		},
		methods: {
			getAppBakingEchart() {
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
				if (this.scoreData.id != null) {
					this.$H.put('baking/bakingscore', {
						...this.scoreData
					}).then(res => {
						console.log(res)
						if (res.code != 0) {
							return this.$message.error(res.msg)
						} else {
							this.getBakingScoreById()
							this.$message.successIcon('重新评分成功')
							setTimeout((_) => {
								this.tabIndex = 0
							}, 2000)
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
							this.$message.successIcon('评分成功')
						}
					})
				}
			},
			handleCancel() {
				this.tabIndex = 0
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
					this.isLoadMore = false
					if (this.page > 1) {
						this.page -= 1
					}
				})
			},
			getTobaccoInfo() {
				let bakingTimes = this.bakeData.deviceProperty.baking_times
				let deviceId = this.bakeData.deviceId
				this.$H.get('baking/bakingroom/bakingTobaccoInfo', {
					bakingTimes: bakingTimes,
					deviceId: deviceId,
				}).then(res => {
					console.log(res)
					this.tobaccoInfo = res.data
				}).catch(err => {
					console.log(err)
				})
			},
			getAlarmRecord() {
				let bakingTimes = this.bakeData.deviceProperty.baking_times
				let deviceId = this.bakeData.deviceId
				this.$H.get('baking/bakingroom/bakingLogsAlertList', {
					bakingTimes: bakingTimes,
					deviceId: deviceId,
				}).then(res => {
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
			handleRefresh() {
				uni.showLoading({
					title: '数据刷新中',
					mask: true
				})
				this.getDetailById()
				setTimeout(function() {
					uni.hideLoading();
				}, 1000);
			},
			getDetailById() {
				let id = this.id
				this.$H.get(`baking/bakingroom/${id}`).then(res => {
					if (res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						this.bakeData = res.data
						this.deviceId = res.data.deviceId
						this.bakingTimes = res.data.deviceProperty.baking_times
						this.houseName = res.data.name
						this.status = res.data.deviceStatus
						this.scoreData.deviceId = this.deviceId
						this.scoreData.bakingTimes = this.bakingTimes
						this.getAppBakingEchart()
						this.getBakingScoreById()
						this.getBakeImages()
						this.getAlarmRecord()
						this.getTobaccoInfo()
					}
				}).catch(err => {
					console.log(err)
				})
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
			getPartDuration(curve, partNum) {
				try {
					const curveJson = JSON.parse(curve);
					return curveJson.stable[(parseInt(partNum) - 1) * 2]
				} catch (err) {
					return 0
				}
			},
			handleTobaccoInfo(item, type) {
				uni.navigateTo({
					url: '../tobaccoInfo/tobaccoInfo?tobaccoInfo=' + JSON.stringify(item) + '&type=' + type +
						'&deviceId=' + this.deviceId + '&bakingTimes=' + this.bakingTimes
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

	.current-status {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.title-status {
		margin: 20rpx 0 0;
	}

	.steps {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.steps-title {
		font-size: 30rpx;
		color: #909399;
		margin-right: 40rpx;
	}

	.steps-desc {
		font-size: 32rpx;
		color: #303133;
	}

	.data-top {
		padding: 16rpx 16rpx;
		background-color: #f2f3f5;
		border-radius: 10rpx;
	}

	.data-center {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.dataitem {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.datalist {
		font-size: 28rpx;
		color: #909399;
		margin: 0 20rpx;
		height: 50rpx;
	}

	.freshdata {
		font-size: 28rpx;
		color: #007bff;
		margin-left: 10rpx;
	}

	.currentIndex {
		color: #007bff;
		border-bottom: 1px solid #007BFF;
	}

	.up-data-title {
		font-size: 28rpx;
		color: #909399;
		margin-bottom: 20rpx;
	}

	.up-data-desc {
		font-size: 28rpx;
		color: #303133;
	}

	.up-data {
		display: flex;
		flex-direction: column;
	}

	.data-detail {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 16rpx 16rpx;
		margin-bottom: 20rpx;
	}

	.myline {
		margin: 0rpx 0 20rpx;
		height: 1px;
		background-color: #EBEEF5;
	}

	.const-temp {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.const-title,
	.const-dry,
	.const-wet {
		font-size: 28rpx;
		color: #909399;
	}

	.const-title {
		color: #303133;
		margin-right: 30rpx;
	}

	.const-dry {
		margin-right: 50rpx;
	}

	.last-param {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin: 30rpx 0;
	}

	.param-list {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.list-left {
		color: #909399;
		font-size: 28rpx;
		margin-right: 20rpx;
	}

	.list-right {
		color: #303133;
		font-size: 28rpx;
	}

	.pictime {
		color: #fff;
		background-color: rgba(0, 0, 0, .4);
		padding: 8rpx 5rpx;
		right: 10rpx;
		bottom: 35rpx;
		border-radius: 30rpx;
	}

	.is-run {
		color: #15C179;
	}

	.is-stop {
		color: #FF4A28;
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
	.charts-box{
	  width: 100%;
	  height:300px;
	}
</style>
