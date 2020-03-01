<template>
  <div class="login">
     <!-- 表单 -->
     <el-card class="login_card">
         <!-- logo内容 -->
         <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
         </div>
         <!-- 表单 -->
         <el-form style="margin-top:20px">
             <el-form-item>
                 <!-- 表单域 -->
                  <el-input placeholder="请输入手机号"></el-input>
             </el-form-item>
            <el-form-item>
                   <!-- 验证码 -->
                <el-input style="width:65%" placeholder="请输入验证码"></el-input>
                <el-button style="float:right;width:30%" plain>发送验证码</el-button>
             </el-form-item>
             <el-form-item>
            <el-checkbox style="margin-left:20px">我已阅读并同意用户协议和隐私条款</el-checkbox>
             </el-form-item>
             <el-form-item>
                 <el-button type="primary" style="width:100%">登录</el-button>
             </el-form-item>
         </el-form>
     </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
 .login{
    background-image: url("../../assets/img/login_bg.jpg");
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center
 }
 .login_card{
     width: 460px;
     height: 340px;
     .title{
           text-align: center;
         img{
             height: 30px;
          }
     }
 }
</style>
