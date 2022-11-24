<template>
	<div class="navbar">
		<div class="h-left">
			<!-- 博客名称 -->
			<div class="webname">東Azzz's Blog</div>
			<div class="search">
				<el-input clearable prefix-icon="el-icon-search" v-model="searchInput"></el-input>
			</div>
		</div>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#242424"
			active-text-color="#3eaf7c" @select="handleSelect" router>
			<el-menu-item index="/index"><i class="el-icon-s-home"></i>主页</el-menu-item>
			<el-menu-item index="/classify"><i class="el-icon-menu"></i>分类</el-menu-item>
			<el-menu-item index="/tag"><i class="el-icon-star-on"></i>标签</el-menu-item>
			<el-menu-item index="/diary"><i class="el-icon-s-order"></i>日记</el-menu-item>
			<el-menu-item index="/lyric"><i class="el-icon-s-management"></i>歌词</el-menu-item>
			<el-menu-item index="/time-axis"><i class="el-icon-s-marketing"></i>时间轴</el-menu-item>
			<el-menu-item index="/review"><i class="el-icon-s-data"></i>回顾</el-menu-item>
			<el-menu-item v-if="isLogin">
				<el-dropdown @command="handleCommand">
					<span class="el-dropdown-link">
						<el-avatar :src="userImg"></el-avatar><i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
						<el-dropdown-item command="loginout">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-menu-item>
			<el-menu-item index="/login" v-else>
				<el-avatar icon="el-icon-user-solid"></el-avatar>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		props: ['isLogin', 'userImg'],
		data() {
			return {
				searchInput: '',
				activeIndex: '/index',
			}
		},
		mounted() {
			//获取地址栏中的路由，设置elementui中的导航栏选中状态
			this.activeIndex = window.location.pathname;
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			//退出登录
			handleCommand(command) {
				if (command === 'usercenter') {
					if (this.admincode = true) {
						this.$message('个人中心');
					} else {
						this.$message('无权访问');
					}
				} else if (command === 'loginout') {
					this.$message('退出');
					//移除token
					localStorage.removeItem("user_token")
					//刷新页面
					this.$router.go(0)
				}
			}
		}
	}
</script>

<style scoped>
	.navbar {
		width: 100%;
		min-width: 1000px;
		height: 60px;
		display: flex;
		align-items: center;
		background-color: #fff;
		box-shadow: 0 2px 2px 0 rgb(0 0 0 / 7%), 0 1px 5px 0 rgb(0 0 0 / 10%);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
	}

	.h-left {
		padding: 0 2%;
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.webname {
		width: 150px;
		font-size: 1.2rem;
		font-weight: 600;
	}

	.search {
		max-width: 200px;
		flex: 1;
	}

	/* 水平时，去除底部白边。 */
	.el-menu.el-menu--horizontal {
		border-bottom: 0;
	}

	.el-menu--horizontal>.el-menu-item.is-active {
		border: none;
	}

	.el-menu-item {
		transition-duration: 0s;
	}

	.el-menu-item [class^=el-icon-] {
		width: 20px;
		font-size: 16px;
		margin: 0;
		position: relative;
		top: -2px;
	}

	.el-menu-item {
		padding: 0 15px;
	}

	.el-avatar {
		margin-bottom: 10px;
	}
</style>
