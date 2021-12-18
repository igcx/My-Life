// js-cookie 插件 便于存取 cookie
import Cookies from 'js-cookie'

// localStorage                                    Cookie
// 1. 设置 localStorage.setItem(name, value)        Cookies.set(name, value)
// 2. 获取 localStorage.getItem(name)               Cookies.get(name)
// 3. 移除 localStorage.removeItem(name)            Cookies.remove(name)

// token 存取的键名
const TokenKey = 'hrsaas-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
