<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="教授"/>
          <el-option :value="2" label="副教授"/>
          <el-option :value="3" label="教员"/>
        </el-select>
      </el-form-item>
      <el-form-item label="资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->     
      <el-form-item label="教师头像">

      <!-- 头衔缩略图 -->
      <pan-thumb :image="teacher.avatar"/>
      <!-- 文件上传按钮 -->
      <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
      </el-button>

      <image-cropper
                   v-show="imagecropperShow"
                   :width="300"
                   :height="300"
                   :key="imagecropperKey"
                   :url="BASE_API+'/eduoss/fileoss'"
                   field="file"
                   @close="close"
                   @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
    components: { ImageCropper, PanThumb },
    data(){
        return{
            teacher:{
                name: '',
                sort: 0,
                level: 1,
                career: '',
                intro: '',
                avatar: ''
            },

            imagecropperShow:false,
            imagecropperKey:0,
            BASE_API:process.env.BASE_API,
            saveBtnDisabled: false // 保存按钮是否禁用,
        }
    },

    watch: {
        $route(to, from) {
        console.log('watch $route')
        this.init()
        }
    },

    created(){
         console.log('created')
         this.init()
    },
    methods:{
        close(){
            this.imagecropperShow = false
            this.imagecropperKey=this.imagecropperKey+1

        },
        cropSuccess(data){
           this.imagecropperShow = false
           this.teacher.avatar=data.url
           this.imagecropperKey=this.imagecropperKey+1
        },

        init() {
            if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id
                this.getInfo(id)
            } else {
            // 使用对象拓展运算符，拷贝对象，而不是引用，
                // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
                this.teacher = { }
            }
        },

        getInfo(id){
            teacherApi.getTeacherInfo(id)
            .then(response=>{
                this.teacher=response.data.teacher
            })
        },

        saveOrUpdate() {
            this.saveBtnDisabled = true
            if (!this.teacher.id) {
                this.saveData()
            } else {
                this.updateTeacher()
            }
        },

        //修改
        updateTeacher(){
            teacherApi.updateTeacherInfo(this.teacher)
            .then(response=>{
                this.$message({
                           type:'success',
                           message:'修改成功'
                       });
                //路由跳转
                this.$router.push({ path: '/teacher/table' })
            })
        },

        // 保存
        saveData() {
            teacherApi.save(this.teacher)
            .then(response=>{
                this.$message({
                           type:'success',
                           message:'添加成功'
                       });
                //路由跳转
                this.$router.push({ path: '/teacher/table' })
            })
            
        }
    }
}
</script>