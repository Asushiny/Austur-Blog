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
			// console.log(imageslist)
		})
	})

	//点击图片预览
	const showImg = (val) => {
		console.log(val)
	}
</script>

<template>
	<Waterfall :list="imageslist" :width="320">
		<template #item="{ item, url, index }">
			<div class="card">
				<LazyImg class="img" :url="url" @click="showImg" />
			</div>
		</template>
	</Waterfall>
</template>

<style scoped>
	.img {
		border: 5px solid #fff;
	}

	.img:hover {
		position: relative;
		display: block;
		border: 5px solid #55aaff;
		box-sizing: border-box;
		cursor: pointer;
	}
</style>