// 封装企业相关的接口
import request from '@/utils/request'

/**
 * 根据 id 查询企业
 * @param {*} id
 */
export const reqGetCompanyById = id => request({
  method: 'GET',
  url: `/company/${id}`
})
