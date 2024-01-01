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
		// router.push('/lyric?id='+row.id)
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
		<!-- <el-table-column label="note" prop="note" /> -->
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


<!-- <h1>小小恋歌</h1>
		<p>Mongol800 (モンゴル800)</p>
		<p>《小小恋歌》（小さな恋のうた）是2001年日本乐团MONGOL800的一首代表性歌曲，收录于第2张录音室专辑《MESSAGE》中。2007年被用作由山下智久和长泽雅美主演的人气富士月九剧《求婚大作战》的插曲而再一次掀起热潮。
		</p>


		<el-tabs tab-position="right" style="height: 200px" class="demo-tabs">
			<el-tab-pane label="Part 1">
				<p>広(ひろ)い宇宙(うちゅう)の数(かず)ある一(ひと)つ</p>
				<p>在无垠宇宙中那独一无二的</p>
			</el-tab-pane>
			<el-tab-pane label="Part 2">Config</el-tab-pane>
			<el-tab-pane label="Part 3">Role</el-tab-pane>
		</el-tabs> -->
<!-- </div> -->

<style>
	.lyric {
		margin: 10px auto 0 auto;
	}

	/* h1 {
		font-size: 30px
	} */
</style>