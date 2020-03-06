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
     <el-tabs v-model="actName">
         <!-- label表示标签名字 name表示页签选中的值 -->
         <el-tab-pane label="全部" name="all">

         </el-tab-pane>
         <el-tab-pane label="已收藏" name="collect">

         </el-tab-pane>
     </el-tabs>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      actName: 'all'
    }
  }
}
</script>

<style>

</style>
