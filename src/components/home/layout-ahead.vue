<template>
  <el-row align="middle" type="flex" class="layout-ahead">
     <el-col class="left" :span="12">
         <i class="el-icon-s-fold"></i>
         <span>
             啥也不是
         </span>
     </el-col>
     <el-col class="right" :span="12">
         <el-row type="flex" justify="end" align="middle">
           <img :src="userInfo.photo" alt="">
           <!-- 下拉菜单,注册点击事件 -->
           <el-dropdown @command="clickMenu" trigger="click">
               <span>{{userInfo.name}}</span>
               <!-- 下拉菜单 -->
               <el-dropdown-menu slot="dropdown">
                   <!-- 下拉选项 -->
                     <el-dropdown-item command="info">个人信息</el-dropdown-item>
                     <el-dropdown-item command="git">Github</el-dropdown-item>
                     <el-dropdown-item command="quit">退出</el-dropdown-item>
               </el-dropdown-menu>
           </el-dropdown>
         </el-row>
     </el-col>
  </el-row>
</template>

<script>
// 引入公共事件池
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      userInfo: {} // 用来接收个人信息
    }
  },
  methods: {
    clickMenu (command) {
    // 接收当前点击的是哪个按钮
      // alert(command)
      if (command === 'info') {
        // 点击个人信息
      } else if (command === 'git') {
        // 跳转到git
        window.location.href = 'https://github.com/iq7ii/toutiao'
      } else {
        // 退出系统,删除token,跳转回登录页
        localStorage.removeItem('user-token') // 清除token
        this.$router.push('/login')
      }
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data
      })
    }
  },
  // 实例化之后,钩子函数,获取个人信息
  created () {
    this.$axios({
      url: '/user/profile'
    }).then(res => {
      this.userInfo = res.data
    })
    // this.getUserInfo()  //正常加载
    eventBus.$on('updateUser', () => {
      // 有人触发事件就回进入到回调函数
      // 重新拉取下
      this.getUserInfo()
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
