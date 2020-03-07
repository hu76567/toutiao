<template>
 <el-card v-loading="loading">
     <!-- 表示面包屑作为具名插槽给card的header部分 -->
     <bread-crumb slot="header">
     <!-- 表示素材给面包屑的插槽 -->
        <template slot="title">
            素材管理
        </template>
     </bread-crumb>
     <!-- 上传组件  show-file-list:false是否显示上传的文件列表-->
     <el-row type="flex" justify="end" style="margin-right:100px">
        <el-upload :show-file-list="false" :http-request="uploadImg" action="">
            <!-- 上传组件必须要有action属性 -->
           <el-button size="small" type="primary">上传素材</el-button>
        </el-upload>
     </el-row>

     <!-- v-model所绑定的值是当前所激活的页签 -->
     <el-tabs v-model="actName" @tab-click="cdTab">
         <!-- label表示标签名字 name表示页签选中的值,tab切换的时候,需要进行事件的监听 -->
         <el-tab-pane label="全部" name="all">
            <div class="img-list">
              <el-card class="img-card" v-for="(item,index) in list" :key=item.id>
                <img :src="item.url" @click="selectImg(index)">
                <el-row class="doing" type="flex" align="middle" justify="space-around">
                  <!-- 注册点击事件 根据is_collect状态-->
                  <i @click="collectOrCancel(item)" :style="{color:item.is_collected ? 'skyblue' : ''}" class="el-icon-star-on"></i>
                  <i @click="delMaterial(item)" class="el-icon-delete"></i>
                </el-row>
              </el-card>
            </div>
         </el-tab-pane>
         <el-tab-pane label="已收藏" name="collect">
            <div class="img-list">
              <el-card class="img-card" v-for="(item, index) in list" :key=item.id>
                <img :src="item.url" @click="selectImg(index)">
              </el-card>
            </div>
         </el-tab-pane>
     </el-tabs>
     <!-- 分页组件 -->
     <el-row type="flex" justify="center" style="height:80px" align="middle">
        <el-pagination background
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="prev,pager,next"

        @current-change="pageChange">
        <!-- 监听页码切换 -->

        </el-pagination>
     </el-row>
     <!-- 预览功能 通过visible 来控制显示或隐藏 -->
     <el-dialog @opened="openEnd" :visible="dialogVisible" @close="dialogVisible=false">
       <el-carousel ref="myCarousel" indicator-position="none" height="400px">
          <el-carousel-item v-for="item in list" :key="item.id">
            <img style="width:100%;height:100%" :src="item.url" alt="">
          </el-carousel-item>
       </el-carousel>
     </el-dialog>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      actName: 'all',
      list: [], // 接收素材
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 8
      },
      // 控制弹层显示隐藏
      dialogVisible: false,
      // 点击的索引
      clickIndex: -1
    }
  },
  methods: {
    openEnd () {
      // 这个时候已经打开结束 ref已经有值 可以通过ref进行设置了
      this.$refs.myCarousel.setActiveItem(this.clickIndex)
    },
    selectImg (index) {
      //  点击图片是调用
      this.clickIndex = index
      this.dialogVisible = true
    },
    // 收藏和取消收藏
    collectOrCancel (row) {
      this.$axios({
        method: 'put',
        url: `/user/images/${row.id}`,
        data: {
          // 放置body参数
          collect: !row.is_collected
        }
      }).then(() => {
        // 重新加载
        var mes = row.is_collected ? '已取消' : '已'
        this.$message.success(`${mes}收藏`)
        this.getMaterial()
      }).catch(() => {
        this.$message.error('收藏失败')
      })
    },
    // 删除素材
    delMaterial (row) {
      this.$confirm('确定要删除么?', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${row.id}`,
          data: {
          // 放置body参数
            collect: !row.is_collected
          }
        }).then(() => {
        // 重新加载
          this.$message.success('已删除')
          this.getMaterial()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 换页
    pageChange (newPage) {
      this.page.currentPage = newPage // 给页码赋值
      this.getMaterial() // 获取数据
    },
    // 加载素材
    getMaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
        // 根据actName获取数据
          collect: this.actName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        // console.log(res.data.results)
        this.list = res.data.results // 将返回的数据复制给data
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    // 切换页签的事件
    cdTab () {
      // 在切换页签的时候需要将页签切换到第一页
      this.page.currentPage = 1
      //   alert(this.actName)
      // actName===all 获取所有 actName===collect 已收藏的素材
      this.getMaterial()
    },
    // params.file就是要上传的文件
    // 接口类型是formdata
    // 上传素材
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      console.log(data)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: data
      }).then(() => {
        this.$message.success('上传成功')
        // 成功要重新拉取数据
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传失败')
      })
    }
  },
  created () {
    //   在实例化之后获取数据
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
  .img-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
       .img-card{
           width: 200px;
           height: 200px;
           margin:20px 40px;
           position: relative;
           img{
               width: 100%;
               height: 100%;
           }
           .doing{
               position: absolute;
               left: 0;
               bottom: 0;
               width: 100%;
               height: 30px;
               font-size: 25px;
               background-color: #f4f5f6;
           }
        }
    }
</style>
