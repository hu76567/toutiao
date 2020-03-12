<template>
 <el-card>
     <bread-crumb slot="header">
        <template slot="title">
            发布文章
        </template>
     </bread-crumb>

     <!-- 表单组件 v-model 双向绑定  :model绑定表单对象 -->
     <el-form ref="myForm" :model="publishForm" :rules="publishRules" style="margin-left:50px" label-width="100px">

         <el-form-item label="标题" prop="title">
            <el-input v-model="publishForm.title" placeholder="请输入标题" style="width:50%"></el-input>
         </el-form-item>

         <el-form-item label="内容" prop="content">
            <quill-editor v-model="publishForm.content" style="height:300px;width:750px"></quill-editor>
         </el-form-item>

         <el-form-item label="封面" prop="cover" style="margin-top:120px">
           <!-- 监听type变化 -->
             <el-radio-group v-model="publishForm.cover.type" @change="changeType">
                 <el-radio :label="1">单图</el-radio>
                 <el-radio :label="3">三图</el-radio>
                 <el-radio :label="0">无图</el-radio>
                 <el-radio :label="-1">自动</el-radio>
             </el-radio-group>
         </el-form-item>

         <!-- 放置封面组件 将images的值传给 cover-image -->
           <cover-image @selectTwoImg="receiveImg" :list="publishForm.cover.images">
          <!-- 此处是两层组件嵌套 -->
           </cover-image>

         <el-form-item label="频道" prop="channel_id" >
             <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
               <!-- 下拉选项 -->
               <!-- label=>显示值  value=>保存值 -->
               <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
             </el-select>
         </el-form-item>

         <el-form-item>
             <!-- true和false代表是不是草稿 绑定发布事件 -->
             <el-button @click="publish(false)" type="primary">发布</el-button>
             <el-button @click="publish(true)">存入草稿</el-button>
         </el-form-item>

     </el-form>
 </el-card>
</template>

<script>
import { getChannels } from '@/api/channels'
export default {
  data () {
    return {
      // 接收请求返回的频道
      channels: [],
      // 表单数据对象
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: 0, // -1自动  0无图   1一图   3三图
          images: [] // 字符串数据  对应type  个数
        },
        channel_id: null
      },
      publishRules: {
        // required 表示必填
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '标题应该在5到30个字符之间' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
  // 捕捉路由参数变化 用watch来监听
    //  路由在初始化之后,会把￥route也放在页面data中
    $route: function (to, form) {
      // to表示新的路由地址对象
      // form表示旧的路由地址对象
      // 根据to属性中的params中的articleId有或无 来决定改不改变数据
      if (to.params.articleId) {
        // 有id去根据id获取数据
        this.getArticleById(to.params.articleId)
      } else {
        // 不存在id则显示默认值
        this.publishForm = {
          title: '',
          content: '',
          cover: {
            type: 0, // -1自动  0无图   1一图   3三图
            images: [] // 字符串数据  对应type  个数
          },
          channel_id: null
        }
      }
    }
  },
  methods: {
    receiveImg (url, index) {
      //  接收到图片数据  更新images的视图
      // 仅仅拿到了一个url地址  但是不知道更新哪一条记录
      // 应该点击哪一张就更新哪一张=>需要带索引去选择,也就是要更换哪个格子的图片
      // splice(索引,删除的个数,要替换的内容)
      // 简单写法
      this.publishForm.cover.images.splice(index, 1, url)
    },
    // 监听type变化的事件
    changeType () {
      // 根绝type值对images进行控制
      if (this.publishForm.cover.type === 1) {
        this.publishForm.cover.images = [''] // 没有选择图片,为空
      } else if (this.publishForm.cover.type === 3) {
        this.publishForm.cover.images = ['', '', '']
      } else {
        this.publishForm.cover.images = [] // 无图或自动 为空
      }
    },
    getArticleById (id) {
      // 根据id 获取数据
      this.$axios({
        url: `/articles/${id}`
      }).then(res => {
        this.publishForm = res.data
      })
    },
    //  获取频道数据
    async getChannels () {
      const res = await getChannels()
      // 获取频道接口返回的数据
      this.channels = res.data.channels
    },
    publish (flag) {
      // flag为绑定事件传过来的参数,用于判断是否为草稿
      // 校验后发布
      // validate 两种调用  1回调 ，2promise
      //   this.$refs.myForm.validate(function (isOk) {
      //     if (isOk) {}
      //   })
      this.$refs.myForm.validate().then(() => {
        //  接收参数 解构赋值
        // 有id修改 无id发布
        // draft 为false是发布  true是存草稿
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
    const { articleId } = this.$route.params // articleId是 路由参数中定义的
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
