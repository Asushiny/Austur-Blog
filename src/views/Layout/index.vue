<template>
	<!-- 布局页面 -->
	<div class="layout">
		<APlayer v-if="isShow" :music="audio[0]" :list="audio" :showlrc="true" listMaxHeight="135px"></APlayer>
		<!-- 头部 -->
		<Header :isLogin='isLogin' :userImg='userImg'></Header>
		<!-- 主体 -->
		<div class="main">
			<!-- 内容区域 -->
			<router-view :isLogin='isLogin' :userImg='userImg' :nikename='nikename'></router-view>
		</div>
	</div>
</template>

<script>
	//引入vue-aplayer音乐播放器
	import APlayer from 'vue-aplayer'
	import Header from "./Header.vue"
	export default {
		name: 'Home',
		components: {
			APlayer,
			Header
		},
		created() {
			//获取token
			var token = localStorage.getItem("user_token")
			if (token != null) {
				console.log('已登录');
				this.isLogin = true
				this.getUserInformation(token)
			}else{
				console.log('未登录');
				this.isLogin = false
			}
			// 使用get请求获取到public目录下的 musicList.json文件的数据
			this.$axios.get('/musicList.json').then(res => {
				this.audio = res.data
				this.isShow = true
			})
		},
		data() {
			return {
				// 音频列表
				audio: [],
				isShow: false,
				//是否登录,默认未登录
				isLogin: false,
				userImg: '',//头像
				nikename: '',//昵称
				admincode: '',//管理员码
			}
		},
		methods: {
			//获取token
			getToken() {
				localStorage.getItem("user_token")
			},
			//已登录则获取用户信息
			
			getUserInformation(token) {
				this.$http({
					path: 'user/userInformation',
					method: 'get',
					headers: {
						token
					}
				}).then(res => {
					// console.log(res);
					if (res.data.status === 200) {
						this.userImg = res.data.data.userImg
						this.nikename = res.data.data.nikename
						this.admincode = res.data.data.admincode
					}
				}).catch({
			
				})
			},
		}
	}
</script>

<style scoped>
	.layout {
		position: relative;
	}

	.aplayer {
		width: 300px;
		position: fixed !important;
		bottom: 0;
		left: 0;
		z-index: 999;
	}

	.main {
		width: 100%;
		/* height: 2000px; */
		margin-top: 60px;
	}
</style>
