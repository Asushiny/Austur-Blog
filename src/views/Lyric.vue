<script setup>
	import {
		ref
	} from 'vue'
	import { useRoute } from 'vue-router'
	import {
		getLyric
	} from '../api/index.js'
	const route = useRoute()
	let songId=route.query.id;
	console.log(songId)
	
	// 获取歌词
	const lyriclist = ref([])
	getLyric(songId).then(res => {
		lyriclist.value = res
	})
	
	// import axios from 'axios';
	// const lyricSrc = '@/src/api/lyric/'+songId+'.json'
	// console.log(lyricSrc)
	// axios.get(lyricSrc) // 发送GET请求，请求本地的data.json文件
	//   .then((response) => {
	//     lyriclist.value = response.data; // 将响应的数据赋值给data数组
	// 	console.log(lyriclist)
	//   })
	//   .catch((error) => {
	//     console.error(error);
	//   });
</script>

<template>
	<div class="lyric">
		<h1 class="songName">{{ lyriclist.songName }}</h1>
		<p class="singer"><el-icon><UserFilled /></el-icon>{{ lyriclist.singer }}</p>
		<p class="synopsis"><el-tag effect="light" type="info">简介</el-tag>{{ lyriclist.synopsis }}</p>
		<el-divider />
		<div class="songWords" v-for="item in lyriclist.songWords">
			<p class="part">{{ item.part }}</p>
			<p class="text">{{ item.text }}</p>
			<p class="romanization" v-if="lyriclist.showRomanization">{{ item.romanization }}</p>
			<p class="translate">{{ item.translate }}</p>
			<br />
		</div>
	</div>
</template>

<style scoped>
	.lyric{
		width: 80%;
		margin: 10px auto;
	}
	.songName{
		font-size: 30px;
		text-align: center;
		color: #00aaff;
	}
	.singer{
		font-size: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.synopsis{
		font-size: 16px;
		margin: 10px 0 0 0;
	}
	.songWords{
		/* width: 50%; */
	}
	.part{
		font-size: 30px;
		font-weight: bolder;
		color: #00aaff;
	}
	.text{
		font-size: 20px;
		font-weight: bold;
	}
	.romanization{
		font-size: 18px;
		font-weight: 500;
	}
	.translate{
		font-size: 18px;
		font-weight: 500;
	}
</style>