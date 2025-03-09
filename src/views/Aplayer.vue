<script>
	//aplayer
	import 'aplayer/dist/APlayer.min.css';
	import APlayer from 'aplayer';
	import {
		supabase
	} from '../api/supabase.js'

	export default {
		name: 'AplayerView',
		mounted() {
			this.fetchData();
		},
		data() {
			return {
				audio: [],
			}
		},
		methods: {
			async fetchData() {
				try {
					const {
						data: musictable,
						error
					} = await supabase
						.from('musictable')
						.select('*')
					if (error) throw error

					this.audio = musictable
					this.addMyAudio()
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},
			addMyAudio() {
				const ap = new APlayer({
					container: document.getElementById("aplayer"),
					listFolded: true,
					listMaxHeight: 90,
					lrcType: 3,
					audio: this.audio,
					fixed: true,
				})
			}
		},
	}
</script>
<template>
	<div id="aplayer"></div>
</template>

<style scoped>
	/* #aplayer { */
	/* width: 50px; */
	/* height: 50px; */
	/* min-width: 425px; */
	/* position: absolute; */
	/* bottom: 0; */
	/* } */
</style>