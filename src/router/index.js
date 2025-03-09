import {
	createRouter,
	createWebHistory
} from 'vue-router'

//导入组件
import LayoutVue from '@/views/Layout.vue'
import IndexVue from '@/views/Index.vue'
import WallpaperVue from '@/views/Wallpaper.vue'
import DocsVue from '@/views/Docs.vue'
import LyricVue from '@/views/Lyric.vue'
import TimelineVue from '@/views/Timeline.vue'
import AccountVue from '@/views/Account.vue'
import LoginVue from '@/views/Login.vue'
import UnknownVue from '@/views/404.vue'

//创建路由器
const router = createRouter({
	history: createWebHistory(),
	linkActiveClass: "router-active",
	routes: [{
			path: '/',
			component: LayoutVue,
			redirect: '/index',
			//子路由
			children: [{
				path: '/index',
				component: IndexVue,
				meta: {
					title: "主页 | Austur's博客"
				}
			}, {
				path: '/docs',
				component: DocsVue,
				meta: {
					title: "归档 | Austur's博客"
				}
			}, {
				path: '/lyric',
				component: LyricVue,
				meta: {
					title: "歌词 | Austur's博客"
				}
			}, {
				path: '/wallpaper',
				component: WallpaperVue,
				meta: {
					title: "图片墙 | Austur's博客"
				}
			}, {
				path: '/account',
				component: AccountVue,
				meta: {
					title: "记账本 | Austur's博客"
				}
			}, {
				path: '/timeline',
				component: TimelineVue,
				meta: {
					title: "时间轴 | Austur's博客"
				}
			}]
		},
		// 登录
		{
			path: '/login',
			component: LoginVue,
			meta: {
				title: "登录 | Austur's博客"
			}
		},
		// 404
		{
			path: '/404',
			component: UnknownVue,
			meta: {
				title: "404 | Austur's博客"
			}
		},
		// 未知路由重定向
		{
			path: '/:pathMatch(.*)',
			redirect: '/404',
			hidden: true
		}
	]
})

//导出路由
export default router