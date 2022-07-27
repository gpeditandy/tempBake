<template>
	<view>
		<view class="d-flex flex-column mt-5 mx-2 p line-h-md" style="text-indent: 2em;">
			<!-- <view>{{resData.title}}</view> -->
			<rich-text :nodes="resData.content"></rich-text>
		</view>
	</view>
</template>

<script>
	import $T from '@/utils/formatTime.js'
	export default {
		data() {
			return {
				id:null,
				resData:{}
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getNoticeById()
			this.setNoticeReaded()
		},
		methods: {
			setNoticeReaded() {
				let noticeId = this.id
				this.$H.put(`sys/notice/mynotice/read/${noticeId}`).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			getNoticeById() {
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				let id = this.id
				this.$H.get(`sys/notice/${id}`).then(res => {
					uni.hideLoading()
					console.log(res)
					this.resData = res.data
					uni.setNavigationBarTitle({
						title:this.resData.title
					})
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
