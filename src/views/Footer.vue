<script lang="ts" setup>

</script>

<template>
	<el-footer>
		<div class="footer-left">
			<p>旭光之后，皆是繁星</p>
		</div>
		<div class="footer-right">
			<p>Copyright © 2022 Austur.</p>
		</div>
	</el-footer>
</template>

<style scoped>
	.el-footer {
		width: 100%;
		height: 60px;
		line-height: 58px;
		background: #ffffff;
		box-sizing: border-box;
		box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-around;
	}

	.el-footer p {
		margin: 2px 0;
		font-size: 16px;
		color: #909399;
	}

	/* 响应式设计 */
	@media (max-width: 768px) {
		.el-footer {
			height: 60px;
			line-height: 10px;
			flex-direction: column;
			justify-content: center;
			text-align: center;
		}

		.footer-left,
		.footer-right {
			padding: 5px 0;
		}
	}
</style>