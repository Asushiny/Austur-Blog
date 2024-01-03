//导入axios
import axios from 'axios';
//创建对象
export function request(config) {
	const server = axios.create({
		// baseURL: import.meta.env.VITE_APP_API_BASEURL,
		// baseURL: 'http://127.0.0.1:5173/src/api', //本地域名、接口前缀
		baseURL: 'https://www.austur.top/src/api', 
		timeout: 3000, //请求超时时间
	});
	//请求拦截器
	server.interceptors.request.use(config => {
		// 在请求发送前做一些处理
		// config.headers['Authorization'] = getToken();
		console.log("请求",config)
		return config;
	}, error => {
		// 处理请求错误
		return Promise.reject(error);
	});
	//响应拦截器
	server.interceptors.response.use(response => {
		console.log("响应",response)
		// 在响应数据返回前做一些处理
		return response.data;
	}, error => {
		//超出2xx范围的状态码都会触发该函数
		if(error.response){
			if(error.status == 500){
				console.log("服务器内部发生错误")
			}
		}
		// 处理响应错误
		return Promise.reject(error);
	});

	//导出
	return server(config);
}