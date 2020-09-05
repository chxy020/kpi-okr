import Cookies from 'js-cookie'

const TokenKey = 'request_user_id'
const NameKey = 'request_user_name'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function setName() {
  return Cookies.set(NameKey,name)
}