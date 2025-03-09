<template>
	<div class="login-container">
		<div class="login-box">
			<form @submit.prevent="handleLogin">
				<div class="form-group">
					<label for="username">Username</label>
					<input type="username" id="username" v-model="username" class="input-field" disabled />
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" id="password" v-model="password" class="input-field" />
				</div>

				<button type="submit" class="login-btn" v-loading="loading">
					Sign In
					<span class="hover-effect"></span>
				</button>
			</form>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
	} from 'vue'
	import {
		supabase
	} from '../api/supabase.js'
	import {
		ElMessage
	} from 'element-plus'
	import {
		useRouter
	} from 'vue-router'

	//登录表单
	const username = ref('Austur')
	const email = ref('1204693790@qq.com')
	const password = ref('')
	const loading = ref(false)
	const router = useRouter()

	const handleLogin = async () => {
		if (password.value) {
			try {
				loading.value = true

				const {
					error
				} = await supabase.auth.signInWithPassword({
					email: email.value,
					password: password.value
				})

				if (error) throw error

				//设置本地存储
				var expiration = new Date().getTime() + (1 * 60 * 60 * 1000);
				localStorage.setItem('login', JSON.stringify({
					value: 'true',
					expiration: expiration
				}));
				ElMessage.success('登录成功')
				router.push('/index')
			} catch (error) {
				ElMessage.error(error.error_description || error.message)
				password.value = ''
			} finally {
				loading.value = false
			}
		} else {
			ElMessage.warning('请输入密码!')
		}

		// 登出
		// let { error } = await supabase.auth.signOut()
	}
</script>

<style scoped>
	.login-container {
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
		padding: 20px;
	}

	.login-box {
		background: rgba(255, 255, 255, 0.95);
		padding: 40px;
		border-radius: 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 400px;
		transform: translateY(0);
		transition: transform 0.3s ease;
	}

	.form-group {
		margin-bottom: 25px;
		position: relative;
	}

	label {
		display: block;
		margin-bottom: 8px;
		color: #4a5568;
		font-weight: 500;
	}

	.input-field {
		width: 100%;
		padding: 12px 15px;
		border: 2px solid #e2e8f0;
		border-radius: 8px;
		font-size: 16px;
		transition: all 0.3s ease;
	}

	.input-field:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.login-btn {
		width: 100%;
		padding: 14px;
		background: #a1c4fd;
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.login-btn:hover {
		background: #667eea;
		transform: translateY(-2px);
	}

	.hover-effect {
		position: absolute;
		background: rgba(255, 255, 255, 0.2);
		width: 50px;
		height: 100%;
		left: 0;
		top: 0;
		transform: skewX(-20deg) translateX(-100%);
		transition: transform 0.3s ease;
	}

	.login-btn:hover .hover-effect {
		transform: skewX(-20deg) translateX(300%);
	}

	@media (max-width: 480px) {
		.login-box {
			padding: 30px 20px;
		}
	}
</style>