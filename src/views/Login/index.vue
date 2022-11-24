<template>
	<div class="login-register">
		<div class="contain">
			<div class="big-box" :class="{active:isLogin}">
				<div class="login-contain" key="bigContainLogin" v-if="isLogin">
					<div class="btitle">账户登录</div>
					<el-form :model="loginform" @keyup.enter.native="login()">
						<el-form-item>
							<el-input placeholder="请输入用户名" v-model="loginform.username"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input type="password" placeholder="请输入密码" show-password v-model="loginform.userpwd">
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" class="login-button" @click="login">登录</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="register-contain" key="bigContainRegister" v-else>
					<div class="btitle">创建账户</div>
					<el-form class="register-form" :model="registerform" @keyup.enter.native="register()">
						<el-form-item>
							<el-input placeholder="请输入用户名" v-model="registerform.username"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input type="password" placeholder="请输入密码" show-password v-model="registerform.userpwd">
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-input placeholder="请再次输入密码" show-password v-model="registerform.checkpwd"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input placeholder="请输入管理员码" show-password v-model="registerform.admincode"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button class="register-button" @click="register">注册</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" key="smallContainRegister" v-if="isLogin">
					<div class="stitle">你好，朋友!</div>
					<p class="scontent">开始注册，和我们一起旅行</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" key="smallContainLogin" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">登录账户，记录新的内容吧!</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login-register',
		data() {
			return {
				isLogin: true,
				loginform: {
					username: '',
					userpwd: '',
				},
				registerform: {
					username: '',
					userpwd: '',
					checkpwd: '',
					admincode: ''
				}
			}
		},
		methods: {
			//清空登录表单
			clearLogin() {
				this.loginform.username = ''
				this.loginform.userpwd = ''
			},
			//清空注册表单
			clearReg() {
				this.registerform.username = ''
				this.registerform.userpwd = ''
				this.registerform.checkpwd = ''
				this.registerform.admincode = ''
			},
			changeType() {
				this.isLogin = !this.isLogin
				if (this.isLogin === false) {
					this.clearLogin()
				} else {
					this.clearReg()
				}
			},
			login() {
				var username = this.loginform.username
				var userpwd = this.loginform.userpwd
				if (username === '') {
					this.$message.error('请输入用户名!');
				} else if (userpwd === '') {
					this.$message.error('请输入密码!');
				} else {
					//前端验证通过访问登录接口
					this.$http({
						path: 'http://localhost:3000/user/login',
						method: 'post',
						params: {
							username: username,
							password: userpwd
						}
					}).then(res => {
						console.log(res);
						if (res.data.status === 200) {
							this.$message.success(res.data.msg);
							localStorage.setItem("user_token", res.data.token);
							this.$router.push('/index');
						} else if (res.data.status === 403) {
							this.$message.error(res.data.msg);
							this.clearLogin()
						}
					}).catch({

					})
				}
			},
			register() {
				var username = this.registerform.username
				var nameLength = this.registerform.username.length
				var userpwd = this.registerform.userpwd
				var checkpwd = this.registerform.checkpwd
				var admincode = this.registerform.admincode
				if (username === '') {
					this.$message.error('用户名不能为空!');
				} else if (nameLength > 10) {
					this.$message.error('用户名长度请控制在10个字符以内!');
				} else if (userpwd === '') {
					this.$message.error('密码不能为空!');
				} else if (userpwd != checkpwd) {
					this.$message.error('两次输入密码不一致!');
				} else {
					//前端验证通过访问注册接口
					this.$http({
						path: 'http://localhost:3000/user/register',
						method: 'post',
						params: {
							username: username,
							password: userpwd,
							admincode: admincode
						}
					}).then(res => {
						console.log(res);
						if (res.data.status === 400 || res.data.status === 401) {
							this.$message.error(res.data.msg);
							this.clearReg()
						} else {
							this.$message({
								message: '注册成功!',
								type: 'success'
							});
							//等待1.5秒，调用登录接口
							setTimeout(() => {
								this.$http({
									path: 'http://localhost:3000/user/login',
									method: 'post',
									params: {
										username: username,
										password: userpwd
									}
								}).then(res => {
									console.log(res);
									if (res.data.status === 200) {
										this.$message.success(res.data.msg);
										localStorage.setItem("user_token", res.data.token);
										this.$router.push('/index');
									} else if (res.data.status === 403) {
										this.$message.error(res.data.msg);
										this.clearLogin()
									}
								}).catch({

								})
							}, 1500);
						}
					}).catch({

					})
				}
			}
		}
	}
</script>

<style scoped>
	.login-register {
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		background: url('../../assets/images/bg.svg') no-repeat;
		background-size: 100% 100%;
	}

	.contain {
		width: 60%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
			0 0 6px #f0f0f0;
	}

	.big-box {
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 0.5s;
	}

	.login-contain {
		width: 100%;
		height: 80%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10%;
	}

	.register-contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.btitle {
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(57, 167, 176);
	}

	.el-form {
		width: 50%;
		height: 50%;
		margin: 50px 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.el-form.register-form {
		height: 60%;
		margin: 20px 0 0 0;
	}

	.login-button,
	.register-button {
		width: 100%;
		height: 40px;
		color: #fff;
		background-color: rgb(57, 167, 176);
		border-radius: 25px;
		border: none;
		outline: none;
		cursor: pointer;
	}

	.small-box {
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 0.5s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}

	.small-contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.stitle {
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}

	.scontent {
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}

	.sbutton {
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}

	.big-box.active {
		left: 0;
		transition: all 0.5s;
	}

	.small-box.active {
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 0.5s;
	}
</style>
