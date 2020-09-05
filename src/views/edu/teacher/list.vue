<template>
  <div class="app-container">
      
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="姓名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="头衔">
          <el-option :value="1" label="教授"/>
          <el-option :value="2" label="副教授"/>
          <el-option :value="3" label="教员"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

     <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

     

      <el-table-column prop="name" label="姓名" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ 
              scope.row.level===1?'教授':(scope.row.level===2?'副教授':'教员')
          }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

     

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
//引入js文件
import teacher from '@/api/edu/teacher'

export default {
    data(){//定义变量、初始值
        return{
            list:null,//查询返回的列表
            page:1,
            limit:10,
            total:0,
            teacherQuery:{}
        }
    },
    created(){//页面渲染前执行
        this.getList()
    },
    methods:{//具体的方法
        getList(page=1){
            this.page=page
            teacher.getTeacherListPage(this.page,this.limit,this.teacherQuery)
            .then(response=>{//请求成功
                this.list=response.data.rows
                this.total=response.data.total
                console.log(this.list)
            })
            .catch(error=>{//请求失败
                console.log(error)
            })
        },
        resetData(){
            this.teacherQuery={}
            this.getList()
        },

        removeDataById(id){
            this.$confirm('此操作将永久删除该讲师, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                teacher.deleteTeacherId(id)
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
