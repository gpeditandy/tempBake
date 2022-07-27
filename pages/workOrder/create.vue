<template>
	<view>
		<view class="content">
			<view class="basic">
				<view class="basic-cont">
					<view class="project">
						<text class="project-l">所属项目</text>
						<view class="project-r">{{parentName}}</view>
					</view>
					<view class="project">
						<text class="project-l">工单主题</text>
						<view class="project-r">{{param.name}}</view>
					</view>
					<view class="project">
						<text class="project-l">发起人</text>
						<view class="project-r">{{realName}}{{userType}}</view>
					</view>
				</view>
			</view>
			<view class="wrap">
				<!-- <view class="wrap-s">
					<view class="title"> <text>*</text>所属农时</view>
					<view class="wrap-s-r" @click="toRelation('username')">
						<view class="uni-input placeholder" v-if="username.length==0">请选择</view>
						<view v-else style="margin-top:20rpx">
							<view class="wrap-s-r-c" v-for="(item,index) in username" :key='index'>{{item}};</view>
						</view>
						<text class="iconfont icon-jinru text-muted"></text>
					</view>
				</view> -->
				<view class="wrap-s">
					<view class="title"> <text>*</text>开始时间</view>
					<view class="wrap-s-r">
						<uni-datetime-picker class="datatimePicker" type="datetime" v-model="startTime"
							@change="startTimeChange" :border="false" :clearIcon="false" :padding="true" />
						<text class="iconfont icon-jinru text-muted"></text>
					</view>
				</view>
				<view class="wrap-s">
					<view class="title"> <text>*</text>截止时间</view>
					<view class="wrap-s-r">
						<uni-datetime-picker class="datatimePicker" type="datetime" v-model="endTime"
							@change="endTimeChange" :border="false" :clearIcon="false" :padding="true" />
						<text class="iconfont icon-jinru text-muted"></text>
					</view>
				</view>
				<view class="wrap-s">
					<view class="title"> <text>*</text>受理人</view>
					<view class="wrap-s-r" @click="toRelation('username')">
						<view class="uni-input placeholder" v-if="username.length==0">请选择</view>
						<view v-else style="margin-top:20rpx">
							<view class="wrap-s-r-c" v-for="(item,index) in username" :key='index'>{{item}};</view>
						</view>
						<text class="iconfont icon-jinru text-muted"></text>
					</view>
				</view>
				<view class="wrap-s">
					<view class="title"> <text>*</text>优先级</view>
					<view class="wrap-s-r">
						<picker class="picker" @change="bindPickerChange" :value="index" :range="priority">
							<view class="uni-input">{{priority[index]}}</view>
						</picker>
						<text class="iconfont icon-jinru text-muted"></text>
					</view>
				</view>
				<view class="wrap-s" style="border:none">
					<view class="title">工单备注</view>
					<textarea v-model="remark" maxlength="500" auto-height placeholder-style="color:#C0C4CC" placeholder="请输入(最多输入500字)"></textarea>
				</view>
			</view>
			<view class="wrap">
				<view class="wrap-s" style="border:none">
					<view class="title"> <text>*</text>关联生产标准</view>
					<view class="wrap-s-r" @click="toRelation('outputplan')">
						<view class="uni-input placeholder" v-if="outputplanContentList.length==0">请选择</view>
						<view v-else style="margin-top:20rpx">
							<view class="wrap-s-r-c" v-for="(item,index) in outputplanContentList" :key='index'>
								{{item}}
							</view>
						</view>
						<text class="iconfont icon-jinru text-muted"></text>
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

		<!-- 受理人 -->
		<uni-popup ref="usernamePopup" type="bottom">
			<view class="popup" @touchmove.prevent.stop>
				<view class="popup-header">
					<text class="tit">受理人</text>
					<text class="iconfont icon-guanbi" @click="closePopup('username')"></text>
				</view>
				<scroll-view scroll-y="true" class="popup-body">
					<view class="popup-cont">
						<block v-if="usernameList.length != 0">
							<checkbox-group @change="usernameChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in usernameList"
									:key="index">
									<checkbox class="checkbox" :value="item.name" :checked="item.checked" />
									<view>{{item.name}}</view>
								</label>
							</checkbox-group>
						</block>
						<view class="none" v-else>暂无数据~</view>
					</view>
				</scroll-view>
				<view class="popup-footer">
					<view class="confirm-btn color-cancel-bg" @click="closePopup('username')">取消</view>
					<view class="confirm-btn color-base-bg" @click="save('username')">确定</view>
				</view>
			</view>
		</uni-popup>

		<!-- 关联生产标准 -->
		<uni-popup ref="deliveryPopup" type="bottom">
			<view class="popup" @touchmove.prevent.stop>
				<view class="popup-header">
					<text class="tit">关联生产标准</text>
					<text class="iconfont icon-guanbi" @click="closePopup('outputplan')"></text>
				</view>
				<scroll-view scroll-y="true" class="popup-body">
					<view class="popup-cont">
						<block v-if="list.length != 0">
							<checkbox-group @change="checkboxChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in list" :key="index">
									<checkbox class="checkbox" :value="item.id" :checked="item.checked" />
									<view>{{item.content}}</view>
								</label>
							</checkbox-group>
						</block>
						<view class="none" v-else>暂无数据~</view>
					</view>
				</scroll-view>
				<view class="popup-footer">
					<view class="confirm-btn color-cancel-bg" @click="closePopup('outputplan')">取消</view>
					<view class="confirm-btn color-base-bg" @click="save('outputplan')">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				param: '', //上个页面带的参数
				realName: '', //登录人
				userType: '',
				startTime: '',
				endTime: '',
				username: [], //受理人
				usernameList: [], //受理人--多选框
				username_newList: [],
				assignee: [], //受理人id
				priority: ['重要', '一般'], //优先级
				index: 0,
				remark: '', //工单备注
				outputplanContentList: [], //关联生产标准
				list: [], //关联生产标准--多选框
				newList: [],
				outputplanIdList: [], //关联生产标准id
				parentName: '',
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(option) {
			this.param = JSON.parse(decodeURIComponent(option.param))
			this.parentName = option.parentName
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
				//受理人
				this.$H.get('oa/app/workorder/allGotoCountrysideUsers', {}).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.usernameList = res.data
					}
				}).catch(err => {
					console.log(err)
				})
				// 关联生产标准
				this.$H.get('oa/app/workorder/outputPlanList', {
					outputplanCategoryId: this.param.id,
				}).then(res => {
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
			startTimeChange(e) {
				console.log('开始时间:', e);
				this.startTime = e
			},
			endTimeChange(e) {
				console.log('截止时间:', e);
				this.endTime = e
			},
			bindPickerChange(e) { //优先级
				this.index = e.target.value
			},
			toRelation(type) {
				if (type == 'outputplan') {
					this.outputplanIdList = []
					this.$refs.deliveryPopup.open();
				}
				if (type == 'username') {
					this.assignee = []
					this.$refs.usernamePopup.open();
				}
			},
			usernameChange(e) { //受理人--多选框
				this.assignee = []
				var items = this.usernameList,
					values = e.detail.value;
				this.username_newList = []
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.name)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
					this.username_newList.push(item)
				}
			},
			checkboxChange(e) { //关联生产标准--多选框
				console.log('----', e);
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
			save(type) {
				if (type == 'outputplan') {
					this.outputplanContentList = []
					for (var i in this.newList) {
						if (this.newList[i].checked == true) {
							this.outputplanContentList.push(this.newList[i].content)
							this.outputplanIdList.push(this.newList[i].id)
						}
					}
					this.$refs.deliveryPopup.close();
				}
				if (type == 'username') {
					this.username = []
					console.log('1:', this.username_newList);
					for (var i in this.username_newList) {
						if (this.username_newList[i].checked == true) {
							this.username.push(this.username_newList[i].name)
							this.assignee.push(this.username_newList[i].id)
						}
					}
					// 全选传0
					// if(this.username_newList.length == this.assignee.length){
					// 	this.assignee = ['0']
					// }
					this.$refs.usernamePopup.close();
				}
			},
			closePopup(type) {
				if (type == 'outputplan') {
					this.$refs.deliveryPopup.close();
				}
				if (type == 'username') {
					this.$refs.usernamePopup.close();
				}
			},
			submit() { //提交
				if (this.startTime == '') {
					uni.showToast({
						title: '请选择开始时间',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				if (this.endTime == '') {
					uni.showToast({
						title: '请选择结束时间',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				if (this.usernameList.length == 0) {
					uni.showToast({
						title: '请选择受理人',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				if (this.outputplanContentList.length == 0) {
					uni.showToast({
						title: '请选择关联生产标准',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				let data = {
					type: this.parentName,
					topic: this.param.name,
					startTime: this.startTime,
					endTime: this.endTime,
					priority: this.priority[this.index],
					assignee: this.assignee.toString(),
					remark: this.remark,
					outputplanIdList: this.outputplanIdList,
				}
				console.log('提交参数', data)
				this.$H.post('oa/app/workorder/create',
					data
				).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.$message.success('创建成功!')
						uni.reLaunch({
							url: "/pages/tabBar/workbench/workbench"
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

				.picker {
					width: 100%;

					.uni-input {
						padding-left: 0;
					}
				}

				.datatimePicker {
					width: 100%;
				}

				.wrap-s-r-c {
					font-size: 28rpx;
					font-weight: 400;
					color: #303133;
					margin-bottom: 20rpx;
				}
			}

			input,
			textarea {
				margin: 16rpx 0;
				font-size: 28rpx;
				font-weight: 400;
				color: #303133;
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
