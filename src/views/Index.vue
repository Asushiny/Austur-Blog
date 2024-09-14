<script setup>
	import {
		ref
	} from 'vue'
</script>

<template>
	<div class="home">
		<el-row>
			<el-col :xs="0" :sm="0" :md="8">
				
			</el-col>
			<el-col :xs="0" :sm="12" :md="8">
				
			</el-col>
			<el-col :xs="24" :sm="12" :md="8">
				<el-text type="warning" tag="mark">TIMEKEEPER</el-text>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :xs="24" :sm="12" :md="8">
				<el-text class="text3" type="danger">Ave Mujica</el-text>
			</el-col>
			<el-col :xs="0" :sm="12" :md="8">
				
			</el-col>
			<el-col :xs="0" :sm="0" :md="8">
				
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :xs="0" :sm="0" :md="8">
				
			</el-col>
			<el-col :xs="24" :sm="24" :md="8">
				<el-text class="text2" type="primary" tag="del">TRAVELER</el-text>
			</el-col>
			<el-col :xs="0" :sm="0" :md="8">
				
			</el-col>
		</el-row>
	</div>
</template>

<style scoped>
	.home {
		width: 100%;
		height: calc(100vh - 122px);
		background-image: url(../../public/images/4.jpg);
		background-size: cover;
		background-position: center;
		box-sizing: border-box;
		background-repeat: no-repeat;
		text-align: center;
		padding-top: 50px;
	}

	.el-text {
		font-size: 40px;
		font-weight: bolder;
	}
</style>