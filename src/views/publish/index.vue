<template>
 <el-card>
     <bread-crumb slot="header">
        <template slot="title">
            发布文章
        </template>
     </bread-crumb>

     <!-- 表单组件 双向绑定 -->
     <el-form ref="myForm" :model="publishForm" :rules="publishRules" style="margin-left:50px" label-width="100px">
         <el-form-item label="标题" prop="title">
            <el-input v-model="publishForm.title" placeholder="请输入标题" style="width:50%"></el-input>
         </el-form-item>
         <el-form-item label="内容" prop="content">
            <el-input v-model="publishForm.content" placeholder="请输入内容" type="textarea" :rows='4'></el-input>
         </el-form-item>
         <el-form-item label="封面" prop="cover">
             <el-radio-group v-model="publishForm.cover.type">
                 <el-radio :label="1">单图</el-radio>
                 <el-radio :label="3">三图</el-radio>
                 <el-radio :label="0">无图</el-radio>
                 <el-radio :label="-1">自动</el-radio>
             </el-radio-group>
         </el-form-item>
         <el-form-item label="频道" prop="channel_id" >
             <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
               <!-- 下拉选项 -->
               <!-- label=>显示值  value=>保存值 -->
               <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
             </el-select>
         </el-form-item>
         <el-form-item>
             <!-- true和false代表是不是草稿 -->
             <el-button @click="publish(false)" type="primary">发布</el-button>
             <el-button @click="publish(true)">存入草稿</el-button>
         </el-form-item>
     </el-form>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      publishForm: {
        //   表单数据对象
        title: '',
        content: '',
        cover: {
          type: -1, // -1自动 0 无图  1 一图  3 三图
          images: [] // 字符串数据  对应type  个数
        },
        channel_id: null
      },
      publishRules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '标题应该在5到30个字符之间' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getArticleById (id) {
      // 根据id 获取数据
      this.$axios({
        url: `/articles/${id}`
      }).then(res => {
        this.publishForm = res.data
      })
    },
    //  获取文章类别
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    publish (flag) {
    // 校验后发布
    // validate 两种调用  回调,promise
    //   this.$refs.myForm.validate(function (isOk) {
    //     if (isOk) {}
    //   })
      this.$refs.myForm.validate().then(() => {
        const { articleId } = this.$route.params
        this.$axios({
          url: articleId ? `/articles/${articleId}` : 'articles',
          method: articleId ? 'put' : 'post',
          params: { draft: flag },
          data: this.publishForm
        }).then(() => {
          this.$message.success('操作成功')
          //   跳转到文章列表
          this.$router.push('/home/articles')
        }).catch(() => {
          this.$message.error('操作失败')
        })

        // **************重复代码简化*********
        // if (articleId) {
        // //   修改
        //   this.$axios({
        //     url: `/articles/${articleId}`,
        //     method: 'put',
        //     params: { draft: flag },
        //     data: this.publishForm
        //   }).then(() => {
        //     this.$message.success('修改成功')
        //     //   跳转到文章列表
        //     this.$router.push('/home/articles')
        //   }).catch(() => {
        //     this.$message.error('修改失败')
        //   })
        // } else {
        //   // 调用发布接口
        //   this.$axios({
        //     url: 'articles',
        //     method: 'post',
        //     params: {
        //       draft: flag // query参数
        //     },
        //     data: this.publishForm // 请求体参数
        //   }).then(() => {
        //     this.$message.success('发布成功')
        //     //   跳转到文章列表
        //     this.$router.push('/home/articles')
        //   }).catch(() => {
        //     this.$message.error('发布失败')
        //   })
        // }
      })
    }
  },
  // 判断是否存在参数id   存在就根据id获取数据
  created () {
    this.getChannels()
    // 解构赋值 获取参数id
    const { articleId } = this.$router.params
    // if (articleId) {
    //   this.getArticleById(articleId)
    // }
    // 为true 执行后面逻辑
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>

</style>
