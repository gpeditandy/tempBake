  <template>
  	<view class="mypage">
  	  <view class="container">
  	    <view class="tobacco-item">
  	      <text class="first-cate">烟叶品种</text>
  	      <input maxlength="16" class="category" type="text" v-model="myForm.variety" @input="handleInput" placeholder="请输入" placeholder-class="placeholder" />
  	    </view>
  	    <view class="tobacco-item">
  	      <text class="first-cate">烟叶部位</text>
  		  <view class="uni-list my-cell">
  			  <picker @change="bindPickerChange" :value="accountsIndex" :range="accounts">
  				  <view class="weui-select">{{myForm.position}}</view>
  				  <uni-icons type="forward" size="20" color="#B2B2B2"></uni-icons>
  			  </picker>
  		  </view>
  	    </view>
  	
  	    <view class="tobacco-item">
  	      <text class="first-cate">烟叶成熟度</text>
  	      <view class="uni-list my-cell">
  	            <picker @change="bindPickerChange1" :value="maturityIndex" :range="maturityArr">
  	                  <view class="weui-select">{{myForm.maturity}}</view>
  					  <uni-icons type="forward" size="20" color="#B2B2B2"></uni-icons>
  	            </picker>
  	      </view>
  	    </view>
  	
  	    <view class="tobacco-item">
  	      <text class="first-cate">烟叶含水率(%)</text>
  	      <view class="uni-list my-cell">
  	            <picker @change="bindPickerChange2" :value="waterIndex" :range="waterAccouts">
  	                  <view class="weui-select">{{myForm.rateOfWater}}</view>
  					  <uni-icons type="forward" size="20" color="#B2B2B2"></uni-icons>
  	            </picker>
  	      </view>
  	    </view>
  	
  	    <view class="tobacco-item">
  	      <text class="first-cate">装烟大致重量(kg)</text>
  	      <input maxlength="16" class="category" type="number" pattern="[0-9]*" placeholder="请输入" placeholder-class="placeholder" v-model="myForm.weight" @input="handleInput2" />
  	    </view>
  	
  	  </view>
  	  <view class="btn" @click="handleSubmit">保存</view>
  	</view>
  </template>
  
  <script>
  	export default {
  		data() {
  			return {
				type:'',
  				accounts: ["上部", "中部", "下部"],
  				accountsIndex:0,
  				maturityArr:["未熟","假熟","初熟","适熟","完熟","过熟"],
  				maturityIndex:0,
  				waterAccouts:["10%","20%","30%"],
  				waterIndex:0,
  				myForm:{
  				  variety:'',//烟叶品种
  				  position:'',//烟叶部位
  				  maturity:'',//烟叶成熟度	
  				  rateOfWater:'',//烟叶含水率
  				  weight:'',//装烟大致重量
				  deviceId:'',
				  bakingTimes:''
  				},
  				tobaccoInfo:{}
  			}
  		},
  		methods: {
  			handleInput(e) {
  				this.myForm.variety = e.detail.value
  			},
  			handleInput2(e) {
  				this.myForm.weight = e.detail.value
  			},
  			bindPickerChange(e) {
  				// this.accountsIndex = e.target.value
  				this.myForm.position = this.accounts[e.target.value]
  			},
  			bindPickerChange1(e) {
  				// this.maturityIndex = e.target.value
  				this.myForm.maturity = this.maturityArr[e.target.value]
  			},
  			bindPickerChange2(e) {
  				// this.waterIndex = e.target.value
  				this.myForm.rateOfWater = this.waterAccouts[e.target.value]
  			},
  			handleSubmit() {
  				if(!this.myForm.variety) {
  					return this.$message.error('烟叶品种不能为空')
  				}
  				if(!this.myForm.weight) {
  					return this.$message.error('烟叶重量不能为空')
  				}
  				console.log(this.myForm.position,this.myForm.maturity,this.myForm.rateOfWater)
				if(this.type==1) {
					this.$H.put('baking/tobaccoinfo',{
						...this.myForm
					}).then(res => {
						if(res.code != 0) {
							return this.$message.error(res.msg)
						} else {
							this.tobaccoInfo = res.data
							this.$message.successIcon('操作成功')
							setTimeout((res) => {
								uni.navigateBack({
									delta:1
								})
							},2000)
						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					this.$H.post('baking/tobaccoinfo',{
						...this.myForm
					}).then(res => {
						if(res.code != 0) {
							return this.$message.error(res.msg)
						} else {
							this.tobaccoInfo = res.data
							this.$message.successIcon('操作成功')
							setTimeout((res) => {
								uni.navigateBack({
									delta:1
								})
							},2000)
						}
					}).catch(err => {
						console.log(err)
					})
				}
  			}
  		},
  		onLoad(e) {
			this.type = e.type
			this.myForm.deviceId = e.deviceId
			this.myForm.bakingTimes = e.bakingTimes
			if(this.type==2) {
				this.myForm.position = this.accounts[this.accountsIndex]
				this.myForm.maturity = this.maturityArr[this.maturityIndex]
				this.myForm.rateOfWater = this.waterAccouts[this.waterIndex]
			} else {
				this.myForm = JSON.parse(e.tobaccoInfo)
			}
  		}
  	}
  </script>
  
  <style>
  page{background-color: #F2F5F3;}
  .mypage{width:100%;background:transparent;display: flex;flex-direction: column;overflow-x: hidden;padding-bottom: 80rpx;}
  .container{margin-bottom:20rpx;background:#fff;padding:30rpx 30rpx 30rpx;box-sizing: border-box;}
  .title{display: flex;flex-direction: row;justify-content: space-between;height:60rpx;line-height: 60rpx;margin:10rpx 0;}
  .title text:first-child{font-size:32rpx;color:#101010;font-weight: bold;}
  .title text:last-child{font-size:28rpx;color:#15C179;}
  .title text.running{color:#FC6053}
  .device-num{font-size:28rpx;color: #646464;margin-bottom: 10rpx;}
  .tobacco-item{margin-bottom: 40rpx;}
  .placeholder{color: #C7C7C7;}
  .first-cate{margin-bottom: 20rpx;display: block;color:#919191;}
  .category{border:1px solid #ccc;height:76rpx;line-height:76rpx;padding-left:20rpx;box-sizing: border-box;}
  .my-cell{border:1px solid #ccc;height:76rpx;line-height:76rpx;padding-left:20rpx;padding-right:20rpx;box-sizing: border-box;}
  .my-cell picker{display: flex;flex-direction: row;align-items: center;justify-content: space-between;}
  .btn{width:100%;height:88rpx;line-height: 88rpx;background:#25AAFF;color: #fff;text-align:center;font-size:32rpx;position: fixed;left:0;right:0;bottom: 0;display: flex;justify-content: center;z-index: 100;}
  .weui-cell_select .weui-cell__bd:after {transform: rotateZ(90deg);}
  .category.discolor{background:#f2f3f5;color:#999;}
  .discolor .weui-select{color:#999;}
  </style>
 