// 全局的getters, 方便获取
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 全局 state
  token: state => state.user.token
}
export default getters

// this.$store.getters.token
// {
//   getters: {
//     total(state) {
//       return state.xxx.xx
//     }

//     total: function(state) {
//       return state.xxx.xx
//     }

//     total: (state) => {
//       return state.xx.xxx
//     }

//     total: state => state.xx.xxx
//   }

// }
