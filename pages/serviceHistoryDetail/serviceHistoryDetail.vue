<template>
	<view>
			<view class="pb-100">
				<view v-if="itemObj.status==0" :class="itemObj.status==0 ? 'bg-check text-check':''" class="d-flex a-center j-center font-md bg-check text-check py-2">审核中</view>
				<view v-if="itemObj.status==1" :class="itemObj.status==1 ? 'bg-check-yes text-check-yes':''" class="d-flex a-center j-center font-md bg-check text-check py-2">审核通过</view>
				<view v-if="itemObj.status==2" :class="itemObj.status==2 ? 'bg-check-no text-check-no':''" class="d-flex a-center j-center font-md bg-check text-check py-2">审核不通过</view>
				<view v-if="itemObj.status==-1" :class="itemObj.status==-1 ? 'check-close':''" class="d-flex a-center j-center font-md bg-check text-check py-2">已关闭</view>
				<view class="mt-2 d-flex a-center j-center">
					<view class="check-bg text-white">
						<view class="d-flex a-center font-lg ml-5 mt-2 mb-1">
							<text>{{itemObj.name}}</text>
							<view class="position-relative">
								<text class="font-md ml-4 bg-white px-1 py text-primary rounded">提供服务</text>
								<text class="arrow position-absolute"></text>
							</view>
						</view>
						<view class="ml-5">{{formatPhone(itemObj.mobile)}}</view>
					</view>
				</view>
				<view class="font-md bg-white p-2 mx-2 rounded-top position-relative d-flex a-center">
					<image src="../../static/images/check-icon01.png" style="width: 50rpx;height: 50rpx;" mode=""></image>
					<view class="ml-2">
						<text class="text-muted mr-5">年龄</text>
						<text>{{itemObj.age}}</text>
					</view>
				</view>
				<view class="font-md bg-white p-2 mx-2 rounded-top position-relative d-flex a-center">
					<image src="../../static/images/sex.png" style="width: 50rpx;height: 50rpx;" mode=""></image>
					<view class="ml-2">
						<text class="text-muted mr-5">性别</text>
						<text v-if="itemObj.gender==1">男</text>
						<text v-if="itemObj.gender==2">女</text>
						<text v-if="itemObj.gender==0">保密</text>
					</view>
				</view>
				<view class="p-2 m-2 bg-white rounded8">
					<view class="d-flex a-center font-md mb-2">
						<image src="../../static/images/home.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
						<text class="text-muted ml-2">常驻地</text>
					</view>
					<view class="d-flex a-center font-md flex-wrap">
						<text class="px-4 py-1 mr-2 mb-2 text-primary border-my-primary rounded8 bg-primary-my"
						v-for="(item,index) in itemObj.villageName"
						:key="index"
						>{{item}}</text>
					</view>
				</view>
				<view class="p-2 m-2 bg-white rounded8">
					<view class="d-flex a-center font-md mb-2">
						<image src="../../static/images/find03.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
						<text class="text-muted ml-2">服务内容</text>
					</view>
					<view class="d-flex a-center flex-wrap font-md">
						<text class="px-4 py-1 mr-2 mb-2 text-primary border-my-primary rounded8 bg-primary-my"
						v-for="(item,index) in itemObj.supplyName"
						:key="index"
						>{{item}}</text>
					</view>
				</view>
				
				<view class="p-2 m-2 bg-white rounded8">
					<view class="d-flex a-center font-md mb-2">
						<image src="../../static/images/device-icon.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
						<text class="text-muted ml-2">我的设备(多选)</text>
					</view>
					<view class="d-flex a-center flex-wrap font-md">
						<text class="px-4 py-1 mr-2 mb-2 text-primary border-my-primary rounded8 bg-primary-my"
						v-for="(item,index) in itemObj.equipmentName"
						>{{item}}</text>
					</view>
				</view>
				
				<view class="p-2 m-2 bg-white rounded8" style="margin-bottom: 150rpx;">
					<view class="d-flex a-center font-md mb-2">
						<image src="../../static/images/marks.png" style="width: 40rpx;height: 40rpx;" mode=""></image>
						<text class="text-muted ml-2">备注</text>
					</view>
					<view class="font-md ml-4 text-muted">{{itemObj.remark}}</view>
				</view>
				<view class="fixed-bottom" style="bottom: 95rpx;" v-if="itemObj.status != 1 && itemObj.status!=-1">
					<button type="primary" @click="handleClose">关闭</button>
				</view>
				<view class="fixed-bottom">
					<!-- 审核中 -->
					<button type="primary" v-if="itemObj.status==0 || itemObj.status==2" @click="handleModify(itemObj.id)">修改</button>
					<!-- 审核通过 -->
					<button type="primary" v-if="itemObj.status==1" @click="handleClose">关闭</button>
					<!-- 审核不通过 -->
					<!-- 已关闭 -->
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemObj:[],
				id:'',
				status:null
			}
		},
		onLoad(e) {
			if(e.item) {
				this.itemObj = JSON.parse(e.item)
				console.log(this.itemObj)
			}
		},
		methods: {
			handleModify(id) {
				uni.navigateTo({
					url:'../serviceMeCan/serviceMeCan?id=' + id
				})
			},
			handleClose() {
				uni.showLoading({
					title:'数据提交中...',
					mask:true
				})
				this.$H.post('applet/appsupply/updateStatus',{
					id:this.itemObj.id,
					status:-1
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.$message.success('关闭状态成功')
						uni.navigateBack({
							delta:2
						})
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			formatPhone(value) {
				let len = value.length
				switch (true) {
					case len > 11: 
						return value = value.substr(0, 3) + ' ' + value.substr(3, 4) + ' ' + value.substr(7, 4);
						break;
					case len > 7:
						return value = value.substr(0, 3) + ' ' + value.substr(3, 4) + ' ' + value.substr(7);
						break;
					case len > 3:
						return value = value.substr(0, 3) + ' ' + value.substr(3);
						break;
					default:
						return value
				}
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
.bg-check{background-color: rgba(255, 142, 37, .1);}
.text-check{color: rgba(255, 142, 37, 1);}
.bg-check-no{background-color: rgba(235, 67, 67, .1);}
.text-check-no{color: rgba(235, 67, 67, 1);}
.bg-check-yes{background-color: rgba(45, 166, 65, .1);}
.text-check-yes{color: rgba(45, 166, 65, 1);}
.check-close{background-color: rgba(96, 98, 102, .1);color: rgba(96, 98, 102, 1);}

.check-bg{width:710rpx;height: 147rpx;background: url(../../static/images/ban.png);background-size: contain;}
.rounded-top{border-top-left-radius: 16rpx;border-top-right-radius: 16rpx;-bottom: 10rpx;}
.bg-primary-my{background-color: rgba(0,123,255,.1);}
.border-my-primary{border:1px solid rgba(0,123,255,1)}
.arrow{width:0;height:0;
border-bottom:15rpx solid transparent;
border-top: 15rpx solid transparent;
border-right:20rpx solid #fff;
left:27rpx;bottom:6rpx;
/* #ifdef APP-PLUS */
bottom:10rpx;
/* #endif */
}
</style>
