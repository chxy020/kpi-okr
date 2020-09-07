import axios from 'axios'

// 登录
const apiLogin = params  => {
    return axios.post(HOST+'/wk/woss/privilege/user/loginH5User.json',params)
};
// 忘记密码
const apiModifyPassword = params  => {
    return axios.post(HOST+'/wk/woss/privilege/user/updateH5User.json',params);
};
// 编辑 Key Results
const apiAgreementList = params  => {
    return axios.post('http://39.107.249.187:8081/okr/modify',params);
};

// 我的
const apigetMineInfo = params  => {
    return axios.get(HOST+'/wk/woss/privilege/user/getH5UserInfo.json',params);
}
// 需求列表
const apigetReleaselist = params  => {
    return axios.get(PURHOST+'/purchaseClues/staffPurchaseCluesList',params);
}
// 需求详情
const apigetReleaseDetails = params  => {
    return axios.get(PURHOST+'/purchaseClues/findStaffPurchaseInfo',params);
}

/**采购需求 */
//发布采购需求
const apiPurchaseRelease = params => {
    return axios.post(PURHOST + '/purchaseClues/savePurchasepByStaff/', params)
}
const apiPurchaseDetail = params => {
    return axios.post(PURHOST + '/purchaseClues/findStaffPurchaseInfo', params)
}

/**采购协议 */
//发布采购协议
const apiagreementRelease = params => {
    return axios.post(WOOSHOST + '/contract/add ', params);
}
//图片上传
const apiUploadFile = params => {
    return axios.post(ImgUrl + '/file/uploadBase64Json', params);
}
//根据id查询采购协议明细
const apiagreementDetail = params => {
    return axios.get(WOOSHOST + '/contract/detail', {params});
}
//根据id修改采购协议
const apiagreementUpdate = params => {
    return axios.post(WOOSHOST + '/contract/update', params);
}
//判断企业名称是否重复
const apiCheckCompanyName = params => {
    return axios.get(WOOSHOST + '/contract/checkCustomerNameRepeat', params);
}
//佣金-我的战绩-采购需求
const apiMyRecord = params => {
    return axios.get(PURHOST + '/purchaseClues/staffPurchaseCluesCount', params);
}
//佣金-我的战绩-采购协议
const apiMyRecordAgreement = params => {
    return axios.get(WOOSHOST + '/contract/findContractCount', params);
} 
const apiProfitInfo = params => {
    return axios.post(PURHOST + '/api/profit/info', params);
}
const apiProfitList = params => {
    return axios.post(PURHOST + '/api/profit/list', params);
}
export {
  apiLogin,
  apiModifyPassword,
  apiAgreementList,
  apiagreementRelease,
  apiPurchaseRelease,
  apiPurchaseDetail,
  apiUploadFile,
  apiagreementDetail,
  apiagreementUpdate,
  apigetMineInfo,
  apigetReleaselist,
  apigetReleaseDetails,
  apiCheckCompanyName,
  apiMyRecord,
  apiMyRecordAgreement,
  apiProfitInfo,
  apiProfitList
}
