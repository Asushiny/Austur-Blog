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

	const dialogTableVisible = ref(false)
	const showUrl = ref([])
	//点击图片预览
	const showImg = (val) => {
		console.log(val)
		console.log(val.target.currentSrc)
		dialogTableVisible.value = true
		showUrl.value =val.target.currentSrc
	}
</script>

<template>
	<Waterfall :list="imageslist" :width="320">
		<template #item="{ item, url, index }">
			<div class="card">
				<LazyImg :url="url" @click="showImg"/>
			</div>
		</template>
	</Waterfall>
	<el-dialog v-model="dialogTableVisible" title="" width="75%">
		<el-image style="width: 100%; height: 60vh" :src="showUrl" fit="contain" />
	</el-dialog>
</template>

<style scoped>
	
</style>