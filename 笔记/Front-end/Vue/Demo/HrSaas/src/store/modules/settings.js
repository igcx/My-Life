import defaultSettings from '@/settings'
import Cookies from 'js-cookie'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings
const themeDefaultColor = '#3976f5'
const themeKey = 'theme-color'

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  theme: Cookies.get(themeKey) || themeDefaultColor
}

const mutations = {
  // 万能的 mutation
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }

    if (key === 'theme') {
      // 发现改的是颜色，本地存储
      Cookies.set(themeKey, value)
    }
  },
  // 提供一个修改theme的mutation

  resetTheme(state) {
    // 重置成默认颜色
    state.theme = themeDefaultColor
    // cookies中也要移出
    Cookies.remove(themeKey)
  }
}

const actions = {
  // 规范：不允许直接在页面中提交 mutation 只允许分发 action
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

