<template>
	<view>
		<view class="p-2 bg-white m-2" style="padding-bottom: 100rpx;">
			<view class="text-dark font-md mb-2">监测图像拍摄时间</view>
			<view class="text-muted font">摄像机自动按照设定时间拍摄田间烟草长势图片</view>
			<view class="font-md">
				<view class="py-2">
					<checkbox-group @change="checkboxChange">
						<view class="d-flex flex-wrap flex-column">
							<label
							class="border-bottom border-light-secondary py-2"
							v-for="(item,index) in newProName" 
							:key="index">
								<checkbox style="transform:scale(0.9);" :value="item.value" :checked="item.checked" class="mr-1" />
								<text>{{item.value}}</text>
							</label>
						</view>
					</checkbox-group>
				</view>
			</view>
		</view>
		<view class="fixed-bottom" @click="ModifyTime">
			<button type="primary">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				proName: [{id:'01',value:'07:00'},{id:'02',value:'08:00'},{id:'03',value:'09:00'},{id:'04',value:'10:00'},{id:'05',value:'11:00'},{id:'06',value:'12:00'},{id:'07',value:'13:00'},{id:'08',value:'14:00'},{id:'09',value:'15:00'},{id:'10',value:'16:00'},{id:'11',value:'17:00'},{id:'12',value:'18:00'}],
				cameraId:'',
				snapshotTimeArr:[],
				newProName:[]
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
		},
		onLoad(e) {
			if(e.cameraId) {
				this.cameraId = e.cameraId
			}
		},
		onShow(){
			this.getCameraDetail()
		},
		methods: {
			getCameraDetail() {
				this.$H.get('caishou/caishou/cameraInfo',{
					cameraId:this.cameraId
				}).then(res => {
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						let tempStr = ''
						tempStr = res.data.snapshotTime
						this.snapshotTimeArr = tempStr.split(',')
						console.log(this.snapshotTimeArr)
						let newArr = []
						for(let i=0;i<this.snapshotTimeArr.length;i++) {
							for(let j=0;j<this.proName.length;j++) {
								if(this.snapshotTimeArr[i]==this.proName[j].value) {
									this.proName[j].checked = true
								}
							}
						}
						console.log(this.proName)
						this.newProName = this.proName
					}
				}) 
			},
			ModifyTime() {
				if(this.snapshotTimeArr.length==0) {
					return this.$message.error('至少选择一个拍摄时间')
				} else {
					let str = this.snapshotTimeArr.join(',')
					console.log(str)
					this.$H.post('zhangshi/zhangshi/updateSnapShotTime',{
						cameraId:this.cameraId,
						snapshotTime:str
					}).then(res => {
						console.log(res)
						if(res.code != 0) {
							return this.$message.error(res.msg)
						} else {
							uni.navigateBack({
								delta:1
							})
							this.$message.error('时间设定成功')
						}
					})
				}
			},
			checkboxChange(e) {
				var items = this.proName,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				this.snapshotTimeArr = values
			}
		}
	}
</script>

<style>
	page {
		background-color: #F2F3F5;
	}
</style>
