<template>
  <div class="container">
    <div class="waterfall-grid">
      <transition-group name="stagger">
        <div 
          v-for="(img, index) in images"
          :key="img.id"
          class="waterfall-item"
          :style="{ '--aspect-ratio': img.aspectRatio }"
          @click="openViewer(index)"
        >
          <!-- 骨架屏 -->
          <div v-if="!img.loaded" class="skeleton">
            <div class="skeleton-inner"></div>
          </div>

          <!-- 图片主体 -->
          <img
            :src="imgUrl(img.name)"
            alt="Gallery image"
            loading="lazy"
            class="gallery-image"
            :class="{ loaded: img.loaded }"
            @load="handleImageLoad(img)"
          />
        </div>
      </transition-group>
    </div>

    <!-- 加载指示器 -->
    <div class="loader" v-if="loading">
      <div class="loader-spinner"></div>
    </div>

    <!-- 全屏预览 -->
    <el-image-viewer
      v-if="viewerVisible"
      :url-list="previewList"
      :initial-index="initialIndex"
      @close="closeViewer"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
		supabase
	} from '../api/supabase.js'

// 状态管理
const images = ref([])
const viewerVisible = ref(false)
const initialIndex = ref(0)
const page = ref(1)
const hasMore = ref(true)
const loading = ref(false)

// 计算属性
const previewList = computed(() => 
  images.value.map(img => imgUrl(img.name))
)

// 获取图片
const fetchImages = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.storage
      .from('austur-assets')
      .list('wallpaper', {
        limit: 30,
        offset: (page.value - 1) * 30,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) throw error
    hasMore.value = data.length === 30
    
    const newImages = data.map(img => ({
      ...img,
      loaded: false,
      aspectRatio: 1.5 // 默认比例
    }))
    
    images.value = [...images.value, ...newImages]
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    loading.value = false
  }
}

// 生成图片URL
const imgUrl = (filename) => 
  `https://dtlhdzlqambljsilvnrf.supabase.co/storage/v1/object/public/austur-assets/wallpaper/${filename}?width=600&quality=85`

// 图片加载处理
const handleImageLoad = (img) => {
  const naturalWidth = event.target.naturalWidth
  const naturalHeight = event.target.naturalHeight
  img.aspectRatio = naturalWidth / naturalHeight
  img.loaded = true
}

// 图片查看操作
const openViewer = (index) => {
  initialIndex.value = index
  viewerVisible.value = true
}

const closeViewer = () => {
  viewerVisible.value = false
}

// 滚动加载
const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 500 && !loading.value && hasMore.value) {
    page.value++
    fetchImages()
  }
}

onMounted(() => {
  fetchImages()
  window.addEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 4%;
  min-height: 100vh;
}

.waterfall-grid {
  column-count: 4;
  column-gap: 2rem;
  padding: 1rem 0;

  @media (max-width: 1440px) { column-count: 3; }
  @media (max-width: 1024px) { column-count: 2; }
  @media (max-width: 640px) { column-count: 1; }
}

.waterfall-item {
  break-inside: avoid;
  margin-bottom: 2rem;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #f8f9fa;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  opacity: 0;
  animation: itemEnter 0.6s ease forwards;
  
  &::before {
    content: '';
    display: block;
    padding-bottom: calc(100% / var(--aspect-ratio, 1.5));
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
    
    .gallery-image {
      transform: scale(1.08);
    }
  }
}

.skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    #ececec 25%,
    #f5f5f5 50%,
    #ececec 75%
  );
  background-size: 400% 400%;
  animation: skeletonLoading 1.5s ease infinite;
  
  &-inner {
    width: 100%;
    height: 100%;
  }
}

.gallery-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: 
    opacity 0.6s ease,
    transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &.loaded {
    opacity: 1;
  }
}

.loader {
  padding: 3rem 0;
  text-align: center;
  
  &-spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #6B5BFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes itemEnter {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes skeletonLoading {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>