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
           <img :src="userInfo.photo" alt="">
           <!-- 下拉菜单 -->
           <el-dropdown trigger="click">
               <span>{{userInfo.name}}</span>
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
  data () {
    return {
      userInfo: {} // 用来接收个人信息
    }
  },
  // 实例化之后,钩子函数,获取个人信息
  created () {
    //   从本地缓存中获取token
    const token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      headers: {
        // 放置请求头参数 值为token 格式为Bearer 中间有空格
        Authorization: `Bearer ${token}`
      },
      method: 'get'
    }).then(res => {
      this.userInfo = res.data.data
    })
  }
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
       img{
           width: 40px;
           height: 40px;
           border-radius: 50%;
           margin-right: 10px;
       }
   }
 }
</style>
