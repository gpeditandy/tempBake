<template>
	<view>
		<view class="data-picker" v-if="showPicker" @click="handleClose($event)">
			<view :class="['container',showPicker?'show':'hide']" @click.stop>
				<view class="data-main">
					<view class="header">
						<view class="cancle" @click="handleClose($event)">取消</view>
						<view class="title">请选择设备</view>
						<view class="sure" @click="handleSure">确认</view>
					</view>
					<view class="data-content">
						<view class="data-list">
							<view class="item" v-for="(item,index) in dataSurce" :key="index" @click="handleSelect(item,index)">
								<view class="status online" v-if="item.status === 1">在线</view>
								<view class="status offline" v-if="item.status === 0">离线</view>
								<view class="item-name">{{item.cameraName}}</view>
								<view class="data-check-box">
									<image v-if="isCheck === index" src="../../static/images/online.png"></image>
									<image v-else src="../../static/images/offline.png"></image>
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
	export default {
		name:"data-picker",
		data() {
			return {
				showPicker:false,
				isCheck:0,
				current:{}
			};
		},
		props:{
			title:{
				type:String,
				default:'请选择设备',
			},
			cancleText:{
				type:String,
				default:'取消',
			},
			sureText:{
				type:String,
				default:'确认',
			},
			dataSurce:{
				type:Array,
				default:() =>{
					return []
				},
				required:true
			}
		},
		mounted(){
			console.log('dataSurce',this.dataSurce)
			this.current = this.dataSurce.length>0?this.dataSurce[0]:[]
		},
		methods:{
			handleSelect(item,index){
				if(index === this.isCheck) return;
				this.isCheck = index
				this.current = item
			},
			handleClose(e){
				this.showPicker = false
			},
			handleSure(){
				this.showPicker = false
				this.$emit('change',{"data":this.current,"index":this.isCheck})
			}
		}
	}
</script>

<style lang="scss">
.data-picker{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0,0,0,.5);
	z-index: 1000;
	display: flex;
	/*flex-direction: column;*/
	align-items:end;
	.container{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom);
		z-index: 1001;
		transition:height .5s linear;
	}
	.data-main{
		padding: 0 8px;
		background: #F2F3F5;
		border-radius: 16px 16px 0px 0px;
		position: relative;
		.header{
			padding: 15px 0;
			display: flex;
			.cancle{
				font-size: 15px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #0977FF;
			}
			.title{
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: bold;
				color: #303133;
				flex: 1;
				text-align: center;
			}
			.sure{
				font-size: 15px;
				font-family: PingFang SC;
				font-weight: 800;
				color: #0977FF;
			}
		}
		.data-content{
			background-color: #fff;
			padding: 8px 12px;
			height: 300px;
			max-height: 400px;
			overflow-y: scroll;
			border-radius: 4px;
			.data-list{
				.item{
					display: flex;
					align-items: center;
					padding: 16px 0;
					border-bottom:1px solid #E4E7ED;;
					.status{
						font-size: 12px;
						font-family: PingFang SC;
						font-weight: 400;
						padding: 4px 8px;
						border-radius: 4px;
						&.online{
							background-color: rgba(45, 166, 65, .1);
							color: #2DA641;
						}
						&.offline{
							background-color: rgba(245, 246, 249, .9);
							color: #909399;
						}
					}
					.item-name{
						flex: 1;
						font-size: 14px;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 0px;
						color: #303133;
						padding-left: 16px;
					}
					.data-check-box{
						image{
							width: 32upx;
							height: 32upx;
						}
					}
				}
			}
		}
	}
}
</style>
