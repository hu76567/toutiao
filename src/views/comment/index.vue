<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">评论管理</template>
      </bread-crumb>
      <el-table>
        <!-- 表格组件 -->
        <!-- prop表示现实的字段 -->
        <!-- el-table-clumn  列 -->
        <el-table-column width="600" label="标题"></el-table-column>
        <el-table-column label="评论状态"></el-table-column>
        <el-table-column label="总评论数"></el-table-column>
        <el-table-column label="粉丝评论数"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [{}, {}, {}]
    }
  }

}
</script>

<style>

</style>
