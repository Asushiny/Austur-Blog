import {request} from "./request.js"

//http://127.0.0.1:5173
const src = '/src/api'

//登录
export function getLogin(){
	return request({
		url: src+'/login.json',
		methods: 'post'
	})
}

//歌词
export function getLyric(songId){
	return request({
		url: src+'/lyric/'+songId+'.json',
		methods: 'get'
	})
}

//图片
export function getImage(){
	return request({
		url: src+'/images.json',
		methods: 'get'
	})
}