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
		getImage
	} from '@/api/index.js'

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
		console.log(showUrl.value)
	}
	//预览关闭
	const closePreview = () => {
		showUrl.value = []
		showImagePreview.value = false
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
	<el-image-viewer v-if="showImagePreview" @close="closePreview" :url-list="showUrl" />
</template>

<style scoped>
	
</style>