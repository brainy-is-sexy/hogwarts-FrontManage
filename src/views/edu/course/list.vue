<template>
  <div class="app-container">
      

     <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称" width="180" />

      <el-table-column label="课程状态" width="80">
        <template slot-scope="scope">
          {{ 
              scope.row.status==='Normal'?'已发布':'未发布'
          }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数"  width="60" />
      <el-table-column prop="viewCount" label="浏览数量" width="60" />
      <el-table-column prop="buyCount" label="购买数量" width="60" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
      <el-table-column prop="status" label="状态" width="100" />

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除课程</el-button>
        </template>
      </el-table-column>
    </el-table>
  
  </div>
</template>
<script>
//引入js文件
import course from '@/api/edu/course'

export default {
    data(){//定义变量、初始值
        return{
            list:null,//查询返回的列表
            page:1,
            limit:10,
            total:0,
            courseQuery:{}
        }
    },
    created(){//页面渲染前执行
        this.getList()
    },
    methods:{//具体的方法
        getList(){
            course.getListCourse()
            .then(response=>{//请求成功
                this.list=response.data.list
            })
            .catch(error=>{//请求失败
                console.log(error)
            })
        },
        resetData(){
            this.courseQuery={}
            this.getList()
        },
        removeDataById(id){
          this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                course.deleteCourse(id)
                   .then(response=>{
                       this.$message({
                           type:'success',
                           message:'删除成功'
                       });
                       this.getList()
                   })
            })
        }
    }
}
</script>
