<template>
	<view class="container">
		<view class="tab" v-if="user_status != 1">
			<scroll-view class="scroll-view" scroll-x :scroll-into-view="scrollIntoView">
				<view class="tab-c" v-for="(item,index) in tabArray" :key="index">
					<view :class="item.index==status?'select':'default'" class="tab-c-n" 
						:id="'t' + index"
						@click="toChange(item)">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="wrap" v-if="user_status == 1">
			<swiper class="swiper" @change="changeIndicatorDots" :current="current">
				<swiper-item class="swiper-i" v-for="(i,x) in dataList" :key="x">
					<view class="content" v-for="(item,index) in i" :key="index">
						<view class="content-t">
							<view class="content-t-l">
								<image src="../../static/images/icon_6.png" mode=""></image>
								<text>工单</text>
							</view>
						</view>
						<view class="content-b" @click="toDetail(item.id)">
							<view class="content-b-c">
								<view class="content-b-c-l">发起人</view>
								<view class="content-b-c-r">{{item.reportedBy}}</view>
							</view>
							<view class="content-b-c">
								<view class="content-b-c-l">所属项目</view>
								<view class="content-b-c-r">{{item.farmingtime}}</view>
							</view>
							<view class="content-b-c">
								<view class="content-b-c-l">工单创建</view>
								<view class="content-b-c-r">{{item.createDate}}</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="wrap" v-if="user_status != 1">
			<swiper class="swiper" @change="changeIndicatorDots" :current="current">
				<swiper-item class="swiper-i" v-for="(i,x) in dataList" :key="x">
					<view class="content" v-for="(item,index) in i" :key="index">
						<view class="content-t">
							<view class="content-t-l">
								<image src="../../static/images/icon_6.png" mode=""></image>
								<text>工单</text>
							</view>
						</view>
						<view class="content-b" @click="toDetail(item.id)">
							<view class="content-b-c">
								<view class="content-b-c-l">工单编号</view>
								<view class="content-b-c-r">{{item.id}}</view>
							</view>
							<view class="content-b-c">
								<view class="content-b-c-l">所属项目</view>
								<view class="content-b-c-r">{{item.type}}</view>
							</view>
							<view class="content-b-c">
								<view class="content-b-c-l">工单创建</view>
								<view class="content-b-c-r">{{item.startTime}}</view>
							</view>
							<view class="content-b-c">
								<view class="content-b-c-l">工单截止</view>
								<view class="content-b-c-r">{{item.endTime}}</view>
							</view>
							<view class="content-b-c">
								<view class="content-b-c-l">工单主题</view>
								<view class="content-b-c-r">{{item.topic}}</view>
							</view>
							<view class="content-b-c">
								<view class="content-b-c-l">优先级</view>
								<view class="content-b-c-r">{{item.priority}}</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<block v-if="false">
			<view class="wrap" v-if="user_status == 1">
				<view class="content" v-for="(item,index) in initData" :key="index">
					<view class="content-t">
						<view class="content-t-l">
							<image src="../../static/images/icon_6.png" mode=""></image>
							<text>工单</text>
						</view>
					</view>
					<view class="content-b" @click="toDetail(item.id)">
						<view class="content-b-c">
							<view class="content-b-c-l">发起人</view>
							<view class="content-b-c-r">{{item.reportedBy}}</view>
						</view>
						<view class="content-b-c">
							<view class="content-b-c-l">所属项目</view>
							<view class="content-b-c-r">{{item.farmingtime}}</view>
						</view>
						<view class="content-b-c">
							<view class="content-b-c-l">工单创建</view>
							<view class="content-b-c-r">{{item.createDate}}</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="false">
			<view class="wrap" v-if="user_status != 1">
				<view class="content" v-for="(item,index) in initData" :key="index">
					<view class="content-t">
						<view class="content-t-l">
							<image src="../../static/images/icon_6.png" mode=""></image>
							<text>工单</text>
						</view>
					</view>
					<view class="content-b" @click="toDetail(item.id)">
						<view class="content-b-c">
							<view class="content-b-c-l">工单编号</view>
							<view class="content-b-c-r">{{item.id}}</view>
						</view>
						<view class="content-b-c">
							<view class="content-b-c-l">所属项目</view>
							<view class="content-b-c-r">{{item.type}}</view>
						</view>
						<view class="content-b-c">
							<view class="content-b-c-l">工单创建</view>
							<view class="content-b-c-r">{{item.startTime}}</view>
						</view>
						<view class="content-b-c">
							<view class="content-b-c-l">工单截止</view>
							<view class="content-b-c-r">{{item.endTime}}</view>
						</view>
						<view class="content-b-c">
							<view class="content-b-c-l">工单主题</view>
							<view class="content-b-c-r">{{item.topic}}</view>
						</view>
						<view class="content-b-c">
							<view class="content-b-c-l">优先级</view>
							<view class="content-b-c-r">{{item.priority}}</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<view class="d-flex a-center j-center flex-column position-absolute left-0 right-0 bottom-300"
			v-if="dataList[status].length == 0">
			<image src="../../static/images/empty01.png" style="width: 324rpx;height: 230rpx;" mode=""></image>
			<text class="text-light-muted font-md">暂无数据</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				realName: '', //发起人
				realName_z: '', //发起人--截取字段
				user_status: '', //发起人--身份
				tabArray: [],
				status: 0, //当前点击下标
				open: false,
				initData: '',
				current: '', //当前显示元素的下标
				dataList: ['','','','','','','',''],
				scrollIntoView: '', //设置scroll-view联动的值
				url: '',
			}
		},
		onLoad(option) {},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				//登录用户信息 身份(userType) 1--分公司管理员 2--烟站站长 3--下乡员 4--烟农
				this.$H.get('sys/user/info', {}).then(res => {
					if (res.code == 0) {
						this.realName = res.data.realName
						this.realName_z = this.realName.substring(this.realName.length - 2, this.realName.length)
						this.user_status = res.data.userType
						if (res.data.userType == 1) { //分公司
							uni.setNavigationBarTitle({
								title: '我收到的汇报'
							});
							this.url = 'oa/app/workbench/myReceivedWorkreportList'
						} else if (res.data.userType == 2) { //站长
							uni.setNavigationBarTitle({
								title: '我发起的工单'
							});
							this.url = 'oa/app/workbench/myCreatedWorkorderList'
						} else if (res.data.userType == 3) { //下乡员
							uni.setNavigationBarTitle({
								title: '我收到的工单'
							});
							this.url = 'oa/app/workbench/myReceivedWorkorderList'
						}
					}
				}).catch(err => {
					console.log(err)
				})
				//消息列表
				this.$H.get('oa/app/workbench/outputplanCategoryList', {}).then(res => {
					if (res.code == 0) {
						this.tabArray = res.data
						this.toChange(this.tabArray[0])
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toChange(e) {
				this.status = e.index
				this.$H.get(this.url, {
					type: e.name
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.initData = res.data
						this.current = e.index
						this.scrollIntoView = 't' + e.index
						this.dataList.splice(e.index, 1, res.data)
						console.log('数据:',this.dataList,this.current)
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toOpen() {
				this.open = !this.open
			},
			toDetail(id) {
				if (this.user_status == 1) {
					uni.navigateTo({
						url: '/pages/workOrder/report_detail?id=' + id
					})
				} else {
					uni.navigateTo({
						url: '/pages/workOrder/launch_detail?id=' + id
					})
				}
			},
			changeIndicatorDots(e) {
				this.status = e.detail.current
				this.current = e.detail.current
				this.$H.get(this.url, {
					type: this.tabArray[e.detail.current].name
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.initData = res.data
						this.scrollIntoView = 't' + e.detail.current
						this.dataList.splice(e.detail.current, 1, res.data)
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background: #F5F6F9;
		font-family: 'PingFang SC';
	}

	scroll-view ::-webkit-scrollbar {
		//隐藏scroll-view的滚动条
		width: 0;
		height: 0;
		background-color: transparent;
	}

	.container {
		width: 100%;
		height: 100%;
		.tab {
			height: 100%;
			height: 80rpx;
			display: flex;
			background-color: #FFFFFF;
			// position: fixed;
			// // top: 88rpx;
			// z-index: 999;

			.scroll-view {
				min-width: 100%;
				white-space: nowrap;
				background-color: #FFFFFF;
				position: fixed;
				z-index: 999;
				padding-left: 12rpx;
			}

			.tab-c {
				height: 100%;
				display: inline-block;
				text-align: center;
				padding: 0 22rpx;

				.tab-c-n {
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 400;
					padding-bottom: 16rpx;
				}

				.default {
					color: #606266;
				}

				.select {
					color: #0977FF;
					border-bottom: 4rpx solid #0977FF;
				}

			}

		}

		.wrap {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding: 16rpx;
		}
		.swiper {
		    width: 100%;
		    height: 100%;
			
			.swiper-i {
				width: 100%;
				height: 100%;
				overflow-y: auto;
			}
		}
		.content-i{
			width: 100%;
			height: 88rpx;
		}		
			
		.content {
			background: #FFFFFF;
			border-radius: 8rpx;
			padding: 24rpx;
			margin-bottom: 16rpx;
			
			
			.content-t {
				margin-bottom: 16rpx;
				display: flex;
				justify-content: space-between;

				.content-t-l {
					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 8rpx;
					}

					text {
						font-size: 32rpx;
						font-weight: bold;
						color: #303133;
					}
				}

				.wait {
					//未读
					background: #F5F6F9;
					color: #0977FF;
				}

			}


			.content-b {
				width: 100%;
				padding: 24rpx;
				background: #F5F6F9;
				box-sizing: border-box;
				border-radius: 8rpx;

				.content-b-c {
					font-size: 28rpx;
					font-weight: 400;
					display: flex;
					margin-bottom: 32rpx;

					.content-b-c-l {
						width: 172rpx;
						color: #606266;
					}

					.content-b-c-r {
						color: #303133;
					}
				}

				.content-b-c:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
	
</style>
