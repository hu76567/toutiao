<template>
  <el-card>
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
         <el-button size="small" type="text">修改</el-button>
         <el-button size="small" type="text">关闭评论</el-button>
        </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [

      ]
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        // params 传get参数,也就是query参数
        // data   传body参数,也就是请求体参数,
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
      })
    },
    // 定义格式化参数
    // row=>当前的一行数据
    // column=>当前的列信息
    // cellValue=>当前单元格的值
    // index=>当前索引
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
