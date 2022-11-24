//axios封装
import axios from 'axios'

let instance = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 5000 //如果5秒内没有请求到数据，默认超时
})

//请求拦截
instance.interceptors.request.use(config => {
	//请求拦截要处理的内容
	return config
}, err => {
	//请求失败
	console.error('请求失败', err)
})

//响应拦截
instance.interceptors.response.use(res => {
	//响应拦截要处理的内容
	return res
}, err => {
	//响应失败
	console.error('响应失败', err)
})

//封装http请求的方法
//option 配置对象，属性包括：method请求方法，path请求接口地址，params请求参数
async function http(option = {}) {
	let result = null
	if (option.method === 'get' || option.method === 'delete') {
		await instance[option.method](
			option.path, {
				headers: option.headers,
				params: option.params
			}
		).then(res => {
			result = res
		}).catch(err => {
			result = err
		})
	} else if (option.method === 'post' || option.method === 'put') {
		await instance[option.method](
			option.path,
			option.params
		).then(res => {
			result = res
		}).catch(err => {
			result = err
		})
	}

	return result
}

export default http