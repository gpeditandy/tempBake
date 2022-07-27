<template>
	<view>
		<view class="bg-white mb-2 font-md">
			<view class="d-flex a-center j-sb p-2 pt-4 border-top-faint">
				<view class="d-flex flex-column a-center" style="width: 31%;">
					<text class="mb-1">氮(N)</text>
					<view class="d-flex a-center j-sb bg-input">
						<uni-easyinput v-model="elementN" maxlength="6" placeholder="" class="font-md py-2" :inputBorder="false" :clearable="false" />
						<text class="text-muted font-sm pr-1">mg/kg</text>
					</view>
				</view>
				<view class="d-flex flex-column a-center" style="width: 31%;">
					<text class="mb-1">磷(P)</text>
					<view class="d-flex a-center j-sb bg-input">
						<uni-easyinput v-model="elementP" maxlength="6" placeholder="" class="font-md py-2" :inputBorder="false" :clearable="false" />
						<text class="text-muted font-sm pr-1">mg/kg</text>
					</view>
				</view>
				<view class="d-flex flex-column a-center" style="width: 31%;">
					<text class="mb-1">钾(K)</text>
					<view class="d-flex a-center j-sb bg-input">
						<uni-easyinput v-model="elementK" maxlength="6" placeholder="" class="font-md py-2" :inputBorder="false" :clearable="false" />
						<text class="text-muted font-sm pr-1">mg/kg</text>
					</view>
				</view>
			</view>
			<view class="text-center text-light-muted py-2">修改氮磷钾参数计算推荐的配肥方案</view>
			<view class="text-center py-2" @click="handleComputed">
				<button type="primary" size="mini" class="w-33">开始计算</button>
			</view>
		</view>
		<view class="m-2 p-2 bg-white font-md rounded" v-if="computedRes">
			<view class="d-flex a-center">
				<image src="../../static/images/calc-icon01.png" style="width: 42rpx;height: 42rpx;" mode=""></image>
				<text class="ml-2">计算结果</text>
			</view>
			<view class="py-2 text-muted">氮磷钾比例为{{resCom}}，{{resElement}}。</view>
		</view>
		<view class="m-2 p-2 bg-white font-md rounded">
			<view class="d-flex a-center">
				<image src="../../static/images/calc-icon02.png" style="width: 42rpx;height: 42rpx;" mode=""></image>
				<text class="ml-2">推荐配肥方案</text>
			</view>
			<!-- <template v-if="!computedRes">
				<view class="d-flex a-center j-sb border-bottom-mycolor"
				v-for="(item,index) in resData"
				:key="index"
				@click="handleFertilizerDetail(item.id)"
				>
					<view class="py-2 d-flex flex-column text-muted">
						<text class="mb-1">{{item.title}}</text>
						<text class="font">此方案N:P:K = {{item.npkRate}}</text>
					</view>
					<text class="iconfont icon-jinru text-light-muted font-lg"></text>
				</view>
			</template> -->
			<view class="d-flex a-center j-sb border-bottom-mycolor"
			v-for="(item,index) in recommend"
			:key="index"
			@click="handleFertilizerDetail(item.id)"
			>
				<view class="py-2 d-flex flex-column text-muted">
					<text class="mb-1">{{item.title}}</text>
					<text class="font">此方案N:P:K = {{item.npkRate}}</text>
				</view>
				<text class="iconfont icon-jinru text-light-muted font-lg"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resData:[],
				resCom:'',
				resElement:null,
				computedRes:false,
				elementN:'',
				elementP:'',
				elementK:'',
				calcObj:{},
				recommend:[]
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.reLaunch({
					url:'../tabBar/workbench/workbench'
				})
			}
		},
		onLoad(e) {
			console.log(e.obj)
			if(e.obj != "{}") {
				this.calcObj = JSON.parse(e.obj)
				console.log(this.calcObj)
				this.elementN = this.calcObj.property.n_element
				this.elementP = this.calcObj.property.p_element
				this.elementK = this.calcObj.property.k_element
			}
			this.getFertilizeList()
		},
		methods: {
			handleComputed() {
				if(!this.elementN) {
					return this.$message.error('氮元素不能为空')
				}
				if(!this.elementP) {
					return this.$message.error('磷元素不能为空')
				}
				if(!this.elementK) {
					return this.$message.error('钾元素不能为空')
				}
				uni.showLoading({
					title:'计算中...',
					mask:true
				})
				this.$H.post('fertilize/fertilizescheme/calculate',{
					nelement:this.elementN,
					pelement:this.elementP,
					kelement:this.elementK
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					this.recommend = res.data.list
					this.resCom = res.data.npkRate
					this.resElement = res.data.lack
					this.computedRes = true
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			getFertilizeList() {
				uni.showLoading({
					title:'数据加载中...',
					mask:true
				})
				this.$H.get('fertilize/fertilizescheme/page',{
					page:1,
					limit:10
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if(res.code != 0) {
						return this.$message.error(res.msg)
					} else {
						this.resData = res.data.list
					}
				}).catch(err => {
					uni.hideLoading()
					console.log(err)
				})
			},
			handleFertilizerDetail(id) {
				uni.navigateTo({
					url:'../fertilizerDetail/fertilizerDetail?id=' + id
				})
			}
		}
	}
</script>

<style>
page{background-color: #F2F3F5;}
</style>
