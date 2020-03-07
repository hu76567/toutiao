<template>
 <el-card>
     <bread-crumb slot="header">
        <template slot="title">
            文章列表
        </template>
     </bread-crumb>
     <el-form style="margin-left:50px">
         <el-form-item label="文章状态:">
             <!-- 单选框组 -->
             <el-radio-group v-model="value">
             <!-- 单选框选项 -->
             <el-radio>全部</el-radio>
             <el-radio>草稿</el-radio>
             <el-radio>待审核</el-radio>
             <el-radio>审核通过</el-radio>
             <el-radio>审核失败</el-radio>
             </el-radio-group>
         </el-form-item>
         <el-form-item label="频道类别:">
             <el-select placeholder="请选择频道">

             </el-select>
         </el-form-item>
         <el-form-item label="日期范围:">
             <el-date-picker type="daterange">

             </el-date-picker>
         </el-form-item>
     </el-form>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style>

</style>
