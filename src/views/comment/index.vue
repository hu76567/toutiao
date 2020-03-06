<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
        <template slot="title">评论管理</template>
      </bread-crumb>
      <el-table :data="list">
        <!-- 表格组件 -->
        <!-- prop表示现实的字段 -->
        <!-- el-table-clumn  列 -->
        <el-table-column prop="title" width="600" label="标题"></el-table-column>
        <!-- el-table不显示布尔值利用el-table提供的列的格式化工具 江布尔值转化成打开或关闭 -->
        <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column prop="" label="操作">
          <!-- 插槽  作用域插槽  子组件数据通过插槽传输  通过slot-scope接收-->
          <!-- 插槽接收  row column $index store -->
          <template slot-scope="res">
              <el-button size="small" type="text">修改</el-button>
              <!-- 根据评论状态决定关闭还是开启 -->
              <el-button @click="openClose(res.row)" size="small" type="text">{{res.row.comment_status?'关闭':'开启'}}评论</el-button>
         </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row style="height:50px" type="flex" align="middle" justify="center">
        <el-pagination background layout="prev, pager, next"
         :current-page="page.currentPage"
         :total="page.total"
         :page-size="page.pageSize"
         @current-change="pageChange"></el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页相关
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10 // 每页显示几条数据,不写默认是10
      },
      list: [

      ],
      loading: false // 控制遮罩层的显示和隐藏
    }
  },
  methods: {
    // newpage 是当前点击的新页码
    pageChange (newPage) {
      // 获取当前页码,赋值给固定值
      this.page.currentPage = newPage
      // 重新拉取评论数据
      this.getComment()
    },
    getComment () {
      // 数据没回来前打开加载状态
      this.loading = true
      this.$axios({
        url: '/articles',
        // params 传get参数,也就是query参数
        // data   传body参数,也就是请求体参数,
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
        // 有返回值关闭加载状态
        this.loading = false
      })
    },
    // 定义格式化参数
    // row=>当前的一行数据
    // column=>当前的列信息
    // cellValue=>当前单元格的值
    // index=>当前索引
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    openClose (row) {
    // 实现评论状态切换
    // 先询问
      const mess = row.comment_status ? '关闭' : '开启'
      this.$confirm(`您是否确定${mess}评论`, '温馨提示').then(() => {
        // 调用更改接口
        this.$axios({
          url: '/comments/status',
          method: 'put',
          // query参数
          params: {
            article_id: row.id.toString() // 将处理后的数据转化成字符串
            // 后端会自动转成大数字
          },
          // body参数
          data: {
            allow_comment: !row.comment_status
          }
        }).then(() => {
          // 成功  提示消息,拉取数据
          this.$message.success(`当前评论功能已${mess}`)
          this.getComment()
        }).catch(() => {
          // 失败时
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
