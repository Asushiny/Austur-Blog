<template>
	<div class="not-found-container">
		<div class="content">
			<div class="error-code">404</div>
			<h1 class="error-title">页面去星际旅行了！</h1>
			<p class="error-message">
				我们正在努力将它带回地球...
			</p>
			<div class="dynamic-message">
				<transition name="fade" mode="out-in">
					<p :key="currentTipIndex" class="tip">{{ tips[currentTipIndex] }}</p>
				</transition>
			</div>
			<button @click="goHome" class="home-button">
				返回首页
			</button>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onUnmounted
	} from 'vue'
	import {
		useRouter
	} from 'vue-router'

	const router = useRouter()
	const currentTipIndex = ref(0)
	const tips = [
		'检查网址是否正确',
		'或许页面正在时空旅行',
		'联系我们的太空支援队',
		'看看其他有趣的页面'
	]

	let timer = null

	onMounted(() => {
		timer = setInterval(() => {
			currentTipIndex.value = (currentTipIndex.value + 1) % tips.length
		}, 3000)
	})

	onUnmounted(() => {
		clearInterval(timer)
	})

	const goHome = () => {
		router.push('/')
	}
</script>

<style scoped>
	.not-found-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #f0f4ff 0%, #d9e0ff 100%);
		color: #2c3e50;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.content {
		text-align: center;
		max-width: 800px;
		padding: 3rem;
	}

	.error-code {
		font-size: 10rem;
		font-weight: 900;
		background: linear-gradient(45deg, #3498db, #9b59b6);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		line-height: 1;
		margin-bottom: 2rem;
		letter-spacing: -0.05em;
	}

	.error-title {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		color: #2c3e50;
	}

	.error-message {
		font-size: 1.2rem;
		color: #7f8c8d;
		margin-bottom: 3rem;
		line-height: 1.6;
	}

	.dynamic-message {
		min-height: 3rem;
		margin-bottom: 3rem;
	}

	.tip {
		font-size: 1.1rem;
		color: #3498db;
		margin: 0;
		font-weight: 500;
	}

	.home-button {
		background: linear-gradient(45deg, #3498db, #2980b9);
		border: none;
		padding: 1.2rem 3rem;
		color: white;
		font-size: 1.2rem;
		border-radius: 50px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 20px rgba(52, 152, 219, 0.3);
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.home-button:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 25px rgba(52, 152, 219, 0.4);
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	@media (max-width: 768px) {
		.content {
			padding: 2rem;
		}

		.error-code {
			font-size: 8rem;
		}

		.error-title {
			font-size: 2rem;
		}

		.error-message {
			font-size: 1.1rem;
		}

		.home-button {
			padding: 1rem 2rem;
			font-size: 1rem;
		}
	}
</style>