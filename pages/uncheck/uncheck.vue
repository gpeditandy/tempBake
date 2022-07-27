<template>
	<view>
		<view class="px-4 mb-2 bg-white">
			<template v-if="mandData.length==0">
				<view style="margin-top: 40%;" class="font-md d-flex flex-column a-center j-center">
					<image src="../../static/images/empty01.png" style="width:393rpx;height: 278rpx;" mode=""></image>
					<text class="text-light-muted mt-2">暂无数据</text>
				</view>
			</template>
			<template v-else>
				<view class="py-2 border-bottom"
				v-for="(item,index) in mandData"
				:key="index"
				@click="handleDetail(item)">
					<view class="d-flex j-sb a-center font-md mb-2">
						<view>
							<text class="font-weight mr-2">{{item.name}}</text>
							<text class="text-muted font">{{item.mobile}}</text>
						</view>
						<view class="py px-2 rounded text-check">审核中</view>
					</view>
					<view class="d-flex font-md mb-1">
						<view class="position-relative" style="top:6rpx;">
							<image src="../../static/images/find01.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						</view>
						<view class="ml-2 text-muted">常驻地：{{item.villageName}}</view>
					</view>
					<view class="d-flex font-md mb-1">
						<view class="position-relative" style="top:6rpx;">
							<image src="../../static/images/find02.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						</view>
						<view class="ml-2 text-muted">需要服务：{{item.demandName.join('，')}}</view>
					</view>
				</view>
				<view v-show="isLoadMore && mandData.length>9">
					<uni-load-more :status="loadStatus" ></uni-load-more>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:null,
				mandData:[],
				page:1,
				pageSize:10,
				loadStatus:'loading',//加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据
				isLoadMore:false,  //是否加载中
			}
		},
		onReachBottom() {
			if(!this.isLoadMore) {
				this.isLoadMore = true
				this.page+=1
				this.getMandData()
			}
		},
		onLoad() {
			this.getMandData()
		},
		methods: {
			getMandData() {
				this.$H.get('applet/appdemand/page',{
					page:this.page,
					limit:this.pageSize,
					mine:0,// 0,表示所有的信息;1,表示自己发布的信息
					status:0
				}).then(res => {
					console.log(res)
					if(res.code != 0) {
						this.isLoadMore = false
						if(this.page>1) {
							this.page -=1
						}
						return this.$message.error(res.msg)
					} else {
						this.mandData = this.mandData.concat(res.data.list)
						if(res.data.list.length<this.pageSize) {
							this.isLoadMore = true
							this.loadStatus = '没有更多了'
						} else {
							this.isLoadMore = false
						}
					}
				}).catch(err => {
					console.log(err)
					this.isLoadMore = false
					if(this.page>1) {
						this.page-=1
					}
				})
			},
			handleDetail(item) {
				uni.showModal({
					title: '温馨提示',
					content: '是否通过审核？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '通过',
					success: res => {
						if(res.confirm) {
							this.$H.post('applet/appdemand/updateStatus',{
								id:item.id,
								status:1
							}).then(res => {
								if(res.code != 0) {
									return this.$message.error(res.msg)
								} else {
									console.log(res)
									this.$message.error('审核成功')
									this.mandData = []
									this.page=1
									this.getMandData()
								}
							})
						} else {
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
page{background-color: #fff;}
.text-check{background-color: rgba(255, 142, 37, .1);color: rgba(255, 142, 37, 1);}
.check-yes{background-color: rgba(45, 166, 65, .1);color: rgba(45, 166, 65, 1);}
.check-no{background-color: rgba(235, 67, 67, .1);color: rgba(235, 67, 67, 1);}
.check-close{background-color: rgba(96, 98, 102, .1);color: rgba(96, 98, 102, 1);}
</style>
