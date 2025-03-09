<script setup>
	import {
		ref
	} from 'vue'
	import {
		Link,
		MagicStick,
		Headset,
		Setting,
		Cloudy,
		Document,
		Monitor,
		Connection,
		UploadFilled,
		FolderOpened,
		DataBoard
	} from '@element-plus/icons-vue'

	const timelineEvents = ref([{
			timestamp: '2025-02-25',
			title: '博客架构重大更新',
			content: '全面重构博客系统，接入supabase',
			type: 'danger',
			color: '#f56c6c',
			icon: DataBoard,
			tags: [{
					text: '架构升级',
					type: 'danger'
				},
				{
					text: 'v4.0',
					type: ''
				}
			]
		},
		{
			timestamp: '2024-09-01',
			title: '界面样式升级',
			content: '重新设计首页及导航样式，更新音乐播放器歌单列表',
			type: 'warning',
			color: '#e6a23c',
			icon: FolderOpened,
			tags: [{
					text: 'UI改版',
					type: 'warning'
				},
				{
					text: '功能优化',
					type: ''
				}
			]
		},
		{
			timestamp: '2024-01-07',
			title: '音乐播放器集成',
			content: '成功集成APlayer音乐播放器',
			type: 'success',
			color: '#67c23a',
			icon: Headset,
			tags: [{
					text: '新功能',
					type: 'success'
				},
				{
					text: '多媒体',
					type: ''
				}
			]
		},
		{
			timestamp: '2023-11-22',
			title: '技术栈升级',
			content: '迁移至Vue3 + ElementPlus技术架构',
			type: 'primary',
			color: '#409eff',
			icon: UploadFilled,
			tags: [{
					text: '框架升级',
					type: 'primary'
				},
				{
					text: 'v3.0',
					type: ''
				}
			]
		},
		{
			timestamp: '2022-11-26',
			title: '博客系统升级',
			content: '升级到Vuepress V2并采用vuepress-theme-hope V2主题',
			type: 'info',
			color: '#909399',
			icon: Monitor,
			tags: [{
				text: '版本升级',
				type: 'info'
			}]
		},
		{
			timestamp: '2022-09-28',
			title: '域名注册',
			content: '成功注册并启用新域名austur.top',
			type: 'success',
			color: '#67c23a',
			icon: Link,
			tags: [{
				text: '域名',
				type: 'success'
			}]
		},
		{
			timestamp: '2022-04-22',
			title: '导航系统改进',
			content: '为日记板块新增左侧导航侧边栏',
			type: '',
			color: '#909399',
			icon: Setting,
			tags: [{
				text: '功能优化',
				type: ''
			}]
		},
		{
			timestamp: '2022-01-17',
			title: '细节优化',
			content: '改进多处体验细节',
			type: '',
			color: '#909399',
			icon: Connection,
			tags: [{
				text: '体验优化',
				type: ''
			}]
		},
		{
			timestamp: '2022-01-14',
			title: '部署方案',
			content: '将博客部署至Vercel平台',
			type: 'primary',
			color: '#409eff',
			icon: Setting,
			tags: [{
				text: '部署',
				type: 'primary'
			}]
		},
		{
			timestamp: '2022-01-13',
			title: '博客主题',
			content: '采用vuepress-theme-reco主题方案',
			type: 'warning',
			color: '#e6a23c',
			icon: Document,
			tags: [{
				text: '主题',
				type: 'warning'
			}]
		},
		{
			timestamp: '2022-01-12',
			title: '博客诞生',
			content: '成功搭建首个个人博客',
			type: 'success',
			color: '#67c23a',
			icon: MagicStick,
			tags: [{
					text: '里程碑',
					type: 'success'
				},
				{
					text: 'v1.0',
					type: ''
				}
			]
		}
	])
</script>

<template>
	<div class="timeline-container">
		<el-row justify="center">
			<el-col :xs="24" :sm="22" :md="20" :lg="18">
				<el-timeline>
					<el-timeline-item v-for="(event, index) in timelineEvents" :key="index" :timestamp="event.timestamp"
						:type="event.type" :color="event.color" :icon="event.icon" placement="top">
						<el-card class="timeline-card">
							<template #header>
								<div class="card-header">
									<div class="title-wrapper">
										<el-icon :size="24" class="event-icon">
											<component :is="event.icon" />
										</el-icon>
										<h3 class="event-title">{{ event.title }}</h3>
									</div>
								</div>
							</template>
							<p class="event-content">{{ event.content }}</p>
							<div class="tags-wrapper">
								<el-tag v-for="(tag, tagIndex) in event.tags" :key="tagIndex" :type="tag.type"
									class="event-tag">
									{{ tag.text }}
								</el-tag>
							</div>
						</el-card>
					</el-timeline-item>
				</el-timeline>
			</el-col>
		</el-row>
	</div>
</template>

<style scoped>
	.timeline-container {
		padding: 40px 20px;
		background-color: #f5f7fa;
		min-height: 100vh;
	}

	.timeline-card {
		margin: 10px 0;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		border-radius: 12px;
	}

	.timeline-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
	}

	.title-wrapper {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.event-icon {
		flex-shrink: 0;
		padding: 8px;
		border-radius: 50%;
		background-color: var(--el-color-primary);
		color: white;
	}

	.event-title {
		margin: 0;
		font-size: 1.3rem;
		color: #303133;
		line-height: 1.4;
	}

	.event-content {
		color: #606266;
		line-height: 1.7;
		margin: 12px 0;
		font-size: 0.95rem;
	}

	.tags-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.event-tag {
		margin-top: 8px;
	}

	/* 响应式优化 */
	@media (max-width: 768px) {
		.title-wrapper {
			gap: 8px;
		}

		.event-title {
			font-size: 1.1rem;
		}

		.event-icon {
			width: 28px;
			height: 28px;
		}

		:deep(.el-timeline-item__timestamp) {
			font-size: 0.9rem;
		}
	}

	@media (max-width: 480px) {
		.title-wrapper {
			flex-wrap: wrap;
		}

		.event-title {
			font-size: 1rem;
		}

		.event-content {
			font-size: 0.85rem;
		}
	}
</style>