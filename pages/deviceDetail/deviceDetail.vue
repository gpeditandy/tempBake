<template>
	<view>
		<view class="header-top">
		  <view class="mask" catchtouchmove="preventTouchMove" v-if="showModal"></view>
		  <view class="modalDlg" v-if="showModal">
			<!-- #ifdef APP-PLUS -->  
			<view class="list share-btn" v-if="ownerFlag" @click="appShare('WXSceneSession')">
			  <image src="../../static/images/share_bg.png" class="scan"></image>
			  <text>分享该设备</text>
			</view>
			<view v-if="ownerFlag" class="myline"></view>
			<!-- #endif -->
			<view class="list listlast" @click="handleDel">
			  <image src="../../static/images/del_bg.png" class="scan"></image>
			  <text>删除该设备</text>
			</view>
			<view class="close" @click="go">
			  <text class="iconfont icon-guanbi"></text>
			</view>
		  </view>
		  <view class="statu-title" :class="bakingInfo.deviceStatus==0?'stop-status-title':''">
			<text>烤房数据采集器{{bakingInfo.deviceStatus==0?'停运':'运行'}}中</text>
			<text @click="handleBakeStatus(bakingInfo.id)" class="see" :class="bakingInfo.deviceStatus==0?'stop-see':''">查看</text>
		  </view>
		  <view class="current-state">
			<view class="full-line-status">
			  <view class="currentj-title">当前烘烤状态({{bakingInfo.deviceProperty.current_shed==0?'上棚':'下棚'}})</view>
			  <view class="stage">
				<text>烘烤阶段</text>
				<text v-if="bakingInfo.deviceProperty" class="which">第{{bakingInfo.deviceProperty.baking_part_num}}段</text>
				<text @click="handleFullLine(bakingInfo)">查看完整工艺曲线> </text>
			  </view>
			  <view class="parttime">
				<text>该阶段时长</text>
				<text v-if="bakingInfo.deviceProperty">{{getPartDuration(bakingInfo.deviceProperty.baking_curve,bakingInfo.deviceProperty.baking_part_num)}}(小时)</text>
			  </view>
			</view>
			  <view class="gray-bg">
			          <view class="data-nav">
			            <view class="dataitem" :class="[tabIndex==0 ? 'active':'']" @click="handleChangeNav(0)">上棚数据</view>
			            <view class="dataitem" :class="[tabIndex==1 ? 'active':'']" @click="handleChangeNav(1)">下棚数据</view>
			          </view>
			          <view class="refresh" @click="handleRefresh">
			            <image src="../../static/images/refresh.svg" class="cls-refresh"></image>
			            <text class="refresh-txt">刷新</text>
			          </view>
			          <view class="navbox"  v-show="tabIndex==0">
			            <view class="current-desc">
			              <view class="temperature">
			                <text>干球温度</text>
			                <text v-if="bakingInfo.deviceProperty">{{bakingInfo.deviceProperty.up_real_temp_dry}}(℃)</text>
			              </view>
			              <view class="temperature">
			                <text>湿球温度</text>
			                <text v-if="bakingInfo.deviceProperty">{{bakingInfo.deviceProperty.up_real_temp_wet}}(℃)</text>
			              </view>
			              <view class="temperature">
			                <text>阶段运行时间</text>
			                <text v-if="bakingInfo.deviceProperty">{{bakingInfo.deviceProperty.baking_part_duration}}(h)</text>
			              </view>
			              <view class="temperature">
			                <text>总运行时间</text>
			                <text v-if="bakingInfo.deviceProperty">{{bakingInfo.deviceProperty.total_duration}}(h)</text>
			              </view>
			            </view>
			            <view class="line"></view>
			            <view class="summary">
			              <text class="target-text">恒温目标</text>
			              <view class="balllist">
			                <text v-if="bakingInfo.deviceProperty">干球：{{bakingInfo.deviceProperty.target_temp_dry}}(℃)</text>
			                <text v-if="bakingInfo.deviceProperty">湿球：{{bakingInfo.deviceProperty.target_temp_wet}}(℃)</text>
			              </view>
			            </view>
			          </view>
			          <view class="navbox"  v-show="tabIndex==1">
			            <view class="current-desc">
			              <view class="temperature">
			                <text>干球温度</text>
			                <text v-if="bakingInfo.deviceProperty">{{bakingInfo.deviceProperty.down_real_temp_dry}}(℃)</text>
			              </view>
			              <view class="temperature">
			                <text>湿球温度</text>
			                <text v-if="bakingInfo.deviceProperty">{{bakingInfo.deviceProperty.down_real_temp_wet}}(℃)</text>
			              </view>
			              <view class="temperature">
			                <text>阶段运行时间</text>
			                <text v-if="bakingInfo.deviceProperty">{{getPartDuration(bakingInfo.deviceProperty.baking_curve,bakingInfo.deviceProperty.baking_part_duration)}}(h)</text>
			              </view>
			              <view class="temperature">
			                <text>总运行时间</text>
			                <text v-if="bakingInfo.deviceProperty">{{bakingInfo.deviceProperty.total_duration}}(h)</text>
			              </view>
			            </view>
			            <view class="line"></view>
			            <view class="summary">
			              <text class="target-text">恒温目标</text>
			              <view class="balllist">
			                <text v-if="bakingInfo.deviceProperty">干球：{{bakingInfo.deviceProperty.target_temp_dry}}(℃)</text>
			                <text v-if="bakingInfo.deviceProperty">湿球：{{bakingInfo.deviceProperty.target_temp_wet}}(℃)</text>
			              </view>
			            </view>
			          </view>
			        </view>
					<view class="otheradd">
					        <view><text class="lightgray">电压</text>：{{bakingInfo.deviceProperty.voltage}}V</view>
					        <view><text class="lightgray">循环风速</text>：{{bakingInfo.deviceProperty.xunhuanfj}}</view>
					</view>
		  </view>
		</view>
		
		<view class="bg-white py-2 px-4 my-2 rounded">
			<view class="d-flex a-center j-sb  mb-3">
				<text class="font-md">{{deviceInfo.name}}</text>
				<view class="d-flex a-center text-primary" @click="handleEdit">
					<image src="../../static/images/edit_bg.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
					<text>编辑</text>
				</view>
			</view>
			<view class="d-flex a-center">
				<view class="d-flex flex-column text-muted font-md w-50">
					<text class="mb-1">告警电话</text>
					<text class="text-dark font">{{deviceInfo.phone}}</text>
				</view>
				<view class="d-flex flex-column text-muted font-md w-50">
					<text class="mb-1">烤房所在地</text>
					<text class="text-dark font">{{deviceInfo.address}}</text>
				</view>
			</view>
			<view class="bg-light-secondary rounded8 p-2 my-2">
				<view class="d-flex flex-column">
					<text class="mb-1">设备型号：{{deviceInfo.deviceName==null?'暂无设备型号':deviceInfo.deviceName}}</text>
					<text>设备编号：{{deviceInfo.deviceId}}</text>
				</view>
			</view>
		</view>
		<view class="py-2 px-4 my-2 bg-white rounded font-md">
			<view class="d-flex a-center">
				<text class="blueline"></text>
				<text class="ml-1">年度烘烤统计</text>
			</view>
			<view class="d-flex a-center j-sb p-2 mb-4 mt-2">
				<text>{{yearText}}年度汇总</text>
				<picker :value="yearIndex" :range="yearData" @change="changeYear">
					<uni-icons type="forward"></uni-icons>
				</picker>
			</view>
			
			<view class="d-flex a-center j-sb p-2">
				<view class="d-flex flex-column a-center">
					<text class="font-weight mb-2" v-if="bakingList.length!=0">{{yearBake.count}}</text>
					<text class="font-weight mb-2" v-else>0</text>
					<text class="text-muted">烘烤次数</text>
				</view>
				<view class="d-flex flex-column a-center">
					<text class="font-weight mb-2" v-if="bakingList.length!=0">{{yearBake.avgDuration}}</text>
					<text class="font-weight mb-2" v-else>0</text>
					<text class="text-muted">平均时长(h)</text>
				</view>
				<view class="d-flex flex-column a-center">
					<text class="font-weight mb-2" v-if="bakingList.length!=0">{{yearBake.avgScore}}</text>
					<text class="font-weight mb-2" v-else>0</text>
					<text class="text-muted">平均得分</text>
				</view>
			</view>
			<view class="myline my-3"></view>
			<view class="text-primary d-flex a-center j-center font-md mb-1" @click="handleHistoryBake">
				查看历史烘烤批次 >
			</view>
		</view>
		
		
		<view class="btn">
		    <text v-if="ownerFlag" @click="handleWarningParams">告警参数</text>
		    <text v-else @click="handleCanotNotice">告警参数</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal:false,
				ownerFlag:true,
				tabIndex:0,
				yearIndex:2,
				yearData:['2020','2021','2022'],
				yearBake:{},
				id:'',
				deviceInfo:{},
				deviceId:'',
				bakingList:[]
			}
		},
		onLoad(e) {
			if(e.item) {
				this.bakingInfo = JSON.parse(e.item)
				this.id = this.bakingInfo.id
				console.log(this.id)
				console.log(this.bakingInfo)
			}
			this.getBakingYearStatistics()
		},
		onShow() {
			this.getBakingroomDetail()
		},
		computed:{
			yearText() {
				return this.yearData[this.yearIndex]
			}
		},
		methods: {
			getFixedNum(value) {
				if(!value) return
				return value.toFixed(2)
			},
			getPartDuration(curve,partNum) {
			      try {
			        const curveJson = JSON.parse(curve);
			        return curveJson.stable[parseInt(partNum) - 1]
			      } catch (err) {
			        return 0
			      }
			},
			getBakingroomDetail() {
				let id = this.id
				this.$H.get(`baking/bakingroom/${id}`).then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.deviceInfo = res.data
						this.deviceId = this.deviceInfo.deviceId
						this.getBakingLogs()
					}
				}).catch(err => {
					console.log(err)
				})
			},
			changeYear(e) {
				this.yearIndex = e.target.value
				this.getBakingYearStatistics()
				this.getBakingLogs()
			},
			handleEdit() {
				let id = this.id
				uni.navigateTo({
					url:'../houseEdit/houseEdit?id=' + id
				})
			},
			getBakingYearStatistics() {
				this.$H.get('baking/bakingroom/bakingStats',{
					year:this.yearText
				}).then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.yearBake = res.data
					}
				}).catch(err => {
					console.log(err)
				})
			},
			handleHistoryBake() {
				let deviceId = this.deviceInfo.deviceId
				uni.navigateTo({
					url:'../historyBake/historyBake?deviceId=' + deviceId + '&id=' + this.id
				})
			},
			handleFullLine(item) {
				if(item.deviceProperty.baking_curve) {
						let value = item.deviceProperty.baking_curve
						let baking_times = item.deviceProperty.baking_times
						uni.navigateTo({
							url:`../craftLine/craftLine?value=${value}&deviceId=${this.bakingInfo.deviceId}&baking_times=${baking_times}`
						})
					}
			},
			appShare(scene) {
				let that = this
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].$page.fullPath // 获取当前页面路由，也就是最后一个打开的页面路由
				uni.share({
					provider: "weixin", //分享服务提供商（即weixin|qq|sinaweibo）
					scene: 'WXSceneSession', //场景，可取值参考下面说明。
					type: 1, //分享形式
					href: '', //跳转链接
					title: '智能烟草烘烤系统', //分享内容的标题
					summary: '我正在使用HBuilderX开发智能烟草烘烤系统，赶紧跟我一起来体验', //分享内容的摘要
					success: function(res) {
						console.log(res)
					},
					fail: function(err) {
						uni.showToast({
							title: '分享失败',
							icon: 'error',
							duration: 2000
						})
						console.log(err)
					}
				});
			},
			handleManagerDevice() {
				this.showModal = true
			},
			handleWarningParams() {
				let baking_times = this.deviceInfo.deviceProperty.baking_times
				let deviceId = this.deviceInfo.deviceId
				uni.navigateTo({
					url:'../warningParams/warningParams?baking_times=' + baking_times + '&deviceId=' + deviceId
				})
			},
			handleCanotNotice() {
				return this.$message.error('分享的设备，无权限查看告警参数')
			},
			handleChangeNav(index) {
				this.tabIndex = index
			},
			preventTouchMove(){},
			navigate(path) {
				if(!path) return
				let deviceNo = this.deviceNo
				uni.navigateTo({
					url:`/pages/${path}/${path}?deviceNo=${deviceNo}`
				})
			},
			handleDel() {
				this.showModal = false
			},
			go() {
				this.showModal = false
			},
			handleBakeStatus(id) {
				uni.navigateTo({
					url:'../bakeStatus/bakeStatus?id='+ id
				})
			},
			handleRefresh() {
				uni.showLoading({
					title: '数据刷新中',
					mask: true
				})
				this.getBakingroomDetail()
				this.getBakingYearStatistics()
				setTimeout(function() {
					uni.hideLoading();
				}, 1000);
			},
			getBakingLogs() {
				this.$H.get('baking/bakingroom/bakingLogs', {
					deviceId: this.deviceId,
					limit: 10,
					page: 1,
					year: this.yearText
				}).then(res => {
					console.log(res)
					if (res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.bakingList = res.data.list
					}
				}).catch(err => {
					console.log(err)
				})
			},
		}
		
	}
