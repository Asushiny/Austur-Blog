<template>
	<el-row class="main-layout">
		<el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" class="mainleft">
			<img src="../assets/bg.jpg" alt="" />
		</el-col>
		<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="mainright">
			<el-card shadow="hover" style="text-align: center;">
				<h3 style="font-weight: bolder;color: #009def;">Hello It's Austur</h3>
				<h6 style="color: darkcyan;">TIMEKEEPER / TRAVELER</h6>
			</el-card>
			<el-card shadow="hover" class="aboutme">
				<h4 style="font-weight: bolder;">守卫者</h4>
				<h5 style="color: aqua;">ISFJ-T</h5>
			</el-card>
			<el-card shadow="hover" style="text-align: center;">
				<h4 style="font-weight: bolder;color: #009def;">运行天数</h4>
				<el-statistic :value="outputValue" />
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		useTransition
	} from '@vueuse/core'
	
	// 上次日期和当前日期
	var firstDate = new Date("2022-01-12");
	var currentDate = new Date();
	// 计算时间戳差值
	var lastTimestamp = Math.floor(firstDate.getTime() / 1000);
	var currentTimestamp = Math.floor(currentDate.getTime() / 1000);
	var timestampDiff = currentTimestamp - lastTimestamp;
	
	// 计算天数
	var days = Math.floor(timestampDiff / 86400);
	
	const source = ref(0)
	const outputValue = useTransition(source, {
		duration: 1000,
	})
	source.value = days
</script>

<style scoped>
	.main-layout {
		height: calc(100vh - 122px);
		min-height: calc(100vh - 122px);
		padding: 24px;
		background-color: #f5f7fa;
	}

	.mainleft {
		width: 100%;
		height: 100%;
		border-radius: 25px;
		overflow: hidden;
		box-sizing: border-box;
		box-shadow: 0 2px 8px #00000026;
	}

	.mainleft img {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center center;
		object-fit: cover;
	}

	.mainright {
		width: 100%;
		padding: 0 20px;
		display: flex;
		flex-direction: column;
	}

	.el-card {
		width: 100%;
		margin: 10px;
		border-radius: 20px;
		box-sizing: border-box;
		box-shadow: 0 2px 8px #00000026;
		flex: 1;
		transition: flex 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Arial;
		font-size: 24px;
	}

	.el-card:hover {
		flex: 2;
	}

	.aboutme {
		background-image: url(../assets/isfj.svg);
		background-size: auto 80%;
		background-position: center right;
		background-repeat: no-repeat;
	}

	.el-statistic {
		font-size: 26px
	}

	/* 响应式设计 */
	@media (max-width: 768px) {
		.mainleft {
			width: 100%;
			height: 200px;
			border-radius: 25px;
			overflow: hidden;
			box-sizing: border-box;
			box-shadow: 0 2px 8px #00000026;
		}
		.mainright {
			padding: 0 20px 0 0;
		}
	}
</style>