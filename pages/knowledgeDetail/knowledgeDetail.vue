<template>
	<view>
		<view class="text-muted m-2 px-1 py-2 font-md">
			 <rich-text :nodes="nodes"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nodes:'',
				title:'',
				id:null
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getDetailById()
		},
		methods: {
			getDetailById() {
				let id = this.id
				this.$H.get(`knowledge/knowledgelibrary/${id}`).then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.nodes = res.data.content
						this.title = res.data.title
						uni.setNavigationBarTitle({
							title:this.title
						})
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>

</style>
