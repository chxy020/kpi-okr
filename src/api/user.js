import request from '@/utils/request'
// import * as dd from "dingtalk-jsapi"; // 此方式为整体加载钉钉api，也可按需进行加载
// import dingConfig from "@/utils/ding-config"; //钉钉app的常量信息

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  // dd.ready(function () {
  //   dd.runtime.permission.requestAuthCode({
  //     corpId: dingConfig.corpId, // 企业id
  //     onSuccess: function (info) {
  //       const code = info.code; // 通过该免登授权码可以获取用户身份
  //       return request({
  //         url: '/user',
  //         method: 'get',
  //         params: {
  //           code
  //         }
  //       })
  //     }
  //   });
  // });
  return null
 
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
