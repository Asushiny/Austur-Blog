<script lang="ts" setup>
	import {
		ref,
		onBeforeMount,
		// onMounted
	} from 'vue'
	import aplayer from './Aplayer.vue'
	import router from '@/router'
	//导入图标
	import {
		Menu
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
	<div class="layout">
		<!-- 顶部导航栏 -->
		<header class="header">
			<!-- 左侧logo -->
			<div class="logo"><img src="../assets/logo.png" alt="Logo" @click="router.push('/')" /></div>
			<!-- 右侧菜单栏 -->
			<div class="menu">
				<router-link to="index" exact-active-class="active" class="menuBtn">首页</router-link>
				<router-link to="wallpaper" exact-active-class="active" class="menuBtn">图片墙</router-link>
				<router-link to="timeline" exact-active-class="active" class="menuBtn">时间轴</router-link>
				<el-button class="menuBtn2" size="large" :icon="Menu" @click="drawer = true" />
			</div>
			<el-drawer v-model="drawer" direction="ltr" size="200" class="menuDrawer">
				<router-link to="index" exact-active-class="active" @click="drawer = false">首页</router-link>
				<router-link to="wallpaper" exact-active-class="active" @click="drawer = false">图片墙</router-link>
				<router-link to="timeline" exact-active-class="active" @click="drawer = false">时间轴</router-link>
			</el-drawer>
		</header>

		<!-- 主要内容区域 -->
		<el-main>
			<el-scrollbar>
				<router-view class="view"></router-view>
				<aplayer></aplayer>
			</el-scrollbar>
		</el-main>

		<!-- 底部 -->
		<el-footer>
			<div class="footer-left">
				<p>旭光之后,皆是繁星</p>
			</div>
			<div class="footer-right">
				<p>Copyright © 2022 Austur.</p>
			</div>
		</el-footer>
	</div>
</template>

<style scoped>
	.layout {
		min-height: 100vh;
	}

	/* 顶部导航样式 */
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
	.menuBtn{
		display: block;
	}
	.menuBtn2{
		display: none;
	}
	.menuDrawer{
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

	/* 主要内容区域 */
	.el-main {
		height: calc(100vh - 120px);
		overflow-y: hidden;
		position: relative;
		--el-main-padding: 2px 0 0 0;
	}

	.view {
		padding: 10px 10% 10px 10%;
	}

	/* 底部样式 */
	.el-footer {
		width: 100%;
		height: 60px;
		line-height: 58px;
		background: #ffffff;
		box-sizing: border-box;
		box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-around;
	}

	.el-footer p {
		margin: 2px 0;
		font-size: 16px;
		color: #909399;
	}

	/* 响应式设计 */
	@media (max-width: 768px) {
		.menuBtn{
			display: none;
		}
		.menuBtn2{
			display: block;
		}
		.el-footer {
			height: 60px;
			line-height: 10px;
			flex-direction: column;
			justify-content: center;
			text-align: center;
		}

		.footer-left,
		.footer-right {
			padding: 5px 0;
		}
	}
</style>