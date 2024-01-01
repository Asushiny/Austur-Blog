<script setup>
	import {
		ref,
		onBeforeMount
	} from 'vue'
	//导入图标
	import {
		Sunny,
		Moon
	} from '@element-plus/icons-vue'
	import router from '@/router'
	// import {
	// 	getLyric
	// } from '../api/index.js'

	//去到首页
	const goIndex = (val) => {
		router.push('/index')
	}

	//开关触发的事件
	const isDark = ref(false)
	const switchchange = (val) => {
		// console.log(val); //开关打开的状态
		let html = document.documentElement
		// console.log(html); //html根元素
		val ? html.className = 'dark' : html.className = 'light'
	}

	//在组件被挂载之前被调用
	const isLogin = ref()
	onBeforeMount(() => {
		//判断是否已登录
		let logining = localStorage.getItem('login');
		if (logining) {
			isLogin.value = true
			console.log(isLogin)
		} else {
			isLogin.value = false
			console.log(isLogin)
			// router.push('/index')
		}
	})

	//获取歌词栏导航
	// const lyriclist = ref([])
	// getLyric().then(res => {
	// 	lyriclist.value = res
	// })
</script>

<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<el-row>
					<el-col :span="12" class="h-left">
						<img src="../assets/images/logo.png" alt="logo" class="logo" @click="goIndex" />
					</el-col>
					<el-col :span="12" class="h-right">
						<!-- 暗黑模式按钮 -->
						<el-switch @change="switchchange" size="large" v-model="isDark" :active-action-icon="Moon"
							:inactive-action-icon="Sunny"
							style="--el-switch-on-color: #545454; --el-switch-off-color: #cbcbcb" />
					</el-col>
				</el-row>
			</el-header>
			<el-container>
				<el-aside>
					<el-menu class="el-menu-vertical-demo menu" default-active="/" unique-opened router>
						<el-menu-item index="/">
							<el-icon><House /></el-icon>
							<span>首页</span>
						</el-menu-item>
						<!-- <el-menu-item index="/blog" v-if="isLogin">
							<el-icon>
								<document />
							</el-icon>
							<span>博客</span>
						</el-menu-item> -->
						<el-menu-item index="/lyriclist">
							<el-icon><Memo /></el-icon>
							<span>歌词</span>
						</el-menu-item>
						<!-- <el-sub-menu index="/lyric">
							<template #title>
								<el-icon><Memo /></el-icon>
								<span>歌词</span>
							</template>
							<el-menu-item index="/lyric?123" v-for="item in lyriclist">{{ item.title }}</el-menu-item>
						</el-sub-menu> -->
						<el-menu-item index="/wallpaper">
							<el-icon><Picture /></el-icon>
							<span>图片墙</span>
						</el-menu-item>
						<el-menu-item index="/timeline" v-if="isLogin">
							<el-icon><Timer /></el-icon>
							<span>时间轴</span>
						</el-menu-item>
					</el-menu>
					
					<iframe class="musicBox" frameborder="no" border="0" marginwidth="0" marginheight="0" width=240 height=66 src="https://i.y.qq.com/n2/m/outchain/player/index.html?songid=426989659&songtype=0"></iframe>
				</el-aside>
				<el-container>
					<el-main>
						<el-scrollbar>
							<router-view></router-view>
						</el-scrollbar>
					</el-main>
					<el-footer>
						<el-row>
							<el-col :span="12">
								<div>旭光之后,皆是繁星</div>
							</el-col>
							<el-col :span="12">
								<div>Copyright © 2023 Austur.</div>
							</el-col>
						</el-row>
					</el-footer>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<style scoped>
	.common-layout {
		min-width: 1000px;
	}

	.el-header {
		box-sizing: border-box;
		box-shadow: 0 2px 8px #00000026;
		z-index: 999;
		line-height: 60px;
		padding: 0;
	}

	.h-left {
		height: 60px;
		padding-left: 20px;
	}

	.logo {
		width: 200px;
		height: 60px;
		cursor: pointer;
	}

	.h-right {
		height: 60px;
		display: flex;
		justify-content: right;
		align-items: center;
		padding-right: 20px;
	}

	.el-aside {
		width: 250px;
		height: calc(100vh - 60px);
	}

	.menu {
		height: calc(100vh - 60px);
	}
	
	.musicBox{
		position: absolute;
		left: 5px;
		bottom: 5px;
	}
	.wrap{
		width: 100%;
	}

	.el-main {
		height: calc(100vh - 120px);
		padding: 10px;
		/* background-color: #fafafa; */
		overflow-y: hidden;
	}

	.el-footer {
		line-height: 60px;
		text-align: center;
		box-shadow: 2px 0 8px #00000026;
	}
</style>