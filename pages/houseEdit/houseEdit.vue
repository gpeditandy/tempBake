<template>
	<view>
		<view class="p-2 m-2 bg-white rounded font-md">
			<view class="py-2">
				<text class="mb-2 d-flex">烤房名称</text>
				<input maxlength="30" class="category" type="text" @input="handleInput1" placeholder="请输入烤房名称" v-model="deviceInfo.name" placeholder-class="placeholder" />
			</view>
			<view class="py-2">
				<text class="mb-2 d-flex">告警电话</text>
				<input maxlength="11" class="category" type="text" @input="handleInput2" placeholder="请输入告警电话" v-model="deviceInfo.phone" placeholder-class="placeholder" />
			</view>
			<view class="py-2">
				<text class="mb-2 d-flex">烤房所在地</text>
				<input maxlength="30" class="category" type="text" @input="handleInput3" placeholder="请输入烤房所在地" v-model="deviceInfo.address" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="fixed-bottom">
			<button type="primary" @click="submit()">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				deviceInfo:{
					name:'',
					phone:'',
					address:''
				}
			}
		},
		onLoad(e) {
			this.id = e.id
			this.getBakingroomDetail()
		},
		methods: {
			getBakingroomDetail() {
				let id = this.id
				this.$H.get(`baking/bakingroom/${id}`).then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.deviceInfo = res.data
					}
				}).catch(err => {
					console.log(err)
				})
			},
			submit() {
				if(!this.deviceInfo.name) {
					return this.$message.error('烤房名称不能为空')
				}
				if(!this.deviceInfo.phone) {
					return this.$message.error('告警电话不能为空')
				}
				if(!this.deviceInfo.address) {
					return this.$message.error('烤房所在地不能为空')
				}
				this.$H.put('baking/bakingroom',{
					...this.deviceInfo
				}).then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.$message.successIcon("提交成功")
						setTimeout((res) => {
							uni.navigateBack({
								delta:1
							})
						},2000)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			handleInput1(e) {
				console.log(e)
			},
			handleInput2(e) {
				console.log(e)
			},
			handleInput3(e) {
				console.log(e)
			},
			navigate(path) {
				if(!path) return
				uni.navigateTo({
					url:`/pages/${path}/${path}`
				})
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
.placeholder{color: #C7C7C7;}
.category{border:1px solid #EBEEF5;height:76rpx;line-height:76rpx;padding-left:20rpx;box-sizing: border-box;}
</style>
