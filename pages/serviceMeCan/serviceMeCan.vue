<template>
	<view>
			<view class="font-md pb-100">
				<view class="p-2 m-2 bg-white rounded8">
					<view class="d-flex a-center">
						<image src="../../static/images/baseInfo.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						<text class="ml-2 text-muted">基本信息</text>
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
						<text class="mr-2" style="width: 100rpx;">年龄</text>
						<uni-easyinput trim v-model="myForm.age" class="myinput flex-1" :inputBorder="false" placeholder="输入你的年龄" maxlength="3" type="number" />
					</view>
					<view class="text-muted my-1 d-flex a-center">
						<text class="mr-2" style="width: 100rpx;">性别</text>
						<view class="flex-1 d-flex a-center j-sb border-bottom-mycolor  py-1">
							<!-- <view class="font-md">{{sexArr[sexIndex]}}</view> -->
							<view class="font-md">{{getSex}}</view>
							<picker mode="selector" :value="sexIndex" :range="sexArr" @change="changeSex">
								<uni-icons type="forward" color="#B2B2B2"></uni-icons>
							</picker>					
						</view>
					</view>
				</view>
				<view class="p-2 m-2 bg-white rounded8 text-muted-my">
					<view class="d-flex a-center">
						<image src="../../static/images/home.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						<text class="ml-2 text-muted">常驻地(多选)</text>
					</view>
					<view>
						<checkbox-group @change="checkboxChange3" class="checkbox-group">
							<label
							v-for="(item,index) in addrData" 
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
				
				<view class="p-2 m-2 bg-white rounded8 text-muted-my">
					<view class="d-flex a-center">
						<image src="../../static/images/find03.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						<text class="ml-2 text-muted">服务类型(多选)</text>
					</view>
					<view>
						<checkbox-group @change="checkboxChange2" class="checkbox-group">
							<label
							v-for="(item,index) in serviceData" 
							:key="item.id"
							style="width: 33%;box-sizing: border-box;"
							>
								<view>
									<checkbox :value="item.id" :checked="item.checked" class="checkbox" />
								</view>
								<view :class="[item.checked ? 'checkbox-checked':'text-ellipsis']" class="border py-1 px-2 text-center mt-2 rounded8">{{item.name}}</view>
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="p-2 m-2 bg-white rounded8 text-muted-my">
					<view class="d-flex a-center">
						<image src="../../static/images/device-icon.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
						<text class="ml-2 text-muted">我的设备(多选)</text>
					</view>
					<view>
						<checkbox-group @change="checkboxChange" class="checkbox-group">
							<label
							v-for="(item,index) in deviceData" 
							:key="item.id"
							style="width: 33%;box-sizing: border-box;"
							>
								<view>
									<checkbox :value="item.id" :checked="item.checked" class="checkbox" />
								</view>
								<view :class="[item.checked ? 'checkbox-checked':'text-ellipsis']" class="border py-1 px-2 text-center mt-2 rounded8">{{item.name}}</view>
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
				addrData:[],
				serviceData:[],
				deviceData:[],
				myForm:{
					name:'',
					mobile:'',
					age:0,
				},
				remarks:0,//备注,当前输入字符位置
				maxLeng:300,//备注,允许输入的最大字符数
				sexIndex:0,
				sexArr:['男','女','保密'],
				
				addrNum:[],
				serviceNum:[],
				deviceNum:[],
				status:null,
				remark:'',//备注
				id:'',
				editObj:{},
				
				tempAddrData:[],
				tempServiceData:[],
				tempDeviceData:[]
			}
		},
		onLoad(e) {
			if(e.id) {
				this.id = e.id
				console.log(this.id)
				this.getInfoById()
			} else {
				this.getAreaInfo()
				this.getServiceData()
				this.getDeviceData()
			}
		},
		computed:{
			getSex() {
				return this.sexArr[this.sexIndex]
			}
		},
		methods: {
			getAreaInfo() {
				this.$H.get('applet/appvillage/list').then(res => {
					console.log(res)
					const resData = res.data
					let tempArr = []
					for(let i=0;i<resData.length;i++) {
						let tempObj = {
							name:resData[i].name,
							id:resData[i].id,
							checked:this.id ? this.editObj.village.includes(resData[i].id):false
						}
						tempArr.push(tempObj)
					}
					this.addrData = tempArr
					let temp001 = this.addrData.filter(item => item.checked==true)
					this.tempAddrData = temp001.map(item => item.id)
					console.log(this.tempAddrData)
					console.log(this.addrData)
				}).catch(err => {
					console.log(err)
				})
			},
			getServiceData() {
				this.$H.get('applet/appservice/list').then(res => {
					const resServiceData = res.data
					let serviceArr = []
					for(let i=0;i<resServiceData.length;i++) {
						let serviceObj = {
							name:resServiceData[i].name,
							id:resServiceData[i].id,
							checked:this.id ? this.editObj.supply.includes(resServiceData[i].id):false
						}
						serviceArr.push(serviceObj)
					}
					this.serviceData = serviceArr
					let temp002 = this.serviceData.filter(item => item.checked==true)
					this.tempServiceData = temp002.map(item => item.id)
					console.log(this.tempServiceData)
					console.log(this.serviceData)
				})
			},
			getDeviceData() {
				this.$H.get('applet/appequipment/list').then(res => {
					const resDeviceData = res.data
					let deviceArr = []
					for(let i=0;i<resDeviceData.length;i++) {
						let deviceObj = {
							name:resDeviceData[i].name,
							id:resDeviceData[i].id,
							checked:this.id ? this.editObj.equipment.includes(resDeviceData[i].id):false
						}
						deviceArr.push(deviceObj)
					}
					this.deviceData = deviceArr
					let temp003 = this.deviceData.filter(item => item.checked==true)
					this.tempDeviceData = temp003.map(item => item.id)
					console.log(this.tempDeviceData)
				})
			},
			
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
				if(!this.myForm.age) {
					return this.$message.error('年龄不能为空')
				}
				if(this.id) {
					if(this.tempAddrData.length==0) {
						return this.$message.error('至少选择一个常驻地')
					}
					if(this.tempServiceData.length==0) {
						return this.$message.error('至少选择一个服务类型')
					}
					if(this.tempDeviceData.length==0) {
						return this.$message.error('至少选择一个设备')
					}
					uni.showLoading({
						title:'数据提交中...',
						mask:true
					})
					console.log("修改操作")
					console.log(this.addrNum)
					this.$H.put('applet/appsupply',{
						...this.myForm,
						id:this.id,
						gender:this.getGenderType(this.getSex),
						status:0,
						village:this.addrNum.length > 0 ? this.addrNum:this.tempAddrData,
						supply:this.serviceNum.length > 0 ? this.serviceNum:this.tempServiceData,
						equipment:this.deviceNum.length > 0 ? this.deviceNum:this.tempDeviceData,
						remark:this.remark
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
					if(this.addrNum.length==0) {
						return this.$message.error('至少选择一个常驻地')
					}
					if(this.serviceNum.length==0) {
						return this.$message.error('至少选择一个服务类型')
					}
					if(this.deviceNum.length==0) {
						return this.$message.error('至少选择一个设备')
					}
					uni.showLoading({
						title:'数据提交中...',
						mask:true
					})
					console.log("添加操作")
					this.$H.post('applet/appsupply',{
						...this.myForm,
						gender:this.getGenderType(this.getSex),
						status:0,
						village:this.addrNum,
						supply:this.serviceNum,
						equipment:this.deviceNum,
						remark:this.remark
					}).then(res => {
						uni.hideLoading()
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
						console.log(err)
						uni.hideLoading()
					})
				}
			},
			getGenderType(type) {
				switch (type) {
					case '男':
						return 1
						break;
					case '女':
						return 2
						break;
					default:
						return 0
						break;
				}
			},
			changeSex(e) {
				this.sexIndex = e.target.value
			},
			checkboxChange3(e) {
				console.log(e)
				this.addrNum = e.detail.value
				var items = this.addrData,
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
			checkboxChange2(e) {
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
			checkboxChange(e) {
				console.log(e)
				this.deviceNum = e.detail.value
				var items = this.deviceData,
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
			changeInput(e) {
				this.remarks = e.length
				if(this.remarks>this.maxLeng) return
			},
			formatPhone(value) {
				let len = value.length
				switch (true) {
					case len > 11: 
						return value = value.substr(0, 3) + ' ' + value.substr(3, 4) + ' ' + value.substr(7, 4);
						break;
					case len > 7:
						return value = value.substr(0, 3) + ' ' + value.substr(3, 4) + ' ' + value.substr(7);
						break;
					case len > 3:
						return value = value.substr(0, 3) + ' ' + value.substr(3);
						break;
					default:
						return value
				}
			},
			getInfoById() {
				let id = this.id
				this.$H.get(`applet/appsupply/${id}`).then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						console.log("有传来的id")
						this.editObj = res.data
						this.myForm.name = res.data.name
						this.myForm.mobile = res.data.mobile
						this.myForm.age = res.data.age
						this.remark = res.data.remark
						if(res.data.gender==1) {
							this.sexIndex = 0
						} else if(res.data.gender==2) {
							this.sexIndex = 1
						} else {
							this.sexIndex = 2
						}
						this.getAreaInfo()
						this.getServiceData()
						this.getDeviceData()
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
