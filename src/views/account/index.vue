<template>
  <el-card>
    <bread-crumb slot="header">
     <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">

      <el-form-item prop="name" label="用户名">
        <el-input v-model="formData.name" style="width:30%"></el-input>
      </el-form-item>

      <el-form-item  label="简介">
        <el-input v-model="formData.intro" style="width:30%"></el-input>
      </el-form-item>

      <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email" style="width:30%"></el-input>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="formData.mobile" disabled style="width:30%"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type='primary' @click="saveUser">保存</el-button>
      </el-form-item>
    </el-form>

    <el-upload action="" :http-request="uploadImg" :show-file-list="false">
      <img class="head-upload" :src="formData.photo ? formData.photo:defaultImg" alt="">
    </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 1, max: 7, message: '用户名长度在1-7位', trigger: 'blur' }
        ],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ]
      },
      defaultImg: require('../../assets/img/user.png')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    saveUser () {
      this.$refs.myForm.validate().then(() => {
        this.$axios({
          url: '/user/profile',
          method: 'patch', // 类型
          data: this.formData
        }).then(() => {
          this.$message.success('保存用户信息成功')
        }).catch(() => {
          this.$message.error('保存用户信息失败')
        })
      })
    },
    uploadImg (params) {
      const data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data: data
      }).then(res => {
        this.formData.photo = res.data.photo
        // 处理非关系型组件之间的传值
        // eventBus/vuex
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
 .head-upload{
   position: absolute;
   right: 360px;
   top: 160px;
   width: 200px;
   height: 200px;
   border-radius: 50% ;
 }
</style>
