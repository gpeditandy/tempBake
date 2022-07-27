<template>
	<view class="container">
		<view class="tab">
			<view class="tab-c" v-for="(item,index) in tabArray" :key="index">
				<view :class="item.index==status?'select':'default'" class="tab-c-n" @click="toChange(item)">{{item.name}}</view>
			</view>
		</view>
		<view class="warp" v-if="status == 0">
			<view class="content" @click="toDetail()">
				<view class="content-t">刘慧泉下乡员申请完成工单</view>
				<view class="content-z">育苗-苗床制作</view>
				<view class="content-b">
					<image src="../../static/images/icon_7.png" 	mode=""></image>
					<text>3月7日 08:54</text>
				</view>
			</view>
		</view>
		<view class="case" v-if="status == 1">
			<view class="case-con">
				<view class="case-t">
					<view style="display: flex;">
						<view class="case-t-t"> </view>
						<view class="case-t-c">
							<view class="title">李欣的记录</view>
							<view class="title-t">本工单共提交1次申请</view>
						</view>
					</view>
					<view class="case-t-b" @click="toOpen()" v-if="!open">
						<text>展开</text>
						<image src="../../static/images/zhankai.png" mode=""></image>
					</view>
					<view class="case-t-b" @click="toOpen()" v-if="open">
						<text>收起</text>
						<image src="../../static/images/shouqi.png" mode=""></image>
					</view>
				</view>
				<view class="case-b" v-if="open" @click="toDetail()">
					<view class="case-b-l">
						<image src="../../static/images/icon_7.png" mode=""></image>
						<text>3月7日 08:54 申请</text>
					</view>
					<view class="case-b-r ty">已同意 ></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabArray: [
					{
						index: 0,
						name: '待审批'
					},{
						index: 1,
						name: '已审批'
					},
				],
				status: 0,
				open: false,
				
				
			}
		},
		methods: {
			toChange(e){
				this.status = e.index
			},
			toOpen(){
				this.open = !this.open
			},
			toDetail(){
				uni.navigateTo({
					url: '/pages/workOrder/approval_detail'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F6F9;
		font-family: 'PingFang SC';
	}

	.container {
		.tab{
			height: 100%;
			height: 80rpx;
			display: flex;
			background-color: #FFFFFF;
			.tab-c{
				width: 50%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.tab-c-n{
					width: 84rpx;
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 400;
					padding-bottom: 20rpx;
				}
				.default{
					color: #606266;
				}
				.select{
					color: #0977FF;
					border-bottom: 4rpx solid #0977FF;
				}
			}
		}
		.warp{
			padding: 20rpx 16rpx;
			box-sizing: border-box;
			
			.content {
				background: #FFFFFF;
				border-radius: 8rpx;
				padding: 24rpx;
				margin-bottom: 20rpx;
				.content-t{
					font-size: 32rpx;
					font-weight: bold;
					color: #303133;
					margin-bottom: 10rpx;
				}
				.content-z{
					font-size: 24rpx;
					font-weight: 400;
					color: #909399;
					margin-bottom: 16rpx;
				}
				.content-b{
					font-size: 24rpx;
					font-weight: 400;
					color: #606266;
					margin-bottom: 10rpx;
					display: flex;
					align-items: center;
					image{
						width: 24rpx;
						height: 24rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
		.case{
			padding: 20rpx 16rpx;
			.case-con{
				background: #FFFFFF;
				border-radius: 8rpx;
				padding: 24rpx;
				margin-bottom: 20rpx;
			}
			.case-t{
				display: flex;
				justify-content:space-between;
				margin-bottom: 32rpx;
				.case-t-t{
					width: 80rpx;
					height: 80rpx;
					background: #0977FF;
					border-radius: 8rpx;
					margin-right: 24rpx;
				}
				.case-t-c{
					height: 80rpx;
					margin-right: 24rpx;
					.title{
						font-size: 32rpx;
						font-weight: bold;
						color: #303133;
						margin-bottom: 8rpx;
					}
					.title-t{
						font-size: 26rpx;
						font-weight: 400;
						color: #909399;
					}
				}
				.case-t-b{
					height: 80rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #0977FF;
					display: flex;
					align-items: center;
					text{
						margin-right: 10rpx;
					}
					image{
						width: 12rpx;
						height: 8rpx;
					}
				}
			}
			.case-b{
				width: 100%;
				height: 88rpx;
				background: #F5F6F9;
				border-radius: 4rpx;
				padding: 24rpx;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				.case-b-l{
					font-size: 28rpx;
					font-weight: 400;
					color: #606266;
					display: flex;
					align-items: center;
					image{
						width: 28rpx;
						height: 28rpx;
						margin-right: 8rpx;
					}
				}
				.case-b-r{
					font-size: 24rpx;
					font-weight: 400;
				}
				.ty{
					color: #2DA641;
				}
				.bh{
					color: #EB4343;
				}
			}
		}
	}
</style>
