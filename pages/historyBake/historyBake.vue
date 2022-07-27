<template>
	<view>
		<view class="p-2 m-2 bg-white rounded font-md">
			<view class="d-flex a-center j-sb p-2 mb-4 mt-2">
				<text>{{yearText}}年度汇总</text>
				<picker :value="yearIndex" :range="yearData" @change="changeYear">
					<uni-icons type="forward"></uni-icons>
				</picker>
			</view>
			<view class="d-flex a-center j-sb p-2">
				<view class="d-flex flex-column a-center">
					<text class="font-weight mb-2" v-if="bakingList.length!=0">{{yearBake.count}}</text>
					<text class="font-weight mb-2" v-else>0</text>
					<text class="text-muted">烘烤次数</text>
				</view>
				<view class="d-flex flex-column a-center">
					<text class="font-weight mb-2" v-if="bakingList.length!=0">{{yearBake.avgDuration}}</text>
					<text class="font-weight mb-2" v-else>0</text>
					<text class="text-muted">平均时长(h)</text>
				</view>
				<view class="d-flex flex-column a-center">
					<text class="font-weight mb-2" v-if="bakingList.length!=0">{{yearBake.avgScore}}</text>
					<text class="font-weight mb-2" v-else>0</text>
					<text class="text-muted">平均得分</text>
				</view>
			</view>
		</view>
		<view class="p-2 m-2 mt-2 bg-white">
			<template v-if="bakingList.length==0">
				<view class="d-flex a-center j-center flex-column">
					<image src="../../static/images/empty.png" style="width:470rpx;height: 310rpx;" mode=""></image>
					<text class="mt-2 text-muted">暂无烘烤批次</text>
				</view>
			</template>
			<template v-else>
				<block v-for="(item,index) in bakingList" :key="index">
					<uni-list-item :title="'第'+item.bakingTimes+'烤次:' + item.date" note="" showArrow clickable
						@click="historyBakeDetail(item)">
					</uni-list-item>
				</block>
				<view v-show="isLoadMore">
					<uni-load-more :status="loadStatus"></uni-load-more>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yearIndex: 2,
				yearData: ['2020', '2021', '2022'],
				bakingInfo: {},
				deviceId: '',
				yearBake: {},
				bakingList: [],
				page:1,
				pagesize:15,
				loadStatus: 'loading',
				isLoadMore: false,
				id:null
			}
		},
		computed: {
			yearText() {
				return this.yearData[this.yearIndex]
			}
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.isLoadMore = true
				this.page += 1
				this.getBakingLogs()
			}
		},
		onLoad(e) {
			this.deviceId = e.deviceId
			this.getBakingYearStatistics()
			this.getBakingLogs()
			this.id = e.id
			console.log(this.id)
		},
		methods: {
			changeYear(e) {
				this.yearIndex = e.target.value
				this.page=1
				this.bakingList = []
				this.getBakingLogs()
				this.getBakingYearStatistics()
			},
			historyBakeDetail(item) {
				uni.navigateTo({
					url: '../historyBakeDetail/historyBakeDetail?detail=' + JSON.stringify(item) + '&id=' + this.id
				})
			},
			getBakingYearStatistics() {
				this.$H.get('baking/bakingroom/bakingStats', {
					year: this.yearText
				}).then(res => {
					console.log(res)
					if (res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.yearBake = res.data
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getBakingLogs() {
				this.$H.get('baking/bakingroom/bakingLogs', {
					deviceId: this.deviceId,
					limit: this.pagesize,
					page: this.page,
					year: this.yearText
				}).then(res => {
					console.log(res)
					if (res.code != 0) {
						this.isLoadMore = false
						if(this.page>1) {
							this.page-=1
						}
						return this.$message.error(res.msg)
					} else {
						if(res.data.list) {
							this.bakingList = this.bakingList.concat(res.data.list)
							if(res.data.list.length<this.pagesize) {
								this.isLoadMore = true
								this.loadStatus = 'nomore'
							} else {
								this.isLoadMore = false
							}
						} else {
							this.isLoadMore = true
							this.loadStatus = 'nomore'
						}
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
			}
		}
	}
</script>

<style>
	page {
		background-color: #F2F3F5;
	}

	.blueline {
		width: 8rpx;
		height: 32rpx;
		background: #0977FF;
		margin-right: 14rpx;
	}
</style>
