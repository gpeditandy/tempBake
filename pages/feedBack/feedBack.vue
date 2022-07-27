<template>
	<view class="font-md myfeedback">
		<view class="my-2">
			<uni-collapse accordion>
			    <uni-collapse-item :title="item.question"
				v-for="(item,index) in feedBackData"
				:key="index"
				>
			        <text class="line-h-md">{{item.answer}}</text>
			    </uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="bg-white my-2">
			<uni-easyinput type="textarea"  v-model="myFeed" placeholder="请输入您遇到的问题或对我们的建议" />
		</view>
		<view class="bg-white my-2 px-2 d-flex a-center">
			<text style="width: 200rpx;" class="">联系电话：</text>
			<uni-easyinput class="flex-1" :inputBorder="false" maxlength="11" type="number"  v-model="mobile" placeholder="请输入手机号" />
		</view>
		<view class="m-4" @click="submit()">
			<button type="primary">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myFeed:'',
				mobile:'',
				feedBackData:[]
			}
		},
		onLoad() {
			this.getFeedBackList()
		},
		methods: {
			getFeedBackList() {
				this.$H.get('knowledge/questionanswer/page',{
					limit:10,
					page:1,
					mine:1
				}).then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.feedBackData = res.data.list.filter(item =>item.status==1)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			submit() {
				if(!this.myFeed) {
					return this.$message.error('请输入您的建议')
				}
				if(!this.mobile) {
					return this.$message.error('请输入联系电话')
				}
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				this.$H.post('knowledge/questionanswer',{
					question:this.myFeed,
					status:0,
					phone:this.mobile
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.$message.success('提交成功')
						setTimeout((res) => {
							uni.navigateBack({
								delta:1
							})
						},2000)
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
page{background-color: #F2F3F5;}
</style>
