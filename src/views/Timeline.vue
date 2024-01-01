<script setup>

</script>

<template>
	<el-timeline class="timeline">
		<el-timeline-item center timestamp="2023-11-22" placement="top" type="primary" hollow>
			<el-card>
				<h4>博客框架更改为vue3 + element-plus</h4>
			</el-card>
		</el-timeline-item>
		<el-timeline-item center timestamp="2022-11-26" placement="top">
			<el-card>
				<h4>博客框架更改为vuepress V2</h4>
				<p>博客主题更改为vuepress-theme-hope V2</p>
			</el-card>
		</el-timeline-item>
		<el-timeline-item center timestamp="2022-09-28" placement="top">
			<el-card>
				<h4>新增域名austur.top</h4>
			</el-card>
		</el-timeline-item>
		<el-timeline-item center timestamp="2022-04-22" placement="top">
			<el-card>
				<h4>为日记版块增加了左侧侧边栏</h4>
			</el-card>
		</el-timeline-item>
		<el-timeline-item center timestamp="2022-01-17" placement="top">
			<el-card>
				<h4>更改了一些小细节</h4>
			</el-card>
		</el-timeline-item>
		<el-timeline-item center timestamp="2022-01-14" placement="top">
			<el-card>
				<h4>将博客部署到Vercel上</h4>
			</el-card>
		</el-timeline-item>
		<el-timeline-item center timestamp="2022-01-13" placement="top">
			<el-card>
				<h4>将博客主题使用vuepress-theme-reco</h4>
			</el-card>
		</el-timeline-item>
		<el-timeline-item center timestamp="2022-01-12" placement="top">
			<el-card>
				<h4>今天搭建了属于自己的博客</h4>
			</el-card>
		</el-timeline-item>
	</el-timeline>
</template>

<style scoped>
.timeline{
	margin: 25px 10% 0 10%;
}
</style>