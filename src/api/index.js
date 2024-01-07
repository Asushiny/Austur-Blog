import {request} from "./request.js"

//http://127.0.0.1:5173

//登录
export function getLogin(){
	return request({
		url: '/login.json',
		methods: 'post',
		responseType:'json'
	})
}

//音乐
export function getMusic(){
	return request({
		url: '/music.json',
		methods: 'get',
		responseType:'json'
	})
}

//歌词
export function getLyric(songId){
	return request({
		url: '/lyric/'+songId+'.json',
		methods: 'get',
		responseType:'json'
	})
}

//图片
export function getImage(){
	return request({
		url: '/images.json',
		methods: 'get',
		responseType:'json'
	})
}