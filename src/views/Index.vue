<template>
	<el-row class="main-layout">
		<el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" class="mainleft">
			<!-- <div class="loop-typewriter">
				<span class="text">{{ displayedText }}</span>
				<span class="cursor" :class="{ 'blinking': isAnimating }">|</span>
			</div> -->
		</el-col>
		<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="mainright">
			<el-card shadow="hover" class="aboutme">
				<h3 style="font-weight: bolder;color: #009def;">Hello It's Austur</h3>
				<h4 style="font-weight: bolder;">守卫者</h4>
				<h5 style="color: aqua;">ISFJ-T</h5>
				<!-- <h6 style="color: darkcyan;">TIMEKEEPER / TRAVELER</h6> -->
			</el-card>
			<el-card shadow="hover" style="text-align: center;">
				<div class="loop-typewriter">
					<span class="text">{{ displayedText }}</span>
					<span class="cursor" :class="{ 'blinking': isAnimating }">|</span>
				</div>
			</el-card>
			<el-card shadow="hover" style="text-align: center;">
				<h3 style="font-weight: bolder;color: #009def;">运行天数</h3>
				<el-statistic :value="outputValue" />
				<h6 style="color: darkcyan;">始于2022-01-12</h6>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup>
	import {
		ref,
		onBeforeMount,
		computed,
		onMounted,
		onUnmounted
	} from 'vue'
	import {
		useTransition
	} from '@vueuse/core'

	const fullText = ref('总有一天，我们会在别人的故事里再次相遇的。')
	const currentLength = ref(0)
	const isTyping = ref(false)
	const isDeleting = ref(false)
	const isAnimating = ref(false)
	let timer = null
	let timeout = null

	const displayedText = computed(() => {
		return fullText.value.substring(0, currentLength.value)
	})

	const typeText = () => {
		isTyping.value = true
		isAnimating.value = true
		return new Promise(resolve => {
			timer = setInterval(() => {
				currentLength.value++
				if (currentLength.value >= fullText.value.length) {
					clearInterval(timer)
					isTyping.value = false
					resolve()
				}
			}, 200)
		})
	}

	const deleteText = () => {
		isDeleting.value = true
		return new Promise(resolve => {
			timer = setInterval(() => {
				currentLength.value--
				if (currentLength.value <= 0) {
					clearInterval(timer)
					isDeleting.value = false
					resolve()
				}
			}, 100)
		})
	}

	const startLoop = async () => {
		while (true) {
			await typeText()
			await new Promise(r => timeout = setTimeout(r, 2000)) // 显示停留2秒
			await deleteText()
			await new Promise(r => timeout = setTimeout(r, 200)) // 删除后停留2秒
		}
	}

	onMounted(() => {
		startLoop()
	})

	onUnmounted(() => {
		clearInterval(timer)
		clearTimeout(timeout)
	})

	// 上次日期和当前日期
	var firstDate = new Date("2022-01-12");
	var currentDate = new Date();
	// 计算时间戳差值
	var lastTimestamp = Math.floor(firstDate.getTime() / 1000);
	var currentTimestamp = Math.floor(currentDate.getTime() / 1000);
	var timestampDiff = currentTimestamp - lastTimestamp;

	// 计算天数
	var days = Math.floor(timestampDiff / 86400);

	const source = ref(0)
	const outputValue = useTransition(source, {
		duration: 1000,
	})
	source.value = days
</script>

<style scoped>
	.main-layout {
		height: calc(100vh - 122px);
		min-height: calc(100vh - 122px);
		padding: 24px;
		background-color: #f5f7fa;
	}

	.mainleft {
		width: 100%;
		height: 100%;
		border-radius: 25px;
		overflow: hidden;
		box-sizing: border-box;
		box-shadow: 0 2px 8px #00000026;
		background-image: url(../assets/bg.jpg);
		background-size: cover;
		background-position: center center;
		object-fit: cover;
		display: flex;
		justify-content: center;
	}

	.loop-typewriter {
		font-size: 2rem;
		font-family: 'Microsoft YaHei', sans-serif;
		color: #2c3e50;
		min-height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 20px;
	}

	/* 添加过渡效果 */
	.text {
		font-size: 22px;
		color: #59cbcb;
		transition: all 0.3s;
		display: inline-block;
		min-width: 1px;
		/* 防止文字消失时布局抖动 */
	}

	.cursor {
		color: #409eff;
		margin-left: 4px;
		opacity: 1;
	}

	.blinking {
		animation: blink 1s infinite;
	}

	@keyframes blink {

		0%,
		100% {
			opacity: 1;
		}

		50% {
			opacity: 0;
		}
	}

	.mainright {
		width: 100%;
		padding: 0 20px;
		display: flex;
		flex-direction: column;
	}

	.el-card {
		width: 100%;
		margin: 10px;
		border-radius: 20px;
		box-sizing: border-box;
		box-shadow: 0 2px 8px #00000026;
		flex: 1;
		transition: flex 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Arial;
		font-size: 24px;
	}

	.el-card:hover {
		flex: 2;
	}

	.aboutme {
		background-image: url(../assets/isfj.svg);
		background-size: auto 80%;
		background-position: center right;
		background-repeat: no-repeat;
	}

	/* 响应式设计 */
	@media (max-width: 768px) {
		.mainleft {
			width: 100%;
			height: 200px;
			border-radius: 25px;
			overflow: hidden;
			box-sizing: border-box;
			box-shadow: 0 2px 8px #00000026;
		}

		.loop-typewriter {
			font-size: 1.5rem;
			padding: 10px;
		}

		.mainright {
			padding: 0 20px 0 0;
		}
	}
</style>