<template>
	<view>
<!-- 		<view class="bg-white">
			<view class="mx-1 p-2">
				<uni-easyinput class="myinput"  placeholder="搜索" placeholderStyle="color:#C0C4CC;" prefixIcon="search" :inputBorder="false" />
			</view>
		</view> -->
		<view class="p-2 my-2 bg-white">
			<view class="d-flex a-center">
				<image class="mr-2" src="../../../static/images/contact-icon01.png" style="width: 78rpx;height: 78rpx;" mode=""></image>
				<view class="d-flex flex-column">
					<text class="font-md mb-1">宁安智慧烟叶有限公司</text>
					<text class="text-light-muted font">企业架构组织</text>
				</view>
			</view>
			<view class="d-flex pl-4 a-end">
				<image src="../../../static/images/contact-icon04.png" style="width: 41rpx;height: 52rpx;" mode=""></image>
				<text class="ml-2 font-md position-relative" style="top: 10rpx;">烟站</text>
			</view>
			<view class="pl-3 mt-2">
				<view class="d-flex pl-4 a-end">
					<image src="../../../static/images/contact-icon04.png" style="width: 41rpx;height: 52rpx;" mode=""></image>
					<text class="ml-2 font-md position-relative" style="top: 10rpx;">下乡员</text>
				</view>
			</view>
			<view class="pl-3">
				<view class="pl-3 mt-2">
					<view class="d-flex pl-4 a-end">
						<image src="../../../static/images/contact-icon04.png" style="width: 41rpx;height: 52rpx;" mode=""></image>
						<text class="ml-2 font-md position-relative" style="top: 10rpx;">烟农</text>
					</view>
				</view>
			</view>
		</view>
		<view class="p-2 my-2 bg-white">
			<view class="border-bottom-mycolor pb-2 d-flex a-center j-sb">
				<view class="d-flex a-center">
					<image src="../../../static/images/contact-icon02.png" style="width: 48rpx;height: 48rpx;" mode=""></image>
					<text class="ml-2 font-md">{{companyManage.name}}</text>
				</view>
				<view class="d-flex a-center" @click="changeStatus">
					<text class="text-primary mr-1 font">{{statusText}}</text>
					<image :src="statusImg" style="width: 12rpx;height: 8rpx;" mode=""></image>
				</view>
			</view>
			<view class="d-flex a-center font-md my-2 animated fadeIn text-muted" hover-class="bg-light-secondary"
			v-for="(item,index) in companyManage.data"
			:key="index"
			v-if="manageStatus"
			>
				<view class="text-white bg-primary d-flex a-center j-center rounded8" style="width: 80rpx;height: 80rpx;">{{getShortName(item.realName)}}</view>
				<view class="d-flex a-center flex-1 j-sb border-bottom-mycolor pb-2">
					<view class="d-flex flex-column ml-2 position-relative" style="top: 10rpx;">
						<text class="mb">{{item.realName}}</text>
						<text class="text-muted font">{{setMobileStyle(item.mobile)}}</text>
					</view>
					<view :class="[item.userType==2 ? 'stationmaster':'']" class="font text-success px-1 py rounded8" style="background-color: rgba(45,166,65,.1);">{{getUserType(item.userType)}}</view>
				</view>
			</view>
		</view>
		
		<view class="p-2 my-2 bg-white" v-for="(item,index) in tempData" :key="index">
			<view class="border-bottom-mycolor pb-2 d-flex a-center j-sb">
				<view class="d-flex a-center">
					<image src="../../../static/images/contact-icon03.png" style="width: 48rpx;height: 48rpx;" mode=""></image>
					<text class="ml-2 font-md">{{item.name}}</text>
				</view>
				<view class="d-flex a-center" @click="changeStatus2(index)">
					<text class="text-primary mr-1 font">{{item.deptStatus ? '收起' : '展开'}}</text>
					<image v-if="item.deptStatus" src="/static/images/arrow-up.png" style="width: 12rpx;height: 8rpx;" mode=""></image>
					<image v-else src="/static/images/arrow-down.png" style="width: 12rpx;height: 8rpx;" mode=""></image>
				</view>
			</view>
			<view class="d-flex a-center font-md my-2 animated fadeIn text-muted" hover-class="bg-light-secondary"
			v-for="(item2,index2) in item.data"
			:key="index2"
			v-if="item.deptStatus"
			>
				<view class="text-white bg-primary d-flex a-center j-center rounded8" style="width: 80rpx;height: 80rpx;">{{getShortName(item2.realName)}}</view>
				<view class="d-flex a-center flex-1 j-sb border-bottom-mycolor pb-2">
					<view class="d-flex flex-column ml-2 position-relative" style="top: 10rpx;">
						<text class="mb">{{item2.realName}}</text>
						<text class="text-muted font">{{setMobileStyle(item2.mobile)}}</text>
					</view>
					<view class="font text-success px-1 py rounded8" 
					:class="[item2.userType==2 ? 'stationmaster':'farmer']"
					style="background-color: rgba(45,166,65,.1);"
					>{{getUserType(item2.userType)}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				resArr: [],
				companyName: '',
				companyManage: [],
				manageStatus: true,
				statusText: '收起',
				statusImg: '/static/images/arrow-up.png',
				companyManage2: [],
				tempData: [],
			}
		},
		onLoad() {
			let {
				statusBarHeight
			} = uni.getSystemInfoSync()
			this.statusBarHeight = statusBarHeight
			this.getAddressBookData()
		},
		methods: {
			handleTelphone(mobile) {
				uni.makePhoneCall({
					phoneNumber:mobile
				})
				// #ifdef APP-PLUS
				plus.device.dial(mobile,true)
				// #endif
			},
			getUserType(type) {
				switch (type) {
					case 1:
						return '管理员';
						break;
					case 2:
						return '站长';
						break;
					case 3:
						return '下乡员';
						break;
					case 4:
						return '烟农';
						break;
				}
			},
			getAddressBookData() {
				uni.showLoading({
					title:'数据加载中...',
					mask:true
				})
				this.$H.get('sys/dept/addressBook').then(res => {
					console.log(res)
					if(res.code==401) {
						this.$message.error(res.msg)
						setTimeout((res) => {
							uni.redirectTo({
								url:'../../login/login'
							})
						},1000)
						return
					}
					uni.hideLoading()
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						const resData = res.data
						this.resArr = Object.keys(resData)
						this.companyManage = resData['manager']
						this.tempData = resData['dept']
						for(var i in this.tempData) {
							this.tempData[i].deptStatus = true
						}
						console.log(this.tempData)
					}
				}).catch(err => {
					console.log(err)
					uni.hideLoading()
				})
			},
			getShortName(value) {
				if(!value) return
				if(value.length==1) {
					return value.slice(0)
				} else if(value.length==4) {
					return value.slice(2)
				} else if(value.length>4) {
					return value.slice(-1)
				} else {
					return value.slice(1)
				}
			},
			changeStatus() {
				this.manageStatus = !this.manageStatus
				this.statusText = this.statusText=='收起' ? '展开':'收起'
				this.statusImg = this.statusImg =='/static/images/arrow-up.png' ? '/static/images/arrow-down.png':'/static/images/arrow-up.png'
			},
			changeStatus2(index) {
				for(var i in this.tempData) {
					if(i == index) {
						this.tempData[i].deptStatus = !this.tempData[i].deptStatus
					}
				}
				this.tempData.push({}); 
				this.tempData.pop();  //强制更新---刷新数组
			},
			setMobileStyle(phone) {
				if(!phone) return
				return phone.substring(0,3) + '****' + phone.substring(7)
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
.myinput{background-color:#F5F6F9;border-radius: 8rpx;}
.stationmaster{background-color: rgba(255, 142, 37, .1) !important;color: rgba(255, 142, 37, 1) !important;}
.farmer{background-color: rgba(96, 98, 102, .1) !important;color: rgba(96, 98, 102, 1) !important;}
</style>
