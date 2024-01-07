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
</script>

<template>
	<Waterfall :list="imageslist" :width="320">
		<template #item="{ item, url, index }">
			<div class="card">
				<LazyImg :url="url" />
			</div>
		</template>
	</Waterfall>
</template>

<style scoped>

</style>