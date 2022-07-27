<template>
	<view>
		<template v-if="!isShow">
			<view class="font-md">
				<view class="p-2 mx-2 border-bottom-mycolor"
				v-for="(item,index) in dataList"
				:key="index"
				@click="handleDetail(item)"
				>
					<view class="mb-2">{{item.title}}</view>
					<view class="d-flex flex-column">
						<view class="d-flex a-center text-muted">
							<text class="iconfont icon-geren text-danger font mr-1"></text>
							<text>发送者：</text>
							<text>{{item.senderName}}</text>
						</view>
						<view class="d-flex a-center text-muted">
							<text class="iconfont icon-pinglun2 text-danger font mr-1"></text>
							<text>类型：</text>
							<text>{{getMeetingType(item.type)}}</text>
						</view>
						<view class="d-flex a-center text-muted">
							<text class="iconfont icon-xiaoxi1 text-danger font mr-1"></text>
							<text>发送时间：</text>
							<text>{{item.senderDate}}</text>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="d-flex flex-column a-center j-center font-md" style="margin-top: 200rpx;">
				<image src="../../static/images/empty.png" style="width: 500rpx;height: 330rpx;" mode=""></image>
				<text class="text-muted">暂无公告</text>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[],
				isShow:false
			}
		},
		onLoad(e) {
			this.getAnnouncementList()
		},
		methods: {
			getMeetingType(type) {
				switch (type) {
					case 0:
						return '公告'
						break;
					case 1:
						return '会议'
						break;	
					default:
						return '其它'
						break;
				}
			},
			handleDetail(item) {
				uni.navigateTo({
					url:'../announcementDetail/announcementDetail?id=' + item.id
				})
			},
			getAnnouncementList() {
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				this.$H.get('sys/notice/mynotice/page',{
					page:1,
					limit:20
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						if(res.data.list==0) {
							this.isShow = true
						} else {
							this.dataList = res.data.list
							this.isShow = false
						}
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			}
		}
	}
</script>

<style>
</style>
