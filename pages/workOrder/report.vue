<template>
	<view>
		<view class="content">
			<view class="basic">
				<view class="basic-cont">
					<view class="project">
						<text class="project-l">汇报人</text>
						<view class="project-r">{{realName}}{{userType}}</view>
					</view>
					<view class="project">
						<text class="project-l">汇报农时</text>
						<view class="project-r">{{farmingTimeCategory}}</view>
					</view>
				</view>
			</view>
			<view class="wrap">
				<view class="wrap-s">
					<view class="title"> <text>*</text>关联工单</view>
					<view class="wrap-s-r" @click="toRelation()">
						<view class="uni-input placeholder" v-if="outputplanContentList.length==0">请选择</view>
						<view v-else style="margin:20rpx 0;font-size:28rpx;">
							<view class="wrap-s-r-c" v-for="(item,index) in outputplanContentList" :key='index'>
								{{item}};
							</view>
						</view>
						<text class="iconfont icon-jinru text-muted"></text>
					</view>
				</view>
				<view class="wrap-s">
					<view class="title"><text>*</text>工作总结</view>
					<input type="text" v-model="remark" placeholder-style="color:#C0C4CC" placeholder="请输入" />
				</view>
				<view class="wrap-s" style="border:none">
					<view class="title"><text>*</text>该农时生产流程及标准落实评分</view>
					<view class="star-rating-box">
						<star-rating @changeScore='changeScore' name='scoreNum' :score='scoreNum'></star-rating>
					</view>
				</view>
			</view>
		</view>

		<view class="lssue">
			<view class="lssue-t">
				<view class="lssue-t-l">
					<image src="../../static/images/bzns.png" mode=""></image>
					<text>无纸化单据，减少组织碳排放</text>
				</view>
			</view>
			<view class="button" @click="submit()">提交</view>
		</view>

		<!-- 关联工单 -->
		<uni-popup ref="deliveryPopup" type="bottom">
			<view class="popup" @touchmove.prevent.stop>
				<view class="popup-header">
					<text class="tit">关联工单</text>
					<text class="iconfont icon-guanbi" @click="closePopup()"></text>
				</view>
				<scroll-view scroll-y="true" class="popup-body">
					<view class="popup-cont">
						<block v-if="list.length != 0">
							<checkbox-group @change="checkboxChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in list" :key="index">
									<checkbox class="checkbox" :value="item.id" :checked="item.checked" />
									<view>{{item.title}}</view>
								</label>
							</checkbox-group>
						</block>
						<view class="none" v-else>暂无数据~</view>
					</view>
				</scroll-view>
				<view class="popup-footer">
					<view class="confirm-btn color-cancel-bg" @click="closePopup()">取消</view>
					<view class="confirm-btn color-base-bg" @click="save()">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import starRating from '@/components/star-rating/star-rating.vue'
	export default {
		components: {
			starRating
		},
		data() {
			return {
				id: '',
				farmingTimeCategory: '',
				realName: '', //登录人
				userType: '',
				remark: '', //工单备注
				outputplanContentList: [], //关联工单
				list: [], //关联工单--多选框
				newList: [],
				outputplanIdList: [], //关联工单id
				scoreNum: 0, //评分等级
			}
		},
		onLoad(option) {
			this.id = option.id
			this.farmingTimeCategory = option.farmingTimeCategory
		},
		onShow() {
			this.init();
		},
		methods: {
			init() {
				//登录用户信息
				this.$H.get('sys/user/info', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.realName = res.data.realName
						if (res.data.userType == 1) {
							this.userType = '(分公司管理员)'
						} else if (res.data.userType == 2) {
							this.userType = '(烟站站长)'
						} else if (res.data.userType == 3) {
							this.userType = '(下乡员)'
						}
					}
				}).catch(err => {
					console.log(err)
				})
				// 关联工单
				this.$H.get('oa/app/workreport/workorderList', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.list = res.data
					} else {
						return this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toRelation(type) {
				this.outputplanIdList = []
				this.$refs.deliveryPopup.open();
			},
			checkboxChange(e) { //关联工单--多选框
				console.log(e);
				this.outputplanIdList = []
				var items = this.list,
					values = e.detail.value;
				this.newList = []
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.id)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
					this.newList.push(item)
				}
			},
			save() {
				this.outputplanContentList = []
				for (var i in this.newList) {
					if (this.newList[i].checked == true) {
						this.outputplanContentList.push(this.newList[i].title)
						this.outputplanIdList.push(this.newList[i].id)
					}
				}
				this.$refs.deliveryPopup.close();
			},
			closePopup() {
				this.$refs.deliveryPopup.close();
			},
			changeScore(param) { //点亮评分
				this[param.name] = param.score;
			},
			submit() { //提交
				if (this.outputplanContentList.length == 0) {
					uni.showToast({
						title: '请选择关联工单',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				if (this.remark == '') {
					uni.showToast({
						title: '请输入工作总结',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				if(this.scoreNum == 0){
					uni.showToast({
						title: '请点亮星星评分',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				let data = {
					farmingtimeId: this.id, //汇报的农时
					workorderIds: this.outputplanIdList, //关联的工单
					remark: this.remark, //工作总结
					score: this.scoreNum //评分
				}
				console.log('提交参数', data)
				this.$H.post('oa/app/workreport/submit',
					data
				).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.$message.success('提交成功!')
						uni.reLaunch({
							url: "/pages/tabBar/msg/msg"
						})
					} else {
						this.$message.error(res.msg)
					}
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="scss">
	@import './../../common/overall.scss';

	.uni-date-editor .uni-date-editor--x .uni-date-x {
		padding: 0 !important;
	}
	.uni-input{
		padding-left: 0;
	}
</style>
<style lang="scss">
	page {
		background: #F5F6F9;
		font-family: 'PingFang SC';
	}

	.content {
		padding: 18rpx 20rpx 230rpx 20rpx;
		box-sizing: border-box;
	}

	.basic {
		.basic-cont {
			background: #FFFFFF;
			border-radius: 6rpx;
			padding: 20rpx;
			box-sizing: border-box;

			.project {
				display: flex;
				margin-bottom: 24rpx;
				font-size: 28rpx;
				font-weight: 400;

				.project-l {
					width: 25%;
					margin-right: 40rpx;
					color: #606266;
				}

				.project-r {
					width: 75%;
					color: #303133;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.project:last-child {
				margin-bottom: 0;
			}
		}
	}

	.wrap {
		background: #FFFFFF;
		border-radius: 8rpx;
		margin-top: 20rpx;
		padding: 20rpx;

		.wrap-s {
			padding: 16rpx 16rpx 0 16rpx;
			border-bottom: 2rpx solid #E4E7ED;

			.title {
				font-size: 28rpx;
				font-weight: 400;
				color: #606266;
				margin-bottom: 10rpx;

				text {
					color: #EB4343;
					margin-right: 10rpx;
				}
			}

			.wrap-s-r {
				display: flex;
				align-items: center;
				justify-content: space-between;

				picker {
					width: 100%;

					.uni-input {
						padding-left: 0;
					}
				}

				.uni-datetime-picker {
					width: 100%;
				}

			}

			input,
			textarea {
				margin: 16rpx 0;
				font-size: 28rpx;
				font-weight: 400;
				color: #303133;
			}

			.star-rating-box {
				margin-top: 36rpx;
			}
		}
	}

	.placeholder {
		font-size: 28rpx;
		font-weight: 400;
		color: #C0C4CC;
	}

	.lssue {
		width: 100%;
		background: #FFFFFF;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: fixed;
		bottom: 0;

		.lssue-t {
			margin-bottom: 12rpx;

			.lssue-t-l {
				display: flex;
				justify-content: center;

				image {
					width: 34rpx;
					height: 34rpx;
					margin-right: 10rpx;
				}

				text {
					font-size: 24rpx;
					font-weight: 400;
					color: #606266;
				}
			}
		}

		.button {
			width: 100%;
			height: 80rpx;
			background: #0977FF;
			color: #FFFFFF;
			font-size: 30rpx;
			border-radius: 8rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}

	.popup-cont {
		height: 500rpx;
		padding: 20rpx;

		.checkbox {
			transform: scale(0.7);
			border-radius: 50%;
		}

		.uni-list-cell {
			justify-content: flex-start;
		}

		.none {
			width: 100%;
			text-align: center;
			font-size: 24rpx;
			font-weight: 400;
			color: #909399;
		}
	}
</style>
