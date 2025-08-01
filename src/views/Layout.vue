<script lang="ts" setup>
	import Header from './Header.vue'
	import Footer from './Footer.vue'
	import aplayer from './Aplayer.vue'
	import {
		ref,
		onBeforeMount,
	} from 'vue'
	import {
		useRouter
	} from 'vue-router'
	const router = useRouter()

	//判定本地是否存在，否则回到登录页面
	// onBeforeMount(() => {
	// 	var loginData = localStorage.getItem('login');
	// 	if (loginData) {
	// 		loginData = JSON.parse(loginData);
	// 		var currentTime = new Date().getTime();

	// 		if (currentTime > loginData.expiration) {
	// 			// 数据已过期，清除
	// 			localStorage.removeItem('login');
	// 			router.push('/login')
	// 		}
	// 	} else {
	// 		router.push('/login')
	// 	}
	// });
</script>

<template>
	<div class="layout">
		<!-- 顶部导航栏 -->
		<Header></Header>

		<!-- 主要内容区域 -->
		<el-main>
			<el-scrollbar>
				<router-view class="view"></router-view>
				<aplayer></aplayer>
			</el-scrollbar>
		</el-main>

		<!-- 底部 -->
		<Footer></Footer>
	</div>
</template>

<style scoped>
	.layout {
		min-height: 100vh;
	}

	/* 主要内容区域 */
	.el-main {
		height: calc(100vh - 120px);
		overflow-y: hidden;
		position: relative;
		--el-main-padding: 2px 0 0 0;
	}

	.view {
		padding: 10px 3% 10px 3%;
	}
</style>