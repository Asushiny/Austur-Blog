<script setup>
	import {
		ref,
		nextTick,
	} from 'vue'
	import {
		ElMessage,
		ElLoading
	} from 'element-plus'
	import router from '@/router'
	import {getLogin} from '../api/index.js'
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
				console.log(val,data.psd)
				if (val == data.psd) {
					localStorage.setItem('login', 'true');
					const loading = ElLoading.service({
						lock: true,
						text: '密码正确，正在进入主页...',
						background: 'rgba(0, 0, 0, 0.7)',
					})
					setTimeout(() => {
						loading.close()
						router.push('/')
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
	const goHome = (val) => {
		router.push('/index')
	}
</script>

<template>
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
</template>

<style scoped>
	.index {
		width: 100%;
		min-width: 1000px;
		height: 100vh;
		background-image: url("../assets/images/bg.jpg");
		background-size: cover;
		box-sizing: border-box;
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
	}

	.main {
		width: 500px;
		text-align: center;
		margin: auto;
	}

	.topic {
		font-size: 100px;
		color: #00aaff;
		cursor: pointer;
	}

	.dialog-footer button:first-child {
		margin-right: 10px;
	}

	.pas-input {
		width: 80%;
		margin-bottom: 20px;
	}

	.title {
		font-size: 20px;
		color: #fff;
	}
</style>