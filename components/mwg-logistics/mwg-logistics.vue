<template>
	<view class="mwg-logistics-container">
		<view class="mwg-logistics-detail mwg-logistics-card">
			<!-- <block v-for="(d,index) of info.data" :key="index">
				<view class="mwg-logistics-detail-item">
					<view class="mwg-logistics-time">
						<view>{{d.context}}</view>
					</view>
					<view>{{d.ftime}}</view>
				</view>
			</block> -->
			<view class="mwg-logistics-detail-item">
				<view class="mwg-logistics-time">
					<view class="title">智慧烟叶平台发起农时提醒</view>
				</view>
				<view class="title-time">
					<image src="../../static/images/daiban.png" mode=""></image>
					<view class="title-time-t">2月8日 09:00</view>
				</view>
			</view>
			<view class="mwg-logistics-detail-item">
				<view class="mwg-logistics-time">
					<view class="stationmaster">
						<view class="stationmaster-t">站长确认消息 (1/2)</view>
						<view class="stationmaster-b">
							<text @click="toClick(0)">{{openStatus?'收起':'展开'}}</text>
							<image src="../../static/images/daiban.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="wrap wrap-y-border" v-if="openStatus">
					<view class="wrap-t">
						<view class="wrap-t-l">孙有为</view>
						<view class="wrap-t-r">
							<text class="wrap-text">2月8日 09:56</text>
							<view class="wrap-sure y-color">已确认</view>
						</view>
					</view>
					<text class="wrap-b">宁安数字烟田试验烟站</text>
				</view>
			</view>
			<view class="mwg-logistics-detail-item">
				<view class="mwg-logistics-time">
					<view class="stationmaster">
						<view class="stationmaster-t">站长工作汇报 (1/2)</view>
						<view class="stationmaster-b">
							<text @click="toClick(1)">{{openStatus_s?'收起':'展开'}}</text>
							<image src="../../static/images/daiban.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="wrap wrap-y-border" v-if="openStatus_s">
					<view class="wrap-t">
						<view class="wrap-t-l">孙有为</view>
						<view class="wrap-t-r">
							<text class="wrap-text">2月8日 09:56</text>
							<view class="wrap-sure y-color">已确认</view>
						</view>
					</view>
					<text class="wrap-b">宁安数字烟田试验烟站</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"mwg-logistics",
		data() {
			return {
				openStatus: false,
				openStatus_s: false,
			};
		},
		props:{
			info: {
				type: Object,
				default: ()=>{
					return {}
				}
			}
		},
		methods: {
			toClick(type){
				if(type==0){
					this.openStatus	= !this.openStatus
				}
				if(type==1){
					this.openStatus_s	= !this.openStatus_s
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		font-family: 'PingFang SC';
	}
	.mwg-logistics-card{
		border-radius: 12upx;
		box-sizing: border-box;
	}
	.mwg-logistics-container{
		display: flex;
		width: 100%;
		flex-direction: column;
		box-sizing: border-box;
	}
	.mwg-logistics-order{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
	}
	.mwg-logistics-logo{
		width: 90upx;
		height: 90upx;
		border-radius: 12upx;
		margin-right: 24upx;
	}
	.mwg-logistics-detail{
		padding-left: 64upx;
		color: #777;
		position: relative;
		.mwg-logistics-detail-item{
			margin: 40upx 0;
			position: relative;
			padding: 0;
			&::before{
				content: '';
				display: flex;
				position: absolute;
				left: -32upx;
				top: 12upx;
				bottom: -46upx;
				width: 4upx;
				align-items: flex-start;
				background-color: #D0D0D0;
			}
				
			&:last-child::before{
				background-color: transparent;
			}
			
			.mwg-logistics-time{
				position: relative;
				&::before{
					display: flex;
					align-items: center;
					content: '';
					position: absolute;
					top: 8upx;
					left: -42upx;
					width: 12upx;
					height: 12upx;
					border-radius: 50%;
					background-color: #C0C4CC;
					border: 6rpx solid #e8e8e8;
				}
			}
			
			&{
				--last-infomation-color: #00aaff;
			} 
			
			&:first-child{
				color: var(--last-infomation-color);
				&::before, .mwg-logistics-time::before{
					background-color: var(--last-infomation-color);
				}
				.mwg-logistics-time::before{
					// content: '新';
					width: 12upx;
					height: 12upx;
					left: -42upx;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 10px;
					color: #FFFFFF;
					background-color: #0977FF;
					border: 6rpx solid #7ec7ff;
					// background-color: var(--last-infomation-color);
				}
			}
			.mwg-logistics-label{
				display: inline-flex;
				padding: 8upx 16upx;
				margin: 8upx;
				background-color: var(--last-infomation-color);
				color: white;
				border-radius: 6upx;
			}
		}
	}
	.title{
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #303133;
	}
	.title-time{
		display: flex;
		align-items: center;
		margin-top: 10rpx;
		image{
			width: 22rpx;
			height: 22rpx;
			margin-right: 10rpx;
		}
		.title-time-t{
			font-size: 24rpx;
			font-weight: 400;
			color: #909399;
		}
	}
	.stationmaster{
		width: 100%;
		display: flex;
		justify-content: space-between;
		background: #F5F6F9;
		box-sizing: border-box;
		margin-bottom: 32rpx;
		padding: 20rpx;
		.stationmaster-t{
			font-size: 30rpx;
			font-weight: 500;
			color: #303133;
			
		}
		.stationmaster-b{
			font-size: 24rpx;
			font-weight: 400;
			color: #0977FF;
			image{
				width: 12rpx;
				height: 8rpx;
				margin-left: 8rpx;
			}
		}
	}
	.wrap{
		// height: 78rpx;
		margin-bottom: 20rpx;
		padding-left: 16rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.wrap-t{
			display: flex;
			justify-content: space-between;
			.wrap-t-l{
				font-size: 28rpx;
				font-weight: 400;
				color: #303133;
			}
			.wrap-t-r{
				display: flex;
				align-items: center;
				.wrap-text{
					font-size: 24rpx;
					font-weight: 400;
					color: #606266;
					margin-right: 10rpx;
				}
				.wrap-sure{ 
					width: 88rpx;
					height: 34rpx;
					border-radius: 4rpx;
					font-size: 24rpx;
					font-weight: 400;
					padding: 4rpx;
					text-align: center;
				}
				.y-color{ //已确认样式
					background: rgba(45, 166, 65, 0.1);
					color: #2DA641;
				}
				.w-color{ //未确认样式
					background: rgba(255, 142, 37, 0.1);
					color: #FF8E25;
				}
			}
		}
		.wrap-b{
			font-size: 24rpx;
			font-weight: 400;
			color: #909399;
		}
	}
	.wrap-y-border{ //已确认样式
		border-left: 4rpx solid #2DA641;
	}
	.wrap-w-border{ //未确认样式
		border-left: 4rpx solid #FF8E25;
	}
</style>
