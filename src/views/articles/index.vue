<template>
 <el-card class="articles" v-loading="loading">
     <bread-crumb slot="header">
        <template slot="title">
            文章列表
        </template>
     </bread-crumb>
     <el-form style="margin-left:50px">
         <el-form-item label="文章状态:">
             <!-- 单选框组  @change筛选搜索的第一种监听每个值的改变-->
             <!-- <el-radio-group v-model="searchForm.status"  @change="changeCondition"> -->
            <el-radio-group v-model="searchForm.status">
             <!-- 单选框选项 -->
             <el-radio :label="5">全部</el-radio>
             <el-radio :label="0">草稿</el-radio>
             <el-radio :label="1">待审核</el-radio>
             <el-radio :label="2">已审核</el-radio>
             <el-radio :label="3">审核失败</el-radio>
             </el-radio-group>
         </el-form-item>
         <el-form-item label="频道类别:">
             <!-- <el-select placeholder="请选择频道" v-model="searchForm.channel_id"  @change="changeCondition"> -->
               <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
               <!-- label是显示值,value是绑定的值 -->
               <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id">

               </el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="日期范围:">
             <!-- <el-date-picker type="daterange" value-format="yyyy-MM-dd" @change="changeCondition" v-model="searchForm.dateRange"> -->
                <el-date-picker type="daterange" value-format="yyyy-MM-dd" v-model="searchForm.dateRange">

             </el-date-picker>
         </el-form-item>
     </el-form>
     <!-- 文章主体结构 -->
     <el-row class="total" type="flex" align="middle">
       <span>共找到条999符合条件的内容</span>
     </el-row>
     <!-- 循环返回数据 渲染到页面 -->
     <div class="article-item" v-for="item in list" :key="item.id.toString()">
       <!-- 左侧 -->
       <div class="left">
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag :type=" item.status | filterType" class='tag'>{{  item.status  | filterStatus}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
       </div>
       <!-- 右侧  -->
       <div class="right">
         <!-- 第一种事件绑方法 -->
         <!-- <span @click="toPublish"><i class="el-icon-edit"></i>修改</span> -->
         <!-- 第二种直接跳转  需要向发布页传值 -->
         <span @click="$router.push(`/home/publish/${item.id.toString()}`)"><i class="el-icon-edit"></i>修改</span>
         <span @click="delMaterial(item.id.toString())"><i class="el-icon-delete"></i>删除</span>
       </div>
     </div>
     <!-- 分页组件 监听翻页事件 -->
     <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :total="page.total"
          @current-change="changePage"
          background
          layout="prev,pager,next">
          </el-pagination>
     </el-row>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        // 分页
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      //   定义表单数据对象
      searchForm: {
        // 0 草稿 1待审核 2审核通过 3审核失败 5全部
        status: 5,
        channel_id: null,
        dateRange: [] // 日期范围
      },
      channels: [], // 专门来接收频道的数据
      list: [],
      defaultImg: require('../../assets/img/def.jpg')
    }
  },
  methods: {
    // 调到发布页面
    toPublish () {
      this.$router.push('/home/publish')
    },
    // 删除
    delMaterial (id) {
      // alert(id)
      this.$confirm('确定删除此条数据么?', '提示').then(() => {
      //  进入then表示点击了确定 ,调用接口
        this.$axios({
          url: `/articles/${id}`,
          method: 'delete'
        }).then(() => {
          // 需要带着条件去加载
          this.changeCondition()
        }).catch(() => {
          this.$messsage.error('删除失败')
        })
      })
    },
    // 翻页事件
    changePage (newPage) {
      this.page.currentPage = newPage
      // const params = {
      //   // 传5为选择全部
      //   page: this.page.currentPage,
      //   per_page: this.page.pageSize,
      //   status: this.searchForm.status === 5 ? null : this.searchForm.status,
      //   channel_id: this.searchForm.channel_id,
      //   begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
      //   end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      // }
      // this.getArticles(params)

      // 代码重复,就可以直接直接调用
      this.changeCondition()
    },
    // 条件查询   监听值改变
    changeCondition () {
      // 规定获取条件
      const params = {
        // 传5为选择全部
        page: this.page.currentPage, //
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      // 调用接口 传输条件
      this.getArticles(params)
      // 用封装好的函数来实现
      // 一样的功能
      // this.$axios({
      //   url: '/articles',
      //   params: params
      // }).then(res => {
      //   this.list = res.data.results
      // })
    },
    getChannels () {
      this.$axios({
        url: 'channels'
      }).then(res => {
        // 获取频道接口返回的数据
        this.channels = res.data.channels
      })
    },
    // 获取文章列表
    getArticles (params) {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: params
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    // 获取文章数据
    this.getArticles()
    //   获取频道数据
    this.getChannels()
  },
  filters: {
    // 过滤器
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已审核'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  watch: {
    // 条件搜索第二种方法 深度检测
    searchForm: {
      deep: true, // 深度检测 ,深度检测serahForm中的数据变化
      handler () { // 数据发生任何变化都会触发更新
        //  统一调用改变条件方法
        // 重置页码
        this.page.currentPage = 1
        this.changeCondition()
      }
    }
  }
}
</script>

<style lang="less" scoped>
 .articles{
   .total{
     height: 60px;
     border-bottom: 1px dashed #cccccc;
   }
   .article-item{
     display: flex;
     justify-content: space-between;  //两头对齐
     padding: 20px 0;
     border-bottom: 1px solid #cccccc;
     .left{
       display: flex;
       img{
         width: 180px;
         height: 130px;
         border-radius: 4px;
       }
       .info{
         display: flex;
         flex-direction: column;
         height: 120px;
         justify-content: space-around;
         margin-left: 15px;
         .date{
           color: #999;
           font-size: 12px;
         }
         .tag{
           width: 60px;
           text-align: center;
         }
       }
     }
     .right{
       line-height: 130px;
        span{
          font-size: 15px;
          margin-right: 12px;
          cursor: pointer;  //光标显示一只小手
          user-select: none; //文本无法被选择
        }
     }
   }
 }

</style>
