import {request} from "./request.js"

//http://127.0.0.1:5173

//登录
export function getLogin(){
	return request({
		url: 'src/assets/login.json',
		methods: 'post',
		responseType:'json'
	})
}

//歌词
export function getLyric(songId){
	return request({
		url: 'src/assets/lyric/'+songId+'.json',
		methods: 'get',
		responseType:'json'
	})
}

//图片
export function getImage(){
	return request({
		url: 'src/assets/images.json',
		methods: 'get',
		responseType:'json'
	})
}