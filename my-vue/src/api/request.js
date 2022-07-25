// 引入axios
import axios from 'axios'
// 全局配置
// axios.defaults.baseURL = 'http://127.0.0.1:7001'
// 默认超时时间 15秒
axios.defaults.timeout = 15000
// 设置所有请求默认的Authorization token
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

export default axios
