<template>
	<div class="home">
		<div class="home-bg">
			<div class="dictum">
				<h1>Asushiny</h1>
				<p>Yesterday has passed, tomorrow is still on the road, cherish the present.</p>
			</div>
		</div>
		<div class="home-content maincontent">
			<div class="home-content-left">
				<Item></Item>
			</div>
			<div class="home-content-right">
				<div class="individual-top">
					<div class="portrait">
						<el-avatar :src="userImg"></el-avatar>
					</div>
					<div class="name">{{ nikename }}</div>
					<div class="num-box">
						<div class="num-left">
							<p>23</p>
							<span>文章</span>
						</div>
						<div class="num-right">
							<p>23</p>
							<span>标签</span>
						</div>
					</div>
				</div>
				<div class="individual-content">
					<p><i class="el-icon-menu"></i>分类</p>
					<div class="content-box">
						日记<span :style="getColor()">5</span>
					</div>
					<div class="content-box">
						游戏<span :style="getColor()">132</span>
					</div>
					<div class="content-box">
						游戏<span :style="getColor()">132</span>
					</div>
					<div class="content-box">
						游戏<span :style="getColor()">132</span>
					</div>
					<div class="content-box">
						游戏<span :style="getColor()">132</span>
					</div>
				</div>
				<div class="individual-bottom">
					<p><i class="el-icon-star-on"></i>标签</p>
					<el-tag size="medium" :style="getColor()">全部</el-tag>
					<el-tag size="medium" :style="getColor()">博客</el-tag>
					<el-tag size="medium" :style="getColor()">原神</el-tag>
					<el-tag size="medium" :style="getColor()">歌词</el-tag>
					<el-tag size="medium" :style="getColor()">最美妙的旅途</el-tag>
					<el-tag size="medium" :style="getColor()">致爱 A song for beloved</el-tag>
				</div>
			</div>
		</div>
		<!-- 底部 -->
		<div class="footer">
			<p>&copy;<span>{{ nikename }}</span><span>2021</span>-<span>{{ nowYear }}</span></p>
		</div>
	</div>
</template>

<script>
	import Item from "@/components/Item.vue"
	export default {
		props: ['userImg', 'nikename'],
		components: {
			Item
		},
		data() {
			return {
				nowYear: '',
				colorList: [
					'#e15b64',
					'#f47e60',
					'#fb9b5f',
					'#95c19b',
					'#67cc86',
					'#3498db'
				]
			}
		},
		created() {
			this.getnowYear()
		},
		methods: {
			//获取当前年份
			getnowYear() {
				var year = new Date().getFullYear();
				this.nowYear = year
			},
			//获取随机颜色
			getColor() {
				var color = this.colorList
				let i = Math.floor(Math.random() * color.length);
				return {
					background: color[i]
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../../assets/css/home.css");
</style>
