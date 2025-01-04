<script setup>
	import {
		ref,
		onBeforeMount
	} from 'vue'
	import {
		LazyImg,
		Waterfall
	} from 'vue-waterfall-plugin-next'
	import 'vue-waterfall-plugin-next/dist/style.css'
	import {
		ArrowLeftBold,
		ArrowRightBold
	} from '@element-plus/icons-vue'
	import {
		getImage
	} from '@/api/index.js'
	import {
		ElMessage
	} from 'element-plus'

	const imageslist = ref([])

	onBeforeMount(() => {
		getImage().then(res => {
			imageslist.value = res
		})
	})

	//图片是否预览
	const showImagePreview = ref(false)
	//图片预览的数据
	const showUrl = ref([])
	//预览
	const showImg = (val) => {
		showImagePreview.value = true
		showUrl.value = [val.target.currentSrc]
	}
	//预览关闭
	const closePreview = () => {
		showUrl.value = []
		showImagePreview.value = false
	}
	// 预览上一页
	const showLeft = (val) => {
		var midChar = showUrl.value[0].charAt(showUrl.value[0].length - 6);
		//判断倒数第六位是否为/
		if (midChar === '/') {
			const newChar = String(Number(showUrl.value[0].slice(-5, -4)) - 1);
			if (newChar === '0') {
				ElMessage({
					message: '已经是第一张啦！',
					grouping: true,
					type: 'warning',
				})
			} else {
				showUrl.value = [showUrl.value[0].slice(0, -5) + newChar + showUrl.value[0].slice(-4)]
			}
		} else {
			const newChar = String(Number(showUrl.value[0].slice(-6, -4)) - 1);
			showUrl.value = [showUrl.value[0].slice(0, -6) + newChar + showUrl.value[0].slice(-4)]
		}
	}
	// 预览下一页
	const showRight = (val) => {
		var midChar = showUrl.value[0].charAt(showUrl.value[0].length - 6);
		//判断倒数第六位是否为/
		if (midChar === '/') {
			const newChar = String(Number(showUrl.value[0].slice(-5, -4)) + 1);
			showUrl.value = [showUrl.value[0].slice(0, -5) + newChar + showUrl.value[0].slice(-4)]
		} else {
			const newChar = String(Number(showUrl.value[0].slice(-6, -4)) + 1);
			if (newChar == imageslist.value.length + 1) {
				ElMessage({
					message: '已经到最后一张啦！',
					grouping: true,
					type: 'warning',
				})
			} else {
				showUrl.value = [showUrl.value[0].slice(0, -6) + newChar + showUrl.value[0].slice(-4)]
			}
		}
	}
</script>

<template>
	<Waterfall :list="imageslist" :width="320">
		<template #item="{ item, url, index }">
			<div class="card">
				<LazyImg :url="url" @click="showImg" />
			</div>
		</template>
	</Waterfall>

	<!-- 图片预览 -->
	<div v-if="showImagePreview">
		<el-image-viewer @close="closePreview" :url-list="showUrl" />
		<el-button class="b-left" @click="showLeft" :icon="ArrowLeftBold" size="large" color="#606266" circle />
		<el-button class="b-right" @click="showRight" :icon="ArrowRightBold" size="large" color="#606266" circle />
	</div>
</template>

<style scoped>
	.card {
		cursor: pointer;
	}

	.b-left {
		opacity: 0.7;
		position: absolute;
		left: 5%;
		top: 45%;
		z-index: 9999;
		background-color: #606266;
		border-color: #606266;
	}

	.b-right {
		opacity: 0.7;
		position: absolute;
		right: 5%;
		top: 45%;
		z-index: 9999;
		background-color: #606266;
		border-color: #606266;
	}
</style>