import request from '@/utils/request'


export default {
  addVideo(video) {
    return request({
      url: `/eduservice/edu-video/addVideo`,
      method: 'post',
      data:video
    })
  },

  deleteVideo(id) {
    return request({
      url: `/eduservice/edu-video/${id}`,
      method: 'delete',
    })
  },
  deleteAliyunVideo(id) {
    return request({
      url: `/eduvod/video/removeAlyVideo/${id}`,
      method: 'delete',
    })
  },
}