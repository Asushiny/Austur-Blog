<script lang="ts" setup>
	import { computed, ref } from 'vue'
	import router from '@/router'

	interface User {
		topic : string
		author : string
		types : string
		id : number
	}

	const search = ref('')
	const filterTableData = computed(() =>
		tableData.filter(
			(data) =>
				!search.value ||
				data.topic.toLowerCase().includes(search.value.toLowerCase())
		)
	)
	const handleOpen = (index : number, row : User) => {
		console.log(index, row)
		router.push({ path: '/lyric', query: { id: row.id } })
	}

	const tableData : User[] = [
		{
			topic: 'LOVE 2000',
			author: 'hitomi',
			types: '歌词',
			id: 1
		},
		{
			topic: '小小恋歌',
			author: 'Mongol800 (モンゴル800)',
			types: '歌词',
			id: 2
		},
		{
			topic: '喜剧',
			author: '星野源(Hoshino Gen)',
			types: '歌词',
			id: 3
		},{
			topic: '英语语法',
			author: '佚名',
			types: '文档',
			id: 3
		},
	]
</script>
<template>
	<el-table :data="filterTableData" style="width: 80%" class="lyric">
		<el-table-column type="index" width="50" />
		<el-table-column label="topic" prop="topic" />
		<el-table-column label="author" prop="author" />
		<el-table-column label="types" prop="types" />
		<el-table-column align="right">
			<template #header>
				<el-input v-model="search" placeholder="Type to search" />
			</template>
			<template #default="scope">
				<el-button size="small" type="primary" @click="handleOpen(scope.$index, scope.row)">查看</el-button>
			</template>
		</el-table-column>
	</el-table>
	<router-view></router-view>
</template>

<style>
	.lyric {
		margin: 10px auto 0 auto;
	}
</style>