<script>
	import 'APlayer/dist/APlayer.min.css';
	import APlayer from 'APlayer';
	import {
		getMusic
	} from '@/api/index.js'

	export default {
		name: 'HomeView',
		components: {},
		mounted() {
			this.addMyAudio();
		},
		data() {
			return {
				audio: [],
			}
		},
		methods: {
			addMyAudio() {
				getMusic().then(res => {
					this.audio = res
					const ap = new APlayer({
						container: document.getElementById("aplayer"),
						listFolded: true,
						listMaxHeight: 90,
						lrcType: 3,
						audio: this.audio
					})
				})
			}
		},
	}
</script>

<template>
	<div id="aplayer"></div>
</template>

<style scoped>
	#aplayer {
		width: 50%;
		min-width: 600px;
		position: absolute;
		bottom: 0;
	}
</style>