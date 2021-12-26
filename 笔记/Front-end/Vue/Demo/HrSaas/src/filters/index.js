import dayjs from 'dayjs'
// 处理时间格式: moment / dayjs   dayjs(time).format('YYYY-MM-DD HH:mm:ss')
// 封装过滤器
// {{ time | formatTime }}
// {{ time | formatTime('YYYY~MM~DD') }}
export const formatTime = (value, str = 'YYYY年MM月DD日') => {
  return dayjs(value).format(str)
}
