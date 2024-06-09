import {
	createRouter,
	createWebHistory
} from 'vue-router'

//导入组件
import IndexVue from '@/views/Index.vue'
import LayoutVue from '@/views/Layout.vue'
import HomeVue from '@/views/Home.vue'
import LyriclistVue from '@/views/Lyriclist.vue'
import LyricVue from '@/views/Lyric.vue'
import WallpaperVue from '@/views/Wallpaper.vue'
import TimelineVue from '@/views/Timeline.vue'
import UnknownVue from '@/views/404.vue'

//创建路由器
const router = createRouter({
	history: createWebHistory(),
	routes: [{
			// 	path: '/index',
			// 	component: IndexVue,
			// 	meta: {
			// 		title: "首页 | Austur's博客"
			// 	}
			// },
			// {
			path: '/',
			component: LayoutVue,
			redirect: '/index',
			//子路由
			children: [{
				path: '/index',
				component: HomeVue,
				meta: {
					title: "主页 | Austur's博客"
				}
			}, {
				path: '/lyriclist',
				component: LyriclistVue,
				meta: {
					title: "lyriclist | Austur's博客"
				}
			}, {
				path: '/lyric',
				component: LyricVue,
				meta: {
					title: "lyric | Austur's博客"
				}
			}, {
				path: '/wallpaper',
				component: WallpaperVue,
				meta: {
					title: "图片墙 | Austur's博客"
				}
			}, {
				path: '/timeline',
				component: TimelineVue,
				meta: {
					title: "时间轴 | Austur's博客"
				}
			}]
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