</script>

<style>
page{padding-bottom: 88rpx;background: #F2F3F5;font-size:28rpx;}
.top{margin:0rpx auto 20rpx;background:#fff;padding:50rpx 20rpx 30rpx;box-sizing: border-box;}
.noline{width:100%;min-height: 520rpx;display:flex;align-items: center;justify-content: center;}
.active{color:#25AAFF;border-bottom: 2px solid #25AAFF;}
/* 烘房状态 */
.current-state{font-size:28rpx;color: #101010;}
.currentj-title,.summary{margin:0rpx 0 20rpx;background: #F7F8FB;padding:20rpx 15rpx;}
.currentj-title{background:#fff;margin-bottom: 0;}
.summary{padding:20rpx 25rpx;}
.summary text{color:#919191;font-size:28rpx;}
.summary .balllist{display: inline-block;margin-top: 10rpx;}
.summary .balllist text{margin-right:40rpx;color:#101010;font-size: 26rpx;}
.line{width:94%;height:1px;background:#E4E7ED;margin:0 auto;}
.gray-bg{background:#F7F8FB;margin-top: 30rpx;position: relative;}
.data-nav{display: flex;flex-direction: row;height: 60rpx;line-height: 60rpx;padding:0 10rpx;}
.data-nav .dataitem{margin:0 20rpx;}
.current-desc{width:100%;background:#F7F8FB;border-radius: 6rpx;padding:30rpx 0rpx;box-sizing: border-box;display: flex;flex-direction: row;}
.temperature{display: flex;flex-direction: column;align-items: center;width: 25%;}
.temperature50{width: 50% !important;align-items: flex-start;padding:0 30rpx;}
.temperature text:first-child{margin-bottom: 20rpx;color:#919191;}
.temperature text:last-child{color: #101010;font-size: 26rpx;}

/* 改版后新增样式 */
.target-text{margin-right:20rpx;}
.header-top,.house-info,.totalbox{background:#fff;padding:20rpx;box-sizing: border-box;}
.house-info{padding:20rpx 30rpx;margin-bottom: 20rpx;margin-top: 20rpx;}
.statu-title{display: flex;flex-direction: row;justify-content: space-between;padding:10rpx 20rpx;box-sizing: border-box;background-color: rgba(227, 255, 242, 1);color: rgba(53, 176, 120, 1);border: 1px solid rgba(53, 176, 120, 1);align-items: center;font-size: 26rpx;}
.stop-status-title{background-color: rgba(255, 74, 40, .1);color: rgba(255, 74, 40, 1);border: 1px solid rgba(255, 74, 40, 1)}
.statu-title .see{border-radius: 8rpx;background-color: rgba(53, 176, 120, 1);color: rgba(255, 255, 255, 1);font-size: 24rpx;text-align: center;font-family: 'Arial';padding:0 30rpx;height:28px;line-height:28px;}
.statu-title .stop-see{background-color: rgba(255, 74, 40, 1);}
.cls-edit{width:28rpx;height: 28rpx;margin-right: 4rpx;}
.house-title{display: flex;flex-direction: row;align-items: center;justify-content: space-between;margin-bottom:28rpx ;}
.housename{color: rgba(16, 16, 16, 1);font-size: 32rpx;font-family: 'PingFangSC-bold';margin:42rpx 28rp;font-weight: bold;}
.eidtview{color: #25AAFF;font-size: 14px;font-weight: normal;display: flex;align-items: center;}
.noticebox{display:flex;flex-direction: row;justify-content: space-between;margin-bottom: 32rpx;}
.noticebox .notice{width:50%;display: flex;flex-direction: column;}
.notice text:first-child{color:#919191 ;margin-bottom: 8rpx;}
.device-new{display: flex;flex-direction: column;border-radius:8rpx;background-color: rgba(247, 248, 251, 1);padding:30rpx 20rpx;box-sizing: border-box;color: rgba(96, 98, 102, 1);}
.total-title{margin-bottom: 50rpx;display:flex;flex-direction: row;align-items: center;}
.blueline{width:8rpx;height:32rpx;background:#0977FF;margin-right:14rpx;}
.selectbox{display: flex;flex-direction: row;align-items: center;justify-content: space-between;margin-bottom: 40rpx;padding:10rpx 20rpx;box-sizing: border-box;}
.selectbox .icon-jiantou{font-size:28rpx;color: #919191;}
.total{display: flex;align-items: center;padding-bottom: 27px;height: 124rpx;}
.total .total-item{flex: 1;text-align: center;}
.total .total-item .num{color: rgba(16, 16, 16, 100);font-size: 24px;text-align: center;font-family: 'PingFangSC-bold';font-weight: bold;}
.total .total-item .dotted-words{color: rgba(100, 100, 100, 100);font-size: 13px;text-align: center;font-family: 'PingFangSC-regular';padding-top: 4px;}
.total-detail{display:flex;flex-direction: row;align-items: center;color: rgba(37, 170, 255, 1);justify-content: center;border-top: 1px solid #EBEEF5;padding-top: 20rpx;}
.total-detail .icon-jiantou{font-size:24rpx;color:rgba(37, 170, 255, 1);}
.btn{width:100%;height:88rpx;line-height:88rpx;text-align:center;color: #fff;background:#25AAFF;font-size:32rpx;z-index: 10;position:fixed;left:0;right:0;bottom: 0;}
/* 弹出窗口样式 */
.mask{width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: #000;z-index: 9000;opacity: 0.7;}
.modalDlg{width: 580rpx;height: 220rpx; position: fixed;top: 50%;left: 0;z-index: 9999; margin: -170rpx 85rpx;background-color: #fff;border-radius: 18rpx;display: flex;flex-direction: column;padding:30rpx 20rpx;box-sizing: border-box;align-items: center;justify-content: center;}
.modalDlg .scan{width:40rpx;height: 40rpx;margin-right: 20rpx;}
.modalDlg .list{display: flex;flex-direction: row;align-items: center;height:80rpx;}
.myline{width:90%;height:1px;background:#f2f3f5;}
.close{position: absolute; right:20rpx;top:10rpx;width:40rpx;height:40rpx;}
.share-btn{background:none;color: #101010;font-weight: normal;border:none;}
.share-btn text{color: rgba(16, 16, 16, 1);font-size: 28rpx;}
.listlast text{font-size:28rpx;color: #101010;font-family: 'PingFangSC-regular';}
.stage,.parttime{display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding-left: 15rpx;margin-bottom: 20rpx;}
.stage text:first-child{color: rgba(145, 145, 145, 100);}
.stage text:last-child{color: rgba(37, 170, 255, 100);}
.stage .which{position: relative;right:45rpx;}
.parttime{justify-content: flex-start;}
.parttime text:first-child{margin-right:60rpx;color: rgba(145, 145, 145, 100);}
.otheradd{display:flex;flex-direction: row;align-items: center;padding:20rpx 20rpx;box-sizing: border-box;justify-content: space-between;}
.otheradd .lightgray{color: #919191;}
.refresh{display: flex;flex-direction: row;align-items: center;position: absolute;right:20rpx;top:16rpx;}
.cls-refresh{width:36rpx;height: 36rpx;margin-right:10rpx;}
.refresh-txt{color: #25AAFF;}
.my-uni-list picker{display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding:0 30rpx;margin-bottom: 30rpx;}
</style>
