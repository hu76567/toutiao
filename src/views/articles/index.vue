<template>
 <el-card class="articles">
     <bread-crumb slot="header">
        <template slot="title">
            文章列表
        </template>
     </bread-crumb>
     <el-form style="margin-left:50px">
         <el-form-item label="文章状态:">
             <!-- 单选框组 -->
             <el-radio-group v-model="searchForm.status">
             <!-- 单选框选项 -->
             <el-radio :label="0">全部</el-radio>
             <el-radio :label="1">草稿</el-radio>
             <el-radio :label="2">待审核</el-radio>
             <el-radio :label="3">审核通过</el-radio>
             <el-radio :label="4">审核失败</el-radio>
             </el-radio-group>
         </el-form-item>
         <el-form-item label="频道类别:">
             <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
               <!-- label是显示值,value是绑定的值 -->
               <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id">

               </el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="日期范围:">
             <el-date-picker type="daterange" v-model="searchForm.dateRange">

             </el-date-picker>
         </el-form-item>
     </el-form>
     <!-- 文章主体结构 -->
     <el-row class="total" type="flex" align="middle">
       <span>共找到888条符合条件的内容</span>
     </el-row>
     <div class="article-item" v-for="item in 100" :key="item">
       <!-- 左侧 -->
       <div class="left">
          <img src="" alt="">
          <div class="info">
            <span>文章名称</span>
            <el-tag class="tag">状态</el-tag>
            <span class="date">日期:</span>
          </div>
       </div>
       <!-- 右侧 -->
       <div class="right">
         <span><i class="el-icon-edit"></i>修改</span>
         <span><i class="el-icon-delete"></i>删除</span>
       </div>
     </div>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
    //   定义表单数据对象
      searchForm: {
        // 0 草稿 1待审核 2审核通过 3审核失败 5全部
        status: 0,
        channel_id: null,
        dateRange: [] // 日期范围
      },
      channels: [] // 专门来接收频道的数据
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: 'channels'
      }).then(res => {
        // 获取频道接口返回的数据
        this.channels = res.data.channels
      })
    }
  },
  created () {
    //   获取频道数据
    this.getChannels()
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
        span{
          font-size: 12px;
          margin-right: 8px;
          cursor: pointer;  //光标显示一只小手
          user-select: none; //文本无法被选择
        }
     }
   }
 }

</style>
