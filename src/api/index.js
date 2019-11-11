import axios from 'axios'

// 通过axios.defaults.baseURL设置全局的基准路径
axios.defaults.baseURL = '//192.168.0.86:8000'

// 设置请求拦截，目的是拦截所有请求
axios.interceptors.request.use(function (config) {
  // 拦截到请求后，首先判断是否有_jwt，如果有的话，就将它取出来，放进config.headers里面
  let tokenStr = localStorage.getItem('token')
  if (tokenStr) {
    const token = JSON.parse(tokenStr)
    config.headers['Authorization'] = token.access_token
    if (token.user_info) {
      config.headers['CorpId'] = token.user_info.corpId
    }
  } else {
    return config
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export const getGeneratelink = (obj) => axios.get(`/auth/oauth/generatelink?redirecturl=${obj.redirecturl}&parameters=${obj.parameters}`).then(res => res.data)
export const getToken = (obj) => axios.get(`/auth/oauth/token?clientId=${obj.clientId}&code=${obj.code}`).then(res => res.data)

// 获取德育细则分组
export const groupsall = () => axios.get('/moraledu/groups/all').then(res => res.data)
// 根据分组id查看德育细则列表
export const allbygroupid = (id) => axios.get('/moraledu/rules/allbygroupid?groupId=' + id).then(res => res.data)

// 添加德育记录
export const recordsCreate = (obj) => axios.post('/moraledu/records/create', obj).then(res => res.data)
// 添加自定义德育记录
export const customCreate = (obj) => axios.post('/moraledu/records/customCreate', obj).then(res => res.data)

// 获取宿舍列表
export const getDormitoryStudentList = () => axios.get('/school/dormitoryPartition/getDormitoryStudentList').then(res => res.data)
// 获取年级列表
export const getGradeStudentList = () => axios.get('/school/student/getGradeStudentList').then(res => res.data)

// 根据学生名称或学号获取学生列表
export const getStudentListByNameOrCode = (val) => axios.get('/school/student/getStudentListByNameOrCode?nameOrCode=' + val).then(res => res.data)

// 获取学生德育记录汇总信息
export const getSummaryRecordByStudentId = (obj) => axios.get(`/moraledu/records/getSummaryRecordByStudentId?studentid=${obj.id}&year=${obj.y}&month=${obj.m}`).then(res => res.data)

// 获取记录信息
export const recordsone = (id) => axios.get('/moraledu/records/one?recordId=' + id).then(res => res.data)
// 撤销记录信息
export const recordsrevoke = (obj) => axios.put(`/moraledu/records/revoke?recordid=${obj.recordid}&cancelReason=${obj.cancelReason}`).then(res => res.data)
