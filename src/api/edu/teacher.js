import request from '@/utils/request'

export default{
    //1讲师列表
    //当前页、每页记录数、查询条件
    getTeacherListPage(current,limit,teacherQuery){
        return request({
            url:`/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            data:teacherQuery
        })
    },

    //2删除讲师
    deleteTeacherId(id){
        return request({
            url:`/eduservice/edu-teacher/${id}`,
            method: 'delete',
        })
    },

    //3添加讲师
    save(teacher) {
        return request({
            url: `/eduservice/edu-teacher/addTeacher/`,
            method: 'post',
            data: teacher
        })
    },
    //4根据id查询讲师
    getTeacherInfo(id) {
        return request({
            url: `/eduservice/edu-teacher/getTeacher/${id}`,
            method: 'get',
        })
    },
    //5修改讲师
    updateTeacherInfo(teacher){
        return request({
            url: `/eduservice/edu-teacher/updateTeacher`,
            method: 'post',
            data:teacher
        })
    }
}

