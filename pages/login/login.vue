
<template>
	<view class="container">
		<view class="header-top">
			<view class="d-flex flex-column text-white" style="padding-top: 152rpx;padding-left: 36rpx;">
				<text class="mb-1" style="font-size: 48rpx;">你好，</text>
				<text style="font-size: 36rpx;">欢迎来到智慧烟叶！</text>
			</view>
		</view>
		<view class="rounded30 bg-white p-4 mx-4 position-relative borderlogin" style="bottom: 140rpx;">
			<view class="font-weight mb-5 pt-3" style="font-size: 36rpx;color: #303133;">登录</view>
			<view class="d-flex a-center inputbg" style="margin-bottom: 60rpx;">
				<image src="../../static/images/mobile-icon.png" class="ml-4" style="width: 40rpx;height: 40rpx;" mode="aspectFill"></image>
				<view class="gray-line mx-2"></view>
				<input pattern="[0-9]*" type="number" class="tel" maxlength="11" placeholderStyle="color: #768392" v-model="phoneNum" placeholder="请输入手机号" />
			</view>
			<view class="d-flex a-center inputbg" style="margin-bottom: 60rpx;">
				<image src="../../static/images/yzm-icon.png" class="ml-44" style="width: 40rpx;height: 40rpx;" mode="aspectFill"></image>
				<view class="gray-line mx-2"></view>
				<input pattern="[0-9]*" type="number" class="tel" maxlength="6" placeholderStyle="color: #768392" v-model="code" placeholder="请输入验证码" style="position: relative;bottom: 0rpx;" />
				<view class="pr-3 font" style="color: #0977FF;width:200rpx;text-align: center;" 
				@click="handleGetCode()"
				>{{ sendStatus==0 ? '获取验证码' : delayTime+'S'}}</view>
			</view>
			<view class="mb-4" :loading="loading" :class="loading ? 'loadingState':''" @click="handleLogin">
				<button type="primary" class="font-md" style="height: 90rpx;line-height: 90rpx;box-shadow: 0rpx 6rpx 20rpx 2rpx #93C6FB;">{{loading ? '登录中...':'立即登录'}}</button>
			</view>
		</view>
	</view>
