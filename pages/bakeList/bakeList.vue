<template>
	<view>
		<template v-if="hasData">
			<view class="border-top">
				<view class="mb-1 p-4 bg-white font-md" 
				v-for="(item,index) in bakeData" 
				:key="index"
				@click="handleDetail(item)"
				>
					<view class="d-flex a-center j-sb mb-2">
						<text class="font-weight">{{item.name}}</text>
						<text class="text-danger" :class="item.deviceStatus==1?'text-green':''">{{item.deviceStatus==1 ? '运行':'停止'}}</text>
					</view>
					<view class="d-flex flex-column text-muted font">
						<text class="mb-1">设备编号：{{item.deviceId}}</text>
						<text>设备名称：{{item.deviceName}}</text>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="d-flex flex-column a-center j-center" style="margin-top: 300rpx;">
				<image src="../../static/images/empty.png" style="width: 500rpx;height: 330rpx;" mode=""></image>
				<text class="text-muted">暂无数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bakeData:[],
				id:'',
				hasData:true
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
		},
		onShow() {
			this.getBakingList()
		},
		methods: {
			handleDetail(item) {
				uni.navigateTo({
					url:'../deviceDetail/deviceDetail?item=' + JSON.stringify(item)
				})
			},
			getBakingList() {
				this.$H.get('baking/bakingroom/page').then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						if(res.data.list.length>0) {
							this.hasData = true
							const resData = res.data.list
							this.bakeData = resData
						} else {
							this.hasData = false
						}
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
.text-green{color: var(--success) !important;}
</style>
