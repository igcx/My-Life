// 这个文件专门用于封装 和文章相关的接口
import http from '@/utils/request'

// 请求文章分类列表的数据
export const reqGetArtCateList = () => {
  return http({
    method: 'get',
    url: '/my/cate/list'
  })
}

// get delete: params ; put patch post: data
// 用于添加文章分类  data 传对象 cate_name cate_alias
export const reqAddArtCate = (data) => {
  return http({
    method: 'post',
    url: '/my/cate/add',
    data
  })
}

// 用于删除文章分类  传id
export const reqDelArtCate = (id) => http({
  method: 'delete',
  url: '/my/cate/del',
  params: {
    id: id
  }
})

// 根据id获取分类的详情
export const reqGetCateInfoById = (id) => {
  return http({
    method: 'get',
    url: '/my/cate/info',
    params: {
      id
    }
  })
}

// 用于修改文章分类
export const reqEditCateInfo = (data) => {
  return http({
    method: 'put',
    data,
    url: '/my/cate/info'
  })
}

// 用于获取文章列表数据
// params 对象:
// pagenum 页码; pagesize 一页几条; cate_id 分类id; state: 已发布/草稿
export const reqGetArtList = (params) => {
  return http({
    method: 'get',
    url: '/my/article/list',
    params: params
  })
}

// 用于根据id删除文章
export const reqDelArtById = (id) => {
  return http({
    method: 'delete',
    url: '/my/article/info?id=' + id
    // params: {
    //   id
    // }
  })
}

// 根据id获取文章详情
export const reqGetArtInfoById = (id) => {
  return http({
    method: 'get',
    url: '/my/article/info',
    params: {
      id
    }
  })
}

// 发布文章的接口请求
// data { title cate_id content state cover_img }
// data 不是一个普通的对象!!! formdata格式!!! => mdn
export const reqPublishArt = (data) => {
  return http({
    method: 'post',
    url: '/my/article/add',
    data
  })
}
