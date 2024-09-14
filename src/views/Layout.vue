<script lang="ts" setup>
	import {
		ref,
		onBeforeMount,
		onMounted
	} from 'vue'
	//导入图标
	import {
		// Sunny,
		// Moon,
		CloseBold,
		Menu
	} from '@element-plus/icons-vue'
	import router from '@/router'
	import aplayer from './Aplayer.vue'
	//导入echarts
	import * as echarts from 'echarts';

	//页面切换
	const goIndex = (val) => {
		router.push('/index')
	}

	//黑暗开关触发的事件
	const isDark = ref(false)
	const switchchange = (val) => {
		// console.log(val); //开关打开的状态
		let html = document.documentElement
		// console.log(html); //html根元素
		val ? html.className = 'dark' : html.className = 'light'
	}
	//在组件被挂载之前被调用
	const whatMenu = ref()
	onBeforeMount(() => {
		whatMenu.value = router.currentRoute.value.fullPath
		console.log("123", whatMenu.value)
	})

	//菜单按钮默认不显示
	const smallBox = ref(false)
	//菜单按钮默认为菜单图案
	const open = ref(true)
	const showMenu = ref(false)
	function updateIsMobile() {
		smallBox.value = window.matchMedia('(max-width: 750px)').matches;
		closeMenu();
	}

	//按钮图标切换
	const toggleMenu = (val) => {
		open.value = !open.value
		showMenu.value = !showMenu.value
	}
	//点击了菜单之后默认关闭菜单，更改按钮为菜单图案
	const closeMenu = (val) => {
		showMenu.value = false
		open.value = true
	}
	//在组件挂载之后调用
	onMounted(() => {
		updateIsMobile();
		window.addEventListener('resize', updateIsMobile);

		// echarts初始化
		let myChart = echarts.init(document.getElementById("logo"));
		// 基于准备好的dom，初始化echarts实例
		// 绘制图表
		var option;
		option = {
			graphic: {
				elements: [
					{
						type: 'text',
						left: 'left',
						top: 'bottom',
						style: {
							text: 'Austur',
							fontSize: 50,
							fontWeight: 'bold',
							lineDash: [0, 200],
							lineDashOffset: 0,
							fill: 'transparent',
							stroke: '#000', //线条颜色
							lineWidth: 2
						},
						keyframeAnimation: {
							duration: 2000,
							loop: false,
							keyframes: [
								{
									percent: 0.7,
									style: {
										fill: 'transparent', //线条内主体的颜色
										lineDashOffset: 200,
										lineDash: [200, 0]
									}
								},
								{
									// Stop for a while.
									percent: 0.8,
									style: {
										// fill: 'transparent'
										fill: '#55aaff'
									}
								},
								{
									percent: 1,
									style: {
										fill: '#55aaff' //最终的颜色
									}
								}
							]
						}
					}
				]
			}
		};
		option && myChart.setOption(option);
	})
</script>

<template>
	<div class="common-layout">
		<!-- 头部 -->
		<div class="header">
			<div id="logo" @click="goIndex"></div>
			<div class="toggle-button" v-if="smallBox">
				<el-button v-if="open" size="large" :icon="Menu" @click="toggleMenu" />
				<el-button v-else size="large" :icon="CloseBold" @click="toggleMenu" />
			</div>
			<div class="menu" v-else>
				<router-link to="index" exact-active-class="active">首页</router-link>
				<router-link to="lyriclist" exact-active-class="active">歌词本</router-link>
				<router-link to="wallpaper" exact-active-class="active">图片墙</router-link>
				<router-link to="timeline" exact-active-class="active">时间轴</router-link>
				<!-- 暗黑模式按钮 -->
				<!-- <el-switch @change="switchchange" size="large" v-model="isDark" :active-action-icon="Moon"
					:inactive-action-icon="Sunny"
					style="--el-switch-on-color: #545454; --el-switch-off-color: #cbcbcb" /> -->
			</div>
		</div>
		<transition name="slide">
			<ul v-if="showMenu" class="openMenu">
				<li><router-link to="index" exact-active-class="active" @click="closeMenu">首页</router-link></li>
				<li><router-link to="lyriclist" exact-active-class="active" @click="closeMenu">歌词本</router-link></li>
				<li><router-link to="wallpaper" exact-active-class="active" @click="closeMenu">图片墙</router-link></li>
				<li><router-link to="timeline" exact-active-class="active" @click="closeMenu">时间轴</router-link></li>
			</ul>
		</transition>
		<!-- 内容 -->
		<el-main>
			<el-scrollbar>
				<router-view class="view"></router-view>
				<aplayer></aplayer>
			</el-scrollbar>
		</el-main>
		<!-- 底部 -->
		<el-footer>
			<el-row>
				<el-col :span="12">
					<div>旭光之后,皆是繁星</div>
				</el-col>
				<el-col :span="12">
					<div>Copyright © 2022 Austur.</div>
				</el-col>
			</el-row>
		</el-footer>
	</div>
</template>

<style>
	.common-layout {
		min-width: 425px;
	}

	.header {
		height: 60px;
		line-height: 60px;
		padding: 0 10%;
		box-sizing: border-box;
		box-shadow: 0 2px 8px #00000026;
		display: flex;
		justify-content: space-between;
	}

	/* 路由选择菜单的底线 */
	.router-active {
		border-bottom: 3px solid #55aaff;
	}

	#logo {
		width: 350px;
		height: 60px;
		cursor: pointer;
	}

	.menu {
		display: flex;
	}

	.menu a {
		font-size: 22px;
		color: #55aaff;
		margin: 0 10px;
	}

	.menu a:hover {
		background: none;
	}

	.openMenu {
		z-index: 10 !important;
		/* 固定在其他图层上方 */
		position: absolute;
		top: 62px;
		width: 100%;
		height: 200px;
		text-align: center;
		background-color: #fff;
		box-sizing: border-box;
		box-shadow: 0 2px 8px #00000026;
		list-style-type: none;
		overflow: hidden;
	}

	.openMenu li {
		margin-bottom: 20px;
	}

	.openMenu li a {
		width: 100px !important;
		font-size: 22px;
	}

	.openMenu li a:hover {
		background: none;
	}

	.slide-enter-active,
	.slide-leave-active {
		transition: all 0.3s ease;
		max-height: 200px;
		/* 根据需要设置最大高度 */
	}

	.slide-enter-from,
	.slide-leave-to {
		max-height: 0;
		visibility: hidden;
	}

	.el-main {
		height: calc(100vh - 120px);
		overflow-y: hidden;
		position: relative;
		--el-main-padding: 2px 0 0 0;
	}

	.view {
		padding: 10px 10% 90px 10%;
	}

	.el-footer {
		line-height: 60px;
		text-align: center;
		box-shadow: 2px 0 8px #00000026;
	}
</style>