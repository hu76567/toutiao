<template>
  <el-row align="middle" type="flex" class="layout-ahead">
     <el-col class="left" :span="12">
         <i class="el-icon-s-fold"></i>
         <span>
             辽宁啥也不是股份有限公司
         </span>
     </el-col>
     <el-col class="right" :span="12">
         <el-row type="flex" justify="end" align="middle">
             <el-input class="input" placeholder="请输入搜索的文章内容"></el-input>
           <img src="../../assets/img/user.jpg" alt="">
           <!-- 下拉菜单 -->
           <el-dropdown trigger="click">
               <span>banana</span>
               <!-- 下拉菜单 -->
               <el-dropdown-menu slot="dropdown">
                   <!-- 下拉选项 -->
                     <el-dropdown-item>个人信息</el-dropdown-item>
                     <el-dropdown-item>Github</el-dropdown-item>
                     <el-dropdown-item>退出</el-dropdown-item>
               </el-dropdown-menu>
           </el-dropdown>
         </el-row>
     </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang='less' scpoed>
 .layout-ahead {
   height: 60px;
   .left {
       i{
           font-size: 20px;
       }
       span{
           font-size: 20px;
       }
   }
   .right {
       margin-right: 15px;
         input {
             margin-left: 70px;
              width: 350px
          }
       img{
           width: 40px;
           height: 40px;
           border-radius: 50%;
           margin-right: 10px;
       }
   }
 }
</style>
