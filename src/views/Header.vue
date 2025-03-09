<script lang="ts" setup>
	import {
		ref,
		onBeforeMount,
	} from 'vue'
	import router from '@/router'
	//导入图标
	import {
		Expand
	} from '@element-plus/icons-vue'
	//在组件被挂载之前被调用
	//判断当前是在哪个页面
	const whatMenu = ref()
	onBeforeMount(() => {
		whatMenu.value = router.currentRoute.value.fullPath
	})
	const drawer = ref(false)
</script>

<template>
	<header class="header">
		<!-- 左侧logo -->
		<div class="logo">
			<img src="https://dtlhdzlqambljsilvnrf.supabase.co/storage/v1/object/public/austur-assets/assets/logo.png"
				alt="Logo" @click="router.push('/')" />
		</div>
		<!-- 右侧菜单栏 -->
		<div class="menu">
			<router-link to="index" exact-active-class="active" class="menuBtn">首页</router-link>
			<router-link to="wallpaper" exact-active-class="active" class="menuBtn">图片墙</router-link>
			<router-link to="docs" exact-active-class="active" class="menuBtn">归档</router-link>
			<router-link to="timeline" exact-active-class="active" class="menuBtn">时间轴</router-link>
			<router-link to="account" exact-active-class="active" class="menuBtn">记账本</router-link>
			<el-button class="menuBtn2" size="large" :icon="Expand" @click="drawer = true" />
		</div>
		<el-drawer v-model="drawer" direction="ltr" size="200" class="menuDrawer">
			<router-link to="index" exact-active-class="active" @click="drawer = false">首页</router-link>
			<router-link to="wallpaper" exact-active-class="active" @click="drawer = false">图片墙</router-link>
			<router-link to="docs" exact-active-class="active" @click="drawer = false">归档</router-link>
			<router-link to="timeline" exact-active-class="active" @click="drawer = false">时间轴</router-link>
			<router-link to="account" exact-active-class="active" @click="drawer = false">记账本</router-link>
		</el-drawer>
	</header>
</template>

<style scoped>
	.header {
		width: 100%;
		height: 60px;
		line-height: 60px;
		background: #ffffff;
		padding: 0 5%;
		box-sizing: border-box;
		box-shadow: 0 2px 8px #00000026;
		display: flex;
		justify-content: space-between;
		z-index: 999;
	}

	.logo {
		max-width: 150px;
		min-width: 120px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logo img {
		width: 100%;
		max-width: 150px;
		min-width: 120px;
		height: auto;
		cursor: pointer;
	}

	/* 路由选择菜单的底线 */
	.router-active {
		border-bottom: 3px solid #55aaff;
	}

	.menu {
		display: flex;
		align-items: center;
	}

	.menu a {
		font-size: 22px;
		color: #55aaff;
		margin: 0 10px;
	}

	.menu a:hover {
		background: none;
	}

	.menuBtn {
		display: block;
	}

	.menuBtn2 {
		display: none;
	}

	.menuDrawer {
		display: flex;
	}

	.menuDrawer a {
		display: block;
		text-align: center;
		font-size: 22px;
		color: #55aaff;
		margin: 10px 0;
	}

	.menuDrawer a:hover {
		background: none;
	}

	/* 响应式设计 */
	@media (max-width: 768px) {
		.menuBtn {
			display: none;
		}

		.menuBtn2 {
			display: block;
		}
	}
</style>