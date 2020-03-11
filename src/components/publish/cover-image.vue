<template>
  <div class="cover-image">
      <!-- 根据images中的长度,生成对应长度封面块 -->
        <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-image-item">
              <!-- 封面图片传递给子组件 -->
        <!-- item没有值,就显示默认图片 -->
        <!-- 图片不是固定应该先转化成变量 -->
            <img :src="item ? item : defaultImg" alt="">
        </div>

        <!-- 弹层组件 visible控制是否显示对话框 -->
        <el-dialog @close="dialogVisible=false" :visible="dialogVisible">
            <!-- 封装一个选择图片的组件 -->
            <!-- 监听自定义事件 -->
            <select-image @selectOneImg="receiveImg"></select-image>
        </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1 // 电机的图片的索引
    }
  },
  methods: {
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index // 记录点击的是哪个块块
    },
    receiveImg (url) {
    //  封面组件接收到图片选择组件传过来的图片地址   不能修改,需要再次传递
      this.$emit('selectTwoImg', url, this.selectIndex) // 再次向上传值,还要有索引地址
      //   关闭弹层
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
  .cover-image{
      display: flex;
      margin: 20px auto 20px 100px;
      .cover-image-item{
        margin-left:15px ;
        border: 1px solid #cccccc;
        width: 220px;
        height: 200px;
        padding: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
  }
</style>
