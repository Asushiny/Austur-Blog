import {request} from "./request.js"

//http://127.0.0.1:5173

//登录
export function getLogin(){
	return request({
		url: '/login.json',
		methods: 'get'
	})
}

//歌词
export function getLyric(songId){
	return request({
		url: '/lyric/'+songId+'.json',
		methods: 'get'
	})
}

//图片
export function getImage(){
	return request({
		url: '/images.json',
		methods: 'get'
	})
}