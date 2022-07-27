<template>
	<view>
		<view class="p-2 m-2 bg-white rounded">
			<view class="py-2">
				<text class="mb-2 d-flex text-muted">告警名称</text>
				<input maxlength="30" class="category" type="text" placeholder="请输入" v-model="dry_over" placeholder-class="placeholder" disabled="disabled" />
			</view>
			<view class="py-2">
				<text class="mb-2 d-flex text-muted">告警条件</text>
				<view class="d-flex a-center mb-3">
					<text class="font-md">干球温度<i>偏离</i>目标温度</text>
					<text class="ml-2">±</text>
					<input maxlength="3" class="category flex-1" type="number" pattern="[0-9]*" @input="handleInput2" placeholder="请输入" placeholder-class="placeholder" v-model="wet_temp" />
					<text>℃</text>
				</view>
				<view class="d-flex a-center">
					<text class="font-md" style="margin-left: 88rpx;">并持续时间超过</text>
					<view class="my-cell flex-1 ml-2">
						<picker class="d-flex a-center j-sb " @change="bindPickerChange" :value="timeIndex" :range="timeArr">
							  <view class="weui-select">{{wet_duration}}</view>
							  <uni-icons type="arrowdown" color="#6c757d"></uni-icons>
						</picker>
					</view>
				</view>
			</view>
			<view class="py-2">
				<text class="mb-2 d-flex text-muted">接受告警信息电话</text>
				<input maxlength="11" class="category" type="number" pattern="[0-9]*" placeholder="请输入告警电话" placeholder-class="placeholder" v-model="phone" />
			</view>
		</view>
		<view class="fixed-bottom">
			<button type="primary" @click="handleSave">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeArr:['10','20','30'],
				timeIndex:0,
				wet_duration: '',
				dry_duration: '',
				wet_temp: '',
				dry_temp: '',
				type:'',
				phone:'',
				dry_over:''
			}
		},
		onLoad(e) {
			this.wet_duration = e.wet_duration
			this.dry_duration = e.dry_duration
			this.wet_temp = e.wet_temp
			this.dry_temp = e.dry_temp
			this.phone = e.phone
			this.type = e.type
			this.dry_over = '湿球超限'+this.wet_temp+'度'
		},
		methods: {
			bindPickerChange(e) {
				this.wet_duration = this.timeArr[e.target.value]
			},
			handleSave() {
				this.$H.post('kylinks/device/invokeFunction',{
					deviceId: "baking001",
					functionId: "alert_params_setting",
					functionName: "告警参数阈值设置",
					functionParams: {
					    wet_duration: this.wet_duration,
					    dry_duration: this.dry_duration,
					    wet_temp: this.wet_temp,
					    dry_temp: this.dry_temp,
						phone:this.phone,
					    voltage: true
					}
				}).then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.$message.successIcon('保存成功')
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
			handleInput2(e) {
				console.log(e)
			},
			handleInput3(e) {
				console.log(e)
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
.placeholder{color: #C7C7C7;}
.category{border:1px solid #ccc;height:76rpx;line-height:76rpx;padding-left:20rpx;box-sizing: border-box;}
i{font-style: normal;color: #dc3545;}
.my-cell{border:1px solid #ccc;height:76rpx;line-height:76rpx;padding-left:20rpx;padding-right:20rpx;box-sizing: border-box;}
</style>
