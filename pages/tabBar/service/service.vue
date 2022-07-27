<template>
	<view>
		<view class="p-2 bg-white">
			<view class="d-flex a-center j-sb">
				<image @click="navigate('serviceContent')" src="../../../static/images/service01.png" style="width: 345rpx;height: 180rpx;" mode=""></image>
				<image @click="navigate('serviceMeCan')" src="../../../static/images/service02.png" style="width: 345rpx;height: 180rpx;" mode=""></image>
			</view>
		</view>
		<view class="d-flex a-center p-2 bg-white">
			<image src="../../../static/images/dan_icon01.png" style="width: 42rpx;height: 42rpx;" mode=""></image>
			<view class="d-flex flex-1 a-center j-sb ml-2" @click="navigate('recruitHistory')">
				<text class="font-md font-weight">招人需求记录</text>
				<uni-icons type="forward" color="#B2B2B2"></uni-icons>
			</view>
		</view>
		<view class="d-flex a-center p-2 bg-white">
			<image src="../../../static/images/find03.png" style="width: 42rpx;height: 42rpx;" mode=""></image>
			<view class="d-flex flex-1 a-center j-sb ml-2" @click="navigate('serviceHistory')">
				<text class="font-md font-weight">提供服务记录</text>
				<uni-icons type="forward" color="#B2B2B2"></uni-icons>
			</view>
		</view>
		<view class="my-2 bg-white p-2 font-md">
			<view class="d-flex a-center j-sa" :class="{'swt':true,'sticky-fixed':isF}">
				<text v-for="(item,index) in tabConn" 
				:key="index"
				@click="handleChange(index)"
				class="tablist py-1  text-center"
				:class="tabIndex===index ? 'current':''"
				>{{item.name}}</text>
			</view>
			<view v-if="tabIndex==0">
				<view class="p-2 border-bottom-mycolor" v-for="(item,index) in mandData" :key="index">
					<view class="d-flex a-center font-md my-2">
						<text class="font-weight mr-2">{{item.name}}</text>
						<text class="font text-muted">{{item.mobile}}</text>
					</view>
					<view class="d-flex text-muted font-md mb-1">
						<view class="position-relative" style="top:6rpx;">
							<image src="../../../static/images/find01.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						</view>
						<text class="ml-2">常驻地：{{item.villageName}}</text>
					</view>
					<view class="d-flex text-muted font-md">
						<view class="position-relative" style="top:1rpx;">
							<image src="../../../static/images/find02.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						</view>
						<text class="ml-2">需要服务：{{item.demandName.join('，')}}</text>
					</view>
				</view>
				<view v-show="isLoadMoreL">
					<uni-load-more :status="loadStatusL" ></uni-load-more>
				</view>
			</view>
			<view v-if="tabIndex==1">
				<view class="p-2 border-bottom-mycolor" v-for="(item,index) in personData" :key="index">
					<view class="d-flex a-center font-md my-2">
						<text class="font-weight mr-2">{{item.name}}</text>
						<text class="font text-muted">{{item.mobile}}</text>
					</view>
					<view class="d-flex text-muted font-md mb-1">
						<view class="position-relative" style="top:6rpx;">
							<image src="../../../static/images/find01.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						</view>
						<text class="ml-2">常驻地：{{item.villageName.join('，')}}</text>
					</view>
					<view class="d-flex text-muted font-md mb-1">
						<view class="position-relative" style="top:4rpx;">
							<image src="../../../static/images/find02.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						</view>
						<text class="ml-2">需要服务：{{item.supplyName.join('，')}}</text>
					</view>
					<view class="d-flex text-muted font-md">
						<view class="position-relative" style="top:6rpx;">
							<image src="../../../static/images/find03.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						</view>
						<text class="ml-2">提供设备：{{item.equipmentName.join('，')}}</text>
					</view>
				</view>
				<view v-show="isLoadMoreR">
					<uni-load-more :status="loadStatusR" ></uni-load-more>
				</view>
			</view>
		</view>
		<view v-show="isCheck">
			<uni-fab @fabClick="handleClick"  :horizontal="horizontal" ></uni-fab>
		</view>
		<uni-popup ref="popup" type="bottom" style="z-index: 9999;">
			<view class="bg-white" style="min-height: 300rpx;">
				<view class="d-flex a-center font-lg py-4 j-center">请选择审核类别</view>
				<view class="pl-4">
					<view class="line-h-lg d-flex a-center"
					v-for="(item,index) in checkData"
					:key="index"
					@click="handleCheck(index)"
					>
						<text class="mr-4">{{item.title}}</text>
						<icon v-if="checkIndex===index" type="success_no_circle" size="24" color="#0195ff" />
					</view>
				</view>
				<view class="mt-4" @click="handleSure">
					<button type="primary">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	// import $T from '@/utils/formatTime.js'
	export default {
		data() {
			return {
				checkData:[{title:'需求管理审核'},{title:'供应管理审核'}],
				checkIndex:0,
				horizontal:'right',
				tabIndex:0,
				tabConn:[{name:'招人信息'},{name:'人才列表'}],
				personData:[],
				mandData:[],
				yuanH: uni.upx2px(300),
				isF: false,
				
				pageL:1,
				pageSizeL:50,
				loadStatusL:'loading',
				isLoadMoreL:false,
				
				pageR:1,
				pageSizeR:50,
				loadStatusR:'loading',
				isLoadMoreR:false,
				isCheck:false
			}
		},
		onPageScroll(e) {
			//#ifdef H5
			this.isF = true
			// #endif
			// #ifndef H5
			if (this.yuanH > e.scrollTop) {
				this.isF = false
			} else {
				this.isF = true
			}
			// #endif
		},
		onLoad() {
			this.userInformation()
			this.getMandList()
			this.getPersonList()
		},
		onReachBottom() {
			console.log('当前选项卡是：',this.tabIndex)
			if(!this.isLoadMoreL && this.tabIndex==0) {
				this.isLoadMoreL = true
				this.pageL+=1
				this.getMandList()
			}
			if(!this.isLoadMoreR  && this.tabIndex==1) {
				this.isLoadMoreR = true
				this.pageR+=1
				this.getPersonList()
			}
		},
		methods: {
			handleCheck(index) {
				this.checkIndex = index
			},
			handleSure() {
				this.$refs.popup.close()
				let index = this.checkIndex
				if(index==0) {
					uni.navigateTo({//需求的未审核列表
						url:'../../uncheck/uncheck'
					})
				} else {
					uni.navigateTo({//供应的未审核列表
						url:'../../uncheckSupply/uncheckSupply'
					})
				}
			},
			handleClick() {
				this.$refs.popup.open()
			},
			getPersonList() {
				this.$H.get('applet/appsupply/page',{
					page:this.pageR,
					limit:this.pageSizeR,
					mine:0,
					status:1
				}).then(res => {
					console.log(res)
					if(res.code != 0) {
						if(res.code==401) {
							this.$message.error(res.msg)
							setTimeout((res) => {
								uni.redirectTo({
									url:'../../login/login'
								})
							},1000)
							return
						}
						this.isLoadMoreR = false
						if(this.pageR>1) {
							this.pageR -=1
						}
						return this.$message.error(res.msg)
					} else {
						this.personData = this.personData.concat(res.data.list)
						if(res.data.list.length<this.pageSizeR) {
							this.isLoadMoreR = true
							this.loadStatusR = '没有更多了'
						} else {
							this.isLoadMoreR = false
						}
					}
				}).catch(err => {
					console.log(err)
					this.isLoadMoreR = false
					if(this.pageR>1) {
						this.pageR-=1
					}
				})
			},
			getMandList() {
				uni.showLoading({
					title:'数据加载中...',
					mask:true
				})
				this.$H.get('applet/appdemand/page',{
					page:this.pageL,
					limit:this.pageSizeL,
					mine:0,
					status:1
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					// this.mandData = res.data.list
					if(res.code != 0) {
						if(res.code==401) {
							this.$message.error(res.msg)
							setTimeout((res) => {
								uni.redirectTo({
									url:'../../login/login'
								})
							},1000)
							return
						}
						this.isLoadMoreL = false
						if(this.pageL>1) {
							this.pageL-=1
						}
						return this.$message.error(res.msg)
					} else {
						this.mandData = this.mandData.concat(res.data.list)
						if(res.data.list<this.pageSizeL) {
							this.isLoadMoreL = true
							this.loadStatusL = '没有更多了'
						} else {
							this.isLoadMoreL = false
						}
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
					this.isLoadMoreL = false
					if(this.pageL>1) {
						this.pageL-=1
					}
				})
			},
			navigate(path) {
				if(!path) return
				uni.navigateTo({
					url:`/pages/${path}/${path}`
				})
			},
			handleChange(index) {
				this.tabIndex = index
			},
			userInformation() {
				//登录用户信息 身份(userType) 1--分公司管理员 2--烟站站长 3--下乡员 4--烟农
				this.$H.get('sys/user/info', {}).then(res => {
					console.log(res)
					if (res.code == 401) {
						this.$message.error(res.msg)
						setTimeout((res) => {
							uni.redirectTo({
								url: '../../login/login'
							})
						}, 1000)
						return
					}
					if (res.code == 0) {
						if(res.data.userType == 1) {
							this.isCheck = true
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
.tablist{border-bottom: 2px solid #fff;}
.current{color: #0977FF;border-bottom: 2px solid #0977FF;}
.swt {
	height: 100rpx;
	width: 710rpx;
	background-color:#fff; 
	z-index: 999;
}

.sticky-fixed {
	/* #ifdef H5 */
	position: sticky;
	top: 44px;
	/* #endif */
	/* #ifndef H5 */
	position: fixed;
	top: 0;
	/* #endif */
	z-index: 999;
}
</style>
