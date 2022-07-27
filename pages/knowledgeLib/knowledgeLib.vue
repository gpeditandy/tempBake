<template>
	<view>
		<view class="border-bottom-mycolor mx-1 px-1 py-2 d-flex a-center"
		v-for="(item,index) in itemStatus"
		:key="index"
		@click="handleDetial(item)"
		>
			<view style="width: 200rpx;height: 160rpx;" class="mr-2">
				<image :src="item.coverImage" style="width: 200rpx;height: 160rpx;" mode=""></image>
			</view>
			<view class="flex-1 d-flex flex-column" style="width: 510rpx;">
				<text class="font-md text-ellipsis">{{item.title}}</text>
				<text class="font text-muted text-ellipsis-more my-1">{{getRightFormat(item.content)}}</text>
				<view class="font text-muted text-right mr-2">{{getTime(item.createDate)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $T from '@/utils/formatTime.js'
	export default {
		data() {
			return {
				libList:[],
				status:null
			}
		},
		computed: {
			itemStatus() {
				return this.libList.filter(item => item.status==1)
			}
		},
		onLoad() {
			this.getLibData()
		},
		methods: {
			handleDetial(item) {
				uni.navigateTo({
					url:'../knowledgeDetail/knowledgeDetail?id=' + item.id
				})
			},
			getRightFormat(value) {
				return $T.delHtmlTag(value)
			},
			getTime(value) {
				return $T.format(value)
			},
			getLibData() {
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				this.$H.get('knowledge/knowledgelibrary/page',{
					order: 'asc',
					orderField: 'sort',
					limit:10,
					page:1
				}).then(res => {
					 uni.hideLoading()
					 console.log(res)
					 if(res.code != 0) {
						 return this.$message.error(res.msg)
					 } else {
						 this.libList = res.data.list
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
