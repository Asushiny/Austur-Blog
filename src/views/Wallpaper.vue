<script setup>
	import {
		ref,
		onMounted,
	} from 'vue'
	import {
		getImage
	} from '../api/index.js'

	const imageslist = ref([])

	onMounted(() => {
		getImage().then(res => {
			imageslist.value = res
		})
	})
</script>

<template>
	<div class="wallpaper">
		<el-image class="image" v-for="list in imageslist" :key="list.name" :src="list.url" :preview-src-list="[list.url]" lazy />
	</div>
</template>

<style scoped>
	.wallpaper {
		width: 100%;
		column-count: 4;
	}

	.image {
		width: 100%;
		height: 100%;
		padding: 1%;
		cursor: pointer;
	}
</style>