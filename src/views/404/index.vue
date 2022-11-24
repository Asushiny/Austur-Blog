<template>
	<div class="main">
		<div class="left-box">
			<img src="@/assets/images/404.png" alt="404 Image">
		</div>
		<div class="right-box">
			<div class="box">
				<h1>Sorry!</h1>
				<p>
					要么你不够酷，无法访问此网页，要么它不存在
				</p>
				<a @click="toIndex"><button>返回主页！</button></a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			//回到首页
			toIndex() {
				this.$router.push('/index');
			}
		}
	}
</script>

<style scoped>
	@import url("https://fonts.googleapis.com/css2?family=Fontdiner+Swanky&family=Roboto:wght@500&display=swap");

	.main {
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.left-box {
		width: 50%;
		height: 100vh;
		background-image: url("../../assets/images/404-right.png");
		background-position: top right;
		background-repeat: no-repeat;
		background-size: 25px 100%;
		float: left;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.left-box img {
		width: 500px;
		display: block;
	}

	.right-box {
		width: 50%;
		height: 100vh;
		background-color: #383838;
		float: right;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.right-box .box {
		height: 250px;
		text-align: center;
	}

	.right-box h1 {
		font-family: "Fontdiner Swanky", cursive;
		font-size: 4rem;
		color: #c5dc50;
		margin-bottom: 1rem;
	}

	.right-box p {
		font-size: 20px;
		color: #fff;
		margin-bottom: 2.5rem;
	}

	.right-box button {
		font-family: "Fontdiner Swanky", cursive;
		font-size: 1rem;
		color: #383838;
		border: none;
		background-color: #f36a6f;
		padding: 1rem 2.5rem;
		-webkit-transform: skew(-5deg);
		transform: skew(-5deg);
		-webkit-transition: all 0.1s ease;
		transition: all 0.1s ease;
	}

	.right-box button:hover {
		background-color: #c5dc50;
		-webkit-transform: scale(1.15);
		transform: scale(1.15);
	}
</style>
