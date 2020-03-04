<template>
  <div class="sechome">
    <el-carousel :interval="4000" type="card"  height="360px">
    <el-carousel-item v-for="item in list" :key="item">
      <img class="lbp"  :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583339023654&di=7eff28d4054174bf5c6757da67c9990d&imgtype=0&src=http%3A%2F%2Fworld.haiwainet.cn%2FNMediaFile%2F2014%2F1208%2FLOCAL201412081106000494116029555.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583256267171&di=07cd103dc44f94c420a552d038f15c53&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F4%2F5147d1f211c31.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583256392780&di=7c6d6f87ef954a0c51bf862e4bcbd2db&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D3037054080%2C4019486712%26fm%3D214%26gp%3D0.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583256481750&di=69d5dc213c3624ad94e097fd64e8bb0c&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8c1001e93901213f0c02bdca57e736d12f2e95f7.jpg',
        'http://h.hiphotos.baidu.com/zhidao/pic/item/0b55b319ebc4b74524841706cefc1e178a821589.jpg',
        'http://10wallpaper.com/wallpaper/1920x1080/1603/Kobe_Bryant_Lakers-2016_NBA_Basketball_HD_Wallpapers_1920x1080.jpg']
    }
  }
}
</script>

<style>
   .lbp{
      height: 360px;
   }
</style>
