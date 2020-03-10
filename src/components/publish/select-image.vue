<template>
<!-- 处理上传封面 -->
<el-tabs v-model="activeName">
    <!-- v-model 表示当前显示的 -->
    <!-- name 不能重复,表示标签页标识 -->
    <el-tab-pane label="素材库" name="material">
       <div class="select-image-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img @click="clickImg(item.url)" :src="item.url" alt="">
          </el-card>
        </div>
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="height:80px" align="middle">
           <el-pagination background layout="prev,pager,next"
           :total="page.total"
           :current-page="page.currentPage"
           :page-size="page.pageSize"
           @current-change="changePage">

           </el-pagination>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传素材" name="upload">
        <!-- 上传组件 -->
        <!-- action必须给值 -->
        <el-upload class="upload-img" action="" :http-request="uploadImg">
          <i class="el-icon-plus"></i>
        </el-upload>
    </el-tab-pane>
</el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    // 获取所有素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 查询全部
          page: this.page.currentPage,
          per_page: this.page.pageSize

        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 翻页事件监听
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 将url传递给上层组件
    // 在脚手架中自定义事件大小写通用
    clickImg (url) {
      this.$emit('selectOneImg', url) // 将url传出
    },
    // 调用上传接口
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: data
      }).then(res => {
        this.$message.success('上传成功')
        // 成功要重新拉取数据
        this.$emit('selectOneImg', res.data.url)
      }).catch(() => {
        this.$message.error('上传失败')
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card {
        width: 150px;
        height: 150px;
        margin: 20px 0;
        img {
            width: 100%;
            height: 100%;
        }
    }

}
.upload-img{
    display: flex;
    justify-content: center;
    i{
        font-size: 50px;
        padding: 50px;
        border: 2px dashed springgreen;
        border-radius: 4px;
        color: skyblue;
    }
}
</style>
