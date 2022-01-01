// 全局的getters, 方便获取
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 全局 state
  token: state => state.user.token,
  name: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto, // 建立用户头像的映射
  routes: state => state.permission.routes
}

export default getters
