<template>
  <view class="video">
    <view id="player"></view>
  </view>
</template>

<script>
export default {
  name: 'lcy_video',
  mounted: function() {
    /* eslint-disable */
    // 添加DOM容器
    const player = new ImouPlayer('#player');
    // 播放器初始化
    player.setup({
      src: [
        {
          url: 'imou://open.lechange.com/6L0A56CRAJE35BC/0/1?streamId=1', // url拼接说明请见：2.2.3 轻应用播放地址说明
          kitToken: 'Kt_58a24593d8974346a4b8f134be7e57a2', // 播放Token，通过接口getKitToken获取，具体请见：2.2.4 getKitToken接口协议说明
        }
      ], // 播放地址
      width: 760, // 播放器宽度
      height: 400, // 播放器高度
      poster: '', // 封面图url
      autoplay: true,
      controls: true, // 是否展示控制栏
    });

    // 以下参数根据生命周期来使用...
    // // 播放
    // player.play();
    // // 暂停
    // player.pause();
    // // 停止播放
    // player.stop();
    // // 销毁播放器
    // player.destroy();
    // // 进入全屏
    // player.setFullScreen();
    // // 退出全屏
    // player.exitFullScreen();
    // // 设置音量（0-1）
    // player.setVolume(0);
    // // 设置多屏
    // player.setMultiScreen(1);
  },
}
</script>

<style scoped>
</style>

