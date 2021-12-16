// 全局的getters
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device
}
export default getters

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
