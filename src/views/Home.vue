<script setup>
	import {
		ref,
		nextTick,
		onBeforeMount
	} from 'vue'
	import {
		ElMessage,
		ElLoading
	} from 'element-plus'
	import {getLogin} from '@/api/index.js'
	import router from '@/router'

	//导入音乐播放器
	const isLogin = ref()
	onBeforeMount(() => {
		//判断是否已登录
		let logining = localStorage.getItem('login');
		if (logining) {
			isLogin.value = true
			console.log(isLogin.value)
		} else {
			isLogin.value = false
			console.log(isLogin.value)
		}
	})
	//Dialog显示
	const showDialog = ref(false)
	//打开对话框时，input获取焦点
	const inputRef = ref()
	const openDialog = () => {
		//查看本地是否已登录
		let logining = localStorage.getItem('login');
		console.log(logining)
		//如果已登录直接跳转到主页
		if(logining){
			const loading = ElLoading.service({
				lock: true,
				text: '正在进入主页...',
				background: 'rgba(0, 0, 0, 0.7)',
			})
			setTimeout(() => {
				loading.close()
				router.push('/')
			}, 1000)
		}else{  //否则input获取焦点
			nextTick(() => {
				inputRef.value.focus()
			})
		}
	}
	//关闭对话框时，清除input数据
	const closeDialog = () => {
		input.value = ''
		ElMessage({
			message: '取消登录',
			grouping: true,
			type: 'warning',
		})
	}
	//input
	const input = ref('')
	//登录
	const toHome = (val) => {
		//当密码的长度为6时，开始判断密码是否正确
		if (val.length === 6) {
			getLogin().then(data => {
				// console.log(val,data.psd)
				if (val == data.psd) {
					//设置过期时间为1天
					var expiration = new Date().getTime() + (24 * 60 * 60 * 1000);
					localStorage.setItem('login', JSON.stringify({ value: 'true', expiration: expiration }));
					// localStorage.setItem('login', 'true');
					const loading = ElLoading.service({
						lock: true,
						text: '密码正确，正在进入主页...',
						background: 'rgba(0, 0, 0, 0.7)',
					})
					setTimeout(() => {
						loading.close()
						router.go(0)
					}, 1000)
				} else {
					ElMessage({
						message: '密码错误',
						type: 'error',
					})
				}
			}).catch(error => {
				console.log(error);
			});
		}
	}
	//注销
	const loginOut = (val) => {
		localStorage.removeItem('login');
		location.reload();
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
								<img style="width: 100%;" src="../../public/images/tri.png" alt="" />
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

	<el-row v-else class="unlogin">
		<div class="index">
			<div class="main">
				<p class="topic" @click="showDialog = true">Austur</p>
				<el-dialog v-model="showDialog" title="登录博客" width="350px" align-center @open="openDialog"
					@close="closeDialog">
					<el-input ref="inputRef" class="pas-input" size="large" maxlength="6" v-model="input" type="password"
						placeholder="******" @input="toHome" />
				</el-dialog>
				<p class="title">旭光之后,皆是繁星</p>
			</div>
		</div>
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
	
	.unlogin{
		width: 100%;
		height: calc(100vh - 140px);
	}

	.unlogin .index {
		width: 100%;
		height: calc(100vh - 140px);
		background-image: url("../assets/bg.png");
		background-size: cover;
		background-position: center;
		box-sizing: border-box;
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
	}
	
	.unlogin .main {
		width: 500px;
		text-align: center;
		margin: auto;
	}
	
	.unlogin .topic {
		font-size: 100px;
		color: #00aaff;
		cursor: pointer;
	}
	
	.unlogin .dialog-footer button:first-child {
		margin-right: 10px;
	}
	
	.unlogin .pas-input {
		width: 80%;
		margin-bottom: 20px;
	}
	
	.unlogin .title {
		font-size: 20px;
		color: #fff;
	}
</style>