<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login_card">
      <!-- logo内容 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 绑定model属性 ,绑定表单验证规则-->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
        <!-- 设置prop属性 prop表示要校验的字段名 -->
        <el-form-item prop="mobile">
          <!-- 表单域 v-model实现双向绑定-->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 验证码 -->
          <el-input v-model="loginForm.code" style="width:65%" placeholder="请输入验证码"></el-input>
          <el-button style="float:right;width:30%" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked" style="color:#ccc">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 定义表单数据对象
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      // 定义表单验证规则
      loginRules: {
        // required 为true 则表示为必填 不能校验true/false
        mobile: [{ required: true, message: '手机号不能为空' }, {
          // 用正则来校验格式是否正确
          pattern: /^1[3-9]\d{9}$/, // 正则表达式
          message: '手机号格式错误'
        }],
        code: [{ required: true, message: '验证码不能为空' }, {
          pattern: /^\d{6}$/, // 6个数字
          message: '验证码格式错误'
        }],
        // 自定义校验  规则,值,要校验的函数
        checked: [{
          validator: function (rule, value, callback) {
            //  校验成功执行callback,表示执行通过失败,也执行,但是要抛出一个错误 new Error
            value ? callback() : callback(new Error('请勾选同意条款'))
          }
        }]
      }
    }
  },
  methods: {
    login () {
      // validate 两个参数 isOK,fields(没有校验通过的字段)
      // this.$refs.loginForm.validate(function (isOK) {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('未通过')
      //   }
      // })
      this.$refs.loginForm.validate().then(() => {
        // alert('123')
        // 校验过后调用接口
        this.$axios({
          url: '/authorizations', // 请求地址
          // params: {}, // url参数
          data: this.loginForm, // 请求体参数
          method: 'post' // 请求类型,默认是get
        }).then(res => {
          // console.log(res.data.data.token)
          // 将token存在本地
          window.localStorage.setItem('user-token', res.data.token)
          // 登陆成功，跳转主页
          this.$router.push('/home')
        }).catch(() => {
          // this.$message({ message: '用户名或验证码错误', type: 'error' })
          this.$message.error('用户名或验证码错误')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // 毛玻璃效果
  &:before {
    // filter: blur(1px);
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url("../../assets/img/login_bg.jpg");
   background-size: cover;
  }
  .login_card {
    background: rgba(0,0,0,.2);
    z-index: 2;
    border-color: transparent;
    width: 460px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 30px;
      }
    }
  }
}
</style>
