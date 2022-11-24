import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Index',
		redirect: '/index',
		component: () => import('@/views/Layout'),
		children: [{
			path: '/index',
			name: 'Home',
			component: () => import('@/views/Home/index.vue'),
			meta: {
				title: '首页',
			}
		}, {
			path: '/classify',
			name: 'Classify',
			component: () => import('@/views/Classify/index.vue'),
			meta: {
				title: '分类',
			}
		}, {
			path: '/tag',
			name: 'Tag',
			component: () => import('@/views/Tag/index.vue'),
			meta: {
				title: '标签',
			}
		}, {
			path: '/diary',
			name: 'Diary',
			component: () => import('@/views/Diary/index.vue'),
			meta: {
				title: '日记',
			}
		}, {
			path: '/lyric',
			name: 'Lyric',
			component: () => import('@/views/Lyric/index.vue'),
			meta: {
				title: '歌词',
			}
		}, {
			path: '/time-axis',
			name: 'Time-axis',
			component: () => import('@/views/Time-axis/index.vue'),
			meta: {
				title: '时间轴',
			}
		}, {
			path: '/review',
			name: 'Review',
			component: () => import('@/views/Review/index.vue'),
			meta: {
				title: '回顾',
			}
		}]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login')
	},
	{
		path: '*',
		name: '404',
		component: () => import('@/views/404'),
		meta: {
			title: '页面丢失了',
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
