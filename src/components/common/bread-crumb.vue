<template>
<!-- 面包屑导航 -->
  <el-breadcrumb separator=">">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <!-- 第二个选项采用插槽动态更换 -->
      <el-breadcrumb-item>
          <!-- 设置好插槽的坑谁用谁填坑 -->
          <slot name="title"></slot>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
