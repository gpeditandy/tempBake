<template>
	<view>
			<view class="font-md pb-100">
				<view class="p-2 m-2 bg-white rounded8">
					<view class="d-flex a-center">
						<image src="../../static/images/baseInfo.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-2 text-muted">基本信息</text>
						<!-- <view>{{this.getPlace}}</view> -->
					</view>
					<view class="text-muted my-1 d-flex a-center">
						<text class="mr-2" style="width: 100rpx;">姓名</text>
						<uni-easyinput trim v-model="myForm.name" class="myinput flex-1" :inputBorder="false" placeholder="输入你的姓名" maxlength="16" />
					</view>
					<view class="text-muted my-1 d-flex a-center">
						<text class="mr-2" style="width: 100rpx;">电话</text>
						<uni-easyinput trim v-model="myForm.mobile" class="myinput flex-1" :inputBorder="false" placeholder="输入你的电话" maxlength="11" type="number" />
					</view>
					<view class="text-muted my-1 d-flex a-center">
						<text class="mr-2" style="width: 100rpx;">村屯</text>
						<view class="d-flex a-center border-bottom-mycolor flex-1 py-2 pl-2">
							<view class="mr-2 text-muted">{{placeArr[placeIndex].name}}</view>
							<picker class="mr-5" :value="placeIndex" :range="placeArr" :range-key="'name'" @change="bindPickerChange">
								<uni-icons type="bottom" color="#B2B2B2"></uni-icons>
							</picker>
							
						</view>
					</view>
					<view class="text-muted my-1 d-flex a-center">
						<text class="mr-2" style="width: 100rpx;">面积</text>
						<uni-easyinput trim v-model="myForm.area" class="myinput flex-1" :inputBorder="false" placeholder="输入面积" maxlength="5" type="number" />
					</view>
				</view>
				
				
				
				<view class="p-2 m-2 bg-white rounded8 text-muted-my">
					<view class="d-flex a-center">
						<image src="../../static/images/find03.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-2 text-muted">服务内容</text>
					</view>
					<view>
						<checkbox-group @change="checkboxChange" class="checkbox-group">
							<label
							v-for="(item,index) in serviceData" 
							:key="item.id"
							style="width: 33%;box-sizing: border-box;"
							>
								<view>
									<checkbox :value="item.id" :checked="item.checked" class="checkbox" />
								</view>
								<view :class="[item.checked ? 'checkbox-checked':'']" class="border py-1 px-2 text-center mt-2 rounded8 text-ellipsis">{{item.name}}</view>
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="p-2 m-2 mb-5 bg-white rounded8 text-muted-my">
					<view class="d-flex a-center">
						<image src="../../static/images/marks.png" style="width: 30rpx;height: 30rpx;" mode=""></image>
						<text class="ml-2 text-muted">备注</text>
					</view>
					<uni-easyinput trim v-model="remark" maxlength="300" type="textarea" :inputBorder="false"  placeholder="请输入" confirmType="done" @input="changeInput" />
					<view class="text-right text-light-muted p-2">{{remarks}}/{{maxLeng}}</view>
				</view>
				<view class="fixed-bottom">
					<button type="primary" @click="handleSubmit">提交</button>
				</view>
			</view>
	</view>
</template>

