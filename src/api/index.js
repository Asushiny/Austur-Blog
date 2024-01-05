import {request} from "./request.js"

//http://127.0.0.1:5173

//登录
export function getLogin(){
	return request({
		url: '/src/api/login.json',
		methods: 'post'
	})
}

//歌词
export function getLyric(songId){
	return request({
		url: '/src/api/lyric/'+songId+'.json',
		methods: 'get'
	})
}

//图片
export function getImage(){
	return request({
		url: '/src/api/images.json',
		methods: 'get'
	})
}