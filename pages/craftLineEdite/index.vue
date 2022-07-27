<template>
	<view class="craft-edite">
		<view class="craft-edite-wrap">
			<view class="craft-edite-header">
				<view class="header-title">
					<view class="header-title-item">
						<view class="title">干球温度设定</view>
						<view class="unit">( ℃)</view>	
					</view>
					<view class="header-title-item">
						<view class="title">湿球温度设定</view>
						<view class="unit">( ℃)</view>	
					</view>
					<view class="header-title-item">
						<view class="title">时长设定</view>
						<view class="unit">( h)</view>	
					</view>
				</view>
			</view>
			<view class="craft-edite-content">
				<view class="stage">
					<view class="stage-item" v-for="(item,index) in stageList" :key="index">
						<view  v-if="item.type == 'odd'" class="stage-left-label odd-lable">
							<text>{{index+1}}</text>
							<text>阶</text>
							<text>段</text>
						</view>
						<view  v-if="item.type == 'even'" class="stage-left-label even-label">
							<text>{{index+1}}</text>
							<text>阶</text>
							<text>段</text>
						</view>
						<view class="stage-odd stage-right" v-if="item.type == 'odd'">
							<view class="stage-odd-item">
								<input class="dtr" type="number" v-model="item.params.dry">
							</view>
							<view  class="stage-odd-item">
								<input class="dtr wet" type="number" v-model="item.params.wet">
							</view>
							<view  class="stage-odd-item">
								<input class="hours" type="number" v-model="item.params.hours">
							</view>
						</view>
						<view class="stage-even stage-right" v-if="item.type == 'even'">
							<view class="stage-even-label">
								<view class="stage-even-item">
									<text>间隔时长：</text>
									<input type="number" v-model="item.interval" />
								</view>
							</view>
						</view>
						<view class="submit-btn-box">
							<view class="submit-box-wrap">
								<view class="sub-btn-box">
									<view class="sub-btn">
										<button @click="handlePreview()" class="preview" type="default">预览</button>
									</view>
									<view class="sub-btn" @click="handleSubmit">
										<button class="sub" type="default">提交</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				stageList: [],
				stable:[],
				deviceId:null,
				tempObj:{dry:[],wet:[],stable:[]}
			}
		},
		onLoad(option) {
			this.deviceId = option.deviceId
			this.getDeviceLine(option.deviceId)
		},
		methods: {
			getDeviceLine(deviceId) {
				this.$H.get('baking/bakingcurve/deviceCurveInfo', {
					deviceId: deviceId,
				}).then(res => {
					console.log(res)
					if (res.code !== 0) {
						return this.$message.error(res.msg)
					} else {
						let result = JSON.parse(res.data.curve)
						let curveMap = []
						let dryMap = result.dry
						let wetMap = result.wet
						console.log('result',result)
						for(let index = 0;index<dryMap.length;index++){
							if(index % 2 === 0 && index !==dryMap.length-1){
								dryMap.splice(index+1,0,'')
								wetMap.splice(index+1,0,'')
							}
						}
						result.stable.map((item,index) =>{
							if(index %2 === 0){
								curveMap.push(
									{
										type:'odd',
										id:1,
										params:{
											dry:dryMap[index],
											wet:wetMap[index],
											hours:'10'
										},
										interval:''
									},
								)
							}else{
								curveMap.push(
									{
										type:'even',
										id:1,
										params:{
											dry:0,
											wet:0,
											hours:0
										},
										interval:item
									},
								)
							}
						})
						this.stageList = curveMap
						this.stable = result.stable
					}
				}).catch(err => {
					console.log(err)
				})
			},
			handlePreview(){
				let curve = {
					dry:[],
					wet:[],
					stable:this.stable
				}
				this.stageList.map((item,index) =>{
					if(index %2 === 0){
						curve.dry.push(parseInt(item.params.dry))
						curve.wet.push(parseInt(item.params.wet))
					}
				})
				console.log(curve)
				this.$H.get('baking/bakingcurve/bakingCurvePreview',{
					curve:curve
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						this.tempObj = res.data
						console.log('curve',curve)
						uni.navigateTo({
							url:`../craftLinePreview/index?value=${JSON.stringify(this.tempObj)}&deviceId=${this.deviceId}`
						})
					}
				})
			},
			handleSubmit() {
				let curve = {
					dry:[],
					wet:[],
					stable:this.stable
				}
				this.stageList.map((item,index) =>{
					if(index %2 === 0){
						curve.dry.push(parseInt(item.params.dry))
						curve.wet.push(parseInt(item.params.wet))
					}
				})
				this.$H.post('baking/bakingcurve/deviceCurveUpdate',{
					curve:curve,
					deviceId:this.deviceId
				}).then(res => {
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log(res)
						uni.navigateBack({
							delta:2
						})
						this.$message.error('提交成功')
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	
	.craft-edite{
		padding: 20upx 24upx;
		background-color: #F2F3F5;
		padding-bottom: 120upx;
		.craft-edite-wrap{
			background-color: #fff;
			border-radius: 8upx;
		}
		.craft-edite-header{
			height: 94upx;
			padding: 8upx 0;
			border-bottom: 1px solid #E4E7ED;
		}
		.header-title{
			display: flex;
			align-items: center;
			.header-title-item{
				flex: 1;
				text-align: center;
				font-size: 12px;
				line-height: 24px;
				font-family: PingFang SC;
				font-weight: 400;
				color: #606266;
				.title{
					
				}
				.unit{
					
				}
			}
		}
		.craft-edite-content{
			.stage{
				.stage-item{
					display: flex;
					align-items: center;
					&:nth-last-child(1){
						.stage-right{
							border-bottom: none!important;
						}
					}
					.stage-left-label{
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 8upx 4upx;
						border-radius: 4upx;
						text{
							font-size: 12px;
							font-family: PingFang SC;
							font-weight: 400;
							// line-height: 30px;
							color: #FFFFFF;
						}
					}
					.odd-lable{
						background-color: #0977FF;
					}
					.even-label{
						background-color: #FF8E25;
					}
					.stage-right{
						flex: 1;
						margin: 0 50upx 0 38upx;
						border-bottom: 1px dashed   #E4E7ED;
					}
					.stage-odd{
						display: flex;
						padding: 48upx 0;
						// justify-content: space-between;
						
						.stage-odd-item{
							input{
								font-size: 18px;
								font-family: PingFang SC;
								font-weight: 500;
								line-height: 0px;
								color: #303133;
								text-align: center;
							}
							.dtr{
								width: 96upx;
								position: relative;
								&::after{
									content: '';
									height: 4upx;
									width: 92upx;
									display: block;
									position: absolute;
									bottom: 0;
									left: 0;
									border: 2upx solid #C0C4CC;
									border-top: 2upx solid rgba(0,0,0,0);
								}
							}
							.wet{
								margin: 0 auto;
							}
							&:nth-child(2){
								flex: 1;
							}
							.hours{
								width: 137upx;
								position: relative;
								&::after{
									content: '';
									height: 4upx;
									width: 133upx;
									display: block;
									position: absolute;
									bottom: 0;
									left: 0;
									border: 2upx solid #C0C4CC;
									border-top: 2upx solid rgba(0,0,0,0);
								}
							}
						}
					}
					.stage-even{
						padding: 32upx 0;
						.stage-even-label{
							.stage-even-item{
								border: 2upx solid #E4E7ED;
								border-radius: 4upx;
								height: 80upx;
								display: flex;
								align-items: center;
								padding: 0 28upx;
								text{
									font-size: 13px;
									font-family: PingFang SC;
									font-weight: 400;
									color: #909399;
									margin-left: 20upx;
								}
								input{
									flex: 1;
									font-size: 13px;
									color: #333;
									font-weight: 500;
								}
							}
						}
					}
				}
			}
		}
		.submit-btn-box{
			position: fixed;
			width: 100%;
			left: 0;
			bottom: 0;
			z-index: 100;
			background-color: #fff;
			.submit-box-wrap{
				padding: 8upx 24upx;
				.sub-btn-box{
					border: 2upx solid #0977FF;
					display: flex;
					align-items: center;
					border-radius: 8upx;
					overflow: hidden;
				}
				.sub-btn{
					flex: 1;
					button{
						font-size: 15px;
						font-family: PingFang SC;
						font-weight: 500;
						border-radius: 0!important;
						border: none!important;
						height: 80upx;
						line-height: 80upx;
						&:after{
							border: none!important;
						}
						&:active{
							opacity: .7;
							transform: opacity .4s;
						}
					}
					.preview{
						color: #0977FF;
						background-color: #fff;
					}
					.sub{
						background-color: #0977FF;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
