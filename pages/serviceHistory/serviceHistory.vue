<template>
	<view>
		<view class="px-4 mb-2 bg-white">
			<template v-if="supplyData.length==0">
				<view style="margin-top: 40%;" class="font-md d-flex flex-column a-center j-center">
					<image src="../../static/images/empty01.png" style="width:393rpx;height: 278rpx;" mode=""></image>
					<text class="text-light-muted mt-2">暂无数据</text>
				</view>
			</template>
			<template v-else>
				<view class="py-2 border-bottom"
				 v-for="(item,index) in supplyData"
				 :key="index"
				 @click="handleDetail(item)">
					<view class="d-flex j-sb a-center font-md mb-2">
						<view>
							<text class="font-weight mr-2">{{item.name}}</text>
							<text class="text-muted font">{{item.mobile}}</text>
						</view>
						<view v-if="item.status==0" class="py px-2 rounded text-check">审核中</view>
						<view v-if="item.status==1" class="py px-2 rounded check-yes">审核通过</view>
						<view v-if="item.status==2" class="py px-2 rounded check-no">审核不通过</view>
						<view v-if="item.status==-1" class="py px-2 rounded check-close">已关闭</view>
					</view>
					<view class="d-flex font-md mb-1">
						<view class="position-relative" style="top:6rpx;">
							<image src="../../static/images/find01.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						</view>
						<view class="ml-2 text-muted">常驻地：{{item.villageName.join('，')}}</view>
					</view>
					<view class="d-flex font-md mb-1">
						<view class="position-relative" style="top:6rpx;">
							<image src="../../static/images/find02.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						</view>
						<view class="ml-2 text-muted">需要服务：{{item.supplyName.join('，')}}</view>
					</view>
				</view>
				<view v-show="isLoadMore && supplyData.length>9">
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
				supplyData:[],
				page:1,
				pageSize:10,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
			}
		},
		onReachBottom(){
			  if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
				this.isLoadMore=true
				this.page+=1
				this.getSupplyData()
			  }
		},
		onLoad() {
			this.getSupplyData()
		},
		methods: {
			getSupplyData() {
				this.$H.get('applet/appsupply/page',{
					page:this.page,
					limit:this.pageSize,
					mine:1
				}).then(res => {
					console.log(res)
					if(res.code != 0) {
						this.isLoadMore = false
						if(this.page>1) {
							this.page -=1
						}
						return this.$message.error(res.msg)
					} else {
						this.supplyData = this.supplyData.concat(res.data.list)
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
				uni.navigateTo({
					url:'../serviceHistoryDetail/serviceHistoryDetail?item=' + JSON.stringify(item)
				})
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
