<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useRoute
	} from 'vue-router'
	import {
		supabase
	} from '../api/supabase.js'
	const route = useRoute()
	const loading = ref(false)
	let songid = route.query.docid;
	// 获取歌词
	const lyriclist = ref([])
	// 获取数据
	const fetchLyric = async () => {
		try {
			loading.value = true

			const {
				data: lyrictable,
				error
			} = await supabase
				.from('lyrictable') // 选择表
				.select('*') // 选择所有列（或指定列）
				.eq('songid', songid)

			if (error) throw error

			lyriclist.value = lyrictable[0]
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			loading.value = false
		}
	}

	onMounted(() => {
		fetchLyric()
	})
</script>

<template>
	<el-breadcrumb separator="/">
		<el-breadcrumb-item :to="{ path: '/docs' }">归档</el-breadcrumb-item>
		<el-breadcrumb-item>{{ lyriclist.songName }}</el-breadcrumb-item>
	</el-breadcrumb>
	<div class="lyric" v-loading="loading">
		<h1 class="songName">{{ lyriclist.songName }}</h1>
		<p class="singer"><el-icon>
				<UserFilled />
			</el-icon>{{ lyriclist.singer }}</p>
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
	.el-breadcrumb {
		font-size: 24px;
		margin: 30px 0 30px 5%;
	}

	.lyric {
		width: 80%;
		margin: 10px auto;
	}

	.songName {
		font-size: 30px;
		text-align: center;
		color: #00aaff;
	}

	.singer {
		font-size: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.synopsis {
		font-size: 16px;
		margin: 10px 0 0 0;
	}

	.songWords {
		/* width: 50%; */
	}

	.part {
		font-size: 30px;
		font-weight: bolder;
		color: #00aaff;
	}

	.text {
		font-size: 20px;
		font-weight: bold;
	}

	.romanization {
		font-size: 18px;
		font-weight: 500;
	}

	.translate {
		font-size: 18px;
		font-weight: 500;
	}
</style>