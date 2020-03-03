<template>
 <el-container>
    <el-aside style="width:240px">
      <!-- 左侧导航组件 -->
      <layout-aside></layout-aside>
    </el-aside>
  <el-container>
    <!-- 头部 -->
      <el-header>
          <layout-ahead></layout-ahead>
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
// 引入左侧导航组件
import layoutAside from '@/components/home/layout-aside'
import layoutAhead from '@/components/home/layout-ahead'
export default {
  components: {
    'layout-aside': layoutAside,
    'layout-ahead': layoutAhead
  }
}
</script>

<style>
</style>
