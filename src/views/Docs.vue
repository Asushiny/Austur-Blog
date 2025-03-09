<template>
	<div class="docs-container">
		<div class="filter-container">
			<el-select v-model="selectedType" placeholder="选择类型" @change="handleTypeChange" clearable
				class="type-selector">
				<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</div>

		<div class="table-wrapper">
			<el-table :data="tableData" v-loading="loading" stripe style="width: 100%" class="responsive-table">
				<el-table-column prop="topic" label="主题">
					<template #default="{ row }">
						<div class="cell-content">{{ row.topic }}</div>
					</template>
				</el-table-column>

				<el-table-column prop="author" label="作者">
					<template #default="{ row }">
						<div class="cell-content">{{ row.author }}</div>
					</template>
				</el-table-column>

				<el-table-column prop="types" label="类型">
					<template #default="{ row }">
						<el-tag :type="row.types === '歌词' ? 'success' : 'primary'">
							{{ row.types }}
						</el-tag>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="120" align="center">
					<template #default="{ row }">
						<el-button type="primary" size="small" class="action-btn" @click="handleView(row)">
							查看
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="pagination-container">
			<el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
				:page-sizes="[10, 20, 30, 50]" layout="total, sizes, prev, pager, next, jumper" background
				@size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import router from '@/router'
	import {
		supabase
	} from '../api/supabase.js'
	import {
		ElNotification
	} from 'element-plus'

	// 响应式数据
	const tableData = ref([])
	const loading = ref(false)
	const selectedType = ref('')
	const currentPage = ref(1)
	const pageSize = ref(10)
	const total = ref(0)

	const typeOptions = [{
			value: '',
			label: '全部'
		},
		{
			value: '歌词',
			label: '歌词'
		},
		{
			value: '文档',
			label: '文档'
		}
	]

	// 获取数据
	const fetchData = async (value) => {
		try {
			loading.value = true
			const from = (currentPage.value - 1) * pageSize.value
			const to = from + pageSize.value - 1
			// 获取总数
			const {
				count
			} = await supabase
				.from('docstable')
				.select('*', {
					count: 'exact',
					head: true
				})

			// 创建基础查询
			let query = supabase
				.from('docstable')
				.select('*');
			// 动态添加过滤条件（当有选中类型时）
			if (selectedType.value) {
				query = query.eq('types', selectedType.value);
			}

			// 执行查询
			const {
				data,
				error
			} = await query;

			if (error) throw error

			tableData.value = data
			total.value = count
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			loading.value = false
		}
	}

	// 类型改变处理
	const handleTypeChange = () => {
		currentPage.value = 1
		fetchData()
	}

	// 分页处理
	const handleCurrentChange = () => {
		fetchData()
	}

	const handleSizeChange = (newSize) => {
		pageSize.value = newSize
		currentPage.value = 1
		fetchData()
	}

	// 获取PDF文件
	const pdfSource = ref()
	const fetchPdf = async (docId) => {
		try {
			const {
				data,
				error: supabaseError
			} = await supabase.storage
				.from('austur-assets')
				.getPublicUrl(`docs/${docId}.pdf`)

			if (supabaseError) throw supabaseError
			pdfSource.value = data.publicUrl
			window.open(pdfSource.value)
		} catch (error) {
			error.value = error.message || '无法获取PDF文档'
			console.error('文档获取失败:', error)
		}
	}

	// 查看详情
	const handleView = (row) => {
		if (row.types === '歌词') {
			console.log(row)
			router.push({
				path: '/lyric',
				query: {
					docid: row.docid
				}
			})
		} else if (row.types === '文档') {
			fetchPdf(row.docid)
		}
	}

	onMounted(() => {
		fetchData()
	})
</script>

<style scoped>
	.docs-container {
		width: 90%;
		max-height: calc(100vh - 180px);
		margin: 20px auto;
		padding: 24px;
		background: #fff;
		border-radius: 12px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.filter-container {
		margin-bottom: 20px;
		display: flex;
		justify-content: flex-end;
	}

	.table-wrapper {
		flex: 1;
		height: 400px;
		overflow-x: auto;
	}

	.responsive-table {
		min-width: 600px;
	}

	.cell-content {
		padding: 8px 0;
		word-break: break-word;
		line-height: 1.5;
	}

	.pagination-container {
		margin-top: 24px;
		display: flex;
		justify-content: center;
	}

	.action-btn {
		width: 80px;
	}

	@media (max-width: 1200px) {
		.docs-container {
			width: 90%;
			padding: 16px;
		}
	}

	@media (max-width: 768px) {
		.docs-container {
			width: 95%;
			margin: 10px auto;
			padding: 12px;
		}

		.filter-container {
			justify-content: center;
		}

		.type-selector {
			width: 100% !important;
		}

		.pagination-container {
			flex-wrap: wrap;
			gap: 8px;
		}

		.el-pagination {
			flex-wrap: wrap;
			justify-content: center;
		}

		.el-pagination__total,
		.el-pagination__sizes {
			width: 100%;
			text-align: center;
			margin-bottom: 8px;
		}
	}

	@media (max-width: 480px) {
		.cell-content {
			font-size: 14px;
		}

		.el-table__header th {
			font-size: 14px;
		}

		.action-btn {
			width: 60px;
			padding: 6px;
			font-size: 12px;
		}

		.el-pagination__jump {
			display: none;
		}
	}

	/* 全局样式调整 */

	.el-table td,
	.el-table th {
		padding: 12px 8px !important;
	}

	.el-table--striped .el-table__body tr.el-table__row--striped td {
		background: #f8f9fa;
	}
</style>