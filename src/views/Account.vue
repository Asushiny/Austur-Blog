<template>
	<div class="account-container">
		<!-- 卡片展示 -->
		<el-row :gutter="10">
			<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
				<el-card shadow="always">
					<p>临时储蓄</p>
					<el-statistic :value="temporaryValue" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
				<el-card shadow="always">
					<p>个人储蓄</p>
					<el-statistic :value="selfsaveValue" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
				<el-card shadow="always">
					<p>父母储蓄</p>
					<el-statistic :value="parentsValue" />
				</el-card>
			</el-col>
		</el-row>
		<!-- 新增按钮 -->
		<div class="filter-container">
			<el-button type="primary" size="large" class="action-btn" @click="addDialog = true">
				新增
			</el-button>

			<el-dialog v-model="addDialog" title="新增" width="400" align-center>
				<el-form :model="formData" :rules="rules" ref="formRef" label-width="auto" label-position="left">
					<!-- 日期选择 -->
					<el-form-item label="日期" prop="date">
						<el-input v-model="formData.date" disabled />
					</el-form-item>

					<!-- 工资收入 -->
					<el-form-item label="工资收入" prop="salary">
						<el-input v-model.number="formData.salary" />
					</el-form-item>
					
					<!-- 个人消费 -->
					<el-form-item label="个人消费" prop="selfuse">
						<el-input v-model.number="formData.selfuse" />
					</el-form-item>

					<!-- 临时储蓄 -->
					<el-form-item label="临时储蓄" prop="temporary">
						<el-input v-model.number="formData.temporary" />
					</el-form-item>

					<!-- 个人储蓄 -->
					<el-form-item label="个人储蓄" prop="selfsave">
						<el-input v-model.number="formData.selfsave" />
					</el-form-item>

					<!-- 父母储蓄 -->
					<el-form-item label="父母储蓄" prop="parents">
						<el-input v-model.number="formData.parents" />
					</el-form-item>
				</el-form>

				<template #footer>
					<span>
						<el-button type="primary" @click="submitForm">提交</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
		<!-- 表格 -->
		<div class="table-wrapper">
			<el-table :data="tableData" v-loading="loading" stripe height="300" style="width: 100%;" border
				class="responsive-table">
				<el-table-column type="index" width="50" />
				<el-table-column prop="date" label="时间">
					<template #default="{ row }">
						<div class="cell-content">{{ row.date }}</div>
					</template>
				</el-table-column>

				<el-table-column prop="salary" label="工资收入">
					<template #default="{ row }">
						<div class="cell-content">{{ row.salary }}</div>
					</template>
				</el-table-column>
				
				<el-table-column prop="selfuse" label="个人消费">
					<template #default="{ row }">
						<div class="cell-content">{{ row.selfuse }}</div>
					</template>
				</el-table-column>

				<el-table-column prop="temporary" label="临时储蓄">
					<template #default="{ row }">
						<div class="cell-content">{{ row.temporary }}</div>
					</template>
				</el-table-column>

				<el-table-column prop="selfsave" label="个人储蓄">
					<template #default="{ row }">
						<div class="cell-content">{{ row.selfsave }}</div>
					</template>
				</el-table-column>

				<el-table-column prop="parents" label="父母储蓄">
					<template #default="{ row }">
						<div class="cell-content">{{ row.parents }}</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 页数 -->
		<div class="pagination-container">
			<el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 50]"
				:total="total" v-model:current-page="currentPage" v-model:page-size="pageSize"
				@size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		onMounted
	} from 'vue'
	import {
		supabase
	} from '../api/supabase.js'
	import {
		useTransition
	} from '@vueuse/core'
	import {
		ChatLineRound,
		Male
	} from '@element-plus/icons-vue'
	import {
		ElMessage
	} from 'element-plus'
	const addDialog = ref(false)
	// 表单
	const formData = reactive({
		date: (new Date()).toJSON().slice(0, 10),
		salary: '',
		selfuse: '',
		temporary: '',
		selfsave: '',
		parents: '',
	})
	const formRef = ref()

	// 验证规则
	const rules = {
		salary: [{
			required: true,
			message: '请输入工资收入',
			trigger: 'blur'
		}],
		selfuse: [{
			required: true,
			message: '请输入个人消费',
			trigger: 'blur'
		}],
		temporary: [{
			required: true,
			message: '请输入临时储蓄',
			trigger: 'blur'
		}],
		selfsave: [{
			required: true,
			message: '请输入个人储蓄',
			trigger: 'blur'
		}],
		parents: [{
			required: true,
			message: '请输入父母储蓄',
			trigger: 'blur'
		}]
	}
	const submitForm = async () => {
		// 表单验证
		const valid = await formRef.value.validate()
		if (!valid) return
		try {
			const {
				data,
				error
			} = await supabase
				.from('accounttable')
				.insert([formData])
				.select()

			if (error) throw error

			ElMessage.success('提交成功')
			addDialog.value = false
			formRef.value.resetFields()
			fetchTemporary()
			fetchselfsave()
			fetchParents()
			fetchData()
		} catch (error) {
			ElMessage.error(`提交失败: ${error.message}`)
		}
	}
	// 顶部卡片
	const accountData = ref([])
	const temporary = ref(0)
	const selfsave = ref(0)
	const parents = ref(0)
	const temporaryValue = useTransition(temporary, {
		duration: 1500,
	})
	const selfsaveValue = useTransition(selfsave, {
		duration: 1500,
	})
	const parentsValue = useTransition(parents, {
		duration: 1500,
	})
	// 获取临时数值
	const fetchTemporary = async () => {
		try {
			// 使用Supabase查询总和
			const {
				data,
				error
			} = await supabase
				.from('accounttable')
				.select('temporary')

			if (error) throw error
			accountData.value = data || []
			temporary.value = data.reduce((acc, item) => {
				const num = Number(item.temporary)
				return acc + (isNaN(num) ? 0 : num)
			}, 0)
		} catch (error) {
			console.error('Error fetching total:', error.message)
		}
	}
	// 获取个人数值
	const fetchselfsave = async () => {
		try {
			// 使用Supabase查询总和
			const {
				data,
				error
			} = await supabase
				.from('accounttable')
				.select('selfsave')

			if (error) throw error
			accountData.value = data || []
			selfsave.value = data.reduce((acc, item) => {
				const num = Number(item.selfsave)
				return acc + (isNaN(num) ? 0 : num)
			}, 0)
		} catch (error) {
			console.error('Error fetching total:', error.message)
		}
	}
	// 获取父母数值
	const fetchParents = async () => {
		try {
			// 使用Supabase查询总和
			const {
				data,
				error
			} = await supabase
				.from('accounttable')
				.select('parents')

			if (error) throw error
			accountData.value = data || []
			parents.value = data.reduce((acc, item) => {
				const num = Number(item.parents)
				return acc + (isNaN(num) ? 0 : num)
			}, 0)
		} catch (error) {
			console.error('Error fetching total:', error.message)
		}
	}


	// 响应式数据
	const tableData = ref([])
	const loading = ref(false)
	const currentPage = ref(1)
	const pageSize = ref(10)
	const total = ref(0)
	// 获取表格数据
	const fetchData = async () => {
		try {
			loading.value = true

			const from = (currentPage.value - 1) * pageSize.value
			const to = from + pageSize.value - 1

			// 获取总数
			const {
				count
			} = await supabase
				.from('accounttable')
				.select('*', {
					count: 'exact',
					head: true
				})

			// 获取分页数据
			const {
				data,
				error
			} = await supabase
				.from('accounttable')
				.select('*')
				.range(from, to)
				.order('id', {
					ascending: false
				})

			if (error) throw error

			tableData.value = data
			total.value = count
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			loading.value = false
		}
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

	onMounted(() => {
		fetchTemporary()
		fetchselfsave()
		fetchParents()
		fetchData()
	})
</script>

<style scoped>
	.account-container {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.el-card {
		margin: 20px 0;
		text-align: center;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.el-card:hover {
		transform: translateY(-5px);
	}

	.el-card p {
		font-size: 1.5rem;
		color: #55aaff;
		margin-bottom: 12px
	}

	/* 新增按钮 */
	.filter-container {
		margin-bottom: 20px;
		display: flex;
		justify-content: flex-end;
	}

	/* 表格 */
	.table-wrapper {
		flex: 1;
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
		.account-container {
			width: 90%;
			padding: 16px;
		}
	}

	@media (max-width: 768px) {
		.account-container {
			width: 95%;
			margin: 10px auto;
			padding: 12px;
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