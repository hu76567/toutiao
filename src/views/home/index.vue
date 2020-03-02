<template>
 <el-container>
  <el-aside width="200px">
    <!-- 侧边栏 -->
    <h1>Aside</h1>
    </el-aside>
  <el-container>
    <!-- 头部 -->
    <el-header>
     <h1>Header</h1>
     </el-header>
     <!-- 主体 -->
    <el-main>
     <h1>Main</h1>
     <!-- 此处二级容器 -->
     <router-view></router-view>
     </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {

}
</script>

<style>
</style>
