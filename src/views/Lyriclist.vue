<script lang="ts" setup>
	import { computed, ref } from 'vue'
	import router from '@/router'
	
	interface User {
		songName : string
		singer : string
		id : number
	}

	const search = ref('')
	const filterTableData = computed(() =>
		tableData.filter(
			(data) =>
				!search.value ||
				data.songName.toLowerCase().includes(search.value.toLowerCase())
		)
	)
	const handleOpen = (index : number, row : User) => {
		console.log(index, row)
		router.push({ path: '/lyric', query: { id: row.id }})
	}

	const tableData : User[] = [
		{
			songName: '小小恋歌',
			singer: 'Mongol800 (モンゴル800)',
			id: 1
		},
		{
			songName: '喜剧',
			singer: '星野源(Hoshino Gen)',
			id: 2
		},
		{
			songName: '花の塔',
			singer: '酸欠少女さユり',
			id: 3
		},
		{
			songName: 'Hectopascal',
			singer: '寿美菜子/高田憂希',
			id: 4
		},
		{
			songName: '光るなら(若能绽放光芒)',
			singer: 'Goose house (グースハウス)',
			id: 5
		},
	]
</script>
<template>
	<el-table :data="filterTableData" style="width: 80%" class="lyric">
		<el-table-column type="index" width="50" />
		<el-table-column label="songName" prop="songName" />
		<el-table-column label="singer" prop="singer" />
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