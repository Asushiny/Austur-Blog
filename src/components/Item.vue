<template>
	<div class="itemBox">
		<div class="title">
			如果突然想起我
		</div>
		<div class="content">
			<div class="author"><i class="el-icon-user-solid"></i>Mongol800</div>
			<div class="time"><i class="el-icon-time"></i>2022/4/8</div>
				<i class="el-icon-star-on"></i>
			<div class="tagList">
				<div class="tag">歌词</div>
				<div class="tag">小小恋歌</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped>
	/* 列表 */
	.itemBox {
		height: 70px;
		line-height: 35px;
		transition: all 0.3s;
		box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
		margin-bottom: 20px;
		border-radius: 5px;
		padding: 15px 20px;
	}

	.itemBox:hover {
		box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}
	
	.title{
		font-size: 20px;
		font-weight: bolder;
	}
	
	.content{
		display: flex;
		justify-content: start;
		font-size: 14px;
		color: #7f7f7f;
	}
	.tagList{
		display: flex;
	}
</style>