</template>
<script>
	// import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				sendStatus: 0,
				timer: null,
				delayTime: 60,
				phoneNum: '',
				code: '',
				isLogin: 0,
				ios_uiConfigure: {},
				loading: false
			};
		},
		methods: {
			// ...mapMutations(['login']),
			//验证手机号格式
			isPhone(value) {
				if (!/^1(3|4|5|6|7|8)\d{9}$/.test(value)) {
					return false
				} else {
					return true
				}
			},
			handleGetCode() {
				if (this.phoneNum === '') {
					this.$message.error('请输入手机号码')
					return
				}
				if (!this.isPhone(this.phoneNum)) {
					this.$message.error('请输入正确的手机号码')
					return
				}
				if (this.sendStatus) return
				this.sendStatus = 1
				this.$H.post('captchaByPhone', {
					phone: this.phoneNum
				}).then(res => {
					if(res.code !=0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						this.timer = setInterval(() => {
							this.delayTime--
							if (this.delayTime < 0) {
								this.sendStatus = 0;
								clearInterval(this.timer);
								this.delayTime = 60;
							}
						}, 1000);
					}
				}).catch(err => {
					console.log(err)
				})
			},
			handleLogin() {
				if (!this.phoneNum) {
					return this.$message.error('请输入手机号码')
				}
				if (!this.isPhone(this.phoneNum)) {
					return this.$message.error('请输入正确的手机号码')
				}
				if (!this.code) {
					return this.$message.error('验证码不能为空')
				}
				this.loading = true
				uni.showLoading({
					title: '正在登录中...',
					mask: true
				})
				this.$H.post('loginByPhone', {
					phone: this.phoneNum,
					captcha: this.code
				}).then(res => {
					console.log(res)
					this.loading = false
					uni.hideLoading()
					if (res.code == 0) {
						uni.setStorageSync('token', res.data.token)
						uni.reLaunch({
							url: "/pages/tabBar/workbench/workbench"
						})
					} else {
						this.$message.error(res.msg)
					}
				}).catch(err => {
					this.loading = false
					console.log(err)
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	page {
		background: #fff;
		font-size: 28rpx;
	}

	/* .container {
		padding: 20rpx 60rpx;
		box-sizing: border-box;
	} */

	.wrap-easyinput-name,
	.wrap-easyinput-pass {
		position: relative;
	}

	.custom-uni-bar {
		position: relative;
		left: 10rpx;
	}

	.header-content {
		padding-top: 120rpx;
		padding-bottom: 80rpx;
	}

	.header-content .login-title {
		font-size: 34rpx;
		color: rgb(159, 159, 159);
		margin-top: 200rpx;
	}

	.header-content .login-title .loginbox {
		padding: 40rpx 60rpx 10rpx;
		box-sizing: border-box;
		background: #fff;
		margin-top: 40rpx;

	}

	.header-content .login-title .loginbox .phone-num {
		display: flex;
		flex-direction: column;

	}

	.header-content .login-title .loginbox .phone {
		font-size: 32rpx;
	}

	.header-content .login-title .loginbox .num {
		font-size: 46rpx;
		font-weight: 700;
		line-height: 120rpx;
	}

	.header-content .title {
		display: flex;
		flex-direction: column;
		// color: #FFFFFF;
		font-size: 44rpx;

	}

	.header-content .title .app-title {
		// font-size: 44rpx;
		// font-weight: 700;
	}

	.header-content .title .support {
		line-height: 80rpx;
	}

	.tel {
		font-size: 30rpx;
		height: 90rpx;
		line-height: 90rpx;
		box-sizing: border-box;
	}

	.code {
		border: 2rpx solid #ccc;
		border-radius: 8rpx;
	}

	.invited-code {
		text-align: center;
	}

	.num-item {
		width: 60rpx;
		height: 60rpx;
		display: inline-block;
	}

	.input-box {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		position: relative;
		margin-bottom: 40rpx;
	}

	.phone-num-content {
		border: 1rpx solid #ccc;
		border-radius: 8rpx;
	}

	.invite-content {
		border-bottom: 1rpx solid #ccc;
		margin-top: 40rpx;
	}

	.code-btn {
		text-align: center;
		font-size: 28rpx;
		height: 88rpx;
		line-height: 88rpx;
		width: 268rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		margin-left: 20rpx;
		border: 2rpx solid #ccc;
	}

	.btn-sure,
	.btn-reg {
		color: #fff;
		background: #007bff;
		font-size: 28rpx;
		border-radius: 8rpx;
		text-align: center;
		width: 620rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		margin: 50rpx auto 0;
	}

	.btn-reg {
		color: #007bff;
		background: none;
		margin-top: 20rpx;
	}

	.inputLine {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 36rpx;
	}

	.input-item {
		width: 64rpx;
		height: 64rpx;
		font-size: 40rpx;
		border: 1px solid #ccc;
		text-align: center;
		border-radius: 10rpx;
		margin-right: 40rpx;
		color: #007bff;
	}

	.code-input-input {
		height: 400rpx;
		position: absolute;
		width: 100%;
		outline: none;
		color: transparent;
		text-shadow: 0 0 0 transparent;
		width: 300%;
		margin-left: -100%;
		z-index: -1;
	}

	.loadingState {
		background-color: #65ACF8 !important;
	}
	.header-top{width:750rpx;height: 516rpx;background:url(../../static/images/topbj.png) no-repeat center top;background-size: 100% 100%;}
	.borderlogin{box-shadow: 0px 3px 6px 1px rgba(60, 69, 87, 0.1);border-radius: 15px 15px 15px 15px;}
	.gray-line{width: 0px;
height: 12px;
opacity: .4;
border: 1px solid #C0C4CC;}
.inputbg{width: 100%;
height: 50px;
background: #F4F6F8;
border-radius: 4px 4px 4px 4px;
opacity: 1;}
.ml-44{margin-left:48rpx;}
</style>
