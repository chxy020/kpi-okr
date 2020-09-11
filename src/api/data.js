// import axios from 'axios'


// // 编辑 Key Results
// const apiAgreementList = params  => {
//     return axios.post('http://39.107.249.187:8081/okr/modify',params);
// };

// export {
//   apiAgreementList,
// }



import axios from 'axios'

// 编辑 Key Results
const editResultsApiPost = params => {
  return axios.post('http://39.107.249.187:8081/okr/modify', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      function(data) {
        let ret = ''
        for (const it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ]
  })
}
// 删除 Key Results
// const delResultsApiGet = params  => {
//   return axios.get('http://39.107.249.187:8081/okr/delete',params);
// }
const delResultsApiGet = params  => {
  return axios.delete('http://39.107.249.187:8081/okr/delete',params);
}






export {
  editResultsApiPost,
  delResultsApiGet
}