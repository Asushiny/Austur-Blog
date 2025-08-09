<template>
	<!-- 主内容区 -->
	<main class="main-content">
		<!-- 动态背景 -->
		<div class="animated-bg"></div>

		<!-- 中心内容 -->
		<div class="content-wrapper">
			<!-- 标题部分 -->
			<div class="header-section">
				<h1 class="main-title">Creative Space</h1>
				<p class="sub-title">探索技术与设计的无限可能</p>
			</div>
			<!-- 打字效果 -->
			<div class="loop-typewriter">
				<p class="text">{{ displayedText }}<span class="cursor" :class="{ 'blinking': isAnimating }">|</span>
				</p>
			</div>

			<!-- 功能卡片 -->
			<div class="card-grid">
				<div class="feature-card" :style="{ '--delay': index * 0.1 + 's' }">
					<div class="card-inner">
						<el-icon class="card-icon">
							<Picture />
						</el-icon>
						<h3>收藏图集</h3>
						<p>共：{{ pics }}张图片</p>
					</div>
				</div>
				<div class="feature-card" :style="{ '--delay': index * 0.1 + 's' }">
					<div class="card-inner">
						<el-icon class="card-icon">
							<Notebook />
						</el-icon>
						<h3>分类归档</h3>
						<p>共：{{ docs }}篇文档</p>
					</div>
				</div>
				<div class="feature-card" :style="{ '--delay': index * 0.1 + 's' }">
					<div class="card-inner">
						<el-icon class="card-icon">
							<Clock />
						</el-icon>
						<h3>运行时间</h3>
						<p>始于2022-01-12，已运行{{ times }}天</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
	import {
		ref,
		onMounted,
		computed,
		onUnmounted
	} from 'vue'
	import {
		supabase
	} from '../api/supabase.js'
	import {
		Picture,
		Notebook,
		Clock,
	} from '@element-plus/icons-vue'

	//打字效果
	const fullText = ref('总有一天，我们会在别人的故事里再次相遇。')
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
			}, 150)
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
			await new Promise(r => timeout = setTimeout(r, 2000)) // 删除后停留2秒
		}
	}

	onMounted(() => {
		startLoop()
		fetchPics()
		fetchDocs()
		fetchDays()
	})

	onUnmounted(() => {
		clearInterval(timer)
		clearTimeout(timeout)
	})

	const pics = ref('')
	const docs = ref('')
	const times = ref('')
	// 获取图片
	const fetchPics = async () => {
		try {
			const {
				data,
				error
			} = await supabase.storage
				.from('austur-assets')
				.list('wallpaper')

			if (error) throw error
			pics.value = data.length
		} catch (error) {
			console.error('加载失败:', error)
		}
	}
	// 获取文章
	const fetchDocs = async () => {
		try {
			let {
				data: docstable,
				error
			} = await supabase
				.from('docstable')
				.select('*')

			if (error) throw error
			docs.value = docstable.length
		} catch (error) {
			console.error('加载失败:', error)
		}
	}
	//获取时间
	// 创建一个日期对象
	const fetchDays = () => {
		// 定义起始日期（注意：月份从 0 开始，1 月是 0）
		const startDate = new Date(2022, 0, 12) // 2022-01-12
		const currentDate = new Date()

		// 计算时间差（毫秒）
		const timeDiff = currentDate - startDate
		times.value = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
	}
</script>

<style scoped>
	.main-content {
		/* height: calc(100vh - 122px); */
		position: relative;
		overflow: hidden;
	}

	.animated-bg {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(45deg,
				rgba(255, 255, 255, 0.1) 25%,
				transparent 25%,
				transparent 50%,
				rgba(255, 255, 255, 0.1) 50%,
				rgba(255, 255, 255, 0.1) 75%,
				transparent 75%,
				transparent);
		background-size: 60px 60px;
		animation: bgFlow 20s linear infinite;
		opacity: 0.3;
	}

	.content-wrapper {
		position: relative;
		max-width: 1200px;
		margin: 0 auto;
		padding: 40px 20px;
		height: 100%;
	}

	.header-section {
		text-align: center;
		/* margin-bottom: 60px; */
	}

	.main-title {
		font-size: 3.5rem;
		color: #55aaff;
		font-weight: bolder;
		margin-bottom: 20px;
		letter-spacing: 2px;
	}

	.sub-title {
		font-size: 1.2rem;
		color: #64748b;
	}

	/* 打字 */
	.loop-typewriter {
		height: 40px;
		text-align: center;
		margin: 30px 0;
	}

	/* 添加过渡效果 */
	.text {
		font-size: 26px;
		color: #00ffff;
		transition: all 0.3s;
		display: inline-block;
		min-width: 1px;
		/* 防止文字消失时布局抖动 */
	}

	.cursor {
		font-size: 26px;
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

	/* 卡片网格布局 */
	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 30px;
		margin-bottom: 60px;
	}

	.feature-card {
		background: white;
		border-radius: 16px;
		padding: 2px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.feature-card::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(45deg,
				transparent 35%,
				rgba(99, 102, 241, 0.1) 50%,
				transparent 65%);
		animation: cardGlow 3s infinite;
	}

	.card-inner {
		position: relative;
		background: white;
		border-radius: 14px;
		padding: 30px;
		height: 100%;
		transition: transform 0.3s ease;
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
	}

	.feature-card:hover .card-inner {
		transform: scale(0.98);
	}

	.card-icon {
		width: 60px;
		height: 60px;
		font-size: 60px;
		color: #6366f1;
		margin-bottom: 20px;
	}

	.feature-card h3 {
		font-size: 1.5rem;
		color: #1e293b;
		margin-bottom: 12px;
	}

	.feature-card p {
		color: #64748b;
		line-height: 1.6;
	}

	/* 动画效果 */
	@keyframes bgFlow {
		0% {
			transform: rotate(0deg) translate(0, 0);
		}

		100% {
			transform: rotate(360deg) translate(30px, 30px);
		}
	}

	@keyframes cardGlow {
		0% {
			transform: translate(-25%, -25%) rotate(0deg);
		}

		100% {
			transform: translate(-25%, -25%) rotate(360deg);
		}
	}

	@media (max-width: 768px) {
		.main-title {
			font-size: 2.5rem;
		}

		.loop-typewriter {
			height: 80px;
		}

		.text {
			font-size: 20px;
		}

		.card-grid {
			grid-template-columns: 1fr;
		}
	}
</style>