<template>
	<view>
		<view class="m-2 p-2 rounded8 bg-white">
			<view class="font-md font-weight my-4">{{title}}</view>
			<rich-text :nodes="content" class="font-md"></rich-text>
			<view class="font-md my-2">此方案其N:P:K = {{npkRate}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				title:'',
				content:'',
				npkRate:''
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.reLaunch({
					url:'../tabBar/workbench/workbench'
				})
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getDetailById()
		},
		methods: {
			getDetailById() {
				let id = this.id
				this.$H.get(`fertilize/fertilizescheme/${id}`).then(res => {
					console.log(res)
					this.title = res.data.title
					this.content = res.data.content
					this.npkRate = res.data.npkRate
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
</style>
