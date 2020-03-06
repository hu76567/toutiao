<template>
 <el-card>
     <!-- 表示面包屑作为具名插槽给card的header部分 -->
     <bread-crumb slot="header">
     <!-- 表示素材给面包屑的插槽 -->
        <template slot="title">
            素材管理
        </template>
     </bread-crumb>
     <!-- v-model所绑定的值是当前所激活的页签 -->
     <el-tabs v-model="actName" @tab-click="cdTab">
         <!-- label表示标签名字 name表示页签选中的值,tab切换的时候,需要进行事件的监听 -->
         <el-tab-pane label="全部" name="all">
            <div class="img-list">
              <el-card class="img-card" v-for="item in list" :key=item.id>
                <img :src="item.url">
                <el-row class="doing" type="flex" align="middle" justify="space-around">
                    <i class="el-icon-star-off"></i>
                    <i class="el-icon-delete"></i>
                </el-row>
              </el-card>
            </div>
         </el-tab-pane>
         <el-tab-pane label="已收藏" name="collect">
            <div class="img-list">
              <el-card class="img-card" v-for="item in list" :key=item.id>
                <img :src="item.url">
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
      }
    }
  },
  methods: {
    pageChange (newPage) {
      this.page.currentPage = newPage // 给页码赋值
      this.getMaterial() // 获取数据
    },
    getMaterial () {
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
      })
    },
    // 切换页签的事件
    cdTab () {
      // 在切换页签的时候需要将页签切换到第一页
      this.page.currentPage = 1
      //   alert(this.actName)
      // actName===all 获取所有 actName===collect 已收藏的素材
      this.getMaterial()
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
               font-size: 20px;
               background-color: #f4f5f6;
           }
       }
  }
</style>
