<template>
  <div class="sechome">
     <el-carousel  indicator-position="none" arrow="never" class="bg" height="767.33px">
        <el-carousel-item v-for="item in list" :key="item">
          <img class="bgi"  :src="item" alt="">
        </el-carousel-item>
         <el-carousel type="card"  height="400px">
       <el-carousel-item v-for="item in list" :key="item">
          <img class="zmd"  :src="item" alt="">
      </el-carousel-item>
  </el-carousel>
  </el-carousel>

  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583386684746&di=77f52a0c8e63ff0248351a69862dd5a5&imgtype=0&src=http%3A%2F%2Fthumb21.jfcdns.com%2Fn331lx32a1t9166e741%2F16f5cef3cb481c06.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583386726110&di=405b922a4026ba059ce2846b6d9abd10&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F171220%2F4-1G220145F9.jpg',
        'http://pic1.win4000.com/wallpaper/3/570f62ebdd63d.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583256481750&di=69d5dc213c3624ad94e097fd64e8bb0c&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8c1001e93901213f0c02bdca57e736d12f2e95f7.jpg',
        'http://pic1.win4000.com/wallpaper/0/570ef927b03d9.jpg',
        'http://10wallpaper.com/wallpaper/1920x1080/1603/Kobe_Bryant_Lakers-2016_NBA_Basketball_HD_Wallpapers_1920x1080.jpg']
    }
  }
}
</script>

<style lang="less">
   .zmd{
      /* opacity:0.7; */
      height: 400px;
   }
   .bgi{
     filter: blur(2px);
     height: 100%;
   }
</style>
