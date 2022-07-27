<template>
	<view class="font-md">
		<view class="d-flex">
			<image src="../../static/images/suggest_bg.jpg" style="width: 100%;height: 493rpx;" mode=""></image>
		</view>
		<view class="d-flex a-center j-sb py-2 px-5 bg-white">
			<text v-for="(item,index) in tabList"
			 :key="index"
			 class="text-center border-bottom-white py-1"
			 :class="tabIndex === index ? 'active':''"
			 @click="changeTab(index)"
			 >{{item.title}}</text>
		</view>
		<view class="p-2 bg-white">
			 <view class="line-h-md" v-show="tabIndex===0">
				 <text class="font-md">下部叶成熟特征。</text>
				 <text>脚叶、下二棚叶，处在湿度大，光照差，通风不良的条件下生长成熟，叶片较薄，组织疏松，干物质少。下部叶，成熟叶龄为50～70天。成熟时，叶色绿黄，主脉变白，叶尖茸毛部分脱落。适熟期短，适当早收，掌握成熟标准宜宽。底脚叶起始的2～3片，无烘烤价值，通常不予采收</text>
			 </view>	 
			 <view class="line-h-md" v-show="tabIndex===1">
				 <text class="font-md">中部叶成熟特征。</text>
				 <text>腰叶，处于通风透光良好的条件下生长成熟，叶片厚薄适中，成熟特征表现较为明显。中部叶，成熟叶龄为60～80天。成熟时，叶面浅黄，茸毛部分脱落，主脉、侧脉变白发亮，叶尖、叶缘下垂。中部烟叶适熟采收，掌握成熟标准宜严</text>
			 </view>	 
			 <view class="line-h-md" v-show="tabIndex===2">
				 <text class="font-md">上部叶成熟特征。</text>
				 <text>上二棚叶和顶叶，处于光照充足、蒸腾作用激烈的条件下生长成熟，叶片厚、组织紧密、干物质多、成熟慢。上部叶成熟叶龄为80～90天。成熟时，叶面淡黄，微起黄斑，充分成熟采收（顶部4～6片显示明显的成熟特征）</text>
			</view>	 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0,
				tabList:[
					{title:'下部叶'},
					{title:'中部叶'},
					{title:'上部叶'},
				]
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0) {
				uni.switchTab({
					url:'../tabBar/workbench/workbench'
				})
			}
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style>
.active{color: #007BFF;border-bottom: 1px solid #007BFF;}
</style>
