import request from '@/utils/request'


export default {
    getAllChapterVideo(courseId) {
    return request({
      url: `/eduservice/edu-chapter/getChapterVideo/${courseId}`,
      method: 'get'
    })
  },
  addChapter(chapter) {
    return request({
      url: `/eduservice/edu-chapter/addChapter`,
      method: 'post',
      data:chapter
    })
  },
  getChapter(chapterId) {
    return request({
      url: `/eduservice/edu-chapter/getChapterInfo/${chapterId}`,
      method: 'get'
    })
  },
  updateChapter(chapter) {
    return request({
      url: `/eduservice/edu-chapter/updateChapterInfo`,
      method: 'post',
      data:chapter
    })
  },
  deleteChapter(chapterId) {
    return request({
      url: `/eduservice/edu-chapter/${chapterId}`,
      method: 'delete',
    })
  },
}