<script setup>
	import {
		ref,
		onBeforeMount
	} from 'vue'
	import router from '@/router'

	//导入音乐播放器

	const isLogin = ref()
	onBeforeMount(() => {
		//判断是否已登录
		let logining = localStorage.getItem('login');
		if (logining) {
			isLogin.value = true
			console.log(isLogin)
		} else {
			isLogin.value = false
			console.log(isLogin)
			// router.push('/index')
		}
	})
	//注销
	const loginOut = (val) => {
		localStorage.removeItem('login');
		location.reload();
	}
	//去到首页登录
	const goIndex = (val) => {
		router.push('/index')
	}
</script>

<template>
	<el-row v-if="isLogin">
		<el-col :span="12" class="col">
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>个人信息</span>
					</div>
				</template>
				<el-descriptions title="" direction="vertical" :column="4" border>
					<el-descriptions-item>
						<template #label>
							<div class="cell-item">
								<el-icon>
									<Avatar />
								</el-icon>
								用户名
							</div>
						</template>
						Austur.
					</el-descriptions-item>
					<el-descriptions-item>
						<template #label>
							<div class="cell-item">
								<el-icon><strong></strong>
									<InfoFilled />
								</el-icon>
								状态
							</div>
						</template>
						<el-button type="success" disabled>登录</el-button>
					</el-descriptions-item>
					<el-descriptions-item :span="2">
						<template #label>
							<div class="cell-item">
								<el-icon>
									<HomeFilled />
								</el-icon>
								居住地
							</div>
						</template>
						中国
					</el-descriptions-item>
					<el-descriptions-item :span="3">
						<template #label>
							<div class="cell-item">
								<el-icon>
									<Discount />
								</el-icon>
								标签
							</div>
						</template>
						<el-tag effect="dark" size="small">旅行者</el-tag>
						<el-tag effect="dark" size="small" type="danger">TimeKeeper</el-tag>
						<el-tag effect="dark" size="small" type="info">阅读</el-tag>
						<el-tag effect="dark" size="small" type="success">追番</el-tag>
					</el-descriptions-item>
					<el-descriptions-item>
						<template #label>
							<div class="cell-item">
								<el-icon>
									<OfficeBuilding />
								</el-icon>
								地址
							</div>
						</template>
						中华人民共和国
					</el-descriptions-item>
					<el-descriptions-item :span="3">
						<template #label>
							<div class="cell-item">
								<el-icon>
									<Document />
								</el-icon>
								个性签名
							</div>
						</template>
						旭光之后,皆是繁星
					</el-descriptions-item>
					<el-descriptions-item>
						<template #label>
							<div class="cell-item">
								<el-icon>
									<CircleCloseFilled />
								</el-icon>
								登出键
							</div>
						</template>
						<el-button type="danger" round @click="loginOut">注销</el-button>
					</el-descriptions-item>
				</el-descriptions>
			</el-card>
		</el-col>
		<el-col :span="12" class="col">
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>博客</span>
					</div>
				</template>
				<el-scrollbar>
					<el-timeline class="blog">
						<el-timeline-item center timestamp="2024-1-1" placement="top" type="primary" hollow>
							<el-card>
								<h4>新的一年，也要开开心心</h4>
							</el-card>
						</el-timeline-item>
						<el-timeline-item center timestamp="2023-11-23" placement="top">
							<el-card>
								<h4>成功录取，即将开始新的学习生涯</h4>
							</el-card>
						</el-timeline-item>
						<el-timeline-item center timestamp="2023-10-21 -- 22" placement="top">
							<el-card>
								<h4>参加考试</h4>
							</el-card>
						</el-timeline-item>
						<el-timeline-item center timestamp="2023-9-7" placement="top">
							<el-card>
								<h4>芜湖，第一次三金-1999</h4>
								<img style="width: 100%;" src="../assets/images/blog/tri.png" alt="" />
							</el-card>
						</el-timeline-item>
						<el-timeline-item center timestamp="2023-5-31" placement="top">
							<el-card>
								<h4>入坑了1999</h4>
							</el-card>
						</el-timeline-item>
					</el-timeline>
				</el-scrollbar>
			</el-card>
		</el-col>
	</el-row>

	<el-row v-else class="empty">
		<el-empty :image-size="300">
			<el-button type="info" @click="goIndex">前往登录</el-button>
		</el-empty>
	</el-row>
</template>

<style scoped>
	.col {
		padding: 10px;
	}

	.cell-item {
		font-weight: bolder;
		display: flex;
		align-items: center;
	}

	.el-tag {
		margin: 0 5px;
	}

	.blog {
		height: 257px;
		padding-right: 15px;
	}

	.empty {
		display: flex;
		justify-content: center;
		margin-top: 100px;
	}
</style>