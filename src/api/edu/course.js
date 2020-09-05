import request from '@/utils/request'


export default {
    addCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/edu-course/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  //查询所有讲师
  getListTeacher(){
    return request({
        url: `/eduservice/edu-teacher/findAll`,
        method: 'get',
       
      })
  },

  getCourseInfo(id) {
    return request({
      url: `/eduservice/edu-course/getCourseInfo/${id}`,
      method: 'get',
      
    })
  },

  updateCourseInfo(courseInfo){
    return request({
        url: `/eduservice/edu-course/updateCourseInfo`,
        method: 'post',
        data:courseInfo
      })
  },

  getPublishCourseInfo(id){
    return request({
        url: `/eduservice/edu-course/getPublishCourseInfo/${id}`,
        method: 'get',
      })
  },

  PublishCourse(id){
    return request({
        url: `/eduservice/edu-course/publishCourse/${id}`,
        method: 'post',
      })
  },
  getListCourse(){
    return request({
        url: `/eduservice/edu-course`,
        method: 'get',
      })
  },
  deleteCourse(id){
    return request({
      url: `/eduservice/edu-course/${id}`,
      method: 'delete',
    })
  }
}