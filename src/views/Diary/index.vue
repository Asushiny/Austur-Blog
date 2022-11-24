<template>
	<div>
		<h2 v-if="admincode">日记</h2>
		<Privileges v-else :showAdmin='showAdmin'></Privileges>
	</div>
</template>

<script>
	import Privileges from "@/components/Privileges.vue"
	export default {
		// props: ['admincode'],
		components: {
			Privileges
		},
		data() {
			return {
				admincode: false,
				showAdmin:false //true显示无权限，false显示未登录
			}
		}
	}
</script>

<style scoped>
</style>
