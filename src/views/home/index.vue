<template>
 <el-container>
   <!-- 根据是否折叠来控制侧边栏宽度 -->
    <el-aside :style="{width: collapse? '64px':'235px'}" style="transition:all 1s;background:#2e2f32">
      <!-- 左侧导航组件 -->
      <!-- 传值给子组件 layout-aside 子组件可以接受 -->
      <layout-aside :collapse="collapse"></layout-aside>
    </el-aside>
  <el-container>
    <!-- 头部 -->
      <el-header>
          <layout-ahead></layout-ahead>
      </el-header>
     <!-- 主体 -->
      <el-main style="padding:0">
         <!-- 此处二级容器 -->
         <router-view></router-view>
      </el-main>
  </el-container>
</el-container>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      collapse: false // 默认是展开状态
    }
  },
  created () {
    // 监听点击图标事件展开或者折叠
    eventBus.$on('changeCollapse', () => {
      // 表示折叠状态变了
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>
</style>
