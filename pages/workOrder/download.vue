<template>
	<view class="box">
		<view class="wrap">
			<view class="logo">
				<image class="img" src="../../static/images/logo.png" mode=""></image>
			</view>
			<view class="wrap-c">
				<image src="../../static/images/bbh.png" alt=""></image>
				<view class="text">智慧烟叶</view>
			</view>
			<view class="wrap-b">版本：2.0.0(build1) </view>
		</view>
		<view class="download">
			<image src="../../static/images/code.png" alt=""></image>
			<view class="now" @click="toDownload()">立即下载</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appUrl: 'http://47.98.184.92:81/__UNI__40008D3_0220103933.apk',
			}
		},
		methods: {
			toDownload() {
				window.location.href = this.appUrl;
			}
		}
	}
</script>

<style lang="scss">
	page {
		font-family: 'PingFang SC';
	}

	.box {
		width: 100%;
		height: 100vh;
		background-image: url('../../static/images/bj.png');
		background-size: 100% 80%;
		background-repeat: no-repeat;
		padding: 304rpx 130rpx 0 130rpx;
		box-sizing: border-box;
	}

	.wrap {
		width: 100%;
		margin-bottom: 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.logo {
		width: 300rpx;
		height: 300rpx;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.wrap-c {
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.wrap-c image {
		width: 54rpx;
		height: 58rpx;
		margin-right: 16rpx;
	}

	.text {
		font-size: 60rpx;
		font-weight: bold;
		color: #303133;
	}

	.wrap-b {
		font-size: 30rpx;
		font-weight: 400;
		color: #909399;
	}

	.download {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: fixed;
		bottom: 124rpx;
	}

	.download image {
		width: 214rpx;
		height: 214rpx;
		margin-bottom: 40rpx;
	}

	.download .now {
		box-sizing: border-box;
		padding: 22rpx 190rpx;
		background: #0977FF;
		border-radius: 95rpx;
		font-size: 34rpx;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
	}
</style>