<script>
	import $T from '@/utils/formatTime.js'
	export default {
		data() {
			return {
				placeArr:[{name:'',id:''}],
				placeIndex:0,
				placeSelectId:'',
				
				serviceData:[],
				myForm:{
					name:'',
					mobile:'',
					area:0
				},
				serviceNum:[],
				remark:'',//备注
				status:null,
				remarks:0,//备注,当前输入字符位置
				maxLeng:300,//备注,允许输入的最大字符数
				id:'',
				editObj:{},
				
				tempServiceData:[],
				tempvillage:''//上一个页面传过来的村屯名
			}
		},
		onLoad(e) {
			if(e.id) {
				this.id = e.id
				this.getAreaInfo()
				this.getMandInfoById()
			} else {
				this.getAreaInfo()
				this.getServiceData()
			}
		},
		computed:{
			getPlace() {
				// return this.placeArr[this.placeIndex]
				return this.placeArr[this.placeIndex].id
			}
		},
		methods: {
			handleSubmit() {
				if(!this.myForm.name) {
					return this.$message.error('姓名不能为空')
				}
				if(!this.myForm.mobile) {
					return this.$message.error('电话不能为空')
				}
				if(!($T.isPhone(this.myForm.mobile))) {
					return this.$message.error('手机格式不正确')
				}
				if(!this.myForm.area) {
					return this.$message.error('面积不能为空')
				}
				if(this.id) {
					if(this.tempServiceData.length==0) {
						return this.$message.error('至少选择一个服务类型')
					}
					uni.showLoading({
						title:'数据提交中...',
						mask:true
					})
					this.$H.put('applet/appdemand',{
						...this.myForm,
						id:this.id,
						status:0,
						village:this.getPlace,
						demand:this.serviceNum.length>0?this.serviceNum:this.tempServiceData,
						remark:this.remark,
					}).then(res => {
						uni.hideLoading()
						console.log(res)
						if(res.code != 0) {
							return this.$message.error(res.msg)
						} else {
							this.$message.successIcon('修改成功')
							setTimeout((res) => {
								uni.navigateBack({
									delta:2
								})
							},2000)
						}
					}).catch(err => {
						uni.hideLoading()
						console.log(err)
					})
				} else {
					if(this.serviceNum.length==0) {
						return this.$message.error('至少选择一个服务内容')
					}
					uni.showLoading({
						title:'数据提交中...',
						mask:true
					})
					this.$H.post('applet/appdemand',{
						...this.myForm,
						status:0,
						village:this.getPlace,
						demand:this.serviceNum,
						remark:this.remark,
					}).then(res => {
						uni.hideLoading()
						console.log(res)
						if(res.code != 0) {
							return this.$message.error(res.msg)
						} else {
							this.$message.successIcon('提交成功')
							setTimeout((res) => {
								uni.navigateBack({
									delta:1
								})
							},2000)
						}
					}).catch(err => {
						uni.hideLoading()
						console.log(err)
					})
				}
			},
			getAreaInfo() {
				this.$H.get('applet/appvillage/list').then(res => {
					console.log(res)
					const resData = res.data
					let tempArr = []
					for(let i=0;i<resData.length;i++) {
						let tempObj = {
							name:resData[i].name,
							id:resData[i].id
						}
						 tempArr.push(tempObj)
					}
					// this.placeArr = tempArr.map(item => item.name)
					// console.log(this.placeArr)
					this.placeArr = tempArr
					console.log(this.placeArr)
					// if(this.id) {
					// 	console.log(this.tempvillage)
					// 	let temp = this.placeArr.filter(item => item.name==this.tempvillage)
					// 	console.log(temp)
					// 	let index = this.placeArr.findIndex(item => item.name==this.tempvillage)
					// 	console.log(index)
					// 	this.placeIndex = index
					// }
				}).catch(err => {
					console.log(err)
				})
			},
			getServiceData() {
				uni.showLoading({
					title:'loading...',
					mask:true
				})
				this.$H.get('applet/appservice/list').then(res => {
					uni.hideLoading()
					const resServiceData = res.data
					let serviceArr = []
					for(let i=0;i<resServiceData.length;i++) {
						let serviceObj = {
							name:resServiceData[i].name,
							id:resServiceData[i].id,
							checked:this.id ? this.editObj.demand.includes(resServiceData[i].id):false
						}
						serviceArr.push(serviceObj)
					}
					this.serviceData = serviceArr
					let tempService = this.serviceData.filter(item => item.checked==true)
					this.tempServiceData = tempService.map(item => item.id)
					console.log(this.tempServiceData)
				}).catch(err => {
					console.log(err)
					uni.hideLoading()
				})
			},
			checkboxChange(e) {
				console.log(e)
				this.serviceNum = e.detail.value
				var items = this.serviceData,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.id)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			bindPickerChange(e) {
				this.placeIndex = e.target.value
				this.placeSelectId = this.placeArr[this.placeIndex].id
			},
			changeInput(e) {
				this.remarks = e.length
				if(this.remarks>this.maxLeng) return
			},
			getMandInfoById() {
				let id = this.id
				this.$H.get(`applet/appdemand/${id}`).then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.editObj = res.data
						this.myForm.name = this.editObj.name
						this.myForm.mobile = this.editObj.mobile
						this.myForm.area = this.editObj.area
						this.remark = this.editObj.remark
						this.tempvillage = this.editObj.village
						console.log(this.tempvillage)
						// let index = this.placeArr.findIndex(item => item.id==this.editObj.village)
						// console.log(index)
						// this.placeIndex = index
						this.getAreaInfo()
						this.getServiceData()
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
.myinput{border-bottom:1px solid #eee;}
.checkbox-group{width:100%;padding:20rpx 10rpx;box-sizing: border-box;display: flex;flex-direction: row;justify-content: space-between;flex-wrap: wrap;}
.uni-list-cell {display: flex;flex-direction: row;margin-bottom: 30rpx;}
.checkbox{transform:scale(0.7);display: none;}
.checkbox-checked{color: #0977FF;border: 1px solid #0977FF;}
</style>
